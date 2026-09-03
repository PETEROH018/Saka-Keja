import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import ImageUploader from "../../utils/ImageUploader";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/useAuth";
import React, { forwardRef } from 'react';


const unitTypeOptions = [
  "Single",
  "Bedsitter",
  "One Bedroom",
  "Two Bedroom",
  "Three Bedroom",
];

const amenityOptions = [
  "Balcony",
  "Kitchen",
  "Wardrobes",
];


function FormField({
  label,
  required = false,
  children,
}) {
  return (
    <div>

      <label className="mb-1.5 block text-[9px] font-medium text-[#3e3842] mt-2">

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

const UnitEditingForm = forwardRef(({unit,setUnit,onSave,saving},ref) => {
  
  const {user} = useAuth()
  const [apartments,setApartments] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  
  useEffect(()=>{
    fetch(`${API_BASE_URL}/owners/${user.id}/apartments`)
    .then(response => {
      if(!response.ok){
        throw new Error(`A HTTP error occured with status: ${response.status}`)
      }
      return response.json()
    })
    .then(data=> 
      {
        setApartments(data)
        console.log(data)
        setIsLoading(false)
      })
    .catch(error => alert(`Error ${error}, Owner's apartments could not be fetched`))
  },[user.id])

  const handleChange = (e) => {
    const { name, value, type, files} = e.target;
    const integerFields = ["apartment_id","bedrooms", "bathrooms", "monthlyRent", "depositAmount", "maxOccupants","size"];

    setUnit((prev) => ({
      ...prev,
      [name]: type === "file"
        ? [...(prev[name] || []), ...Array.from(files)]  
          : integerFields.includes(name)
            ? Number(value)
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
              Edit Unit
            </h2>
            {/*SELECT APARTMENT */}

            <FormField
              label="Apartment"
              required
            >
              <div className="relative">

                <select
                  name="apartment_id"
                  value={unit.apartment_id}
                  required
                  onChange={handleChange}
                  className={`${inputClass} appearance-none pr-9`}
                >
                  <option value="">
                    Select an apartment
                  </option>
                  {isLoading && <option>Loading apartments ...</option>}

                  {!isLoading && apartments.map((apartment) => (
                    <option
                      key={apartment.id}
                      value={apartment.id}
                    >
                      {apartment.name}
                    </option>
                  ))
                }
                </select>

                <Icon
                  name="chevronDown"
                  size={12}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                />

              </div>
            </FormField>

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
            <FormField label="Unit Description" required >
                <div>
                      <input
                        name="description"
                        value={unit.description}
                        onChange={handleChange}
                        placeholder="e.g. Spacious unit with two rooms"
                        className={inputClass}
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
                required
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

           <ImageUploader ref={ref} type={'unit'} />

          </div>


      </div>
      </div>


      {/* FOOTER */}

      <div className="mt-7 flex w-full items-center justify-between">

        <button
          type="button"
          disabled={saving}
          onClick={() => onSave?.()}
          className="flex h-8 items-center gap-1.5 rounded-md bg-[#5b3894] px-5 text-[9px] font-medium text-white hover:bg-[#4e3084] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {saving ? (
            <>
              {/* Tailwind's built-in animate-spin handles the continuous rotating loop */}
              <div className="w-4 height-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Uploading & Saving...</span>
            </>
          ) : (
            'Edit Unit'
          )}

        </button>

      </div>

    </div>
  </div>


  )
})
export default UnitEditingForm