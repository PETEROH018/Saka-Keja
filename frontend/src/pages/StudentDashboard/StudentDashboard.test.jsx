import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen, within, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import StudentDashboard from './StudentDashboard';

vi.mock("../../context/useAuth", () => ({
    useAuth: () => ({
        user: {
            id: 1,
            name: "teststudent",
            role: "student",
            profile: "student",
        },
    }),


}));

const mockDashboardResponses = () => {
    vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                total: 1,
                items: [
                    {
                        id: 101,
                        name: "Skyline Heights",
                        description: "Modern studio apartment.",
                        location: "Kilimani, Nairobi",
                        category: "Studio",
                        bedrooms: 1,
                        furnished: true,
                        shared: false,
                        rent: 920,
                        imageURLS: [],
                        unit_amenity_links: [],
                    },
                ],
            }),
        })
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 102,
                    name: "The Apex Residences",
                    description: "Comfortable apartment.",
                    location: "Westlands, Nairobi",
                    category: "Apartment",
                    bedrooms: 2,
                    furnished: true,
                    shared: false,
                    rent: 850,
                    imageURLS: [],
                    unit_amenity_links: [],
                },
            ],
        })
        .mockResolvedValueOnce({
            ok: true,
            json: async () => [
                {
                    id: 103,
                    name: "Maple Court",
                    description: "Affordable accommodation.",
                    location: "Lavington, Nairobi",
                    category: "Apartment",
                    bedrooms: 1,
                    furnished: false,
                    shared: false,
                    rent: 700,
                    imageURLS: [],
                    unit_amenity_links: [],
                },
            ],
        });
};

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe('Student Dashboard', () => {
    it('renders the student dashboard structure', async () => {
        mockDashboardResponses();

        render(<StudentDashboard />);

        expect(
            await screen.findByRole('heading', { name: /welcome back/i })
        ).toBeInTheDocument();

        expect(
            await screen.findByRole('heading', { name: /promoted units/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', { name: /favorite units/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole('heading', { name: /view units/i })
        ).toBeInTheDocument();
    });

    it("loads dashboard units from the backend API", async () => {
        vi.spyOn(globalThis, "fetch")
            .mockResolvedValueOnce({
                ok: true,
                json: async () => ({
                    total: 1,
                    items: [
                        {
                            id: 101,
                            name: "Skyline Heights",
                            description: "Modern studio apartment.",
                            location: "Kilimani, Nairobi",
                            category: "Studio",
                            bedrooms: 1,
                            furnished: true,
                            shared: false,
                            rent: 920,
                            imageURLS: [],
                            unit_amenity_links: [],
                        },
                    ],
                }),
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        id: 102,
                        name: "The Apex Residences",
                        description: "Comfortable apartment.",
                        location: "Westlands, Nairobi",
                        category: "Apartment",
                        bedrooms: 2,
                        furnished: true,
                        shared: false,
                        rent: 850,
                        imageURLS: [],
                        unit_amenity_links: [],
                    },
                ],
            })
            .mockResolvedValueOnce({
                ok: true,
                json: async () => [
                    {
                        id: 103,
                        name: "Maple Court",
                        description: "Affordable accommodation.",
                        location: "Lavington, Nairobi",
                        category: "Apartment",
                        bedrooms: 1,
                        furnished: false,
                        shared: false,
                        rent: 700,
                        imageURLS: [],
                        unit_amenity_links: [],
                    },
                ],
            });

        render(<StudentDashboard />);

        expect(await screen.findByText("Skyline Heights")).toBeInTheDocument();
        expect(screen.getByText("The Apex Residences")).toBeInTheDocument();
        expect(screen.getByText("Maple Court")).toBeInTheDocument();

        expect(globalThis.fetch).toHaveBeenCalledTimes(3);
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

    it("renders property cards inside each dashboard section", async () => {
        mockDashboardResponses();

        render(<StudentDashboard />);

        expect(
            await screen.findByText("Skyline Heights")
        ).toBeInTheDocument();

        expect(
            screen.getByText("The Apex Residences")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Maple Court")
        ).toBeInTheDocument();

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
});
