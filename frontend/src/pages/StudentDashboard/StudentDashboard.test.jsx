import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import StudentDashboard from './StudentDashboard';

afterEach(() => {
    cleanup();
});

describe('Student Dashboard', () => {
    it('renders the student dashboard structure', () => {
        render(<StudentDashboard />);

        expect(
            screen.getByRole('heading', { name: /welcome back/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { name: /promoted units/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { name: /favorite units/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("heading", { name: /view units/i })
        ).toBeInTheDocument();
    });

    it("renders the student sidebar navigation", () => {
        render(<StudentDashboard />);

        const sidebar = screen.getByRole("complementary");

        expect(
            within(sidebar).getByRole("link", {
                name: "Dashboard",
                exact: true,
            })
        ).toBeInTheDocument();

        expect(
            within(sidebar).getByRole("link", {
                name: "Favorites",
                exact: true,
            })
        ).toBeInTheDocument();

        expect(
            within(sidebar).getByRole("link", {
                name: "View Units",
                exact: true,
            })
        ).toBeInTheDocument();

        expect(
            within(sidebar).getByRole("link", {
                name: "Profile",
                exact: true,
            })
        ).toBeInTheDocument();
    });
});

it("renders property cards inside each dashboard section", () => {
    render(<StudentDashboard />);

    expect(screen.getByText("Skyline Heights")).toBeInTheDocument();
    expect(screen.getByText("The Apex Residences")).toBeInTheDocument();
    expect(screen.getByText("Greenway Hostels")).toBeInTheDocument();

    expect(
        screen.getByRole("heading", { name: "Promoted Units" })
    ).toBeInTheDocument();

    expect(
        screen.getByRole("heading", { name: "Favorite Units" })
    ).toBeInTheDocument();

    expect(
        screen.getByRole("heading", { name: "View Units" })
    ).toBeInTheDocument();
});