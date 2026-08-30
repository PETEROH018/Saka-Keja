import '@testing-library/jest-dom/vitest'
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StudentDashboard from "./StudentDashboard";


describe("Student Dashboard", () => {
  it("renders the dashboard welcome section", () => {
    render(<StudentDashboard />);

    expect(
      screen.getByRole("heading", { name: /welcome back/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/find a place that feels like home/i)
    ).toBeInTheDocument();
  });
});
