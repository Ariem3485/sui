// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { writable } from 'svelte/store';

/// General configuration
/// whever demo is true, mock data is used for NFTs request and response and for the NFT mirror
/// Mock API response for NFTs mirror will return succeess or error at random
export const config = {
    url: 'http://localhost:8000/',
    demo: false,
};
export const walletAddress: any = writable(false);
