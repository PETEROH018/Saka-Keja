import UnitsGrid from "../../components/UnitssGrid/UnitsGrid"
import useFetch from "../../hooks/useFetch";


export default function Home() {
    const { data: units, loading, error } = useFetch("http://localhost:3000/featured");
    return (
        <>
        <UnitsGrid units={units} loading={loading} error={error}/>
        </>
    )
}