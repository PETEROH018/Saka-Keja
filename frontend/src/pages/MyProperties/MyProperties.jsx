import OwnerSidebar from "../../components/OwnerSidebar/OwnerSidebar";

export default function MyProperties() {
  return (
    <div className="flex min-h-screen bg-[#faf8fc]">
      <OwnerSidebar />

      <main className="flex-1 px-8 py-7">
        <h1 className="text-3xl font-bold text-gray-900">
          My Properties
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your portfolio, track inquiries, and update availability.
        </p>
      </main>
    </div>
  );
}