import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import ApartmentUnitForm from "../../components/ApartmentUnitForm/ApartmentUnitForm";
import { API_BASE_URL } from "../../config/api";

function toFormUnit(unit) {
  return {
    id: unit.id,
    unitType: unit.category ?? "",
    description: unit.description ?? "",
    monthlyRent: unit.rent ?? "",
    depositAmount: unit.deposit ?? "",
    size: unit.size ?? "",
    shared: unit.shared ?? false,
    bathrooms: String(unit.bathrooms ?? 0),
    bedrooms: String(unit.bedrooms ?? 0),
    maxOccupants: String(unit.maximum_occupants ?? 1),
    images: unit.imageURLS ?? [],
    unitAmenities: (unit.unit_amenity_links ?? [])
      .map((link) => link.amenity?.name)
      .filter(Boolean),
  };
}

export default function EditUnit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [unit, setUnit] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/units/${id}`)
      .then((response) => {
        if (!response.ok) throw new Error("Unit could not be loaded");
        return response.json();
      })
      .then((data) => setUnit(toFormUnit(data)))
      .catch((requestError) => setError(requestError.message));
  }, [id]);

  const handleSave = async (formUnit) => {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/units/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: formUnit.unitType,
          description: formUnit.description,
          rent: formUnit.monthlyRent,
          deposit: formUnit.depositAmount,
          size: formUnit.size,
          shared: formUnit.shared,
          bathrooms: formUnit.bathrooms,
          bedrooms: formUnit.bedrooms,
          maximum_occupants: formUnit.maxOccupants,
          imageURLS: formUnit.images,
          unitAmenities: formUnit.unitAmenities,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || data.message || "Unit could not be updated");
      }

      navigate(-1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
      <div className="flex min-h-screen">
        <AdminSideBar />
        <main className="min-w-0 flex-1">
          <div className="border-b border-[#e4dce8] px-5 pb-6 pt-7 lg:px-7">
            <h1 className="text-2xl font-bold">Edit Unit</h1>
            <p className="mt-1 text-[10px] text-[#77717c]">
              Update the details for this unit.
            </p>
          </div>

          {error && (
            <p className="mx-5 mt-5 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 lg:mx-7">
              {error}
            </p>
          )}
          {saving && <p className="px-5 pt-4 text-sm text-[#77717c] lg:px-7">Saving unit...</p>}

          {unit && (
            <ApartmentUnitForm
              units={[unit]}
              setUnits={() => {}}
              initialUnit={unit}
              editOnly
              onSave={handleSave}
              onBack={() => navigate(-1)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
