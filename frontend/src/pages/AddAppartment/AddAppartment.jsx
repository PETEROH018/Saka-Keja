import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";

//This is the list of the types of properties that can be listed by an owner
const propertyTypes = [
  "Mixed",
  "Single",
  "Bedsitter",
  "One Bedroom",
  "Two Bedroom",
];
//This function handles displaying different svg icons on this page
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
    dashboard: (
      <svg {...common}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),

    building: (
      <svg {...common}>
        <path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" />
        <path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h2M14 16h2" />
        <path d="M3 21h18" />
      </svg>
    ),

    plusCircle: (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),

    message: (
      <svg {...common}>
        <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.4-.7L4 20l1.7-3.7A7.2 7.2 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5a7.5 7.5 0 0 1 8 7Z" />
      </svg>
    ),

    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),

    user: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.3 3-5 7-5s6.3 1.7 7 5" />
      </svg>
    ),

    search: (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m16 16 4 4" />
      </svg>
    ),

    location: (
      <svg {...common}>
        <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2.2" />
      </svg>
    ),

    apartment: (
      <svg {...common}>
        <path d="M4 20V7h12v13" />
        <path d="M16 11h4v9" />
        <path d="M7 10h2M11 10h2M7 14h2M11 14h2M7 18h2M11 18h2" />
        <path d="M3 20h18" />
      </svg>
    ),

    upload: (
      <svg {...common}>
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    ),

    image: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9" r="1.5" />
        <path d="m4 17 5-5 3 3 2-2 6 5" />
      </svg>
    ),

    plus: (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),

    trash: (
      <svg {...common}>
        <path d="M5 7h14M10 11v5M14 11v5" />
        <path d="M8 7l1-3h6l1 3M7 7l1 14h8l1-14" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    ),

    chevronDown: (
      <svg {...common}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    ),

    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    shield: (
      <svg {...common}>
        <path d="M12 3 19 6v5c0 4.5-2.7 7.8-7 10-4.3-2.2-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),

    wifi: (
      <svg {...common}>
        <path d="M4 9a12 12 0 0 1 16 0" />
        <path d="M7 12a7.5 7.5 0 0 1 10 0" />
        <path d="M10 15a3.5 3.5 0 0 1 4 0" />
        <circle cx="12" cy="19" r=".7" fill="currentColor" stroke="none" />
      </svg>
    ),

    water: (
      <svg {...common}>
        <path d="M12 3s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" />
        <path d="M9 15a3.5 3.5 0 0 0 3 2" />
      </svg>
    ),

    furniture: (
      <svg {...common}>
        <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <path d="M4 14v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        <path d="M4 14h16v4H4zM6 18v2M18 18v2" />
      </svg>
    ),

    arrowRight: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    ),
  };

  return icons[name] || null;
};

const inputClass =
  "h-9 w-full rounded-md border border-[#ddd6e2] bg-[#fcf8fd] px-2.5 text-[10px] text-[#38333d] outline-none placeholder:text-[#aaa2ad] focus:border-[#7652aa] focus:ring-2 focus:ring-[#7652aa]/10";

const labelClass =
  "mb-1.5 block text-[9px] font-medium text-[#4c4650]";

export default function AddAppartment(){
     const [form, setForm] = useState({
        buildingName: "",
        propertyType: "",
        address: "",
        description: "",
        furnished: false,
        wifiIncluded: false,
        waterReliable: false,
        securityGuard: false,
        images: [],
      });

      const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]:
            type === "checkbox"
            ? checked
            : type === "file"
                ? Array.from(files)
                    : value,
            }));
        };

      const handleSubmit = (e) => {
        e.preventDefault();

        const propertyData = {
        ...form,
        amenities,
        };

        console.log(propertyData);
        };

    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        <div className="flex min-h-screen">
            
            {/* SIDEBAR */}
            <AdminSideBar />

            <main className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-11">
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold tracking-tight sm:text-[27px]">
                Add a New Property
                </h1>

                <p className="mt-1.5 text-[10px] text-[#77717c]">
                List a new apartment building or add units to an existing one.
                </p>
            </div>

            {/* Progress */}
            <div className="mx-auto mb-7 flex w-full max-w-[650px] items-start">
                        {[
                          ["1", "Location"],
                          ["2", "Units"],
                          ["3", "Review"],
                        ].map(([number, label], index) => (
                          <React.Fragment key={number}>
            
                            <div className="flex min-w-[55px] flex-col items-center gap-1.5">
                              <div
                                className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[8px] ${
                                  index === 0
                                    ? "bg-[#5e3b95] text-white"
                                    : "bg-[#eeeaf0] text-[#746d78]"
                                }`}
                              >
                                {number}
                              </div>
            
                              <span
                                className={`text-[8px] ${
                                  index === 0
                                    ? "text-[#5e3b95]"
                                    : "text-[#aaa4ad]"
                                }`}
                              >
                                {label}
                              </span>
                            </div>
            
                            {index < 3 && (
                              <div className="mt-2 h-px flex-1 bg-[#dad3de]" />
                            )}
            
                          </React.Fragment>
                        ))}
            </div>
            
             {/* INPUT FORM */}
            <form
                onSubmit={handleSubmit}
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
                  placeholder="Briefly describe the amenities and general vibe of the building..."
                  className="w-full resize-y rounded-md border border-[#ddd6e2] bg-[#fcf8fd] p-2.5 text-[10px] outline-none placeholder:text-[#aaa2ad] focus:border-[#7652aa] focus:ring-2 focus:ring-[#7652aa]/10"
                />
              </div>
            </section>

            <section className="mb-8">
              <h3 className="mb-4 text-[13px] font-semibold">
                Property Features
              </h3>

              <div className="grid gap-2.5 sm:grid-cols-2">

              </div>
            </section>
            </form>


            </main>
        </div>
        </div>
    )
}