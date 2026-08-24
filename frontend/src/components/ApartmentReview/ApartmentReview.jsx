import Icon from "../Icon/Icon";
import UnitCard from "./UnitCard";

export default function ApartmentReview({  
  apartmentData = {},
  onBack,
  onEditProperty,
  onEditUnits,
  onSubmit,
  }){
  const {
    buildingName = "",
    description = "",
    address = "",
    propertyType = "",
    furnished = false,
    securityGuard = false,
    waterReliable = false,
    wifiIncluded = false,
    images = [],
    amenities = [],
    units = [],
  } = apartmentData;

function Feature({ label, active }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border px-2.5 py-2 ${
        active
          ? "border-[#d8cbe3] bg-[#eee8f2]"
          : "border-[#e5dfe8] bg-white"
      }`}
    >

      <span
        className={`flex h-3.5 w-3.5 items-center justify-center rounded-[3px] border ${
          active
            ? "border-[#5e3b95] bg-[#5e3b95] text-white"
            : "border-[#cec5d4] bg-white"
        }`}
      >
        {active && <Icon name="check" size={9} />}
      </span>

      <span className="text-[8px] text-[#625c66]">
        {label}
      </span>

    </div>
  );
}

    return(
        <div className="min-h-screen bg-white px-5 py-7 lg:px-7">
      <div className="mx-auto w-full max-w-[900px]">

        {/* HEADER */}

        <div className="mb-6">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#7652aa]">
            Property Listing
          </p>

          <h1 className="mt-1 text-[18px] font-semibold text-[#28232d]">
            Review Your Property
          </h1>

          <p className="mt-1 text-[10px] leading-5 text-[#8b838e]">
            Check your property details and units before publishing.
          </p>
        </div>

        {/*  PROPERTY OVERVIEW */}

        <section className="overflow-hidden rounded-lg border border-[#dcd3e2] bg-[#fdf9ff]">

          {/* IMAGE */}

          <div className="relative h-[210px] w-full overflow-hidden bg-[#eee8f1]">
            {images?.length > 0 ? (
              <img
                src={
                  typeof images[0] === "string"
                    ? images[0]
                    : URL.createObjectURL(images[0])
                }
                alt={buildingName || "Property"}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-[#8b838e]">
                <Icon name="image" size={28} />
                <span className="mt-2 text-[9px]">
                  No property image
                </span>
              </div>
            )}

            <div className="absolute bottom-3 left-3">
              <span className="rounded-md bg-white/95 px-2.5 py-1 text-[8px] font-medium text-[#59388f] shadow-sm">
                {propertyType || "Property"}
              </span>
            </div>
          </div>

          {/* PROPERTY DETAILS */}

          <div className="p-5">

            <div className="flex items-start justify-between gap-4">

              <div>
                <h2 className="text-[15px] font-semibold text-[#39333d]">
                  {buildingName || "Unnamed Property"}
                </h2>

                {address && (
                  <p className="mt-1 text-[9px] text-[#8b838e]">
                    {address}
                  </p>
                )}
              </div>

             <button
                type="button"
                onClick={onEditProperty}
                className="flex items-center gap-1 text-[9px] font-medium text-[#59388f] hover:text-[#452770]"
              >
                <Icon name="edit" size={11} />
                Edit
              </button> 

            </div>

            {/* DESCRIPTION */}

            {description && (
              <div className="mt-5 border-t border-[#e5dfe8] pt-4">
                <h3 className="text-[9px] font-semibold text-[#39333d]">
                  Description
                </h3>

                <p className="mt-1.5 text-[9px] leading-5 text-[#716a74]">
                  {description}
                </p>
              </div>
            )}
        </div>

        {/* PROPERTY FEATURES */}

            <div className="mt-5 border-t border-[#e5dfe8] pt-4">

              <h3 className="mb-3 text-[9px] font-semibold text-[#39333d]">
                Property Features
              </h3>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">

                <Feature
                  label="Furnished"
                  active={furnished}
                />

                <Feature
                  label="Security Guard"
                  active={securityGuard}
                />

                <Feature
                  label="Reliable Water"
                  active={waterReliable}
                />

                <Feature
                  label="Wi-Fi Included"
                  active={wifiIncluded}
                />

              </div>
            </div>

            {/* AMENITIES */}

            {amenities?.length > 0 && (
              <div className="mt-5 border-t border-[#e5dfe8] pt-4">

                <h3 className="mb-3 text-[9px] font-semibold text-[#39333d]">
                  Property Amenities
                </h3>

                <div className="flex flex-wrap gap-2">
                  {amenities.map((amenity, index) => (
                    <span
                      key={`${amenity}-${index}`}
                      className="rounded-md bg-[#eee8f2] px-2 py-1 text-[8px] text-[#5e3b95]"
                    >
                      {typeof amenity === "string"
                        ? amenity
                        : amenity?.title || "Amenity"}
                    </span>
                  ))}
                </div>

              </div>
            )}

          </section>
        </div>
        </div>
    )
}