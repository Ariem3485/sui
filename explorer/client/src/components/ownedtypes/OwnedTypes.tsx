// Copyright (c) 2022, Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useState } from 'react';

import OwnedObjects from '../ownedobjects/OwnedObjects';

type ElementType = {
    objType: string;
    objDigest: string;
    objectId: string;
    version: string;
};

type DataType = ElementType[];

type StoreType = {
    title: string | number;
    results: DataType;
};

function OwnedTypes({ objects }: { objects: DataType }) {
    const typeList = objects
        .map((obj) => obj.objType)
        .filter((value, index, array) => array.indexOf(value) === index);

    const typeCount = typeList.map((category) => [
        category,
        objects.filter((obj) => obj.objType === category).length,
    ]);
    const [results, setResults] = useState<false | StoreType>(false);

    const handleClick = useCallback(
        (category: string | number) => () => {
            setResults({
                title: category,
                results: objects.filter(
                    (obj: ElementType) => obj.objType === category
                ),
            });
        },
        [objects]
    );

    const handleResultsClick = useCallback(() => {
        setResults(false);
    }, []);

    return (
        <div>
            {!results &&
                typeCount.map(([category, count], index) => (
                    <div key={`OwnedType-${index}`}>
                        <p>
                            <strong>{category}</strong>
                        </p>
                        <p>Count: {count}</p>
                        <p onClick={handleClick(category)}>
                            Click for Individual Tokens
                        </p>
                    </div>
                ))}
            {results && (
                <div>
                    <h3>{results.title}</h3>
                    <div onClick={handleResultsClick}>Click to go back</div>
                    <OwnedObjects
                        objects={results.results.map(
                            (result) => result.objectId
                        )}
                    />
                </div>
            )}
        </div>
    );
}

export default OwnedTypes;
