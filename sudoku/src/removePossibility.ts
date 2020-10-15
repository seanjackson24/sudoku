import { SudokuPossibility } from "./Types";

export const removePossibility = (
    possibilities: SudokuPossibility[],
    placedOption: number,
    index: number
) => {
    if (
        typeof possibilities[index] === "number" &&
        possibilities[index] !== placedOption
    ) {
        return false;
    }
    const poss = possibilities[index] as number[];

    if (typeof poss === "number") {
        debugger;
    }
    const newPossibilities = poss.filter((x) => x !== placedOption);
    possibilities[index] =
        newPossibilities.length === 1 ? newPossibilities[0] : newPossibilities;
    return (
        newPossibilities.length === 1 || poss.length !== newPossibilities.length
    );
};
