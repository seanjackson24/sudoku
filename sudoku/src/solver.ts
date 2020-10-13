import { SudokuOption } from "./SudokuPuzzle";

const getDefaultPossibilities = () => {
    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);
    return [...Array(81)].map((val, indx) => oneToNine);
};

export type SudokuPossibility = number[] | number;
export const finder = (puzzle: SudokuOption[]) => {
    const possibilities: SudokuPossibility[] = getDefaultPossibilities();

    for (let i = 0; i < puzzle.length; i++) {
        const item = puzzle[i];
        if (item !== null) {
            possibilities[i] = item;
        }
    }

    return getPossibilities(possibilities);
};

const tidyRow = (index: number, possibilities: SudokuPossibility[]) => {
    let changed = false;

    const rowNumber = Math.floor(index / 9);
    for (let i = 0; i < 9; i++) {
        if (i === index % 9) {
            continue;
        }
        const placedOption = possibilities[rowNumber * 9 + i];
        if (typeof placedOption === "number") {
            changed = removePossibility(possibilities, placedOption, index);
        }
    }
    return changed;
};

const tidyColumn = (index: number, possibilities: SudokuPossibility[]) => {
    let changed = false;

    const columnNumber = index % 9;
    for (let i = 0; i < 9; i++) {
        if (i === Math.floor(index / 9)) {
            continue;
        }
        const placedOption = possibilities[i * 9 + columnNumber];
        if (typeof placedOption === "number") {
            changed = removePossibility(possibilities, placedOption, index);
        }
    }
    return changed;
};

const tidySquare = (index: number, possibilities: SudokuPossibility[]) => {
    let changed = false;
    const rowNumber = Math.floor(index / 9);
    const columnNumber = index % 9;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (rowNumber % 3 === i && columnNumber % 3 === j) {
                continue;
            }
            const r = rowNumber - (rowNumber % 3) + i;
            const c = columnNumber - (columnNumber % 3) + j;
            const placedOption = possibilities[r * 9 + c];
            if (typeof placedOption === "number") {
                changed = removePossibility(possibilities, placedOption, index);
            }
        }
    }

    return changed;
};
const removePossibility = (
    possibilities: SudokuPossibility[],
    placedOption: number,
    index: number
) => {
    const poss = possibilities[index] as number[];

    const newPossibilities = poss.filter((x) => x !== placedOption);
    possibilities[index] =
        newPossibilities.length === 1 ? newPossibilities[0] : newPossibilities;
    return (
        newPossibilities.length === 1 || poss.length !== newPossibilities.length
    );
};

const placeMustBes = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    for (let index = 0; index < possibilities.length; index++) {
        for (let num = 1; num <= 9; num++) {
            const item = possibilities[index];

            if (typeof item === "number" || !item.includes(num)) {
                continue;
            }
            const rowNumber = Math.floor(index / 9);
            const columnNumber = index % 9;
            let count = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const r = rowNumber - (rowNumber % 3) + i;
                    const c = columnNumber - (columnNumber % 3) + j;
                    const p = possibilities[r * 9 + c];
                    if (typeof p !== "number") {
                        if (p.includes(num)) {
                            count++;
                        }
                    }
                }
            }
            if (count === 1) {
                possibilities[index] = num;
                changed = true;
            }
        }
    }
    return changed;
};

const tidyPossibilities = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    for (let i = 0; i < possibilities.length; i++) {
        if (typeof possibilities[i] === "number") {
            continue;
        }
        changed = tidyRow(i, possibilities) || changed;
        changed = tidyColumn(i, possibilities) || changed;
        changed = tidySquare(i, possibilities) || changed;
    }
    return changed;
};
const getPossibilities = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    do {
        changed = tidyPossibilities(possibilities);
        changed = placeMustBes(possibilities) || changed;
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

type Attempt = number | null;
const rowValid = (
    attempts: Attempt[],
    possibilities: SudokuPossibility[],
    index: number
) => {
    const thisRow: number[] = [];
    const rowNumber = Math.floor(index / 9);
    for (let i = 0; i < 9; i++) {
        const placedOption =
            attempts[rowNumber * 9 + i] ?? possibilities[rowNumber * 9 + i];
        if (typeof placedOption !== "number") {
            continue;
        }
        if (thisRow.includes(placedOption)) {
            return false;
        }
        thisRow.push(placedOption);
    }
    return true;
};
const columnValid = (
    attempts: Attempt[],
    possibilities: SudokuPossibility[],
    index: number
) => {
    const thisColumn: number[] = [];
    const columnNumber = index % 9;
    for (let i = 0; i < 9; i++) {
        const placedOption =
            attempts[i * 9 + columnNumber] ??
            possibilities[i * 9 + columnNumber];
        if (typeof placedOption !== "number") {
            continue;
        }
        if (thisColumn.includes(placedOption)) {
            return false;
        }
        thisColumn.push(placedOption);
    }
    return true;
};
const squareValid = (
    attempts: Attempt[],
    possibilities: SudokuPossibility[],
    index: number
) => {
    const thisSquare: number[] = [];
    const rowNumber = Math.floor(index / 9);
    const columnNumber = index % 9;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const r = rowNumber - (rowNumber % 3) + i;
            const c = columnNumber - (columnNumber % 3) + j;
            const placedOption =
                attempts[r * 9 + c] ?? possibilities[r * 9 + c];
            if (typeof placedOption !== "number") {
                continue;
            }
            if (thisSquare.includes(placedOption)) {
                return false;
            }
            thisSquare.push(placedOption);
        }
    }
    return true;
};
