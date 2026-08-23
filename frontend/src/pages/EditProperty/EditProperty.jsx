import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


function EditPropertyForm({ property }) {
    const [name, setName] = useState(property.name ?? "");
    const [location, setLocation] = useState(property.location ?? "");
    const [propertyType, setPropertyType] = useState(property.property_type ?? "");
    const [rent, setRent] = useState(
        property["monthly-expense-breakdown"]?.rent ?? ""
    );
    const [bedrooms, setBedrooms] = useState(property.bedrooms ?? "");
    const [bathrooms, setBathrooms] = useState(property.bathrooms ?? "");
    const [status, setStatus] = useState(property.status ?? "available");

    return (
        <div>
            <label htmlFor="property-name">
                Property Name
            </label>

            <input
                id="property-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div>
                <label htmlFor="property-location">Location</label>
                <input
                    id="property-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="property-type">Property Type</label>
                <input
                    id="property-type"
                    type="text"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="property-rent">Monthly Rent</label>
                <input
                    id="property-rent"
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="property-bedrooms">Bedrooms</label>
                <input
                    id="property-bedrooms"
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="property-bathrooms">Bathrooms</label>
                <input
                    id="property-bathrooms"
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="property-status">Status</label>
                <select
                    id="property-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="available">Available</option>
                    <option value="pending">Pending</option>
                    <option value="occupied">Occupied</option>
                </select>
            </div>
        </div>
    );
}

export default function EditProperty() {
    const { id } = useParams();

    const {
        data: property,
        loading,
        error,
    } = useFetch(`http://localhost:3000/apartments/${id}`);

    return (
        <div>
            <h1>Edit Property</h1>
            {loading && (
                <p>Loading property...</p>
            )}
            {error && (
                <p>Failed to load property: {error}</p>
            )}
            {property && <EditPropertyForm property={property} />}
        </div>
    );
}