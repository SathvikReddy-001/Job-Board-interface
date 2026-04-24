
import React from "react";
import { Link } from "react-router-dom";
import { useSaved } from "../context/SavedContext";

import JobCard from "../components/JobCard"; 

export default function SavedJobs() {

  const context = useSaved();
  const { saved = [], clearAll } = context || {}; 


  if (!context) {
    return <div style={{ padding: 24 }}>Error: SavedContext not found.</div>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: "0 auto" }}>
      <h1>Saved Jobs</h1>
      
      {saved?.length === 0 ? (
        <div>
          <p>No saved jobs yet.</p>
          <Link to="/">Browse jobs</Link>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <button 
              onClick={clearAll} 
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "1px solid #cfcfcf",
                background: "#fff",
                cursor: "pointer"
              }}
            >
              Clear All
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 16
          }}>
            
            {saved && saved.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}