import { useState } from "react";

const Icon = ({ name, size = 16, className = "" }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
  };

  const icons = {
    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    plus: (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),

    arrowRight: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),

    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),

    edit: (
      <svg {...common}>
        <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
        <path d="m13 6 4 4" />
      </svg>
    ),

    trash: (
      <svg {...common}>
        <path d="M5 7h14" />
        <path d="M10 11v5M14 11v5" />
        <path d="M8 7l1-3h6l1 3" />
        <path d="M7 7l1 14h8l1-14" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const unitTypeOptions = [
  "Single",
  "Bedsitter",
  "One Bedroom",
  "Two Bedroom",
  "Three Bedroom",
];

const emptyUnit = {
  unitTypeName: "",
  numberOfUnits: "",
  monthlyRent: "",
  depositAmount: "",
  size: "",
  shared: false,
  bathrooms: "0",
  bedrooms: "0",
  amenities: [],
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

export default function ApartmentUnitForm(){
  const [unit, setUnit] = useState(emptyUnit);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUnit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return(
    <div className="border-b border-[#e4dce8] bg-[#fcf8fd] px-5 pb-6 pt-7 lg:px-7">
        <h1 className="text-[22px] font-bold tracking-tight">
          Add Units
        </h1>

        <p className="mt-1 text-[10px] text-[#77717c]">
          Add the individual units available in this
          apartment.
        </p>

      <div className="mx-auto max-w-[900px] px-5 py-7 lg:px-7">

        <div className="grid gap-6 lg:grid-cols-[1fr_220px]">


          {/* LEFT COLUMN */}

          <div>

            {/* UNIT FORM */}

            <div className="rounded-lg border border-[#dcd3e2] bg-[#fdf9ff] p-4">

              <h2 className="mb-5 text-[12px] font-semibold">
                {editingId
                  ? "Edit Unit Type"
                  : "Add Unit Type"}
              </h2>
                  <FormField
                label="Unit Type"
                required
              >

                <div className="relative">

                  <select
                    name="unitType"
                    value={unit.unitType}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none pr-9`}
                  >

                    <option value="">
                      Select unit type
                    </option>

                    {unitTypeOptions.map(
                      (type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      )
                    )}

                  </select>


                  <Icon
                    name="chevronDown"
                    size={12}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#756d7a]"
                  />

                </div>

              </FormField>

              </div>
              </div>
              </div>
              </div>
              </div>

  )
}