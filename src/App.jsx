import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import SavedJobs from "./pages/SavedJobs";
import Company from "./pages/Company";

export default function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <BrowserRouter>
      <header style={{ padding: 12, display: "flex", gap: 12, alignItems: "center", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ fontWeight: 700, color: "var(--text)", textDecoration: "none" }}>Job Board</Link>
        <Link to="/saved" style={{ color: "var(--text)" }}>Saved Jobs</Link>

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              padding: "8px 12px",
              borderRadius: 10,
              border: "1px solid #ccc",
              cursor: "pointer",
              background: "var(--card-bg)",
              color: "var(--text)"
            }}
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/saved" element={<SavedJobs />} />
        <Route path="/company/:id" element={<Company />} />
      </Routes>
    </BrowserRouter>
  );
}