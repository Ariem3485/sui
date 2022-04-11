// Copyright (c) 2021, Facebook, Inc. and its affiliates
// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

use std::fmt::Write;
use std::fmt::{Display, Formatter};
use std::fs::{self, File};
use std::io::BufReader;
use std::ops::{Deref, DerefMut};
use std::path::{Path, PathBuf};
use std::sync::Mutex;

use once_cell::sync::Lazy;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use serde_json::Value;
use serde_with::hex::Hex;
use serde_with::serde_as;
use tracing::log::trace;

use sui_framework::DEFAULT_FRAMEWORK_PATH;
use sui_network::network::PortAllocator;
use sui_types::base_types::*;
use sui_types::crypto::{get_key_pair, KeyPair};

use crate::gateway::GatewayType;
use crate::keystore::KeystoreType;

const DEFAULT_WEIGHT: usize = 1;
const DEFAULT_GAS_AMOUNT: u64 = 1000000;
pub const AUTHORITIES_DB_NAME: &str = "authorities_db";
pub const DEFAULT_STARTING_PORT: u16 = 10000;

static PORT_ALLOCATOR: Lazy<Mutex<PortAllocator>> =
    Lazy::new(|| Mutex::new(PortAllocator::new(DEFAULT_STARTING_PORT)));

#[derive(Serialize, Deserialize)]
pub struct AuthorityInfo {
    #[serde(serialize_with = "bytes_as_hex", deserialize_with = "bytes_from_hex")]
    pub name: AuthorityName,
    pub host: String,
    pub base_port: u16,
}

#[derive(Serialize)]
pub struct AuthorityPrivateInfo {
    pub key_pair: KeyPair,
    pub host: String,
    pub port: u16,
    pub db_path: PathBuf,
    pub stake: usize,
}

// Custom deserializer with optional default fields
impl<'de> Deserialize<'de> for AuthorityPrivateInfo {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::de::Deserializer<'de>,
    {
        let (_, new_key_pair) = get_key_pair();

        let json = Value::deserialize(deserializer)?;
        let key_pair = if let Some(val) = json.get("key_pair") {
            KeyPair::deserialize(val).map_err(serde::de::Error::custom)?
        } else {
            new_key_pair
        };
        let host = if let Some(val) = json.get("host") {
            String::deserialize(val).map_err(serde::de::Error::custom)?
        } else {
            "127.0.0.1".to_string()
        };
        let port = if let Some(val) = json.get("port") {
            u16::deserialize(val).map_err(serde::de::Error::custom)?
        } else {
            PORT_ALLOCATOR
                .lock()
                .map_err(serde::de::Error::custom)?
                .next_port()
                .ok_or_else(|| serde::de::Error::custom("No available port."))?
        };
        let db_path = if let Some(val) = json.get("db_path") {
            PathBuf::deserialize(val).map_err(serde::de::Error::custom)?
        } else {
            PathBuf::from(".")
                .join(AUTHORITIES_DB_NAME)
                .join(encode_bytes_hex(key_pair.public_key_bytes()))
        };
        let stake = if let Some(val) = json.get("stake") {
            usize::deserialize(val).map_err(serde::de::Error::custom)?
        } else {
            DEFAULT_WEIGHT
        };

        Ok(AuthorityPrivateInfo {
            key_pair,
            host,
            port,
            db_path,
            stake,
        })
    }
}

#[serde_as]
#[derive(Serialize, Deserialize)]
pub struct WalletConfig {
    #[serde_as(as = "Vec<Hex>")]
    pub accounts: Vec<SuiAddress>,
    pub keystore: KeystoreType,
    pub gateway: GatewayType,
}

impl Config for WalletConfig {}

impl Display for WalletConfig {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        let mut writer = String::new();

        writeln!(writer, "Managed addresses : {}", self.accounts.len())?;
        writeln!(writer, "{}", self.keystore)?;
        write!(writer, "{}", self.gateway)?;

        write!(f, "{}", writer)
    }
}

#[derive(Serialize, Deserialize)]
pub struct NetworkConfig {
    pub authorities: Vec<AuthorityPrivateInfo>,
    pub buffer_size: usize,
    pub loaded_move_packages: Vec<(PathBuf, ObjectID)>,
}

impl Config for NetworkConfig {}

impl NetworkConfig {
    pub fn get_authority_infos(&self) -> Vec<AuthorityInfo> {
        self.authorities
            .iter()
            .map(|info| AuthorityInfo {
                name: *info.key_pair.public_key_bytes(),
                host: info.host.clone(),
                base_port: info.port,
            })
            .collect()
    }
}

