import { useState } from "react";
import { 
  Users, 
  Banknote, 
  Bed, 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  ChevronDown 
} from "lucide-react";

export default function Filter({ onSearch, onFilter }) {
  const [isShared, setIsShared] = useState("");
  const [price, setPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [kitchenette, setKitchenette] = useState(false);
  const [wardrobe, setWardrobe] = useState(false);
  const [balcony, setBalcony] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterData = {
      isShared: isShared === "" ? undefined : isShared === "true",
      price,
      bedrooms,
      kitchenette,
      wardrobe,
      balcony,
    };
    if (!isShared && !price && !bedrooms && !kitchenette && !wardrobe && !balcony) {
      onSearch(filterData);
    } else {
      onFilter(filterData);
    }
  };

  const handleReset = () => {
    setIsShared("");
    setPrice("");
    setBedrooms("");
    setKitchenette(false);
    setWardrobe(false);
    setBalcony(false);
    const emptyFilters = {
      isShared: undefined,
      price: "",
      bedrooms: "",
      kitchenette: false,
      wardrobe: false,
      balcony: false,
    };
    if (onSearch) onSearch(emptyFilters);
    if (onFilter) onFilter(emptyFilters);
  };

  const hasActiveFilters = Boolean(isShared || price || bedrooms || kitchenette || wardrobe || balcony);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4 sm:px-6">
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-lg shadow-violet-950/5 p-4 sm:p-6 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-violet-50 text-violet-700 rounded-lg">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Filter Properties</h2>
              <p className="text-xs text-gray-500">Find student housing matching your preferences</p>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-violet-700 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Filter Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Shared/Private Field */}
          <div className="md:col-span-4 flex flex-col gap-1.5">
            <label htmlFor="filter-shared" className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-violet-600" />
              <span>Unit Type</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                id="filter-shared"
                name="isShared"
                value={isShared}
                onChange={(e) => setIsShared(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">Any</option>
                <option value="true">Shared</option>
                <option value="false">Private / Self-contained</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
    
          {/* Max Rent Field */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label htmlFor="filter-price" className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
              <Banknote className="h-3.5 w-3.5 text-violet-600" />
              <span>Max Rent</span>
            </label>
            <div className="relative">
              <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                id="filter-price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">Any price</option>
                <option value="5000">Under KSh 5,000</option>
                <option value="10000">Under KSh 10,000</option>
                <option value="15000">Under KSh 15,000</option>
                <option value="20000">Under KSh 20,000</option>
                <option value="25000">Under KSh 25,000</option>
                <option value="30000">KSh 30,000+</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Bedrooms / Property Type Field */}
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <label htmlFor="filter-bedrooms" className="text-xs font-medium text-gray-700 flex items-center gap-1.5">
              <Bed className="h-3.5 w-3.5 text-violet-600" />
              <span>Property Type</span>
            </label>
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              <select
                id="filter-bedrooms"
                name="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 text-sm bg-gray-50/70 border border-gray-200 rounded-xl focus:bg-white focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 outline-none transition-all text-gray-900 appearance-none cursor-pointer"
              >
                <option value="">Any type</option>
                <option value="bedsitter">Bedsitter</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3+">3+ Bedrooms</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Amenities Field */}
          <div className="md:col-span-12 flex flex-wrap items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={kitchenette}
                onChange={(e) => setKitchenette(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-500/20"
              />
              Kitchenette
            </label>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={wardrobe}
                onChange={(e) => setWardrobe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-500/20"
              />
              Wardrobe
            </label>
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={balcony}
                onChange={(e) => setBalcony(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-violet-700 focus:ring-violet-500/20"
              />
              Balcony
            </label>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-[42px] bg-violet-700 hover:bg-violet-800 text-white font-medium text-sm rounded-xl transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}