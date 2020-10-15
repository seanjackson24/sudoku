import React from "react";
import "./App.css";
import { SudokuPuzzle } from "./SudokuPuzzle";
import { SudokuOption } from "./Types";

function App() {
    const puzzle: SudokuOption[] = [
        null,
        9,
        null,
        7,
        null,
        5,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        2,
        null,
        null,
        null,
        null,
        8,
        5,
        7,
        null,
        null,
        null,
        null,
        null,
        null,
        3,
        null,
        9,
        1,
        null,
        null,
        8,
        null,
        null,
        null,
        7,
        null,
        6,
        null,
        8,
        null,
        9,
        null,
        null,
        null,
        5,
        null,
        null,
        9,
        7,
        null,
        1,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        1,
        4,
        null,
        null,
        null,
        null,
        8,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        null,
        3,
        null,
        6,
        null,
    ];

    // const puzzle: SudokuOption[] = [
    //     7,
    //     null,
    //     null,
    //     3,
    //     null,
    //     6,
    //     null,
    //     null,
    //     1,
    //     5,
    //     null,
    //     6,
    //     7,
    //     null,
    //     null,
    //     null,
    //     null,
    //     9,
    //     4,
    //     null,
    //     null,
    //     null,
    //     5,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     4,
    //     null,
    //     null,
    //     null,
    //     7,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     5,
    //     null,
    //     2,
    //     null,
    //     7,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     9,
    //     null,
    //     null,
    //     null,
    //     8,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     7,
    //     null,
    //     null,
    //     null,
    //     3,
    //     2,
    //     null,
    //     null,
    //     null,
    //     null,
    //     1,
    //     8,
    //     null,
    //     4,
    //     9,
    //     null,
    //     null,
    //     2,
    //     null,
    //     5,
    //     null,
    //     null,
    //     7,
    // ];

    // const puzzle: SudokuOption[] = [
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     3,
    //     null,
    //     8,
    //     5,
    //     null,
    //     null,
    //     1,
    //     null,
    //     2,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     5,
    //     null,
    //     7,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     4,
    //     null,
    //     null,
    //     null,
    //     1,
    //     null,
    //     null,
    //     null,
    //     9,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     5,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     7,
    //     3,
    //     null,
    //     null,
    //     2,
    //     null,
    //     1,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     null,
    //     4,
    //     null,
    //     null,
    //     null,
    //     9,
    // ];

    return (
        <div className="App">
            <SudokuPuzzle puzzle={puzzle} />
        </div>
    );
}

export default App;
