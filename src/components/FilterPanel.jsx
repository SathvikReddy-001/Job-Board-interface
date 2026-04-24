// src/components/FilterPanel.jsx
import React from "react";

export default function FilterPanel({ filters, setFilters }) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const onNumberChange = (e) => {
    const { name, value } = e.target;
    const num = value === "" ? "" : Number(value);
    setFilters(prev => ({ ...prev, [name]: num }));
  };

  const reset = () => {
    setFilters({
      location: "",
      minSalary: "",
      maxSalary: "",
      minExp: "",
      type: ""
    });
  };

  return (
   <div
  className="fade-in"
  style={{
    padding: 12,
    border: "1px solid #e6e6e6",
    borderRadius: 8,
    background: "#fff",
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 16,
    boxShadow: "0 4px 10px rgba(0,0,0,0.07)"
  }}
>
     
    
      <input
        name="location"
        value={filters.location}
        onChange={onChange}
        placeholder="Location"
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", minWidth: 140 }}
      />

      <input
        name="minSalary"
        value={filters.minSalary}
        onChange={onNumberChange}
        placeholder="Min salary"
        type="number"
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 120 }}
      />

      <input
        name="maxSalary"
        value={filters.maxSalary}
        onChange={onNumberChange}
        placeholder="Max salary"
        type="number"
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 120 }}
      />

      <select
        name="minExp"
        value={filters.minExp}
        onChange={onNumberChange}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 140 }}
      >
        <option value="">Min exp</option>
        <option value={0}>0 yr</option>
        <option value={1}>1 yr</option>
        <option value={2}>2 yrs</option>
        <option value={3}>3 yrs</option>
        <option value={5}>5+ yrs</option>
      </select>

      <select
        name="type"
        value={filters.type}
        onChange={onChange}
        style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 140 }}
      >
        <option value="">Any type</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      <button
        onClick={reset}
        style={{
          marginLeft: "auto",
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #cfcfcf",
          background: "#fff",
          cursor: "pointer"
        }}
      >
        Reset
      </button>
    </div>
  );
}