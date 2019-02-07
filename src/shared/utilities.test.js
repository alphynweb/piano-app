import { compareObjects } from './utilities';

describe('[compareObject]', () => {
    it('should evaluate objects as being equal', () => {
        const obj1 = {
            currentKey: 'C',
            currentType: 'Scale',
            currentSubType: {
                Scale: 'Harmonic',
                Chord: 'Diminished'
            },
            favourites: [
                {currentKey: "D#", currentSubType: "Diminished", currentType: "Chord"},
                {currentKey: "C#", currentSubType: "Natural Minor", currentType: "Scale"},
            ],
            favouritesOrderBy: 'key'
        };
        const obj2 = {
            currentKey: 'C',
            currentType: 'Scale',
            currentSubType: {
                Scale: 'Harmonic',
                Chord: 'Diminished'
            },
            favourites: [
                {currentKey: "D#", currentSubType: "Diminished", currentType: "Chord"},
                {currentKey: "C#", currentSubType: "Natural Minor", currentType: "Scale"},
            ],
            favouritesOrderBy: 'key'
        };

        expect(compareObjects(obj1, obj2)).toEqual(true);
    });

    it('should evaluate objects as being unequal', () => {
        const obj1 = {
            currentKey: 'C',
            currentType: 'Scale',
            currentSubType: {
                Scale: 'Harmonic',
                Chord: 'Dominant'
            },
            favourites: [
                {currentKey: "D#", currentSubType: "Diminished", currentType: "Chord"},
                {currentKey: "C#", currentSubType: "Natural Minor", currentType: "Scale"},
            ],
            favouritesOrderBy: 'key'
        };
        const obj2 = {
            currentKey: 'C',
            currentType: 'Chord',
            currentSubType: {
                Scale: 'Harmonic',
                Chord: 'Diminished'
            },
            favourites: [
                {currentKey: "E#", currentSubType: "Diminished", currentType: "Chord"},
                {currentKey: "C#", currentSubType: "Natural Minor", currentType: "Scale"},
            ],
            favouritesOrderBy: 'key'
        };

        expect(compareObjects(obj1, obj2)).toEqual(false);
    });
}); 