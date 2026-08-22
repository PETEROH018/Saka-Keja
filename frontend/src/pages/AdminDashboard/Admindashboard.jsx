import AdminSideBar from "../../components/AdminSideBar/AdminSideBar"
import { Building2, Eye, MessageSquare, Heart, TrendingUp, Plus, Search, Bell, Clock, MapPin, ChevronRight, ArrowUpRight } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    {
      id: "active-listings",
      title: "Active Listings",
      value: "4",
      change: "+1 this week",
      icon: Building2,
      iconBg: "bg-primary/10 text-primary",
      badgeBg: "bg-primary/10 text-primary",
    },
    {
      id: "total-views",
      title: "Total Views",
      value: "1,245",
      change: "+124 this week",
      icon: Eye,
      iconBg: "bg-amber-100 text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    {
      id: "new-inquiries",
      title: "New Inquiries",
      value: "17",
      change: "+5 today",
      icon: MessageSquare,
      iconBg: "bg-indigo-100 text-indigo-700",
      badgeBg: "bg-indigo-100 text-indigo-800",
    },
    {
      id: "favorites",
      title: "Favorites",
      value: "43",
      change: "+8 this week",
      icon: Heart,
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-100 text-rose-700",
    },
  ]

  const recentInquiries = [
    { id: 1, name: "Brian Kipchumba", property: "Kilimani Deluxe Studio", message: "Is the apartment available for rent starting next month?", time: "2h ago", status: "New", avatar: "BK" },
    { id: 2, name: "Amina Mohamed", property: "Westlands Cozy Bedsitter", message: "Does the rent include high-speed Wi-Fi and water?", time: "5h ago", status: "New", avatar: "AM" },
    { id: 3, name: "Kevin Ochieng", property: "Parklands Student 1-Bed", message: "Can I schedule a physical viewing this Saturday?", time: "1d ago", status: "Pending", avatar: "KO" },
  ]

  const propertyOverview = [
    { id: 1, name: "Kilimani Deluxe Studio", location: "Kilimani", rent: "KSh 25,000", status: "Available", views: 482, inquiries: 7 },
    { id: 2, name: "Westlands Cozy Bedsitter", location: "Westlands", rent: "KSh 18,000", status: "Available", views: 340, inquiries: 5 },
    { id: 3, name: "Parklands Student 1-Bed", location: "Parklands", rent: "KSh 30,000", status: "Occupied", views: 295, inquiries: 3 },
  ]

  return (
    <div className="flex min-h-screen bg-surface font-sans text-on-surface">
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

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search listings..."
                className="h-10 rounded-xl border border-outline-variant bg-white pl-9 pr-4 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-secondary-container"
              />
            </div>
            
            <button 
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-outline-variant bg-white text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>

            <button 
              type="button"
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-primary-container active:scale-[0.98]"
            >
              <Plus className="h-4 w-4" />
              <span>Add Property</span>
            </button>
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
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${stat.badgeBg}`}>
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
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
          {/* Recent Inquiries */}
          <section className="lg:col-span-7 flex flex-col rounded-2xl border border-outline-variant/60 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/40">
              <div>
                <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Recent Inquiries
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  17 new inquiries received
                </p>
              </div>
              <button className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                View All (17)
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-4 flex-1">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-outline-variant/40 p-4 transition-all hover:bg-surface-container-low hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary-container text-xs font-bold text-on-secondary-container">
                      {inquiry.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-on-surface">{inquiry.name}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${inquiry.status === "New" ? "bg-indigo-100 text-indigo-700" : "bg-amber-100 text-amber-800"}`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-primary mt-0.5">{inquiry.property}</p>
                      <p className="text-xs text-on-surface-variant line-clamp-1 mt-1">&quot;{inquiry.message}&quot;</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-outline-variant/30">
                    <span className="flex items-center gap-1 text-[11px] text-on-surface-variant">
                      <Clock className="h-3 w-3" />
                      {inquiry.time}
                    </span>
                    <button className="rounded-lg bg-surface-container-low px-3 py-1 text-xs font-semibold text-primary border border-outline-variant/60 hover:bg-primary hover:text-white transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
                        <span>•</span>
                        <span>{property.inquiries} inq.</span>
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