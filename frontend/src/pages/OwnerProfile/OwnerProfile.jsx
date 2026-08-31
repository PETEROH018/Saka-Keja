import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import Footer from "../../components/Footer/Footer";
import UnitsGrid from "../../components/UnitssGrid/UnitsGrid";
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  PlusCircle,
  Building2,
  Eye,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/useAuth";


function OwnerProfile() {
  const { user } = useAuth();
  const managerId = 1
  const metrics = useFetch(`/manager/${managerId}/metrics`)
  const EXAMPLE_LISTINGS = useFetch('http://localhost:3000/apartments');
  const stats = [
    {
      id: "active-listings",
      title: "Active Listings",
      value: metrics.data?.listings ?? 0,
      icon: Building2,
      iconBg: "bg-primary/10 text-primary",
      badgeBg: "bg-primary/10 text-primary",
    },
    {
      id: "total-views",
      title: "Total Views",
      value: metrics.data?.views ?? 0,
      icon: Eye,
      iconBg: "bg-amber-100 text-amber-700",
      badgeBg: "bg-amber-100 text-amber-800",
    },
    {
      id: "favorites",
      title: "Favorites",
      value: metrics.data?.favorites ?? 0,
      icon: Heart,
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-100 text-rose-700",
    },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-surface font-sans text-on-surface">
      <AdminSideBar />

      <main className="flex-1 overflow-x-hidden p-4 md:p-8 flex flex-col justify-between">
        <div className="space-y-8 max-w-7xl mx-auto w-full">
          {/* Header Title Section */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-outline-variant/40">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface">
                Owner Profile
              </h1>
              <p className="text-sm text-on-surface-variant mt-1">
                Manage your profile details and property listings.
              </p>
            </div>
            <Link
              to="/add-property"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-container transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>List New Property</span>
            </Link>
          </div>

          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-2xl border border-outline-variant/60 bg-white p-6 md:p-8 shadow-2xs">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary-container to-secondary-container" />

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="relative">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-md border-4 border-surface-container-low">
                    {user?.name?.charAt(0) || "J"}
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs" title="Verified Landlord">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl font-bold text-on-surface">{user?.name || "Manager"}</h2>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified Property Owner
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                    Experienced property manager dedicated to providing safe, comfortable, and affordable student housing near top university campuses.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-on-surface-variant">
                    <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40">
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      <span>john.doe@sakakeja.co.ke</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40">
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      <span>+254 712 345 678</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span>Nairobi, Kenya</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-lg border border-outline-variant/40">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>Joined March 2023</span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="flex items-center gap-2 rounded-xl border border-outline-variant/80 bg-white px-4 py-2.5 text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-primary hover:border-primary/40 transition-colors shadow-2xs">
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
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

          <section>
            <div className="flex items-center justify-between border-b border-outline-variant/40 pb-4">
              <div>
                <h2 className="text-xl font-bold text-on-surface">Your Listings</h2>
                <p className="mt-1 text-sm text-on-surface-variant">
                  View and manage the properties on your profile.
                </p>
              </div>
            </div>
            <UnitsGrid
              units={EXAMPLE_LISTINGS.data}
              loading={EXAMPLE_LISTINGS.loading}
              error={EXAMPLE_LISTINGS.error}
            />
          </section>
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default OwnerProfile;

