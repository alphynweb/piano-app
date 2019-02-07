import React, { Component } from 'react';

import { connect } from 'react-redux';

import AudioControls from './AudioControls/AudioControls';

import Wrapper from '../../hoc/Wrapper/Wrapper';

import notes from '../../assets/Piano notes.mp3';

import { keyboardSetup } from '../../../src/keyboardSetup';

import * as actions from '../../store/actions/index';

import styles from '../../stylesheets/app.scss';

class Sounds extends Component {

    // Runs through semitone sequence to play scale/chord
    playNoteSequenceHandler = () => {
        this.stop();

        let currentIsPlayingIndex = this.props.baseNoteIndex;
        let currentNoteName = keyboardSetup[currentIsPlayingIndex].name;
        const semitonesUpDown = [...this.props.semitonesUpDown];
        const noteLength = 1;
        const audio = document.getElementById('audio');
        let startTime = currentIsPlayingIndex * 4;
        let count = 0; // Pointer for semitones array
        const stopTime = startTime + noteLength;

        audio.currentTime = startTime;
        audio.stopTime = stopTime;

        audio.play();
        this.props.onStartPlayback();
        this.props.onChangeCurrentNotePlaying(currentIsPlayingIndex, currentNoteName);

        const playNote = () => {
            if (!this.props.isPlaying) {
                audio.removeEventListener('timeupdate', playNote);
            };

            if (audio.currentTime >= audio.stopTime) {
                audio.pause();

                if (count < semitonesUpDown.length && this.props.isPlaying) {
                    currentIsPlayingIndex += semitonesUpDown[count];

                    startTime = currentIsPlayingIndex * 4;

                    audio.currentTime = startTime;

                    // Check for last note and play for full duration if positive
                    if (count === semitonesUpDown.length - 1) {
                        audio.stopTime = startTime + 3.5;
                    } else {
                        audio.stopTime = startTime + noteLength;
                    }

                    audio.play();

                    if (currentIsPlayingIndex < 12) {
                        currentNoteName = keyboardSetup[currentIsPlayingIndex].name;
                    } else {
                        currentNoteName = keyboardSetup[currentIsPlayingIndex - 12].name;
                    }
                    this.props.onChangeCurrentNotePlaying(currentIsPlayingIndex, currentNoteName);
                    count++;
                } else {
                    this.props.onStopPlayback();
                    audio.removeEventListener('timeupdate', playNote);
                }
            }
        }

        audio.addEventListener('timeupdate', playNote);
    };

    stop = () => {
        this.props.onStopPlayback();
        const audio = document.getElementById('audio');
        audio.removeEventListener('timeupdate', this.playNote);
        audio.pause();
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.currentKey !== nextProps.currentKey || this.props.currentType !== nextProps.currentType || this.props.currentSubType !== nextProps.currentSubType) {
            this.stop();
        }
    };

    stopSoundsHandler = () => {
        this.stop();
    };

    controlClickedHandler = (event) => {
        const parent = event.target.parentNode.nodeName;
        if (parent !== 'svg') {
            return;
        };
        const controlType = event.target.parentNode.dataset.controltype;

        switch (controlType) {
            case 'play':
                this.playNoteSequenceHandler();
                break;
            case 'stop':
                this.stop();
                break;
            default:

                break;
        }
    };

    render() {
        return (
            <Wrapper>
                <audio className={styles.audioPlayer} src={notes} autoplay controls id='audio' />

                <AudioControls
                    play={!this.props.isPlaying}
                    controlClicked={this.controlClickedHandler} />
            </Wrapper>
        );
    };
};

const mapStateToProps = state => {
    return {
        // Settings
        currentKey: state.notes.currentKey,
        currentType: state.notes.currentType,
        currentSubType: state.notes.currentSubType,
        // Notes
        baseNoteIndex: state.notes.baseNoteIndex,
        octaves: state.notes.octaves,
        isPlaying: state.notes.isPlaying,
        semitonesUp: state.notes.semitonesUp,
        semitonesUpDown: state.notes.semitonesUpDown
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // Notes
        onChangeCurrentNotePlaying: (noteIndex, noteName) => dispatch(actions.changeCurrentNotePlaying(noteIndex, noteName)),
        onStartPlayback: () => dispatch(actions.startPlayback()),
        onStopPlayback: () => dispatch(actions.stopPlayback())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sounds);