import { Attempt, SudokuPossibility } from "./Types";

export const rowValid = (
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
            continue; // TODO: check if the placedOption minus anything used so far is empty set (forward checking)
        }
        if (thisRow.includes(placedOption)) {
            return false;
        }
        thisRow.push(placedOption);
    }
    return true;
};
export const columnValid = (
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
export const squareValid = (
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
