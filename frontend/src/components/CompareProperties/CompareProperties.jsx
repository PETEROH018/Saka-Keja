import { useMemo } from "react";
import { Link } from "react-router-dom";

function Check() {
  return (
    <svg className="feat-icon feat-icon--yes" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="feat-icon feat-icon--no" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function formatKsh(amount) {
  return `KSh ${amount.toLocaleString()}`;
}

// function totalMonthlyCost(property) {
//   const b = property["monthly-expense-breakdown"];
//   return b.rent + b.water + b.internet + b.electricity;
// }

const FEATURE_ROWS = [
  // { label: "Monthly Rent", render: (p) => formatKsh(p["monthly-expense-breakdown"].rent) },
  // { label: "Total Monthly Cost", render: (p) => formatKsh(totalMonthlyCost(p)), emphasis: true },
  { label: "Type", render: (p) => p.type },
  // { label: "Bedrooms / Bathrooms", render: (p) => `${p.bedrooms} bed • ${p.bathrooms} bath` },
  {
  label: "Furnished",
  render: (p) =>
    p.amenity_links?.some(
      (link) => link.amenity?.name === "Furnished"
    ) ? <Check /> : <Cross />
  },
  {
  label: "WiFi Available",
  render: (p) =>
    p.amenity_links?.some(
      (link) => link.amenity?.name === "WiFi Available"
    ) ? <Check /> : <Cross />
  },
  {
  label: "Water Reliable",
  render: (p) =>
    p.amenity_links?.some(
      (link) => link.amenity?.name === "Water Reliable"
    ) ? <Check /> : <Cross />
  },
  ,
  {
  label: "Security Guard",
  render: (p) =>
    p.amenity_links?.some(
      (link) => link.amenity?.name === "Security Guard"
    ) ? <Check /> : <Cross />
  },
  {
    label: "Nearest Amenity",
    render: (p) => {
      const nearest = p["nearby_facilities"][0];
      return `${nearest.title} — ${nearest.distance}`;
    },
  },
];

export default function CompareProperties({ properties, onBack }) {
  // const cheapest = useMemo(() => {
  //   if (properties.length === 0) return null;
  //   return properties.reduce((min, p) =>
  //     totalMonthlyCost(p) < totalMonthlyCost(min) ? p : min
  //   );
  // }, [properties]);

 
  if (properties.length === 0) {
    return <p className="compare-empty">No properties selected for comparison.</p>;
  }

  return (
    <section className="compare-section">
      <div className="compare-header">
        <a href="#" className="compare-back" onClick={(e) => { e.preventDefault(); onBack(); }}>
          &larr; Back to Search
        </a>
        <h1 className="compare-title">Compare Properties</h1>
        <p className="compare-subtitle">
          Review your shortlisted options side-by-side to make the best decision.
        </p>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="compare-feature-col">Features</th>
              {properties.map((p) => (
                <th key={p.id} className="compare-property-col">
                  {/* {p.id === cheapest.id && <span className="compare-badge">Best Value</span>} */}
                  <div className="compare-thumb">
                    <img src={p.imageURLs[0]} alt={p.name} loading="lazy" />
                  </div>
                  <div className="compare-property-name">{p.name}</div>
                  <div className="compare-property-location">{p.location}</div>
                  {p.isVerified && (
                    <span className="compare-verified">
                      <Check /> Verified
                    </span>
                  )}
                  <Link className="compare-view-btn" to={`/apartment-details/${p.id}`}
                  > View Details </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FEATURE_ROWS.map((row) => (
              <tr key={row.label} className={row.emphasis ? "compare-row--emphasis" : ""}>
                <td className="compare-feature-label">{row.label}</td>
                {properties.map((p) => (
                  <td key={p.id} className="compare-value-cell">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}