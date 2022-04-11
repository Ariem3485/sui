// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { useState, useCallback } from 'react';

import { asciiFromNumberBytes } from '../../utils/stringUtils';
import { type DataType } from './ObjectResultType';

import couponImg05 from '../../assets/images/sui_coupon_5.png';
import couponImg10 from '../../assets/images/sui_coupon_10.png';
import couponImg15 from '../../assets/images/sui_coupon_15.png';
import couponImg20 from '../../assets/images/sui_coupon_20.png';
import couponImg25 from '../../assets/images/sui_coupon_25.png';
import couponImg30 from '../../assets/images/sui_coupon_30.png';
import couponImg35 from '../../assets/images/sui_coupon_35.png';
import couponImg40 from '../../assets/images/sui_coupon_40.png';
import couponImg45 from '../../assets/images/sui_coupon_45.png';
import couponImg50 from '../../assets/images/sui_coupon_50.png';
import couponImg55 from '../../assets/images/sui_coupon_55.png';
import couponImg60 from '../../assets/images/sui_coupon_60.png';
import couponImg65 from '../../assets/images/sui_coupon_65.png';
import couponImg70 from '../../assets/images/sui_coupon_70.png';
import couponImg75 from '../../assets/images/sui_coupon_75.png';
import couponImg80 from '../../assets/images/sui_coupon_80.png';
import couponImg85 from '../../assets/images/sui_coupon_85.png';
import couponImg90 from '../../assets/images/sui_coupon_90.png';
import couponImg95 from '../../assets/images/sui_coupon_95.png';
import couponImg100 from '../../assets/images/sui_coupon_100.png';

import styles from './ObjectResult.module.css';

//TO DO - display smart contract info; see mock_data.json for example smart contract data
//import 'ace-builds/src-noconflict/theme-github';
//import AceEditor from 'react-ace';

function SmartContractBox({ data }: { data: DataType }) {
    return (
        <div className={styles.imagebox}>
            Displaying Smart Contracts Not yet Supported
        </div>
    );
    /*
           return (
                         <div className={styles['display-container']}>
                             <AceEditor
                                 theme="github"
                                 value={data.data.contents.display?.data}
                                 showGutter={true}
                                 readOnly={true}
                                 fontSize="0.8rem"
                                 className={styles.codebox}
                             />
                         </div>
                     );
                     */
}

const discountToImg: Record<number, string> = {
    5: couponImg05,
    10: couponImg10,
    15: couponImg15,
    20: couponImg20,
    25: couponImg25,
    30: couponImg30,
    35: couponImg35,
    40: couponImg40,
    45: couponImg45,
    50: couponImg50,
    55: couponImg55,
    60: couponImg60,
    65: couponImg65,
    70: couponImg70,
    75: couponImg75,
    80: couponImg80,
    85: couponImg85,
    90: couponImg90,
    95: couponImg95,
    100: couponImg100,
};

function getImg({ data }: DataType) {
    const display = data.contents?.display;
    if (data.contents?.discount) {
        return discountToImg[data.contents.discount] || couponImg05;
    } else if (display) {
        if (typeof display === 'object' && 'bytes' in display) {
            return asciiFromNumberBytes(display.bytes);
        }
        return display;
    }
    return null;
}

function DisplayBox({ data }: { data: DataType }) {
    const [hasDisplayLoaded, setHasDisplayLoaded] = useState(false);
    const [hasFailedToLoad, setHasFailedToLoad] = useState(false);

    const contents = data.data.contents;

    const imageStyle = hasDisplayLoaded ? {} : { display: 'none' };
    const handleImageLoad = useCallback(
        () => setHasDisplayLoaded(true),
        [setHasDisplayLoaded]
    );

    const handleImageFail = useCallback(
        (error) => {
            console.log(error);
            setHasDisplayLoaded(true);
            setHasFailedToLoad(true);
        },
        [setHasFailedToLoad]
    );

    const IS_SMART_CONTRACT = (data: any) =>
        data?.data?.contents?.display?.category === 'moveScript';

    if (IS_SMART_CONTRACT(data)) {
        return <SmartContractBox data={data} />;
    }

    // hack to display sui coupon image
    const showDisplayBox = !!(
        data.data?.contents?.display || data.data?.contents?.discount
    );

    if (!showDisplayBox) {
        return null;
    }
    let image = getImg(data);
    if (image) {
        return (
            <div className={styles['display-container']}>
                {!hasDisplayLoaded && (
                    <div className={styles.imagebox}>
                        Please wait for display to load
                    </div>
                )}
                {hasFailedToLoad && (
                    <div className={styles.imagebox}>No Image was Found</div>
                )}
                {!hasFailedToLoad && (
                    <img
                        className={styles.imagebox}
                        style={imageStyle}
                        alt="NFT"
                        src={image}
                        onLoad={handleImageLoad}
                        onError={handleImageFail}
                    />
                )}
            </div>
        );
    }
    return <div />;
}

export default DisplayBox;
