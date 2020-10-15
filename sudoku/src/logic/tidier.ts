import { removePossibility } from "./removePossibility";
import { SudokuPossibility } from "./Types";

export const tidyPossibilities = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    for (let i = 0; i < possibilities.length; i++) {
        if (typeof possibilities[i] === "number") {
            continue;
        }
        const cells: SudokuPossibility[] = [];
        const set = getRowCells(i, possibilities)
            .concat(getColumnCells(i, possibilities))
            .concat(getSquareCells(i, possibilities));
        cells.push(...set);

        for (let c = 0; c < cells.length; c++) {
            const placedOption = cells[c];
            changed = tidy(i, placedOption, possibilities) || changed;
        }
    }
    return changed;
};

const tidy = (
    index: number,
    placedOption: SudokuPossibility,
    possibilities: SudokuPossibility[]
) => {
    if (typeof placedOption === "number") {
        return removePossibility(possibilities, placedOption, index);
    }
    return false;
};

export const getRowCells = (
    index: number,
    possibilities: SudokuPossibility[]
) => {
    const cells: SudokuPossibility[] = [];
    const rowNumber = Math.floor(index / 9);
    for (let i = 0; i < 9; i++) {
        if (i === index % 9) {
            continue;
        }
        const placedOption = possibilities[rowNumber * 9 + i];
        cells.push(placedOption);
    }
    return cells;
};

export const getColumnCells = (
    index: number,
    possibilities: SudokuPossibility[]
) => {
    const cells: SudokuPossibility[] = [];

    const columnNumber = index % 9;
    for (let i = 0; i < 9; i++) {
        if (i === Math.floor(index / 9)) {
            continue;
        }
        const placedOption = possibilities[i * 9 + columnNumber];
        cells.push(placedOption);
    }
    return cells;
};

export const getSquareCells = (
    index: number,
    possibilities: SudokuPossibility[]
) => {
    const cells: SudokuPossibility[] = [];

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
            cells.push(placedOption);
        }
    }
    return cells;
};
