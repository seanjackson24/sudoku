import { Attempt, SudokuPossibility } from "./Types";
import { columnValid, rowValid, squareValid } from "./validator";

export const bruteForceSolver: (
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
        return bruteForceSolver(possibilities, attempts, index + 1);
    }
    for (let j = 0; j < item.length; j++) {
        const attempt = item[j];
        attempts[index] = attempt;

        if (
            rowValid(attempts, possibilities, index) &&
            columnValid(attempts, possibilities, index) &&
            squareValid(attempts, possibilities, index)
        ) {
            if (bruteForceSolver(possibilities, attempts, index + 1)) {
                return true;
            }
        }
    }
    attempts[index] = null;
    return false;
};
