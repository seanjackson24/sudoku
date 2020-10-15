import { useEffect, useState } from "react";

export const useAltKeyPress = (targetKey: string, callback: () => void) => {
    const [keyPressed, setKeyPressed] = useState(false);

    function downHandler(event: KeyboardEvent) {
        const { key, altKey } = event;
        if (key === targetKey && altKey) {
            // setKeyPressed(true);
            callback();
        }
    }

    const upHandler = (event: KeyboardEvent) => {
        const { key, altKey } = event;
        if (key === targetKey) {
            // setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    }, [callback]); // Empty array ensures that effect is only run on mount and unmount

    return keyPressed;
};
