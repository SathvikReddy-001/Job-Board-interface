// src/context/ApplicationContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { load, save } from "../utils/storage";

const ApplicationContext = createContext();
export const useApplications = () => useContext(ApplicationContext);

/**
 * applications: [{ jobId: '1', status: 'Applied', date: '2025-11-18T12:00:00Z' }, ...]
 */
export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useState(() => load("applications", []));

  useEffect(() => {
    save("applications", applications);
  }, [applications]);

  const setStatus = (jobId, status) => {
    setApplications(prev => {
      const exists = prev.find(a => a.jobId === jobId);
      const record = { jobId, status, date: new Date().toISOString() };
      if (exists) {
        return prev.map(a => (a.jobId === jobId ? record : a));
      }
      return [...prev, record];
    });
  };

  const getStatus = (jobId) => {
    const rec = applications.find(a => a.jobId === jobId);
    return rec ? rec : null;
  };

  const clearStatus = (jobId) => {
    setApplications(prev => prev.filter(a => a.jobId !== jobId));
  };

  return (
    <ApplicationContext.Provider value={{ applications, setStatus, getStatus, clearStatus }}>
      {children}
    </ApplicationContext.Provider>
  );
}