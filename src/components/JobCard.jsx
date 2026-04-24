// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSaved } from "../context/SavedContext";
import { useApplications } from "../context/ApplicationContext";

export default function JobCard({ job }) {
  const { toggleSave, isSaved } = useSaved();
  const { getStatus } = useApplications();
  const saved = isSaved(job.id);
  const record = getStatus(job.id);

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0px 4px 14px rgba(0,0,0,0.08)"
      }}
    >
      {/* LEFT SIDE: Logo + Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        
        {/* ⭐ Company Logo (Perfectly aligned) */}
        <img
          src={job.logo}
          alt="logo"
          style={{
            width: 55,
            height: 55,
            borderRadius: 10,
            objectFit: "cover"
          }}
        />

        {/* TEXT SECTION */}
        <div>
          <h3 style={{ margin: 0 }}>{job.title}</h3>

          <p style={{ margin: "4px 0", color: "#555" }}>
            {job.company}
          </p>

          <div style={{ display: "flex", gap: 12, fontSize: 14, color: "#666" }}>
            <span>📍 {job.location}</span>
            <span>💼 {job.type}</span>
            <span>💰 ₹{job.salary}</span>
            <span>👨‍🎓 {job.exp} yr</span>
          </div>

          {/* Status badge (optional) */}
          {record && (
            <span
              style={{
                background: "#ffe8e8",
                color: "#c62828",
                padding: "4px 8px",
                borderRadius: 8,
                fontSize: 12,
                marginTop: 6,
                display: "inline-block"
              }}
            >
              {record.status}
            </span>
          )}

          {/* View Details */}
          <div style={{ marginTop: 8 }}>
            <Link to={`/job/${job.id}`}>View Details</Link>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Save Button */}
      <button
        onClick={() => toggleSave(job)}
        style={{
          padding: "8px 16px",
          borderRadius: 12,
          border: saved ? "1px solid #2196f3" : "1px solid #ccc",
          background: saved ? "#e3f2fd" : "white",
          cursor: "pointer"
        }}
      >
        {saved ? "Saved" : "Save"}
      </button>
    </div>
  );
}