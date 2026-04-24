// src/pages/Home.jsx
import React, { useState, useMemo, useEffect } from "react";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";
import FilterPanel from "../components/FilterPanel";

export default function Home() {
  // ---------- STATE ----------
  const [filters, setFilters] = useState({
    location: "",
    minSalary: "",
    maxSalary: "",
    minExp: "",
    type: ""
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const jobsPerPage = 4;

  // ---------- RESET PAGE ----------
  useEffect(() => {
    setPage(1);
  }, [filters, search]);

  // ---------- FILTER LOGIC ----------
  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      if (!job) return false;

      // SEARCH
      if (search.trim()) {
        const q = search.toLowerCase();

        const title = job.title?.toLowerCase() || "";
        const company = job.company?.toLowerCase() || "";
        const location = job.location?.toLowerCase() || "";

        if (
          !title.includes(q) &&
          !company.includes(q) &&
          !location.includes(q)
        ) {
          return false;
        }
      }

      // LOCATION FILTER
      if (filters.location) {
        const loc = filters.location.toLowerCase();

        const jobLoc = job.location?.toLowerCase() || "";
        const jobTitle = job.title?.toLowerCase() || "";

        if (!jobLoc.includes(loc) && !jobTitle.includes(loc)) {
          return false;
        }
      }

      // SALARY FILTER
      if (filters.minSalary && job.salary < Number(filters.minSalary)) return false;
      if (filters.maxSalary && job.salary > Number(filters.maxSalary)) return false;

      // EXPERIENCE FILTER
      if (filters.minExp && job.exp < Number(filters.minExp)) return false;

      // TYPE FILTER
      if (filters.type && job.type !== filters.type) return false;

      return true;
    });
  }, [filters, search]);

  // ---------- PAGINATION ----------
  const totalPages = Math.max(1, Math.ceil(filtered.length / jobsPerPage));

  const start = (page - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const pageJobs = filtered.slice(start, end);

  // prevent overflow page
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  // ---------- UI ----------
  return (
    <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
      
      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(135deg, #2962ff, #0d47a1)",
          color: "white",
          padding: "30px",
          textAlign: "center"
        }}
      >
        <h2>Find Your Dream Job</h2>
        <p>Search, filter and track your job applications</p>

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "20px",
            border: "none",
            marginTop: "10px"
          }}
        />
      </section>

      {/* MAIN */}
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        
        {/* FILTER PANEL */}
        <div style={{ width: "250px" }}>
          <FilterPanel filters={filters} setFilters={setFilters} />
        </div>

        {/* JOB LIST */}
        <div style={{ flex: 1 }}>
          <h2>Job Listings</h2>

          {/* JOBS */}
          {pageJobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (
            pageJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          )}

          {/* PAGINATION */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              style={{ marginRight: "10px" }}
            >
              ← Previous
            </button>

            <span>
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              style={{ marginLeft: "10px" }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}