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
const loopPlaceMustBes = (possibilities: SudokuPossibility[]) => {
    let changed = false;
    for (let index = 0; index < possibilities.length; index++) {
        // if (index === 63) debugger;
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
