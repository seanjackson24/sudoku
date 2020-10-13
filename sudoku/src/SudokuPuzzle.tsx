import React, { useEffect, useState } from "react";
import { solver, SudokuPossibility } from "./solver";
interface SudokuPuzzleProps {
    puzzle: SudokuOption[];
}
export const SudokuPuzzle: React.FC<SudokuPuzzleProps> = (props) => {
    const { puzzle } = props;
    const [possibilities, setPossibilities] = useState<SudokuPossibility[]>([]);

    useEffect(() => setPossibilities(solver(puzzle)), [puzzle]);

    let wholePuzzle: JSX.Element[] = [];
    for (let row = 0; row < 9; row++) {
        const possibilitiesForRow = possibilities.filter(
            (val, index) => Math.floor(index / 9) === row
        );
        wholePuzzle[row] = (
            <PuzzleRow
                startIndex={row * 9}
                puzzle={puzzle}
                possibilities={possibilitiesForRow}
            />
        );
    }

    return <div className="puzzle">{wholePuzzle}</div>;
};
export type SudokuOption = number | null;
interface Row {
    startIndex: number;
    puzzle: SudokuOption[];
    possibilities: SudokuPossibility[];
}
const PuzzleRow: React.FC<Row> = (row) => {
    const { startIndex, puzzle, possibilities } = row;
    let items: JSX.Element[] = [];
    for (let col = 0; col < 9; col++) {
        const possibilitiesForItem = possibilities[col];
        items[col] = (
            <PuzzleItem
                item={puzzle[startIndex + col]}
                possibilities={possibilitiesForItem}
            />
        );
    }
    return <>{items}</>;
};

interface ItemOption {
    item: SudokuOption;
    possibilities: SudokuPossibility;
}
const PuzzleItem: React.FC<ItemOption> = (props) => {
    const { item, possibilities } = props;
    const className = item === null ? "" : "given";
    return (
        <div className={`item ${className}`}>
            <div className="item-inner">
                <Possibilities possibilities={possibilities} />
                {item === null ? <input type="text" /> : <label>{item}</label>}
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
