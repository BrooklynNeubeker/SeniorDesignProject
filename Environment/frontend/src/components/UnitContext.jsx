import { createContext, useContext, useState } from "react";

// Create the context
const UnitContext = createContext();

// Provider component
export function UnitProvider({ children }) {
  const [imperial, setImperial] = useState(true);

  return (
    <UnitContext.Provider value={{ imperial, setImperial }}>
      {children}
    </UnitContext.Provider>
  );
}

// Custom hook (makes consuming it easy)
export function useUnit() {
  return useContext(UnitContext);
}