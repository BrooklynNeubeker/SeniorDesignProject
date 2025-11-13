import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [imperial, setImperial] = useState(true);
  const [location, setLocation] = useState({
      lat: 36.110013,
      lng: -115.140546,
      label: "",
    });
  const [zoom, setZoom] = useState(19);

  const [savedState, setSavedState] = useState("");
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  return (
    <GlobalContext.Provider value={{ imperial, setImperial, location, setLocation, zoom, setZoom, 
      savedState, setSavedState, undoStack, setUndoStack, redoStack, setRedoStack }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}