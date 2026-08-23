import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


function EditPropertyForm({ property }) {
    const [name, setName] = useState(property.name ?? "");

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