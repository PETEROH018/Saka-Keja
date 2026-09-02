import React, { useState } from "react";
import Icon from "../Icon/Icon";
import ImageUploader from "../../utils/ImageUploader";


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


export default function ApartmentDetailsForm({onContinue,form,setForm,socialAmenities,setSocialAmenities,apartmentAmenities,setApartmentAmenities}){
        const [uploadComplete,setUploadComplete] = useState(false)
        const handleChange = (e) => {
            const { name, value, type, checked, files } = e.target;
    
            setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                ? checked
                : value
                }));
            };
        
        const handleSocialAmenityChange = (index, field, value) => {
            setSocialAmenities((prev) =>
                prev.map((amenity, i) =>
                    i === index
                    ? { ...amenity, [field]: value }
                    : amenity
                )
                );
            };
        
        const handleApartmentAmenityChange = (index, field, value) => {
            setApartmentAmenities((prev) =>
                prev.map((amenity, i) =>
                    i === index
                    ? { ...amenity, [field]: value }
                    : amenity
                )
                );
            };
    
        const addSocialAmenity = () => {
                setSocialAmenities((prev) => [
                ...prev,
                { title: "", distance: "" },
                ]);
            };
        
        const addApartmentAmenity = () => {
                setApartmentAmenities((prev) => [
                ...prev,
                { name: "", description: "" },
                ]);
            };
    
        const removeSocialAmenity = (index) => {
                setSocialAmenities((prev) =>
                prev.filter((_, i) => i !== index)
                );
            };
        
        const removeApartmentAmenity = (index) => {
                setApartmentAmenities((prev) =>
                prev.filter((_, i) => i !== index)
                );
            };
    
    return(
        <main className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-11">

             {/* INPUT FORM */}
            <form
                onSubmit={onContinue}
                className="rounded-lg border border-[#ded7e2] bg-white px-5 py-7 shadow-sm sm:px-8"
            >
            
            {/*form title */}
            <section>
              <div
                className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-md border border-dashed border-[#7048a7] bg-[#fcf8ff] text-xs font-semibold text-[#5d3a94] hover:bg-[#f8f0ff]"
              >
                <Icon name="apartment" size={17} />
                Add New Apartment Building
              </div>
            </section>
            <div className="my-7 h-px bg-[#e5dfe7]" />

            {/* Building Details */}
            <section className="mb-8">
              <h3 className="mb-4 text-[13px] font-semibold">
                New Building Details
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

            <section className="mb-8 mt-8">
              <h3 className="mb-4 text-[13px] font-semibold">
                Property Features
              </h3>

              <div className="grid gap-2.5 sm:grid-cols-2">
                <label className="flex min-h-[62px] cursor-pointer items-center gap-3 rounded-md border border-[#e2dce6] bg-[#fcf9fd] px-3">
                  <input
                    type="checkbox"
                    name="furnished"
                    checked={form.furnished}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#cfc5d6] text-white peer-checked:border-[#60409a] peer-checked:bg-[#60409a]">
                    {form.furnished && (
                      <Icon name="check" size={11} />
                    )}
                  </span>

                  <Icon
                    name="sofa"
                    size={17}
                    className="text-[#64439a]"
                  />

                  <span>
                    <strong className="block text-[10px] font-semibold">
                      Furnished
                    </strong>

                    <small className="mt-0.5 block text-[8px] text-[#8c8590]">
                      Property is furnished
                    </small>
                  </span>
                </label>      

                <label className="flex min-h-[62px] cursor-pointer items-center gap-3 rounded-md border border-[#e2dce6] bg-[#fcf9fd] px-3">
                  <input
                    type="checkbox"
                    name="wifiIncluded"
                    checked={form.wifiIncluded}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#cfc5d6] text-white peer-checked:border-[#60409a] peer-checked:bg-[#60409a]">
                    {form.wifiIncluded && (
                      <Icon name="check" size={11} />
                    )}
                  </span>

                  <Icon
                    name="wifi"
                    size={17}
                    className="text-[#64439a]"
                  />

                  <span>
                    <strong className="block text-[10px] font-semibold">
                      Wi-Fi Included
                    </strong>

                    <small className="mt-0.5 block text-[8px] text-[#8c8590]">
                      Internet is included
                    </small>
                  </span>
                </label>

                <label className="flex min-h-[62px] cursor-pointer items-center gap-3 rounded-md border border-[#e2dce6] bg-[#fcf9fd] px-3">
                  <input
                    type="checkbox"
                    name="waterReliable"
                    checked={form.waterReliable}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#cfc5d6] text-white peer-checked:border-[#60409a] peer-checked:bg-[#60409a]">
                    {form.waterReliable && (
                      <Icon name="check" size={11} />
                    )}
                  </span>

                  <Icon
                    name="water"
                    size={17}
                    className="text-[#64439a]"
                  />

                  <span>
                    <strong className="block text-[10px] font-semibold">
                      Reliable Water
                    </strong>

                    <small className="mt-0.5 block text-[8px] text-[#8c8590]">
                      Consistent water supply
                    </small>
                  </span>
                </label>

                 <label className="flex min-h-[62px] cursor-pointer items-center gap-3 rounded-md border border-[#e2dce6] bg-[#fcf9fd] px-3">
                  <input
                    type="checkbox"
                    name="securityGuard"
                    checked={form.securityGuard}
                    onChange={handleChange}
                    className="peer sr-only"
                  />

                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-[#cfc5d6] text-white peer-checked:border-[#60409a] peer-checked:bg-[#60409a]">
                    {form.securityGuard && (
                      <Icon name="check" size={11} />
                    )}
                  </span>

                  <Icon
                    name="shield"
                    size={17}
                    className="text-[#64439a]"
                  />

                  <span>
                    <strong className="block text-[10px] font-semibold">
                      Security Guard
                    </strong>

                    <small className="mt-0.5 block text-[8px] text-[#8c8590]">
                      On-site security available
                    </small>
                  </span>
                </label>
              </div>
               <section className="mb-8">

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[13px] font-semibold">
                    Add extra features in the property
                  </h3>

                  <p className="mt-1 text-[9px] text-[#8b858f]">
                    Add other features that are not included in the list above.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addApartmentAmenity}
                  className="flex shrink-0 items-center gap-1 rounded-md bg-[#eee5f7] px-2.5 py-1.5 text-[9px] font-semibold text-[#59388d] hover:bg-[#e6daf2] mt-4"
                >
                  <Icon name="plus" size={12}  />
                  Add Feature
                </button>
              </div>

              <div className="mt-4 space-y-3">

                {apartmentAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="grid gap-3 sm:grid-cols-[1fr_150px_32px]"
                  >

                    <div>
                      <label className={labelClass}>
                        Feature Name
                      </label>

                      <input
                        value={amenity.title}
                        onChange={(e) =>
                          handleApartmentAmenityChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Swimming pool"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Description
                      </label>

                      <input
                        value={amenity.description}
                        onChange={(e) =>
                          handleApartmentAmenityChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Heated swimming pool"
                        className={inputClass}
                      />
                    </div>

                    {apartmentAmenities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeApartmentAmenity(index)}
                        className="mt-auto grid h-9 place-items-center rounded-md bg-[#faeeee] text-[#9b5360] hover:bg-[#f8e2e2]"
                        title="Remove amenity"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    )}

                  </div>
                ))}

              </div>
            </section>
            </section>

            <ImageUploader type={'apartment'} form={form} setForm={setForm} uploadComplete={uploadComplete} setUploadComplete={setUploadComplete}/> 

            <section className="mb-8">

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-[13px] font-semibold">
                    Nearby Social Amenities
                  </h3>

                  <p className="mt-1 text-[9px] text-[#8b858f]">
                    Add useful places near the property and their distance.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addSocialAmenity}
                  className="flex shrink-0 items-center gap-1 rounded-md bg-[#eee5f7] px-2.5 py-1.5 text-[9px] font-semibold text-[#59388d] hover:bg-[#e6daf2]"
                >
                  <Icon name="plus" size={12} />
                  Add Social Amenity
                </button>
              </div>

              <div className="mt-4 space-y-3">

                {socialAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="grid gap-3 sm:grid-cols-[1fr_150px_32px]"
                  >

                    <div>
                      <label className={labelClass}>
                        Amenity Title
                      </label>

                      <input
                        value={amenity.title}
                        onChange={(e) =>
                          handleSocialAmenityChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Supermarket"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Distance
                      </label>

                      <input
                        value={amenity.distance}
                        onChange={(e) =>
                          handleSocialAmenityChange(
                            index,
                            "distance",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 500 m"
                        className={inputClass}
                      />
                    </div>

                    {socialAmenities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSocialAmenity(index)}
                        className="mt-auto grid h-9 place-items-center rounded-md bg-[#faeeee] text-[#9b5360] hover:bg-[#f8e2e2]"
                        title="Remove amenity"
                      >
                        <Icon name="trash" size={14} />
                      </button>
                    )}

                  </div>
                ))}

              </div>
            </section>
            
            <div className="flex justify-end gap-2 border-t border-[#e6e0e8] pt-5">

              <button
                type="submit"
                disabled = {!uploadComplete}
                className="flex h-9 items-center gap-1.5 rounded-md border border-[#5b3894] bg-[#5b3894] px-4 text-[9px] font-semibold text-white hover:bg-[#4f3084] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Review
                <Icon name="arrowRight" size={12} />
              </button>

            </div>
            </form>        
            </main>
    )
}