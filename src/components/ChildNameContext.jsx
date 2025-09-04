import React, { createContext, useState, useEffect } from "react";

export const ChildNameContext = createContext();

export const ChildNameProvider = ({ children }) => {
  const [childName, setChildName] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("childName");
    if (storedName) {
      setChildName(storedName);
    }
  }, []);

  // Save to localStorage when name changes
  useEffect(() => {
    if (childName) {
      localStorage.setItem("childName", childName);
    }
  }, [childName]);

  return (
    <ChildNameContext.Provider value={{ childName, setChildName }}>
      {children}
    </ChildNameContext.Provider>
  );
};
