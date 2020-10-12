import { SudokuOption } from "./SudokuPuzzle";

const getDefaultPossibilities = () => {
    const oneToNine = Array.from({ length: 9 }, (_, i) => i + 1);
    return [...Array(81)].map((val, indx) => oneToNine);
};

export type SudokuPossibility = number[] | number;
export const solver = (puzzle: SudokuOption[]) => {
    const possibilities: SudokuPossibility[] = getDefaultPossibilities();

    for (let i = 0; i < puzzle.length; i++) {
        const item = puzzle[i];
        if (item !== null) {
            possibilities[i] = item;
        }
    }

    return trySolve(possibilities);
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
            const poss = possibilities[index] as number[];
            const newPossibilities = poss.filter((x) => x !== placedOption);
            possibilities[index] =
                newPossibilities.length === 1
                    ? newPossibilities[0]
                    : newPossibilities;
            changed =
                newPossibilities.length === 1 ||
                poss.length !== newPossibilities.length;
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
            const poss = possibilities[index] as number[];

            const newPossibilities = poss.filter((x) => x !== placedOption);
            possibilities[index] =
                newPossibilities.length === 1
                    ? newPossibilities[0]
                    : newPossibilities;
            changed =
                newPossibilities.length === 1 ||
                poss.length !== newPossibilities.length;
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
                const poss = possibilities[index] as number[];

                const newPossibilities = poss.filter((x) => x !== placedOption);
                possibilities[index] =
                    newPossibilities.length === 1
                        ? newPossibilities[0]
                        : newPossibilities;
                changed =
                    newPossibilities.length === 1 ||
                    poss.length !== newPossibilities.length;
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
const trySolve = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    do {
        changed = tidyPossibilities(possibilities);
        console.log(changed);
        console.log(possibilities);
    } while (changed);
    return possibilities;
};
