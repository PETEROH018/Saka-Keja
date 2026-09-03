import Icon from "../Icon/Icon";
import ImageUploader from "../../utils/ImageUploader";
import React, { forwardRef } from 'react';


//This is the list of the types of properties that can be listed by an owner
const propertyTypes = [
  "Mixed",
  "Single",
  "Bedsitter",
  "One Bedroom",
  "Two Bedroom",
];

const inputClass =
  "h-9 w-full rounded-md border border-[#ddd6e2] bg-[#fcf8fd] px-2.5 text-[10px] text-[#38333d] outline-none placeholder:text-[#aaa2ad] focus:border-[#7652aa] focus:ring-2 focus:ring-[#7652aa]/10";

const labelClass =
  "mb-1.5 block text-[9px] font-medium text-[#4c4650]";


const ApartmentEditingForm = forwardRef (({form,setForm,onSubmit,isSaving},ref) => {
     const handleChange = (e) => {
            const { name, value } = e.target;
    
            setForm((prev) => ({
            ...prev,
            [name]: value
                }));
            };
        
    
    return(
        <main className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-11">

             {/* INPUT FORM */}
            <form
                className="rounded-lg border border-[#ded7e2] bg-white px-5 py-7 shadow-sm sm:px-8"
            >
            
            {/*form title */}
            <section>
              <div
                className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#7048a7] bg-[#fcf8ff] text-xs font-semibold text-[#5d3a94] hover:bg-[#f8f0ff]"
              >
                <Icon name="apartment" size={17} />
                Edit the details of your Apartment Building
              </div>
            </section>
            <div className="my-7 h-px bg-[#e5dfe7]" />

            {/* Building Details */}
            <section className="mb-8">
              <h3 className="mb-4 text-[13px] font-semibold">
                Edit Building Details
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">

                <div>
                  <label className={labelClass}>
                    Building Name
                  </label>

                  <input
                    name="buildingName"
                    value={form.buildingName}
                    onChange={handleChange}
                    placeholder="e.g. Equity Residences"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Building Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Juja,Nakuru,Kisumu"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Property Type
                  </label>

                  <div className="relative">
                    <select
                      name="propertyType"
                      value={form.propertyType}
                      onChange={handleChange}
                      required
                      className={`${inputClass} appearance-none pr-8`}
                    >
                      <option value="">
                        Select Type...
                      </option>

                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    <Icon
                      name="chevronDown"
                      size={13}
                      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <label className={labelClass}>
                  Building Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Briefly describe the social amenities and general vibe of the building..."
                  className="w-full resize-y rounded-md border border-[#ddd6e2] bg-[#fcf8fd] p-2.5 text-[10px] outline-none placeholder:text-[#aaa2ad] focus:border-[#7652aa] focus:ring-2 focus:ring-[#7652aa]/10"
                />
              </div>
            </section>

            <ImageUploader ref={ref} type={'apartment'}  /> 
            
            <div className="flex justify-end gap-2 border-t border-[#e6e0e8] pt-5">

            <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => onSubmit?.()}
                  className="flex h-8 items-center gap-1.5 rounded-md bg-[#5b3894] px-5 text-[9px] font-medium text-white hover:bg-[#4e3084] disabled:cursor-not-allowed disabled:opacity-40"
            >
          {isSaving? (
            <>
              {/* Tailwind's built-in animate-spin handles the continuous rotating loop */}
              <div className="w-4 height-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Uploading & Saving...</span>
            </>
          ) : (
            'Update Property'
          )}

        </button>    

            </div>
            </form>        
            </main>
    )
})

export default ApartmentEditingForm