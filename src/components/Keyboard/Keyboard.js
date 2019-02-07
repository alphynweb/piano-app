import React, { Component } from 'react';

import { connect } from 'react-redux';

// Navigation Items
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

// Piano Key
import PianoKey from '../PianoKey/PianoKey';

// User Details
import UserDetails from '../Auth/UserDetails/UserDetails';

// Sounds 
import Sounds from '../../components/Audio/Audio';

import { generateKey } from '../../shared/utilities';

import { keyboardSetup } from '../../../src/keyboardSetup';

// Styles
import styles from '../../stylesheets/app.scss';

class Keyboard extends Component {

    state = {
        blackKeys: [],
        whiteKeys: []
    };

    componentWillMount() {
        this.setUpKeys(this.props);
    };

    componentWillReceiveProps(nextProps) {
        this.setUpKeys(nextProps);
    };

    setUpKeys = (propsInfo) => {
        keyboardSetup.forEach(k => k.isActive = false); // Reset keyboard info
        const baseNoteIndex = propsInfo.baseNoteIndex; // Index of base note in pianoKeyInfo
        let currentIndex = baseNoteIndex;
        const semitonesUp = propsInfo.semitonesUp;

        semitonesUp.forEach(interval => {
            // Alter isActive property of note
            keyboardSetup[currentIndex].isActive = true;

            // Go up by required interval (semitones)
            currentIndex += interval;

            // Check whether end of pianoInfo notes have been reached and cycle round if they have
            if (currentIndex > keyboardSetup.length - 1) {
                currentIndex -= keyboardSetup.length;
            };
        });

        const blackKeyInfo = keyboardSetup.filter(k => k.isBlack);
        ``
        const whiteKeyInfo = keyboardSetup.filter(k => !k.isBlack);

        // Tester with two octaves - Put this in to component state
        const blackKeys = [];
        const whiteKeys = [];
        const noOctaves = propsInfo.octaves + 1;

        for (let oct = 0; oct < noOctaves + 1; oct++) {
            const currentIsPlayingIndex = propsInfo.currentIsPlayingIndex;
           
            // Only add active if note is above base note in bottom octave and above base note in top octave
            whiteKeyInfo.map(k => {
                // Establish index of note in pianoKeyInfo
                const noteIndex = keyboardSetup.findIndex(note => note.name === k.name);
                let noteIsActive = k.isActive;
                const isPlaying = noteIndex + (oct * 12) === currentIsPlayingIndex && propsInfo.isPlaying; // Is audio currently playing

                // Don't show active notes out of the range of one octave of active notes displayed
                if ((oct === 0 && noteIndex < baseNoteIndex) || (oct === noOctaves - 1 && noteIndex > baseNoteIndex)) {
                    noteIsActive = false;
                };

                if (oct < noOctaves) {
                    return whiteKeys.push(
                        <PianoKey
                            key={generateKey(k.name.concat(oct))}
                            note={k.name}
                            isBlack={false}
                            isActive={noteIsActive}
                            isPlaying={isPlaying}
                            octave={oct}
                            noOctaves={noOctaves} />);
                } else {
                    // Add the final C on top
                    if (noteIndex === 0) {
                        return whiteKeys.push(
                            <PianoKey
                                key={generateKey(k.name.concat(oct))}
                                note={k.name}
                                isBlack={false}
                                isActive={false}
                                isPlaying={isPlaying}
                                octave={oct}
                                noOctaves={noOctaves} />);
                    };
                };

            });
        };

        for (let oct = 0; oct < noOctaves; oct++) {
            const currentIsPlayingIndex = propsInfo.currentIsPlayingIndex;
            blackKeyInfo.map(k => {
                const noteIndex = keyboardSetup.findIndex(note => note.name === k.name); // Find note index on keyboard setup info (between 0 and 11)
                let noteIsActive = k.isActive;

                // Work out which octave note to highlight.
                const isPlaying = noteIndex + (oct * 12) === currentIsPlayingIndex && propsInfo.isPlaying; // Is audio currently playing

                // If noteIndex is below baseNoteIndex at the bottom or above baseNoteIndex at the top then don't show as active
                if ((oct === 0 && noteIndex < baseNoteIndex) || (oct === noOctaves - 1 && noteIndex > baseNoteIndex)) {
                    noteIsActive = false;
                }

                return blackKeys.push(
                    <PianoKey
                        key={generateKey(k.name.concat(oct))}
                        note={k.name}
                        isBlack={true}
                        isActive={noteIsActive}
                        isPlaying={isPlaying}
                        octave={oct}
                        firstInGroup={k.firstInGroup}
                        lastInGroup={k.lastInGroup}
                        noOctaves={noOctaves} />
                )
            });
        };

        this.setState({
            blackKeys: blackKeys,
            whiteKeys: whiteKeys
        });
    };

    render() {
        return (
            <div className={styles.piano}>
                <div class={styles.topBar}>
                    <NavigationItems
                        currentKey={this.props.currentKey}
                        currentType={this.props.currentType}
                        currentSubType={this.props.currentSubType}
                        itemClicked={this.props.navigationItemClicked}
                        isLoggedIn={this.props.isLoggedIn}
                        favourites={this.props.favourites} />

                    <Sounds
                        currentKey={this.props.currentKey}
                        currentType={this.props.currentType}
                        currentSubType={this.props.currentType === 'Scale' ? this.props.currentSubType.Scale : this.props.currentSubType.Chord} />

                    <UserDetails />
                </div>

                <div className={styles.felt}></div>

                <div className={styles.innerSection}>
                    <div className={styles.innerLeft}></div>
                    <div className={styles.keyboard}>
                        <div className={styles.whiteKeySection}>{this.state.whiteKeys}</div>
                        <div className={styles.blackKeySection}>{this.state.blackKeys}</div>
                    </div>
                    <div className={styles.innerRight}></div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        // Notes
        baseNote: state.notes.baseNote,
        baseNoteIndex: state.notes.baseNoteIndex,
        currentIsPlayingIndex: state.notes.currentIsPlayingIndex,
        currentKey: state.notes.currentKey,
        currentType: state.notes.currentType,
        currentSubType: state.notes.currentSubType,
        isPlaying: state.notes.isPlaying,
        octaves: state.notes.octaves,
        semitonesUp: state.notes.semitonesUp,
        semitonesUpDown: state.notes.semitonesUpDown
    };
};

export default connect(mapStateToProps)(Keyboard);