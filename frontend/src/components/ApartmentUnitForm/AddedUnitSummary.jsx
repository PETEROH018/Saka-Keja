import { useState } from "react";

export default function({units,setUnit,setUnits,setEditingId}){
    
    const handleEdit = (item) => {
        setEditingId(item.id);

        setUnit({
        unitType: item.unitType,
        monthlyRent: item.monthlyRent,
        depositAmount:
            item.depositAmount,
        size: item.size,
        shared: item.shared ?? false,
        bathrooms:
            String(item.bathrooms ?? 0),
        bedrooms:
            String(item.bedrooms ?? 0),
        amenities:
            item.amenities ?? [],
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
                <Icon
                  name="edit"
                  size={11}
                />
              </button>


              <button
                type="button"
                onClick={() =>
                  handleDelete(item.id)
                }
                className="text-[#756d79] hover:text-red-500"
                title="Delete"
              >
                <Icon
                  name="trash"
                  size={11}
                />
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