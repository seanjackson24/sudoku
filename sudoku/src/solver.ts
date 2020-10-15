import { tidyPossibilities } from "./tidier";
import { Attempt, SudokuOption, SudokuPossibility } from "./Types";
import { columnValid, rowValid, squareValid } from "./validator";

const getDefaultPossibilities = () => {
    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);
    return [...Array(81)].map(() => oneToNine);
};

export const finder = (puzzle: SudokuOption[]) => {
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
        // changed = placeMustBes(possibilities) || changed;
        console.log(changed);
        console.log(possibilities);
    } while (changed);
    return possibilities;
};

export const solver: (
    p: SudokuPossibility[],
    a?: Attempt[],
    i?: number
) => boolean = (
    possibilities: SudokuPossibility[],
    attempts: Attempt[] = [],
    index: number = 0
) => {
    console.log(index);
    if (index === 81) {
        return true;
    }
    const item = possibilities[index];
    if (typeof item === "number") {
        attempts[index] = null;
        return solver(possibilities, attempts, index + 1);
    }
    for (let j = 0; j < item.length; j++) {
        const attempt = item[j];
        attempts[index] = attempt;

        if (
            rowValid(attempts, possibilities, index) &&
            columnValid(attempts, possibilities, index) &&
            squareValid(attempts, possibilities, index)
        ) {
            if (solver(possibilities, attempts, index + 1)) {
                return true;
            }
        }
    }
    attempts[index] = null;
    return false;
};
