import { Wifi, ShieldCheck, MapPin, Bed } from 'lucide-react';

export default function UnitCard({
  name,
  description,
  location,
  property_type: propertyType,
  bedrooms,
  rent,
  furnished,
  image_Url: imageUrl,
  ["WiFi included"]: wifiIncluded,
  ["Water reliable"]: waterReliable,
  ["Security Guard"]: securityGuard,
}) {
  return (
    <div className="unit-card group max-w-sm overflow-hidden rounded-xl border border-outline-variant bg-white shadow-sm">
      {/* Image & Badge Container */}
      <div className="relative h-48 w-full bg-gray-100">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
            {name}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3.5 w-3.5 text-gray-400 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">{description}</p>

        {/* Pricing */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-purple-900">KSh {rent.toLocaleString()}</span>
            <span className="text-xs text-gray-500">/ month</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{propertyType} | {furnished ? "Furnished" : "Unfurnished"}</p>
        </div>

        {/* Room Specs */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-600 pt-1">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-gray-500" />
            <span>{bedrooms} {bedrooms === 1 ? "Bedroom" : "Bedrooms"}</span>
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex items-center gap-2 pt-1">
          <div title="WiFi included" className={`flex h-7 w-7 items-center justify-center rounded-full ${wifiIncluded ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
            <Wifi className="h-3.5 w-3.5" />
          </div>
          <div title="Water reliable" className={`flex h-7 w-7 items-center justify-center rounded-full font-semibold text-xs ${waterReliable ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
            W
          </div>
          <div title="Security guard" className={`flex h-7 w-7 items-center justify-center rounded-full ${securityGuard ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-400"}`}>
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Action Button */}
        <button className="mt-2 w-full rounded-lg border border-outline-variant bg-white py-2 text-xs font-semibold text-on-surface-variant transition-colors hover:border-primary hover:bg-surface-container-low hover:text-primary">
          View Details
        </button>
      </div>
    </div>
  );
}