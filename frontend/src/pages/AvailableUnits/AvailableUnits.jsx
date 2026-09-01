import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import PaymentPopup from "../../components/PaymentPopup/PaymentPopup";
import { API_BASE_URL } from "../../config/api";

import {
  ArrowLeft,
  ShieldCheck,
  Wifi,
  Bed,
  Bath,
  Layers,
  Building2,
  Sparkles,
  Info,
  CreditCard,
  Fence,
  Utensils,
  Shirt,
  Building,
} from "lucide-react";


const CATEGORIES = [
  "All Units",
  "Studio",
  "1 Bedroom",
  "2 Bedroom",
  "3+ Bedrooms",
];

export default function AvailableUnits() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("All Units");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [units,setUnits] = useState()
  const [isLoading,setIsLoading] = useState(true)
  const params = useParams()
  const apartmentId = params.id
  
  useEffect(()=>{
    fetch(`${API_BASE_URL}/apartments/${apartmentId}/units`)
    .then(response => 
    { 
      if (!response.ok){
         
          throw new Error(`Request failed with error ${response.status}`);
        
      }
      return response.json()
   })
    .then(data => {
        setUnits(data)
        setIsLoading(false)
    }
    )
    .catch(error => console.error(error))
  },[apartmentId])

  console.log(units)

  const filteredUnits = useMemo(() => {
    return isLoading? [] : units.filter( (unit) => activeTab === "All Units" || unit.category === activeTab);
  }, [activeTab,isLoading]);

  const handleOpenPayment = (unit) => {
    setSelectedUnit(unit);
    setPaymentOpen(true);
  };

  const handleClosePayment = () => {
    setPaymentOpen(false);
    setSelectedUnit(null);
  };

  const handlePaymentRequest = async ({ amount, phone }) => {
    /*
      Replace this with your backend API call.

      Example:

      const response = await fetch(
        "http://localhost:5000/api/payments/stk-push",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount,
            phone,
            unitId: selectedUnit?.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment request failed");
      }
    */

    console.log("Payment request:", {
      amount,
      phone,
      unitId: selectedUnit?.id,
    });

    // Temporary demo delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
  };

  const handleViewDetails = (unit) => {
    navigate(`/unit-details/${unit.id}`, {
      state: { unit },
    });
  };

  return (
    <div className="min-h-screen bg-[#FDF7FF] text-gray-900 font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#59388f] hover:text-[#452770] transition-colors mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Property
          </button>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Available Units
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Choose a unit and secure it with an M-Pesa payment.
            </p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {CATEGORIES.map((category) => {
              const isActive = activeTab === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "bg-[#59388f] text-white shadow-md shadow-purple-200 scale-105"
                      : "bg-white text-gray-700 hover:bg-purple-50 border border-purple-100 hover:border-purple-200"
                  }`}
                >
                  {category === "Studio" && (
                    <Building2 className="h-3.5 w-3.5" />
                  )}

                  {(category === "1 Bedroom" ||
                    category === "2 Bedroom") && (
                    <Bed className="h-3.5 w-3.5" />
                  )}

                  {category === "3+ Bedrooms" && (
                    <Sparkles className="h-3.5 w-3.5" />
                  )}

                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* EMPTY STATE */}
        {isLoading ? <p>Loading units ...</p>
        : filteredUnits.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-purple-200 bg-white p-12 text-center">
            <Info className="mx-auto h-10 w-10 text-purple-300 mb-3" />

            <h3 className="text-lg font-bold text-gray-800">
              No units found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try selecting another unit category.
            </p>

            <button
              type="button"
              onClick={() => setActiveTab("All Units")}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#59388f] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#452770]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* UNIT GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-purple-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-purple-200"
              >
                {/* IMAGE */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  <img
                    src={unit.imageURLS[0]}
                    alt={unit.id}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* AVAILABILITY */}
                  <div className="absolute left-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${
                        unit.status == 'Vacant'
                          ? "bg-emerald-500/90 text-white"
                          : "bg-gray-700/90 text-white"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          unit.status == 'Vacant'
                            ? "bg-white animate-pulse"
                            : "bg-gray-300"
                        }`}
                      />

                      {unit.status == 'Vacant'
                        ? "Available"
                        : "Occupied"}
                    </span>
                  </div>
                </div>

                {/* BODY */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#59388f] transition-colors">
                      {unit.unitName}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5 text-gray-400" />
                      {unit.shared == true ? 'shared': 'individual'} • {unit.category}
                    </p>

                    {/* PRICE */}
                    <div className="mt-4 rounded-xl bg-[#FDF7FF] p-3 border border-purple-100">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-xl font-extrabold text-[#59388f]">
                            KSh {unit.rent.toLocaleString()}
                          </span>

                          <span className="text-xs text-gray-500">
                            {" "}
                            / month
                          </span>
                        </div>
                      </div>

                      <div className="mt-1 flex items-center justify-between text-xs text-gray-600">
                        <span>Deposit Required:</span>

                        <span className="font-bold text-gray-900">
                          KSh{" "}
                          {unit.deposit.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* AMENITIES */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {unit.unit_amenity_links.map((amenity, index) => (
                        <span
                          key={`${unit.id}-${amenity}-${index}`}
                          className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-[#59388f] border border-purple-100"
                        >
                          {amenity?.amenity?.name.includes("Balcony") && (
                            <Building className="h-3 w-3" title='balcony'/>
                          )}

                          {amenity?.amenity?.name.includes("Wardrobes") && (
                            <Shirt className="h-3 w-3" title='wardrobes' />
                          )}

                          {amenity?.amenity?.name.includes("Kitchen") && (
                            <Utensils className="h-3 w-3" title='kitchen' />
                          )}

                          {amenity?.amenity?.name.includes("Sink") && (
                           <svg title='kitchen sink' xmlns="http://w3.org" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"
    >
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <rect x="4" y="9" width="16" height="9" rx="1.5" />
                              <ellipse cx="12" cy="15" rx="1.5" ry="0.75" />
                              <path d="M12 9V6a2 2 0 0 1 2-2h1a1 1 0 0 1 1 1v1" />
                              <path d="M10 9h1" />
                              <path d="M13 9h1" />
                           </svg>
                          )}

                        </span>
                      ))}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-6 grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewDetails(unit)}
                      className="w-full rounded-xl border border-purple-200 bg-white py-3 text-xs sm:text-sm font-semibold text-[#59388f] transition hover:bg-purple-50 active:scale-[0.98]"
                    >
                      Details
                    </button>

                    {/* {unit.isAvailable ? (
                      <button
                        type="button"
                        onClick={() => handleOpenPayment(unit)}
                        className="w-full rounded-xl bg-[#59388f] py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-[#452770] shadow-md shadow-purple-200 active:scale-[0.98] inline-flex items-center justify-center gap-2"
                      >
                        <CreditCard className="h-4 w-4" />
                        Reserve
                      </button>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full rounded-xl bg-gray-100 py-3 text-xs sm:text-sm font-semibold text-gray-400 cursor-not-allowed border border-gray-200"
                      >
                        Occupied
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      

        {/* PAYMENT POPUP */}
        <PaymentPopup
          isOpen={paymentOpen}
          onClose={handleClosePayment}
          amount={selectedUnit?.depositAmount ?? 0}
          onPaymentRequest={handlePaymentRequest}
        />
      </main>

      <Footer />
    </div>
  );
}