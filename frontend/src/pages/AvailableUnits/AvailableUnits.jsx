import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  Wifi,
  Bed,
  Bath,
  Layers,
  Search,
  X,
  Building2,
  Sparkles,
  MapPin,
  Info
} from "lucide-react";


const INITIAL_UNITS = [
  {
    id: "unit-101",
    unitName: "Studio Unit - Unit 101",
    floorLevel: "Ground Floor",
    category: "Studio",
    rentAmount: 12000,
    depositAmount: 12000,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Water Reliable", "Security Guard"],
    isAvailable: true,
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    id: "unit-104",
    unitName: "Studio Unit - Unit 104",
    floorLevel: "Ground Floor",
    category: "Studio",
    rentAmount: 14000,
    depositAmount: 14000,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Balcony", "Security Guard"],
    isAvailable: true,
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    id: "unit-201",
    unitName: "1 Bedroom Executive - Unit 201",
    floorLevel: "1st Floor",
    category: "1 Bedroom",
    rentAmount: 18000,
    depositAmount: 18000,
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Balcony", "Furnished", "Water Reliable"],
    isAvailable: true,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "unit-205",
    unitName: "1 Bedroom Standard - Unit 205",
    floorLevel: "2nd Floor",
    category: "1 Bedroom",
    rentAmount: 16500,
    depositAmount: 16500,
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Security Guard", "Water Reliable"],
    isAvailable: true,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    id: "unit-302",
    unitName: "2 Bedroom Master Suite - Unit 302",
    floorLevel: "3rd Floor",
    category: "2 Bedroom",
    rentAmount: 25000,
    depositAmount: 25000,
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Balcony", "Parking Spot", "Water Reliable"],
    isAvailable: true,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    id: "unit-306",
    unitName: "2 Bedroom Standard - Unit 306",
    floorLevel: "3rd Floor",
    category: "2 Bedroom",
    rentAmount: 22000,
    depositAmount: 22000,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Balcony", "Security Guard"],
    isAvailable: false,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    id: "unit-401",
    unitName: "3 Bedroom Penthouse - Unit 401",
    floorLevel: "4th Floor",
    category: "3+ Bedrooms",
    rentAmount: 35000,
    depositAmount: 35000,
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    amenities: ["Free WiFi", "Ensuite Bathroom", "Balcony", "Furnished", "Parking Spot"],
    isAvailable: true,
    bedrooms: 3,
    bathrooms: 2,
  },
];

const CATEGORIES = ["All Units", "Studio", "1 Bedroom", "2 Bedroom", "3+ Bedrooms"];

export default function AvailableUnits() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Units");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredUnits = useMemo(() => {
    return INITIAL_UNITS.filter((unit) => {
      const matchesCategory =
        activeTab === "All Units" || unit.category === activeTab;
      const matchesSearch =
        unit.unitName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.floorLevel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        unit.amenities.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const handleBook = (unit) => {
    setSelectedUnit(unit);
    setBookingSuccess(false);
  };

  const confirmBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedUnit(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDF7FF] text-gray-900 font-sans flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= HEADER & NAVIGATION ================= */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#59388f] hover:text-[#452770] transition-colors mb-4 group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Property
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                Available Units
              </h1>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
