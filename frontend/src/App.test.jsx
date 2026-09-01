// @vitest-environment jsdom

import userEvent from "@testing-library/user-event";
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

it("prefills the edit form with the property's existing details", async () => {
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

  expect(screen.getByDisplayValue("Juja")).toBeInTheDocument();
  expect(screen.getByDisplayValue("bedsitter")).toBeInTheDocument();
  expect(screen.getByDisplayValue("8000")).toBeInTheDocument();
  expect(screen.getByDisplayValue("0")).toBeInTheDocument();
  expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  expect(screen.getByRole("combobox", { name: /status/i })).toHaveValue(
    "available"
  );
});

it("saves updated property details", async () => {
  window.history.pushState({}, "", "/edit-property/1");

  const fetchMock = vi
    .spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
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
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

  render(<App />);

  const nameInput = await screen.findByLabelText(/property name/i);

  await userEvent.clear(nameInput);
  await userEvent.type(nameInput, "JKUAT Heights Updated");

  await userEvent.click(
    screen.getByRole("button", { name: /save changes/i })
  );

  expect(fetchMock).toHaveBeenLastCalledWith(
    "http://localhost:3000/apartments/1",
    expect.objectContaining({
      method: "PATCH",
    })
  );
});
it("shows a success message after saving changes", async () => {
  window.history.pushState({}, "", "/edit-property/1");

  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
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
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

  render(<App />);

  await screen.findByLabelText(/property name/i);

  await userEvent.click(
    screen.getByRole("button", { name: /save changes/i })
  );

  expect(
    await screen.findByText(/property updated successfully/i)
  ).toBeInTheDocument();
});

it("shows an error message when saving changes fails", async () => {
  window.history.pushState({}, "", "/edit-property/1");

  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
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
    })
    .mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

  render(<App />);

  await screen.findByLabelText(/property name/i);

  await userEvent.click(
    screen.getByRole("button", { name: /save changes/i })
  );

  expect(
    await screen.findByText(/failed to update property/i)
  ).toBeInTheDocument();
});

it("handles empty signup responses without crashing", async () => {
  window.history.pushState({}, "", "/auth");

  const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
  Object.defineProperty(navigator, "geolocation", {
    value: {
      getCurrentPosition: (success) =>
        success({
          coords: { latitude: -1.286389, longitude: 36.817223 },
        }),
    },
    configurable: true,
  });

  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        address: { city: "Nairobi", county: "Nairobi County" },
      }),
    })
    .mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "",
      json: async () => {
        throw new SyntaxError("Unexpected end of JSON input");
      },
    });

  render(<App />);

  await userEvent.click(screen.getByRole("button", { name: /create account/i }));

  await userEvent.type(screen.getByPlaceholderText(/john doe/i), "Jane Doe");
  await userEvent.type(screen.getByPlaceholderText(/username123/i), "janedoe");
  await userEvent.type(screen.getByPlaceholderText(/you@example.com/i), "jane@example.com");
  await userEvent.type(screen.getByPlaceholderText(/712 345 678/i), "712345678");
  await userEvent.type(screen.getByPlaceholderText(/create a password/i), "StrongPass1!");
  await userEvent.type(screen.getByPlaceholderText(/confirm your password/i), "StrongPass1!");

  const signupSubmitBtn = screen.getAllByRole("button", { name: /^sign up$/i })[1];
  await userEvent.click(signupSubmitBtn);

  expect(alertSpy).toHaveBeenCalledWith(
    expect.stringContaining("Something went wrong")
  );
});

it("disables the save button while the property update is in progress", async () => {
  window.history.pushState({}, "", "/edit-property/1");

  let resolveUpdate;

  vi.spyOn(globalThis, "fetch")
    .mockResolvedValueOnce({
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
    })
    .mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        })
    );

  render(<App />);

  await screen.findByLabelText(/property name/i);

  const saveButton = screen.getByRole("button", {
    name: /save changes/i,
  });

  await userEvent.click(saveButton);

  expect(
    screen.getByRole("button", { name: /saving/i })
  ).toBeDisabled();

  resolveUpdate({
    ok: true,
    json: async () => ({}),
  });

  expect(
    await screen.findByRole("button", { name: /save changes/i })
  ).toBeEnabled();
});