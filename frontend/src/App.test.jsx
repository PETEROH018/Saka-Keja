// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("App routing", () => {
  it("renders the edit property page for an edit property route", () => {
    window.history.pushState({}, "", "/edit-property/1");

    render(<App />);

    expect(
      screen.getByRole("heading", { name: /edit property/i })
    ).toBeInTheDocument();
  });
});

it("loads the property being edited", async () => {
  window.history.pushState({}, "", "/edit-property/1");
  
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    json: async () => ({
      id: "1",
      name: "JKUAT Serene Heights",
      location: "Juja",
      property_type: "bedsitter",
      bedrooms: 0,
      bathrooms: 1,
      status: "available",
      "monthly-expense-breakdown": {
        rent: 8000,
      },
    }),
  });

  render(<App />);

  expect(
    await screen.findByDisplayValue("JKUAT Serene Heights")
  ).toBeInTheDocument();
});