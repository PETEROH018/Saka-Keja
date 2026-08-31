import { useState } from "react";
import AddedUnitSummary from "./AddedUnitSummary";
import Icon from "../Icon/Icon";
import ImageUploader from "../../utils/ImageUploader";


const unitTypeOptions = [
  "Single",
  "Bedsitter",
  "One Bedroom",
  "Two Bedroom",
  "Three Bedroom",
];

const amenityOptions = [
  "Balcony",
  "Kitchenette",
  "Built-in Wardrobes",
];

const emptyUnit = {
  unitType:"",
  monthlyRent: "",
  depositAmount: "",
  size: "",
  shared: false,
  bathrooms: "0",
  bedrooms: "0",
  maxOccupants: "1",
  images: [],
  unitAmenities: [],
};

function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[9px] font-medium text-[#3e3842]">

        {label}

        {required && (
          <span className="ml-0.5 text-red-500">
            *
          </span>
        )}

      </label>

      {children}

    </div>
  );
}

const inputClass =
  "h-9 w-full rounded-md border border-[#dcd3e1] bg-[#fdf9ff] px-2.5 text-[10px] text-[#3f3943] outline-none placeholder:text-[#aaa2ad] focus:border-[#7652aa] focus:ring-2 focus:ring-[#7652aa]/10";

