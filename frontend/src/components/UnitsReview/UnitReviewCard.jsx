import Icon from "../Icon/Icon";
function UnitDetail({
  icon,
  label,
  value,
}) {
  return (
    <div className="rounded-md bg-white px-2.5 py-2">

      <div className="flex items-center gap-1.5">

        {icon && (
          <span className="text-[#7652aa]">
            <Icon name={icon} size={10} />
          </span>
        )}

        <span className="text-[7px] text-[#8b838e]">
          {label}
        </span>

      </div>

      <p className="mt-1 text-[8px] font-medium text-[#49434d]">
        {value}
      </p>

    </div>
  );
}


export default function UnitReviewCard({ unit, formatCurrency }){
    return (
    <div className="rounded-lg border border-[#dcd3e2] bg-[#fdf9ff] p-4">

      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">

        <div>
          <h3 className="text-[10px] font-semibold text-[#39333d]">
            {unit.unitNumber || "Unit"}
          </h3>

          <p className="mt-0.5 text-[8px] text-[#746d78]">
            {unit.unitType || "—"}
          </p>
        </div>

        <div className="rounded-md bg-[#eee8f2] px-2 py-1 text-[8px] font-medium text-[#5e3b95]">
          KSh {formatCurrency(unit.monthlyRent)}/mo
        </div>

      </div>


      {/* DETAILS */}

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

        <UnitDetail
          icon="bed"
          label="Bedrooms"
          value={unit.bedrooms ?? "0"}
        />

        <UnitDetail
          icon="bath"
          label="Bathrooms"
          value={unit.bathrooms ?? "0"}
        />

        <UnitDetail
          label="Size"
          value={
            unit.size
              ? `${unit.size} sq ft`
              : "—"
          }
        />

        <UnitDetail
          label="Deposit"
          value={
            `KSh ${formatCurrency(
              unit.depositAmount
            )}`
          }
        />

      </div>


      {/* AMENITIES */}

      {unit.amenities?.length > 0 && (
        <div className="mt-4 border-t border-[#e5dfe8] pt-3">

          <p className="mb-2 text-[8px] font-medium text-[#625c66]">
            Amenities
          </p>

          <div className="flex flex-wrap gap-1.5">

            {unit.amenities.map((amenity, index) => (
              <span
                key={`${amenity}-${index}`}
                className="rounded bg-[#eee8f2] px-1.5 py-1 text-[7px] text-[#5e3b95]"
              >
                {amenity}
              </span>
            ))}

          </div>

        </div>
      )}


      {/* SHARED */}

      {unit.shared && (
        <div className="mt-3">

          <span className="rounded bg-[#eee8f2] px-1.5 py-1 text-[7px] text-[#5e3b95]">
            Shared Unit
          </span>

        </div>
      )}

    </div>
  );
}