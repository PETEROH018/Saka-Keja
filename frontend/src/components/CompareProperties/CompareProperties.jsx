import { useMemo } from "react";
import db from "../../data/db.json";
import "./CompareProperties.css";

// Small check / cross icons so we don't pull in an icon library for two glyphs
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

function totalMonthlyCost(property) {
  const b = property["monthly-expense-breakdown"];
  return b.rent + b.water + b.internet + b.electricity;
}

// Each row: a label + a function that pulls/formats the value from a property
const FEATURE_ROWS = [
  {
    label: "Monthly Rent",
    render: (p) => formatKsh(p["monthly-expense-breakdown"].rent),
  },
  {
    label: "Total Monthly Cost",
    render: (p) => formatKsh(totalMonthlyCost(p)),
    emphasis: true,
  },
  {
    label: "Type",
    render: (p) => p.property_type,
  },