#[derive(Serialize, Deserialize)]
#[serde(default)]
pub struct GenesisConfig {
    pub authorities: Vec<AuthorityPrivateInfo>,
    pub accounts: Vec<AccountConfig>,
    pub move_packages: Vec<PathBuf>,
    pub sui_framework_lib_path: PathBuf,
    pub move_framework_lib_path: PathBuf,
}

impl Config for GenesisConfig {}

#[derive(Serialize, Deserialize, Default)]
#[serde(default)]
pub struct AccountConfig {
    #[serde(
        skip_serializing_if = "Option::is_none",
        serialize_with = "SuiAddress::optional_address_as_hex",
        deserialize_with = "SuiAddress::optional_address_from_hex"
    )]
    pub address: Option<SuiAddress>,
    pub gas_objects: Vec<ObjectConfig>,
}

#[derive(Serialize, Deserialize)]
pub struct ObjectConfig {
    #[serde(default = "ObjectID::random")]
    pub object_id: ObjectID,
    #[serde(default = "default_gas_value")]
    pub gas_value: u64,
}

fn default_gas_value() -> u64 {
    DEFAULT_GAS_AMOUNT
}

const DEFAULT_NUMBER_OF_AUTHORITIES: usize = 4;
const DEFAULT_NUMBER_OF_ACCOUNT: usize = 1;
const DEFAULT_NUMBER_OF_OBJECT_PER_ACCOUNT: usize = 1000;

impl GenesisConfig {
    pub fn default_genesis(working_dir: &Path) -> Result<Self, anyhow::Error> {
        GenesisConfig::custom_genesis(
            working_dir,
            DEFAULT_NUMBER_OF_AUTHORITIES,
            DEFAULT_NUMBER_OF_ACCOUNT,
            DEFAULT_NUMBER_OF_OBJECT_PER_ACCOUNT,
        )
    }

    pub fn custom_genesis(
        working_dir: &Path,
        num_authorities: usize,
        num_accounts: usize,
        num_objects_per_account: usize,
    ) -> Result<Self, anyhow::Error> {
        let mut authorities = Vec::new();
        for _ in 0..num_authorities {
            // Get default authority config from deserialization logic.
            let mut authority = AuthorityPrivateInfo::deserialize(Value::String(String::new()))?;
            authority.db_path = working_dir
                .join(AUTHORITIES_DB_NAME)
                .join(encode_bytes_hex(&authority.key_pair.public_key_bytes()));
            authorities.push(authority)
        }
        let mut accounts = Vec::new();
        for _ in 0..num_accounts {
            let mut objects = Vec::new();
            for _ in 0..num_objects_per_account {
                objects.push(ObjectConfig {
                    object_id: ObjectID::random(),
                    gas_value: DEFAULT_GAS_AMOUNT,
                })
            }
            accounts.push(AccountConfig {
                address: None,
                gas_objects: objects,
            })
        }
        Ok(Self {
            authorities,
            accounts,
            ..Default::default()
        })
    }
}

impl Default for GenesisConfig {
    fn default() -> Self {
        Self {
            authorities: vec![],
            accounts: vec![],
            move_packages: vec![],
            sui_framework_lib_path: PathBuf::from(DEFAULT_FRAMEWORK_PATH),
            move_framework_lib_path: PathBuf::from(DEFAULT_FRAMEWORK_PATH)
                .join("deps")
                .join("move-stdlib"),
        }
    }
}

pub trait Config
where
    Self: DeserializeOwned + Serialize,
{
    fn persisted(self, path: &Path) -> PersistedConfig<Self> {
        PersistedConfig {
            inner: self,
            path: path.to_path_buf(),
        }
    }
}

pub struct PersistedConfig<C> {
    inner: C,
    path: PathBuf,
}

impl<C> PersistedConfig<C>
where
    C: Config,
{
    pub fn read(path: &Path) -> Result<C, anyhow::Error> {
        trace!("Reading config from '{:?}'", path);
        let reader = BufReader::new(File::open(path)?);
        Ok(serde_json::from_reader(reader)?)
    }

    pub fn save(&self) -> Result<(), anyhow::Error> {
        trace!("Writing config to '{:?}'", &self.path);
        let config = serde_json::to_string_pretty(&self.inner)?;
        fs::write(&self.path, config)?;
        Ok(())
    }
}

impl<C> Deref for PersistedConfig<C> {
    type Target = C;

    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl<C> DerefMut for PersistedConfig<C> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}
