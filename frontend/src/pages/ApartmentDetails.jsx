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

        </div>
    )
}