import { useState } from "react";
import { useGlobal } from "./GlobalContext";

export function useUndoRedo() {
    const { savedState, setSavedState, undoStack, setUndoStack, redoStack, setRedoStack} = useGlobal();

    const store = (savedState) => {
        if (undoStack.length == 0) {
            setUndoStack([savedState]);
        }
        else {
            setUndoStack([...undoStack, savedState]);
        }
        setRedoStack([]);
    };

    const undo = () => {
        if(undoStack.length > 1){
            const last = undoStack[undoStack.length - 1];
            const desired = undoStack[undoStack.length - 2];
            console.log("last: ", last);
            console.log("desired: ", desired);
            console.log("-----------");
            setUndoStack(undoStack.slice(0, undoStack.length - 1));
            setRedoStack([...redoStack, last]);
            //setSavedState(desired)
            return desired;
        }
        return false;
    };

    const redo = () => {
        if(redoStack.length > 0){
            const last = redoStack[redoStack.length - 1];
            //console.log("last: ", last);
            setUndoStack([...undoStack, last]);
            setRedoStack(redoStack.slice(0, redoStack.length - 1));
            //setSavedState(last);
            return last;
        }
        return false;
    };

    return { undo, redo, store };
}