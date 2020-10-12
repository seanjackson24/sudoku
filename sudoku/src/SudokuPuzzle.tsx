import React from "react";
interface SudokuPuzzleProps {
    puzzle: SudokuOption[];
}
export const SudokuPuzzle: React.FC<SudokuPuzzleProps> = (props) => {
    const { puzzle } = props;
    let wholePuzzle: JSX.Element[] = [];
    for (let row = 0; row < 9; row++) {
        wholePuzzle[row] = <PuzzleRow startIndex={row * 9} puzzle={puzzle} />;
    }

    return <div className="puzzle">{wholePuzzle}</div>;
};
export type SudokuOption = number | null;
interface Row {
    startIndex: number;
    puzzle: SudokuOption[];
}
const PuzzleRow: React.FC<Row> = (row) => {
    const { startIndex, puzzle } = row;
    let items: JSX.Element[] = [];
    for (let col = 0; col < 9; col++) {
        items[col] = <PuzzleItem item={puzzle[startIndex + col]} />;
    }
    return <>{items}</>;
};

interface ItemOption {
    item: SudokuOption;
}
const PuzzleItem: React.FC<ItemOption> = (props) => {
    const { item } = props;
    return (
        <div className="item">
            <div className="item-inner">
                {item === null ? <input type="text" /> : <label>{item}</label>}
            </div>
        </div>
    );
};
