
// src/pages/JobDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import { useSaved } from "../context/SavedContext";
import { useApplications } from "../context/ApplicationContext";

const STATUS_OPTIONS = ["", "Applied", "Interview", "Offered", "Hired", "Rejected"];

export default function JobDetails() {
  const { id } = useParams();
  const job = jobs.find((j) => j.id === id);
  const { toggleSave, isSaved } = useSaved();
  const { getStatus, setStatus, clearStatus } = useApplications();

  if (!job) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Job not found</h2>
        <Link to="/">Back to Listings</Link>
      </div>
    );
  }

  const saved = isSaved(job.id);
  const record = getStatus(job.id); // {jobId, status, date} or null

  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <h1>{job.title}</h1>

      <p>
        <strong>Company:</strong>{" "}
        <Link
          to={`/company/${job.company.toLowerCase().split(" ")[0]}`}
          style={{ marginLeft: 6 }}
        >
          {job.company}
        </Link>
      </p>

      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p>
      <p><strong>Experience:</strong> {job.exp} {job.exp === 1 ? "year" : "years"}</p>
      <p><strong>Type:</strong> {job.type}</p>

      <h3 style={{ marginTop: 18 }}>Description</h3>
      <p>{job.desc}</p>

      <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={() => toggleSave(job)}
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            border: "1px solid #cfcfcf",
            background: saved ? "#e9f5ff" : "#fff"
          }}
        >
          {saved ? "Unsave" : "Save"}
        </button>

        {/* Application tracking dropdown */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label htmlFor="appStatus"><strong>Application status:</strong></label>
          <select
            id="appStatus"
            value={record?.status || ""}
            onChange={(e) => {
              const newStatus = e.target.value;
              if (newStatus === "") clearStatus(job.id);
              else setStatus(job.id, newStatus);
            }}
            style={{ padding: "8px 10px", borderRadius: 6 }}
          >
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s}>
                {s === "" ? "None" : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {record && (
        <div style={{ marginTop: 12, color: "#444" }}>
          <small>
            Last updated: {new Date(record.date).toLocaleString()} • <strong>{record.status}</strong>
          </small>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Link to="/">← Back to Listings</Link>
      </div>
    </div>
  );
}