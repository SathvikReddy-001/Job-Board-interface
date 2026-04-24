// src/pages/Company.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { companies } from "../data/companies";
import { jobs } from "../data/jobs";

export default function Company() {
  const { id } = useParams();
  const company = companies.find(c => c.id === id);

  if (!company) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Company not found</h2>
        <Link to="/">Back to listings</Link>
      </div>
    );
  }

  // jobs for this company
  const companyJobs = jobs.filter(j => j.company && j.company.toLowerCase().includes(company.name.split(" ")[0].toLowerCase()));

  return (
    <div style={{ padding: 24, maxWidth: 1000 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>{company.name}</h1>
          <p style={{ margin: "6px 0", color: "#555" }}>{company.location} • {company.size}</p>
          <p style={{ marginTop: 12 }}>{company.about}</p>
          {company.website && (
            <p style={{ marginTop: 8 }}>
              Website: <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
            </p>
          )}
        </div>

        <div style={{ textAlign: "right" }}>
          {company.brochureUrl ? (
            // Using the local path you uploaded as brochureUrl — your environment will serve it.
            <a
              href={company.brochureUrl}
              download
              style={{
                display: "inline-block",
                padding: "10px 14px",
                background: "#0f62fe",
                color: "white",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 600
              }}
            >
              Download Brochure
            </a>
          ) : (
            <div style={{ color: "#888" }}>No brochure available</div>
          )}
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h3>Open jobs at {company.name}</h3>
      {companyJobs.length === 0 ? (
        <p style={{ color: "#666" }}>No open positions listed.</p>
      ) : (
        <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
          {companyJobs.map(job => (
            <div key={job.id} style={{ padding: 12, borderRadius: 8, background: "#fff", border: "1px solid #eee" }}>
              <Link to={`/job/${job.id}`} style={{ fontWeight: 700, color: "#0b3d91", textDecoration: "none" }}>{job.title}</Link>
              <div style={{ color: "#666" }}>{job.location} • ₹{job.salary}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <Link to="/">← Back to Listings</Link>
      </div>
    </div>
  );
}