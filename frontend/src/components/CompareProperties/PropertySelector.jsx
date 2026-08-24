import { useState, useEffect } from "react";

const MAX_SELECTION = 3;

export default function PropertySelector({ onCompare }) {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/apartments")
      .then((res) => res.json())
      .then((data) => {
        setApartments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load apartments:", err);
        setLoading(false);
      });
  }, []);

  function toggleSelection(id) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((existingId) => existingId !== id);
      }
      if (prev.length >= MAX_SELECTION) {
        return prev; // silently ignore extra picks past the cap
      }
      return [...prev, id];
    });
  }

  if (loading) {
    return <p className="compare-empty">Loading properties...</p>;
  }

  return (
    <section className="selector-section">
      <div className="compare-header">
        <h1 className="compare-title">Choose properties to compare</h1>
        <p className="compare-subtitle">
          Pick up to {MAX_SELECTION} listings to see them side-by-side.
        </p>
      </div>

      <div className="selector-grid">
        {apartments.map((p) => {
          const isSelected = selectedIds.includes(p.id);
          const isDisabled = !isSelected && selectedIds.length >= MAX_SELECTION;

          return (
            <label
              key={p.id}
              className={`selector-card ${isSelected ? "selector-card--selected" : ""} ${isDisabled ? "selector-card--disabled" : ""}`}
            >
              <input
                type="checkbox"
                className="selector-checkbox"
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => toggleSelection(p.id)}
              />
              <img src={p.image_Urls[0]} alt={p.name} className="selector-thumb" loading="lazy" />
              <div className="selector-info">
                <div className="selector-name">{p.name}</div>
                <div className="selector-location">{p.location}</div>
                <div className="selector-rent">
                  KSh {p["monthly-expense-breakdown"].rent.toLocaleString()} / mo
                </div>
              </div>
              {isSelected && <span className="selector-check-badge">✓</span>}
            </label>
          );
        })}
      </div>

      <div className="selector-footer">
        <span className="selector-count">
          {selectedIds.length} / {MAX_SELECTION} selected
        </span>
        <button
          className="compare-view-btn selector-compare-btn"
          disabled={selectedIds.length < 2}
          onClick={() => onCompare(selectedIds)}
        >
          Compare Selected
        </button>
      </div>
    </section>
  );
}