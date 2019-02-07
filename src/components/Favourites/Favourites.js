import React from 'react';

import Favourite from './Favourite/Favourite';

import { generateKey } from '../../shared/utilities';

import { keyboardSetup } from '../../../src/keyboardSetup';
import { scaleChordInfo } from '../../../src/scaleChordInfo';

import Wrapper from '../../hoc/Wrapper/Wrapper';

import styles from '../../stylesheets/app.scss';

let favouritesList;
let jsxBuffer;

const favourites = (props) => {
    switch (props.orderBy) {
        case "Key":
            let currentKeyList;

            jsxBuffer = [];

            favouritesList = sortByKey(props.favourites);

            keyboardSetup.forEach(keyboardkey => {
                currentKeyList = buildFavouriteList(favouritesList.filter(favourite => favourite.currentKey === keyboardkey.name), props);

                if (currentKeyList.length) {
                    jsxBuffer.push(
                        <div>
                            <h3>{keyboardkey.name}</h3>
                            <ul>
                                {currentKeyList}
                            </ul>
                        </div>
                    );
                }
            });

            break;
        case "Type":

            jsxBuffer = [];

            const scalesList = sortyByType(props.favourites, 'Scale');
            const chordsList = sortyByType(props.favourites, 'Chord');

            const scalesDisplay = buildFavouriteList(scalesList, props);
            const chordsDisplay = buildFavouriteList(chordsList, props);

            jsxBuffer.push(
                <Wrapper>
                    {scalesDisplay.length ?
                        <div>
                            <h3>Scales</h3>
                            <ul>
                                {scalesDisplay}
                            </ul>
                        </div> : null}

                    {chordsDisplay.length ?
                        <div>
                            <h3>Chords</h3>
                            <ul>
                                {chordsDisplay}
                            </ul>
                        </div> : null}
                </Wrapper>
            );

            break;
        default:

            break;
    };

    if (!props.favourites.length) {
        jsxBuffer = (<p>No favourites added yet</p>);
    }

    return (
        <div className={styles.controlSection}>
            <h2>Favourites</h2>
            <div className={styles.favourites}>
                {jsxBuffer}
            </div>
        </div>
    );
};

const sortyByType = (items, type) => {
    return items.filter(item => item.currentType === type);
};

const sortByKey = (items) => {
    items.sort((a, b) => {
        const tempItems = [];

        keyboardSetup.forEach(pianoKey => {
            items.filter(favourite => favourite.currentKey === pianoKey.name) // Finds all objects in key
                .sort((a, b) => a.currentType < b.currentType)
                .sort((a, b) => {
                    return sortBySubType(a, b);
                })
                .forEach(k => {
                    tempItems.push(k);
                });
        });
        items = tempItems;
        return items;
    });

    return items;
};

const sortBySubType = (a, b) => {
    const ascalechordIndex = scaleChordInfo.findIndex(scalechord => scalechord.type === a.currentType && scalechord.subType === a.currentSubType);
    const bscalechordIndex = scaleChordInfo.findIndex(scalechord => scalechord.type === b.currentType && scalechord.subType === b.currentSubType);
    return a.currentType === b.currentType && ascalechordIndex > bscalechordIndex;
};

const buildFavouriteList = (items, props) => {
    const sortedItems = sortByKey(items);
    const currentSubType = props.currentType === 'Scale' ? props.currentSubType.Scale : props.currentSubType.Chord;
    return sortedItems.map(item =>
        <Favourite
            key={generateKey(item.currentKey.concat(item.currentType, item.currentSubType))}
            currentType={item.currentType}
            currentSubType={item.currentSubType}
            currentKey={item.currentKey}
            delete={props.onDelete}
            clicked={props.selectFavourite}
            active={item.currentKey === props.currentKey && item.currentType === props.currentType && item.currentSubType === currentSubType}
            orderBy={props.orderBy} />
    );
};

export default favourites;