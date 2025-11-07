import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [imperial, setImperial] = useState(true);
  const [location, setLocation] = useState({
      lat: 36.110013,
      lng: -115.140546,
      label: "",
    });

  return (
    <GlobalContext.Provider value={{ imperial, setImperial, location, setLocation }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}