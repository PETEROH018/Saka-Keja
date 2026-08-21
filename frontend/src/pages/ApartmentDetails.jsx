import { useEffect, useState } from "react";

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
        </main>
        </div>
        }
        </>
    )
}