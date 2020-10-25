import { Attempt, SudokuPossibility } from "./Types";
import { columnValid, rowValid, squareValid } from "./validator";

export const bruteForceSolver: (
    p: SudokuPossibility[],
    a: Attempt[],
    getNextIndex: (current: number) => number,
    i?: number
) => boolean = (
    possibilities: SudokuPossibility[],
    attempts: Attempt[] = [],
    getNextIndex: (current: number) => number,
    index: number = 0
) => {
    console.log(index);
    if (Object.keys(attempts).length === 81) {
        return true;
    }
    const item = possibilities[index];
    if (typeof item === "number") {
        attempts[index] = null;
        return bruteForceSolver(
            possibilities,
            attempts,
            getNextIndex,
            getNextIndex(index)
        );
    }
    for (let j = 0; j < item.length; j++) {
        const attempt = item[j];
        attempts[index] = attempt;

        if (
            rowValid(attempts, possibilities, index) &&
            columnValid(attempts, possibilities, index) &&
            squareValid(attempts, possibilities, index)
        ) {
            if (
                bruteForceSolver(
                    possibilities,
                    attempts,
                    getNextIndex,
                    getNextIndex(index)
                )
            ) {
                return true;
            }
        }
    }
    attempts[index] = null;
    return false;
};
