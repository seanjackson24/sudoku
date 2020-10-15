import { removePossibility } from "./removePossibility";
import { SudokuPossibility } from "./Types";

export const tidyPossibilities = (possibilities: SudokuPossibility[]) => {
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
