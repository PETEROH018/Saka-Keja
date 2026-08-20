import UnitCard from "../UnitCard/UnitCard";
import useFetch from "../../hooks/useFetch";

export default function UnitsGrid() {
    const { data: units, loading, error } = useFetch("http://localhost:3000/apartments");

    if (loading) return <p>Loading units...</p>;
    if (error) return <p role="alert">Unable to load units: {error}</p>;

    return (
        <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
            {units?.map((unit) => <UnitCard key={unit.id} {...unit} />)}
        </div>
    )
}