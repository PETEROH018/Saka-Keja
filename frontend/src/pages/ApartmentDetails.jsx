import { useEffect } from "react";

export default function ApartmentDetails(){
    useEffect(()=>{
        fetch("http://localhost:3000/apartments/1")
        .then(response=> response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    },[])
}