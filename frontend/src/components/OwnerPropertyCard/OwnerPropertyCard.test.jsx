// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import OwnerPropertyCard from "./OwnerPropertyCard";

const property = {
    id: "1",
    name: "JKUAT Serene Heights",
    location: "Juja",
    property_type: "bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    status: "available",
    totalViews: 142,
    activeInquiries: 5,
    lastUpdated: "2 days ago",
    "monthly-expense-breakdown": {
        rent: 8000,
    },
    image_Urls: [],
};

describe("OwnerPropertyCard", () => {
    it("navigates to the property's edit page when Edit is clicked", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={["/my-properties"]}>
                <Routes>
                    <Route
                        path="/my-properties"
                        element={<OwnerPropertyCard property={property} />}
                    />

                    <Route
                        path="/edit-property/:id"
                        element={<p>Edit Property Page</p>}
                    />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByRole("button", { name: /edit/i }));

        expect(
            screen.getByText("Edit Property Page")
        ).toBeInTheDocument();
    });
});