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
  Users,
  CheckCircle2,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";


function OwnerProfile() {
  const EXAMPLE_LISTINGS = useFetch('http://localhost:3000/apartments');

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
                    JD
                  </div>
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-xs" title="Verified Landlord">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-2xl font-bold text-on-surface">John Doe</h2>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-outline-variant/60 bg-white p-5 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Total Listings
                </p>
                <h3 className="text-2xl font-extrabold text-on-surface mt-1">3</h3>
                <p className="text-xs font-medium text-emerald-600 mt-1">2 Active </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Building2 className="h-6 w-6" />
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant/60 bg-white p-5 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Active Tenants
                </p>
                <h3 className="text-2xl font-extrabold text-on-surface mt-1">12</h3>
                <p className="text-xs font-medium text-emerald-600 mt-1">100% Rent On-Time</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant/60 bg-white p-5 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Average Rating
                </p>
                <h3 className="text-2xl font-extrabold text-on-surface mt-1 flex items-center gap-1">
                </h3>
                <p className="text-xs font-medium text-on-surface-variant mt-1">From 34 reviews</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Star/>
              </div>
            </div>

            <div className="rounded-2xl border border-outline-variant/60 bg-white p-5 shadow-2xs flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                  Response Rate
                </p>
                <h3 className="text-2xl font-extrabold text-on-surface mt-1">98%</h3>
                <p className="text-xs font-medium text-emerald-600 mt-1">Avg response &lt; 2 hrs</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

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

