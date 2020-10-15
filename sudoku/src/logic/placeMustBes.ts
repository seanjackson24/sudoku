import { getRowCells, getColumnCells, getSquareCells } from "./tidier";
import { SudokuPossibility } from "./Types";

export const placeMustBes = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    do {
        changed = loopPlaceMustBes(possibilities);
        console.log(changed);
        console.log(possibilities);
    } while (changed);
    return possibilities;
};
export const loopPlaceMustBes = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    for (let index = 0; index < possibilities.length; index++) {
        const item = possibilities[index];
        if (typeof item === "number") continue;

        const rowCells = getRowCells(index, possibilities);
        const columnCells = getColumnCells(index, possibilities);
        const squareCells = getSquareCells(index, possibilities);

        for (let num = 1; num <= 9; num++) {
            if (!item.includes(num)) {
                continue;
            }
            console.log(`solving index ${index} for num ${num}`);
            [rowCells, columnCells, squareCells].map((grp) => {
                const cnt = grp.filter(
                    (x) =>
                        (typeof x === "number" && x === num) ||
                        (typeof x !== "number" && x.includes(num))
                ).length;
                if (cnt === 0) {
                    console.log(`must be ${num}`);
                    possibilities[index] = num;
                    changed = true;
                }
            });
        }
    }
    return changed;
};
