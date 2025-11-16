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
  const [editing, setEditing] = useState(true);
  const [eventID, setEventID] = useState(null);
  const [mini, setMini] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  return (
    <GlobalContext.Provider value={{ imperial, setImperial, location, setLocation, zoom, setZoom, editing, setEditing, eventID, setEventID, mini, setMini, showGrid, setShowGrid }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}