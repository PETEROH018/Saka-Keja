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
  
    useEffect(()=>{
        fetch("http://localhost:3000/apartments/1")
        .then(response=> response.json())
        .then(data => {
            setApartment(data)
            setIsLoading(false)
        })
        .catch(error => console.error(error))
    },[])

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
            <img src={apartment.image_Urls[0]} alt="Living view" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-xl font-semibold text-white">Click to expand</p>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[1]} alt="Kitchen layout" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[2]} alt="Washroom facility" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="hidden md:grid grid-cols-1 gap-3">
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 cursor-pointer" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[3]} alt="Bedroom display" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 relative cursor-pointer group" onClick={() => setShowAllPhotos(true)}>
              <img src={apartment.image_Urls[4]} alt="Complex perimeter" className="w-full h-full object-cover" />
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
        </div>
        </div>
        </main>
        </div>
        }
        </>
    )
}