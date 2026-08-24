export default function ApartmentReview(){
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
          </section>
        </div>
        </div>
    )
}