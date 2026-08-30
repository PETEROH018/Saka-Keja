import { useState } from "react";

export default function({units,setUnit,setUnits,setEditingId,editingId}){
    
    const handleEdit = (item) => {
        setEditingId(item.id);

        setUnit({
        unitType: item.unitType,
        monthlyRent: item.monthlyRent,
        depositAmount:
            item.depositAmount,
        size: item.size,
        shared: item.shared ?? false,
        bathrooms: String(item.bathrooms ?? 0),
        bedrooms: String(item.bedrooms ?? 0),
        amenities: item.amenities ?? [],
        images: item.images ?? [],
        });

        window.scrollTo({
        top: 0,
        behavior: "smooth",
        });
    };

    /* DELETE */

    const handleDelete = (id) => {
        setUnits((prev) =>
        prev.filter(
            (item) => item.id !== id
        )
        );

        if (editingId === id) {
        resetForm();
        }
    };

    return(
   <div className="h-fit overflow-hidden rounded-lg border border-[#d9d0df] bg-[#fdf9ff]">

      {/* HEADER */}

      <div className="border-b border-[#ddd5e1] px-4 py-4">

        <h3 className="text-[10px] font-semibold text-[#39333d]">
          Added Units
        </h3>

        <p className="mt-1 text-[8px] text-[#8b838e]">
          {units.length}{" "}
          {units.length === 1
            ? "unit"
            : "units"}{" "}
          added
        </p>

      </div>


      {/* EMPTY STATE */}

      {units.length === 0 && (
        <div className="px-4 py-7 text-center">

          <p className="text-[9px] text-[#8b838e]">
            No units added yet.
          </p>

        </div>
      )}


      {/* UNIT CARDS */}

      {units.map((item) => (

        <div
          key={item.id}
          className="border-b border-[#ddd5e1] px-4 py-4"
        >

          {/* UNIT NUMBER + ACTIONS */}

          <div className="flex items-start justify-between gap-2">

            <div>

              <h4 className="text-[10px] font-semibold text-[#39333d]">
                {item.unitNumber}
              </h4>

              <p className="mt-0.5 text-[8px] text-[#746d78]">
                {item.unitType}
              </p>

              <p className="mt-0.5 text-[8px] text-[#746d78]">
                Maximum Occupants : {item.maxOccupants}
              </p>

            </div>


            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={() =>
                  handleEdit(item)
                }
                className="text-[#756d79] hover:text-[#59388f]"
                title="Edit"
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              </button>


              <button
                type="button"
                onClick={() =>
                  handleDelete(item.id)
                }
                className="text-[#756d79] hover:text-red-500"
                title="Delete"
              >
                <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>

            </div>

          </div>


          {/* RENT */}

          <div className="mt-2">

            <span className="text-[8px] text-[#5e5861]">
              KSh{" "}
              {Number(
                item.monthlyRent
              ).toLocaleString()}
              /mo
            </span>

          </div>


          {/* BEDROOMS / BATHROOMS */}

          <div className="mt-2 text-[8px] text-[#716a74]">

            <span>
              {item.bedrooms}{" "}
              {item.bedrooms === "1"
                ? "Bedroom"
                : "Bedrooms"}
            </span>

            <span className="mx-1">
              ·
            </span>

            <span>
              {item.bathrooms}{" "}
              {item.bathrooms === "1"
                ? "Bathroom"
                : "Bathrooms"}
            </span>

          </div>


          {/* SHARED */}

          {item.shared && (
            <div className="mt-1">

              <span className="rounded bg-[#eee8f2] px-1.5 py-0.5 text-[8px] text-[#5e3b95]">
                Shared
              </span>

            </div>
          )}


          {/* AMENITIES */}

          {item.amenities?.length > 0 && (
            <p className="mt-2 text-[8px] leading-4 text-[#716a74]">
              {item.amenities.join(
                ", "
              )}
            </p>
          )}

        </div>

      ))}

    </div>

    )
}