export default function ApartmentUnitForm({units,setUnits,onBack,onContinue}){
  const [unit, setUnit] = useState(emptyUnit);
  const [editingId, setEditingId] = useState(null);
  const [uploadCompleted, setUploadCompleted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setUnit((prev) => ({
      ...prev,
      [name]:type === "file"
            ? [...(prev[name] || []), ...Array.from(files)]
                : value,
    }));
  };

  const handleSharedChange = (e) => {
    setUnit((prev) => ({
      ...prev,
      shared: e.target.checked,
    }));
  };

  const toggleAmenity = (amenity) => {
    setUnit((prev) => ({
      ...prev,

      unitAmenities: prev.unitAmenities.includes(amenity)
        ? prev.unitAmenities.filter(
            (item) => item !== amenity
          )
        : [
            ...prev.unitAmenities,
            amenity,
          ],
    }));
  };

   const resetForm = () => {
    setUnit({
      ...emptyUnit,
      unitAmenities: [],
    });

    setEditingId(null);
  };

 const handleAddUnit = () => {
    if (
      !unit.unitType ||
      !unit.monthlyRent
    ) {
      return alert("Please fill in the required fields");
    }

    const unitData = {
      ...unit,

      monthlyRent: Number(
        unit.monthlyRent
      ),

      depositAmount: Number(
        unit.depositAmount || 0
      ),

      size: Number(
        unit.size || 0
      ),

      bathrooms: String(
        unit.bathrooms
      ),

      bedrooms: String(
        unit.bedrooms
      ),
    };


    /* UPDATE EXISTING UNIT */

    if (editingId) {
      setUnits((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...unitData,
                id: editingId,
                unitNumber:item.unitNumber,
              }
            : item
        )
      );

      resetForm();
      return;
    }

    /* ADD NEW INDIVIDUAL UNIT */

    const nextNumber =
      units.length + 1;

    const newUnit = {
      ...unitData,

      id: Date.now(),

      unitNumber:
        `Unit ${String(
          nextNumber
        ).padStart(3, "0")}`,
    };

    setUnits((prev) => [
      ...prev,
      newUnit,
    ]);

    resetForm();
  };
  
  return(
  <div className="border-b border-[#e4dce8] bg-[#fcf8fd] px-5 pb-6 pt-7 lg:px-7">

    <div className="mx-auto w-full max-w-[900px]">

      {/* MAIN CONTENT GRID */}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">

        {/* LEFT COLUMN — UNIT FORM */}

        <div className="min-w-0">

          {/* UNIT FORM */}

          <div className="rounded-lg border border-[#dcd3e2] bg-[#fdf9ff] p-4">

            <h2 className="mb-5 text-[12px] font-semibold text-[#28232d]">
              {editingId ? "Edit Unit" : "Add Unit"}
            </h2>

            {/* UNIT TYPE */}

            <FormField
              label="Unit Type"
              required
            >
              <div className="relative">

                <select
                  name="unitType"
                  value={unit.unitType}
                  required
                  onChange={handleChange}
                  className={`${inputClass} appearance-none pr-9`}
                >
                  <option value="">
                    Select unit type
                  </option>

                  {unitTypeOptions.map((type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  ))}
                </select>

                <Icon
                  name="chevronDown"
                  size={12}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                />

              </div>
            </FormField>


            {/* RENT / DEPOSIT / SIZE */}

            <div className="mt-5 grid gap-3 sm:grid-cols-3">

              <FormField
                label="Monthly Rent (KSh)"
                required
              >
                <input
                  type="number"
                  min="0"
                  name="monthlyRent"
                  value={unit.monthlyRent}
                  onChange={handleChange}
                  placeholder="15,000"
                  className={inputClass}
                />
              </FormField>


              <FormField
                label="Deposit Amount"
              >
                <input
                  type="number"
                  min="0"
                  name="depositAmount"
                  value={unit.depositAmount}
                  onChange={handleChange}
                  placeholder="15,000"
                  className={inputClass}
                />
              </FormField>


              <FormField
                label="Size (sq ft)"
              >
                <input
                  type="number"
                  min="0"
                  name="size"
                  value={unit.size}
                  onChange={handleChange}
                  placeholder="250"
                  className={inputClass}
                />
              </FormField>

            </div>


            {/* UNIT FEATURES */}

            <div className="mt-6">

              <h3 className="mb-3 text-[10px] font-semibold text-[#353039]">
                Unit Features
              </h3>

              <div className="grid gap-3 sm:grid-cols-3">

                {/* SHARED */}

                <label className="flex h-9 cursor-pointer items-center gap-2 text-[10px] text-[#625c66]">

                  <input
                    type="checkbox"
                    checked={unit.shared}
                    onChange={handleSharedChange}
                    className="sr-only"
                  />

                  <span
                    className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                      unit.shared
                        ? "border-[#5e3b95] bg-[#5e3b95] text-white"
                        : "border-[#cec5d4] bg-white"
                    }`}
                  >
                    {unit.shared && (
                      <Icon
                        name="check"
                        size={9}
                      />
                    )}
                  </span>

                  Shared

                </label>


                {/* BATHROOMS */}

                <FormField label="Number of Bathrooms">

                  <div className="relative">

                    <select
                      name="bathrooms"
                      value={unit.bathrooms}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >

                      {[0, 1, 2].map((number) => (
                        <option
                          key={number}
                          value={number}
                        >
                          {number}
                        </option>
                      ))}

                    </select>

                    <Icon
                      name="chevronDown"
                      size={12}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                    />

                  </div>

                </FormField>


                {/* BEDROOMS */}

                <FormField label="Number of Bedrooms">

                  <div className="relative">

                    <select
                      name="bedrooms"
                      value={unit.bedrooms}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none pr-8`}
                    >

                      {[0, 1, 2, 3].map((number) => (
                        <option
                          key={number}
                          value={number}
                        >
                          {number}
                        </option>
                      ))}

                    </select>

                    <Icon
                      name="chevronDown"
                      size={12}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                    />

                  </div>

                </FormField>

              </div>

              {/* MAXIMUM OCCUPANTS */}

  <FormField label="Maximum Occupants">

    <div className="relative">

      <select
        name="maxOccupants"
        value={unit.maxOccupants}
        onChange={handleChange}
        className={`${inputClass} appearance-none pr-8`}
      >
        {[1, 2, 3, 4].map((number) => (
          <option
            key={number}
            value={number}
          >
            {number}
          </option>
        ))}
      </select>

        <Icon
          name="chevronDown"
          size={12}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
        />

        </div>

          </FormField>


              {/* unitAmenities */}

              <div className="mt-5">

                <h4 className="mb-3 text-[10px] font-semibold text-[#353039]">
                  Additional Unit Amenities
                </h4>

                <div className="grid gap-x-7 gap-y-3 sm:grid-cols-3">

                  {amenityOptions.map((amenity) => {

                    const checked =
                      unit.unitAmenities.includes(amenity);

                    return (
                      <label
                        key={amenity}
                        className="flex cursor-pointer items-center gap-2 text-[10px] text-[#625c66]"
                      >

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleAmenity(amenity)
                          }
                          className="sr-only"
                        />

                        <span
                          className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
                            checked
                              ? "border-[#5e3b95] bg-[#5e3b95] text-white"
                              : "border-[#cec5d4] bg-white"
                          }`}
                        >
                          {checked && (
                            <Icon
                              name="check"
                              size={9}
                            />
                          )}
                        </span>

                        {amenity}

                      </label>
                    );
                  })}

                </div>

              </div>

            </div>
          
          {/*Unit images*/}

           <ImageUploader type={'unit'} form={unit} setForm={setUnit} uploadComplete={uploadCompleted} setUploadComplete={setUploadCompleted} />


            {/* ADD / UPDATE UNIT  */}

            <div className="mt-7 flex justify-end">

              <button
                type="button"
                onClick={handleAddUnit}
                disabled = {!uploadCompleted}
                className="flex h-9 items-center gap-1.5 rounded-md border border-[#5b3894] bg-[#5b3894] px-4 text-[9px] font-semibold text-white hover:bg-[#4f3084] mt-2 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Icon
                  name="plus"
                  size={11}
                />

                {editingId
                  ? "Update Unit"
                  : "Add Unit"}

              </button>

            </div>

          </div>


          {/* ADD ANOTHER UNIT */}

          <button
            type="button"
            onClick={resetForm}
            className="mt-4 flex h-[98px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#cfc3d7] bg-white text-center transition hover:bg-[#fdf9ff]"
          >

            <span className="mb-2 grid h-7 w-7 place-items-center rounded-full bg-[#eee8f1] text-[#625a66]">

              <Icon
                name="plus"
                size={15}
              />

            </span>

            <span className="text-[9px] font-medium text-[#3f3943]">
              Add Another Unit
            </span>

            <span className="mt-1 text-[8px] text-[#8b838e]">
              Add another individual unit
            </span>

          </button>

        </div>


        {/* RIGHT COLUMN — ADDED UNITS */}

        <aside className="min-w-0 w-full lg:sticky lg:top-6">

          <AddedUnitSummary
            units={units}
            setUnit={setUnit}
            setUnits={setUnits}
            setEditingId={setEditingId}
            editingId={editingId}
          />

        </aside>

      </div>


      {/* FOOTER */}

      <div className="mt-7 flex w-full items-center justify-between">

        <button
          type="button"
          onClick={onBack}
          className="h-8 rounded-md border border-[#ddd4df] bg-white px-4 text-[9px] text-[#49434d] hover:bg-gray-50"
        >
          Back
        </button>


        <button
          type="button"
          disabled={units.length === 0}
          onClick={onContinue}
          className="flex h-8 items-center gap-1.5 rounded-md bg-[#5b3894] px-5 text-[9px] font-medium text-white hover:bg-[#4e3084] disabled:cursor-not-allowed disabled:opacity-40"
        >

          Continue to Review

          <Icon
            name="arrowRight"
            size={11}
          />

        </button>

      </div>

    </div>
  </div>


  )
}