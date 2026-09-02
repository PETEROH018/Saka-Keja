import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/useAuth";

function EditPropertyForm({ property }) {
    const { token } = useAuth();
    const [name, setName] = useState(property.name ?? "");
    const [location, setLocation] = useState(property.location ?? "");
    const [propertyType, setPropertyType] = useState(property.property_type ?? "");
    const [rent, setRent] = useState(
        property["monthly-expense-breakdown"]?.rent ?? ""
    );
    const [bedrooms, setBedrooms] = useState(property.bedrooms ?? "");
    const [bathrooms, setBathrooms] = useState(property.bathrooms ?? "");
    const [status, setStatus] = useState(property.status ?? "available");
    const [saveMessage, setSaveMessage] = useState("");
    const [saveError, setSaveError] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setSaveMessage("");
        setSaveError("");
        setIsSaving(true);

        try {
            const response = await fetch(
                `${API_BASE_URL}/apartments/${property.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name,
                        location,
                        property_type: propertyType,
                        bedrooms: Number(bedrooms),
                        bathrooms: Number(bathrooms),
                        status,
                        "monthly-expense-breakdown": {
                            ...property["monthly-expense-breakdown"],
                            rent: Number(rent),
                        },
                    }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.message ||
                    errorData.error ||
                    "Failed to update property"
                );
            }

            setSaveMessage("Property updated successfully");

        } catch (error) {
            console.error("Update property failed:", error);
            setSaveError(error.message);

        } finally {
            setIsSaving(false);
        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Property Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Edit the information displayed on your property listing.
                </p>
            </div>

            <div className="mb-5">
                <label
                    htmlFor="property-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Property Name
                </label>

                <input
                    id="property-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="property-location"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Location
                </label>

                <input
                    id="property-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="property-type"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Property Type
                    </label>

                    <input
                        id="property-type"
                        type="text"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="property-rent"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Monthly Rent
                    </label>

                    <input
                        id="property-rent"
                        type="number"
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>
            </div>

            <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="property-bedrooms"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Bedrooms
                    </label>

                    <input
                        id="property-bedrooms"
                        type="number"
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>

                <div>
                    <label
                        htmlFor="property-bathrooms"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Bathrooms
                    </label>

                    <input
                        id="property-bathrooms"
                        type="number"
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                    />
                </div>
            </div>

            <div className="mb-6">
                <label
                    htmlFor="property-status"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Status
                </label>

                <select
                    id="property-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="occupied">Occupied</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={isSaving}
                className="min-w-32 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {isSaving ? "Saving..." : "Save Changes"}
            </button>

            {saveMessage && (
                <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                    {saveMessage}
                </p>
            )}
            {saveError && (
                <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {saveError}
                </p>
            )}

        </form >
    );
}

export default function EditProperty() {
    const { id } = useParams();

    const {
        data: property,
        loading,
        error,
    } = useFetch(`${API_BASE_URL}/apartments/${id}`);

    return (
        <div className="flex min-h-screen bg-[#faf8fc]">
            <AdminSideBar />
            <main className="flex-1 px-8 py-7">
                <Link
                    to="/my-properties"
                    className="mb-3 inline-block text-sm font-medium text-violet-600 hover:text-violet-800"
                >
                    ← Back to My Properties
                </Link>

                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Property
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update your property details and availability.
                </p>

                {loading && (
                    <p className="mt-6 text-sm text-gray-500">
                        Loading property...
                    </p>
                )}

                {error && (
                    <p className="mt-6 text-sm text-red-500">
                        Failed to load property: {error}
                    </p>
                )}

                {property && (
                    <div className="mt-6 max-w-3xl">
                        <EditPropertyForm property={property} />
                    </div>
                )}
            </main>
        </div>
    );
}