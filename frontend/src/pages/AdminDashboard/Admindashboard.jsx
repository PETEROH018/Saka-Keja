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

        
      </main>
    </div>
  )
}