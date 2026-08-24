import { useState, useEffect } from "react";
import CompareProperties from "../../components/CompareProperties/CompareProperties";
import PropertySelector from "../../components/CompareProperties/PropertySelector";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ComparePage() {
  const [allApartments, setAllApartments] = useState([]);
  const [selectedIds, setSelectedIds] = useState(null); // null = still choosing

  useEffect(() => {
    fetch("http://localhost:3000/apartments")
      .then((res) => res.json())
      .then((data) => setAllApartments(data))
      .catch((err) => console.error("Failed to load apartments:", err));
  }, []);

  const selectedProperties = selectedIds
    ? selectedIds.map((id) => allApartments.find((a) => a.id === id)).filter(Boolean)
    : [];

  return (
    <>
      <Header />
      {selectedIds === null ? (
        <PropertySelector onCompare={(ids) => setSelectedIds(ids)} />
      ) : (
        <CompareProperties
          properties={selectedProperties}
          onBack={() => setSelectedIds(null)}
        />
      )}
      <Footer />
    </>
  );
}