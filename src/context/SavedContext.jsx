// src/context/SavedContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { load, save } from "../utils/storage";

const SavedContext = createContext();
export const useSaved = () => useContext(SavedContext);

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState(() => load("savedJobs", []));

  useEffect(() => {
    save("savedJobs", saved);
  }, [saved]);

  const isSaved = (jobId) => saved.some((j) => j.id === jobId);

  const toggleSave = (job) => {
    setSaved((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      if (exists) return prev.filter((j) => j.id !== job.id);
      return [...prev, job];
    });
  };

  const clearAll = () => setSaved([]);

  return (
    <SavedContext.Provider value={{ saved, toggleSave, isSaved, clearAll }}>
      {children}
    </SavedContext.Provider>
  );
}