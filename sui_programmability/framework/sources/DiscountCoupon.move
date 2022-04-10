// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

module Sui::DiscountCoupon {
    use Sui::ID::VersionedID;
    use Sui::Coin;
    use Sui::SUI::SUI;
    use Sui::Transfer;
    use Sui::TxContext::{Self, TxContext};

    /// Sending to wrong recipient.
    const EWRONG_RECIPIENT: u64 = 0;

    /// Percentage discount out of range.
    const EOUT_OF_RANGE_DISCOUNT: u64 = 1;

    /// Discount coupon NFT.
    struct DiscountCoupon has key, store {
        id: VersionedID,
        // coupon issuer
        issuer: address,
        // percentage discount [1-100]
        discount: u8,
        // expiration timestamp (UNIX time) - app specific
        expiration: u64,
        // coupon image url
        display: vector<u8>,
    }

    /// Simple issuer getter.
    public fun issuer(coupon: &DiscountCoupon): address {
        coupon.issuer
    }

    /// Mint then transfer a new `DiscountCoupon` NFT, and top up recipient with some SUI.
    public fun mint_and_topup(
        coin: Coin::Coin<SUI>,
        recipient: address,
        discount: u8,
        expiration: u64,
        display: vector<u8>,
        ctx: &mut TxContext,
    ) {
        assert!(discount > 0 && discount <= 100, EOUT_OF_RANGE_DISCOUNT);
        let nft = DiscountCoupon {
                    id: TxContext::new_id(ctx),
                    issuer: TxContext::sender(ctx),
                    discount,
                    expiration,
                    display,
                };
        Transfer::transfer(nft, recipient);
        Sui::SUI::transfer(coin, recipient, ctx);
    }

    /// Transfer DiscountCoupon to issuer only.
    //  TODO: Consider adding more valid recipients.
    //      If we stick with issuer-as-receiver only, then `recipient` input won't be required).
    public fun transfer(nft: DiscountCoupon, recipient: address, _ctx: &mut TxContext) {
        assert!(nft.issuer == recipient, EWRONG_RECIPIENT);
        Transfer::transfer(nft, recipient)
    }
}
