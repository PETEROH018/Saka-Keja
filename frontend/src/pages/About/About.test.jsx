// @vitest-environment jsdom

import { test, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

function renderAbout() {
  render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
}

test("renders the four about value cards", () => {
  renderAbout();

  expect(screen.getByText("Trust & Safety")).toBeInTheDocument();
  expect(screen.getByText("Modernizing the Search")).toBeInTheDocument();
  expect(screen.getByText("Community Focused")).toBeInTheDocument();
  expect(screen.getByText("Empowering Owners")).toBeInTheDocument();
});