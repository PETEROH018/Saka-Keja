import { useEffect, useState } from "react";

// This function is used to render the different icons that show an apartment's specifications
const IconRender = ({ type }) => {
  const baseClass = "w-5 h-5 text-gray-500 mb-1";
  switch (type) {
    case 'bed':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10V19a2 2 0 002 2h14a2 2 0 002-2v-9M3 10l9-7 9 7M3 10v4a2 2 0 002 2h14a2 2 0 002-2v-4" />
        </svg>
      );
    case 'bath':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12v3a4 4 0 004 4h10a4 4 0 004-4v-3M4 8h16M7 4h10M9 8v-2a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      );
    case 'sofa':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4M3 11a2 2 0 00-2 2v3a1 1 0 001 1h2a1 1 0 001-1v-1h14v1a1 1 0 001 1h2a1 1 0 001-1v-3a2 2 0 00-2-2M3 11h18M7 16v2m10-2v2" />
        </svg>
      );
    case 'wifi':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856a9.75 9.75 0 0113.788 0M1.924 8.674a14.25 14.25 0 0120.152 0M12 18.25h.008v.008H12v-.008z"/>
        </svg>
      );
    case 'security':
      return (
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      );
    case 'water':
      return(
        <svg className={baseClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-5.25 7.5-7.5 10.5-7.5 13.5a7.5 7.5 0 0015 0c0-3-2.25-6-7.5-13.5z" />
        </svg>
      )
    default:
      return null;
  }
};

export default function ApartmentDetails(){
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [apartment,setApartment] = useState({})
    const [isFavorited, setIsFavorited] = useState(false);
  
    useEffect(()=>{
        fetch("http://localhost:3000/apartments/1")
        .then(response=> response.json())
        .then(data => {
            setApartment(data)
            setIsLoading(false)
        })
        .catch(error => console.error(error))
    },[])
    //console.log(typeof(apartment['monthly-expense-breakdown']))
    // const totalCost = Object.values(apartment['monthly-expense-breakdown']).reduce((acc, curr) => acc + curr, 0);
    const formatCurrency = (amount) => {
        return `KSh ${amount.toLocaleString()}`;
        };

    return(
        
        <>
        {isLoading
        ?<p>Loading Apartment Details...</p>
        :<div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900 pb-12">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors group">
                <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Search
            </button>
        </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6">
        <section className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="md:col-span-2 aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 relative group cursor-pointer" onClick={() => setShowAllPhotos(true)}>
            <img src={apartment.image_Urls[0]} alt="apartment image" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[1]} alt="apartment image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[2]} alt="apartment image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
              </div>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[3]} alt="apartment image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
              </div>
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 relative cursor-pointer group" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[4]} alt="apartment image" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                {apartment.isVerified && (
                  <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase">✓ Verified</span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">{apartment.name}</h1>
              <p className="text-sm text-gray-500 flex items-center mt-2">
                <svg className="w-4 h-4 mr-1.5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {apartment.location}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"bed"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">bedrooms</span>
                  <span className="text-sm font-bold text-gray-800">{apartment.bedrooms}</span>
                </div>
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"bath"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">bathrooms</span>
                  <span className="text-sm font-bold text-gray-800">{apartment.bathrooms}</span>
                </div>
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"sofa"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">furnished</span>
                  <span className="text-sm font-bold text-gray-800">{apartment.furnished ? 'YES' : 'NO'}</span>
                </div>
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"wifi"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">WiFi Included</span>
                  <span className="text-sm font-bold text-gray-800">{apartment['Wifi included'] ? 'YES' : 'NO'}</span>
                </div>
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"water"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">Reliable Water</span>
                  <span className="text-sm font-bold text-gray-800">{apartment['Water reliable'] ? 'YES' : 'NO'}</span>
                </div>
                <div className="bg-white border border-gray-200/80 p-3.5 rounded-xl flex flex-col items-center justify-center text-center shadow-xs">
                  <IconRender type={"security"} />
                  <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block mb-0.5">Security Guard</span>
                  <span className="text-sm font-bold text-gray-800">{apartment['Security Guard'] ? 'YES' : 'NO'}</span>
                </div>
            </div>

            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs">
              <h3 className="text-lg font-bold text-gray-900 mb-5">What's nearby?</h3>
              <div className="space-y-4">
                {apartment['nearby amenities'].map((place, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="bg-gray-100/70 p-2.5 rounded-xl border border-gray-100/70">
                      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{place.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <aside className="sticky top-24 space-y-4">
            <div className="bg-white border-2 border-purple-600 rounded-3xl p-6 shadow-lg shadow-purple-500/5">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rent per month</span>
                <span className="text-3xl font-black text-gray-950">{apartment['monthly-expense-breakdown'].rent}</span>
              </div>
              <h2 className="text-md font-bold text-purple-700 mb-5">Estimated Monthly Cost</h2>
              
              <div className="space-y-3 mb-6 border-t border-b border-gray-100 py-5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Base Rent</span>
                  <span className="font-semibold text-gray-800">{apartment['monthly-expense-breakdown'].rent}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Electricity (Est.)</span>
                  <span className="font-semibold text-gray-800">{apartment['monthly-expense-breakdown'].electricity}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Water (Est.)</span>
                  <span className="font-semibold text-gray-800">{apartment['monthly-expense-breakdown'].water}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 font-medium">Internet (Est.)</span>
                  <span className="font-semibold text-gray-800">{apartment['monthly-expense-breakdown'].internet}</span>
                </div>
               
              </div>
              
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-sm font-extrabold text-gray-900">Total Estimated Cost</span>
                <span className="text-xl font-black text-gray-950">{Object.values(apartment['monthly-expense-breakdown']).reduce((acc, curr) => acc + curr, 0)}</span>
              </div>
              <p className="text-[11px] text-gray-400 font-medium mb-6 italic leading-relaxed">*Utilitiy costs are estimates based on average student usage metrics.</p>

              <button 
                className="w-full font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm bg-purple-700 hover:bg-purple-800 text-white shadow-purple-100 active:scale-[0.99]"
              >
               Contact Owner
              </button>
            </div>

             <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className={`w-full border font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-xs ${
                isFavorited 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 active:scale-[0.99]'
              }`}
            >
            <svg 
                className={`w-4 h-4 transition-colors ${
                    isFavorited 
                    ? 'fill-red-500 text-red-500' 
                    : 'fill-none text-gray-400'
                }`} 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
                >
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" 
                />
            </svg>
              {isFavorited ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
            </aside>
        </div>
        </main>

        {showAllPhotos && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-y-auto p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/10 sticky top-0 bg-black/95 z-10 py-4 mt-1">
              <h2 className="text-xl font-bold text-white">All Property Photos ({apartment.image_Urls.length})</h2>
              <button 
                onClick={() => setShowAllPhotos(false)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors font-bold text-sm flex items-center gap-1"
              >
                ✕ Close Gallery
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apartment.image_Urls.map((src, i) => (
                <div key={i} className="aspect-[3/2] bg-gray-900 rounded-xl overflow-hidden">
                  <img src={src} alt={`Gallery detail ${i+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
        )}
        </div>
        }
        </>
    )
}