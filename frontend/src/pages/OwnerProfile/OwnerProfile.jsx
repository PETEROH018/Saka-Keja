import { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import Footer from "../../components/Footer/Footer";
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
  Star,
  CheckCircle2,
  Search,
  Eye,
  MessageSquare,
  Bed,
  Bath,
  Wifi,
  Edit,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

// 3 Example listings dataset for the Manage Listings section.
// NOTE: These placeholder listings will later be replaced with live data from the database.
const EXAMPLE_LISTINGS = [
  {
    id: "1",
    name: "JKUAT Serene Heights",
    location: "Juja, Near JKUAT Main Gate",
    propertyType: "Bedsitter",
    bedrooms: 0,
    bathrooms: 1,
    rent: 8000,
    status: "Available",
    isVerified: true,
    views: 482,
    inquiries: 12,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Kilimani Executive Studio",
    location: "Kilimani, Near Yaya Centre",
    propertyType: "1 Bedroom Studio",
    bedrooms: 1,
    bathrooms: 1,
    rent: 18000,
    status: "Occupied",
    isVerified: true,
    views: 920,
    inquiries: 28,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Parklands Student 1-Bed",
    location: "Parklands, Near UoN Law Campus",
    propertyType: "1 Bedroom",
    bedrooms: 1,
    bathrooms: 1,
    rent: 25000,
    status: "Available",
    isVerified: true,
    views: 610,
    inquiries: 19,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
  },
];

function OwnerProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

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
                <p className="text-xs font-medium text-emerald-600 mt-1">2 Active • 1 Occupied</p>
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
                  4.8 <Star className="h-5 w-5 fill-amber-400 text-amber-400 inline" />
                </h3>
                <p className="text-xs font-medium text-on-surface-variant mt-1">From 34 reviews</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Star className="h-6 w-6" />
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

          {/* Manage Listings Section */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Manage Listings
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  View and manage your student rental properties.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                  <input
                    type="text"
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-outline-variant/80 bg-white pl-9 pr-4 py-2 text-xs text-on-surface placeholder:text-on-surface-variant/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-secondary-container"
                  />
                </div>

                <div className="flex rounded-xl border border-outline-variant/60 bg-white p-1 shadow-2xs">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === "all"
                        ? "bg-primary text-white shadow-xs"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    All ({EXAMPLE_LISTINGS.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("available")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === "available"
                        ? "bg-primary text-white shadow-xs"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    Available
                  </button>
                  <button
                    onClick={() => setActiveTab("occupied")}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                      activeTab === "occupied"
                        ? "bg-primary text-white shadow-xs"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    Occupied
                  </button>
                </div>
              </div>
            </div>

            {/* Note: Example data notice */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 text-xs text-primary">
              💡 <strong>Note:</strong> Showing 3 example listings. These placeholder listings will later be replaced with data from the database.
            </div>

            {/* LISTINGS_GRID_INNER_PLACEHOLDER */}
          </div>
        </div>
        <div className="mt-12">
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default OwnerProfile;

