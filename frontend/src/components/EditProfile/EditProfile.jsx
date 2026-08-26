export default function EditProfile() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-6">Makazi</h1>
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden" />
            <div>
              <p className="text-sm font-semibold">Property Manager</p>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Verified Owner</span>
            </div>
          </div>
          <nav className="space-y-1">
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">Dashboard</a>
            <a href="#" className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium">My Properties</a>
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8">Edit Profile Content</main>
    </div>
  );
}
