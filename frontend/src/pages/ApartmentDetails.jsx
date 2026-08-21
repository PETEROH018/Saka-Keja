import { useEffect, useState } from "react";

export default function ApartmentDetails(){
    const [apartment,setApartment] = useState()
    useEffect(()=>{
        fetch("http://localhost:3000/apartments/1")
        .then(response=> response.json())
        .then(data => {
            setApartment(data)
            console.log(data)
        })
        .catch(error => console.error(error))
    },[])

    return(
        <div className="min-h-screen bg-gray-50 font-sans antialiased text-gray-900 pb-12">
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
        </div>
    )
}