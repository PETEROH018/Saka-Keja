// @vitest-environment jsdom

import { test, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

afterEach(() => {
  cleanup();
});

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

test("renders the why we started section", () => {
    renderAbout();

    expect(
        screen.getByRole("heading", { name: /why we started/i })
    ).toBeInTheDocument();
});