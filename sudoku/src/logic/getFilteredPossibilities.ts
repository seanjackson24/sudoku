import { loopPlaceMustBes, placeMustBes } from "./placeMustBes";
import { tidyPossibilities } from "./tidier";
import { SudokuOption, SudokuPossibility } from "./Types";

const getDefaultPossibilities = () => {
    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);
    return [...Array(81)].map(() => oneToNine);
};

export const placeDefaultPossibilities = (puzzle: SudokuOption[]) => {
    const possibilities: SudokuPossibility[] = getDefaultPossibilities();

    for (let i = 0; i < puzzle.length; i++) {
        const item = puzzle[i];
        if (item !== null) {
            possibilities[i] = item;
        }
    }

    return possibilities;
};

export const getFilteredPossibilities = (
    possibilities: SudokuPossibility[]
) => {
    let changed = false;
    do {
        changed = tidyPossibilities(possibilities);
        changed = loopPlaceMustBes(possibilities) || changed;
        console.log(changed);
        console.log(possibilities);
    } while (changed);
    return possibilities;
};
