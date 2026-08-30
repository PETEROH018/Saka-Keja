import StudentSidebar from "../../components/StudentSidebar/StudentSidebar";
import UnitCard from "../../components/UnitCard/UnitCard";

const dashboardSections = [
  {
    title: "Promoted Units",
    items: [
      {
        name: "Skyline Heights",
        description: "Modern studio apartment in a convenient location.",
        location: "Kilimani, Nairobi",
        category: "Studio",
        bedrooms: 1,
        furnished: true,
        isVerified: true,
        shared: false,
        rent: 920,
      },
    ],
  },
  {
    title: "Favorite Units",
    items: [
      {
        name: "The Apex Residences",
        description: "Comfortable apartment with convenient amenities.",
        location: "Westlands, Nairobi",
        category: "Apartment",
        bedrooms: 2,
        furnished: true,
        isVerified: true,
        shared: false,
        rent: 850,
      },
      {
        name: "Greenway Hostels",
        description: "Affordable student accommodation close to campus.",
        location: "Parklands, Nairobi",
        category: "Hostel",
        bedrooms: 1,
        furnished: true,
        isVerified: false,
        shared: true,
        rent: 420,
      },
    ],
  },
  {
    title: "View Units",
    items: [
      {
        name: "Maple Court",
        description: "Affordable and conveniently located accommodation.",
        location: "Lavington, Nairobi",
        category: "Apartment",
        bedrooms: 1,
        furnished: false,
        isVerified: true,
        shared: false,
        rent: 700,
      },
      {
        name: "Green View Residences",
        description: "Bright and comfortable student-friendly units.",
        location: "Kileleshwa, Nairobi",
        category: "Apartment",
        bedrooms: 2,
        furnished: true,
        isVerified: true,
        shared: false,
        rent: 950,
      },
      {
        name: "Parkside Hostels",
        description: "Practical student accommodation near key amenities.",
        location: "Parklands, Nairobi",
        category: "Hostel",
        bedrooms: 1,
        furnished: true,
        isVerified: false,
        shared: true,
        rent: 450,
      },
    ],
  },
];

function StudentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />

      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Here is a summary of your housing activity.
          </p>
        </header>

        <div className="space-y-8">
          {dashboardSections.map((section) => (
            <section key={section.title}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h2>

                <a
                  href="#/search"
                  className="text-sm font-medium text-purple-700 hover:text-purple-900"
                >
                  View All
                </a>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {section.items.map((unit) => (
                  <UnitCard
                    key={unit.name}
                    {...unit}
                    imageURLS={[]}
                    unit_amenity_links={[]}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;