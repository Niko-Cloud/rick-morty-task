import { useState, useEffect } from "react";

const removeFromLocalStorage = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};

const usePersistedState = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : Array.isArray(initialValue) ? initialValue : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return Array.isArray(initialValue) ? initialValue : [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, state]);

  const resetState = () => {
    setState([]);
    removeFromLocalStorage(key);
  };

  return [state, setState, resetState];
};

export default usePersistedState;
