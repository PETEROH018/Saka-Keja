import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { Building2, Eye, MessageSquare, Heart, TrendingUp, Plus, Search, Bell, Clock, MapPin, ChevronRight, ArrowUpRight } from "lucide-react"
import useFetch from "../../hooks/useFetch"


export default function AdminDashboard() {
  const metrics = useFetch("/manager/id/metrics")
  const stats = [
    {
      id: "active-listings",
      title: "Active Listings",
      value: metrics.listings || "0",
      icon: Building2,
      iconBg: "bg-primary/10 text-primary",
      badgeBg: "bg-primary/10 text-primary",
    },
    {
      id: "total-views",
      title: "Total Views",
      value: metrics.views || "0",
      icon: Eye,
      iconBg: "bg-amber-100 text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    {
      id: "favorites",
      title: "Favorites",
      value: metrics.favorites || "0",
      icon: Heart,
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-100 text-rose-700",
    },
  ]


  const propertyOverview = [
    { id: 1, name: "Kilimani Deluxe Studio", location: "Kilimani", rent: "KSh 25,000", status: "Available", views: 482 },
    { id: 2, name: "Westlands Cozy Bedsitter", location: "Westlands", rent: "KSh 18,000", status: "Available", views: 340},
    { id: 3, name: "Parklands Student 1-Bed", location: "Parklands", rent: "KSh 30,000", status: "Occupied"},
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface font-sans text-on-surface">
      <AdminSideBar />

      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-outline-variant/50">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-on-surface-variant">
              Welcome back! Here&apos;s what&apos;s happening with your properties today.
            </p>
          </div>
        </header>

        {/* 4 Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.id}
                className="group relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-white p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                </div>

                <div>
                  <span className="block text-3xl font-extrabold tracking-tight text-on-surface mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                    {stat.title}
                  </span>
                </div>
              </div>
            )
          })}
        </section>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Listings Performance */}
          <section className="lg:col-span-5 flex flex-col gap-6">
            <div className="rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/40">
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Listings Performance
                </h2>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  3/4 Occupied
                </span>
              </div>

              <div className="space-y-3">
                {propertyOverview.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between rounded-xl border border-outline-variant/40 p-3.5 hover:bg-surface-container-low transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-on-surface">{property.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-primary">{property.rent}</span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                          <MapPin className="h-3 w-3" />
                          {property.location}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${property.status === "Available" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"}`}>
                        {property.status}
                      </span>
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-1.5">
                        <span>{property.views} views</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}