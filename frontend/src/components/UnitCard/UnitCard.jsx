import { Wifi, Phone, ShieldCheck, MapPin, Bed, Bath } from 'lucide-react';

export default function UnitCard(unit) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image & Badge Container */}
      <div className="relative h-48 w-full bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
          alt="Modern 2 Bedroom Apartment"
          className="h-full w-full object-cover"
        />
        {/* Verified Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-emerald-700 backdrop-blur-sm shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>Verified Listing</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 flex flex-col gap-3">
        {/* Title and Location */}
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Modern 2 Bedroom Apartment
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span>Kahawa Sukari</span>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-purple-900">KSh 28,000</span>
            <span className="text-xs text-gray-500">/ month</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">KSh 28,000 deposit</p>
        </div>

        {/* Room Specs */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600 pt-1">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-gray-500" />
            <span>2 Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gray-500" />
            <span>1 Bath</span>
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Wifi className="h-3.5 w-3.5" />
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 font-semibold text-xs">
            P
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Phone className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-2 w-full rounded-lg border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}