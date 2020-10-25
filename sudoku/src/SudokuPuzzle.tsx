import React, { useCallback, useEffect, useState } from "react";
import {
    placeDefaultPossibilities,
    getFilteredPossibilities,
} from "./logic/getFilteredPossibilities";
import { bruteForceSolver } from "./logic/solver";
import { SudokuOption, SudokuPossibility } from "./logic/Types";
import { useAltKeyPress } from "./useKeyPress";
interface SudokuPuzzleProps {
    puzzle: SudokuOption[];
}
export const SudokuPuzzle: React.FC<SudokuPuzzleProps> = (props) => {
    const { puzzle } = props;
    const [possibilities, setPossibilities] = useState<SudokuPossibility[]>([]);
    const [solved, setSolved] = useState<SudokuOption[]>([]);

    useEffect(() => setPossibilities(placeDefaultPossibilities(puzzle)), [
        puzzle,
    ]);

    useAltKeyPress(
        "c",
        useCallback(() => {
            const p = getFilteredPossibilities(possibilities);
            setPossibilities([...p]);
        }, [puzzle, possibilities])
    );

    useAltKeyPress(
        "s",
        useCallback(() => {
            const attempts: SudokuOption[] = [];
            let indx = possibilities.findIndex(
                (p) => typeof p !== "number" && p.length == 2
            );
            indx = indx === -1 ? 0 : indx;
            // fail fast (variable selection)
            const getNextIndex = (index: number): number => (index + 1) % 81;
            const currentIndex = 0;
            // const currentIndex = lengths.find((pi) => pi.p > 1)?.i;
            // const getNextIndex = (index: number): number =>
            // lengths.find((pi) => pi.i > index)?.i ?? 0;

            const d = new Date();
            const result = bruteForceSolver(
                possibilities,
                attempts,
                getNextIndex,
                currentIndex
            );
            const end = new Date();
            console.log(end.getTime() - d.getTime());
            console.log(result);
            if (result) {
                setSolved(attempts);
            }
        }, [puzzle, possibilities])
    );

    let wholePuzzle: JSX.Element[] = [];
    for (let row = 0; row < 9; row++) {
        const possibilitiesForRow = possibilities.filter(
            (val, index) => Math.floor(index / 9) === row
        );
        const solvedForRow = solved.filter(
            (val, index) => Math.floor(index / 9) === row
        );
        wholePuzzle[row] = (
            <PuzzleRow
                key={"row_" + row}
                startIndex={row * 9}
                puzzle={puzzle}
                possibilities={possibilitiesForRow}
                solved={solvedForRow}
            />
        );
    }

    return <div className="puzzle">{wholePuzzle}</div>;
};
interface Row {
    startIndex: number;
    puzzle: SudokuOption[];
    possibilities: SudokuPossibility[];
    solved: SudokuOption[];
}
const PuzzleRow: React.FC<Row> = (row) => {
    const { startIndex, puzzle, possibilities, solved } = row;
    let items: JSX.Element[] = [];
    for (let col = 0; col < 9; col++) {
        const possibilitiesForItem = possibilities[col];
        const solvedForItem = solved[col];
        items[col] = (
            <PuzzleItem
                key={startIndex + col}
                item={puzzle[startIndex + col]}
                possibilities={possibilitiesForItem}
                solved={solvedForItem}
            />
        );
    }
    return <>{items}</>;
};

interface ItemOption {
    item: SudokuOption;
    possibilities: SudokuPossibility;
    solved: SudokuOption;
}
const PuzzleItem: React.FC<ItemOption> = (props) => {
    const { item, possibilities, solved } = props;
    let className = "";

    // todo: tidy
    let r: JSX.Element = <></>;
    if (item !== null) {
        className = "given";
        r = <label>{item}</label>;
    } else {
        if (solved !== undefined) {
            className = "solved";
            r = <label>{solved}</label>;
        } else {
            r = <input type="text" />;
        }
    }

    return (
        <div className={`item ${className}`}>
            <div className="item-inner">
                <Possibilities possibilities={possibilities} />
                {r}
            </div>
        </div>
    );
};

const Possibilities: React.FC<{ possibilities: SudokuPossibility }> = (
    props
) => {
    let { possibilities } = props;
    let className = "";
    if (typeof possibilities === "number") {
        possibilities = [possibilities];
        className = "single";
    }
    return <span className={`possibility ${className}`}>{possibilities}</span>;
};
