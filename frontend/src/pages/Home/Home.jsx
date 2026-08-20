import UnitsGrid from "../../components/UnitssGrid/UnitsGrid"
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

export default function Home() {
    const [endpoint, setEndpoint] = useState("http://localhost:3000/featured");

    // After search, the endpoint will be changed triggering another fetch

    const { data: units, loading, error } = useFetch(endpoint);

    return (
        <>
        <UnitsGrid units={units} loading={loading} error={error}/>
        </>
    );
}
