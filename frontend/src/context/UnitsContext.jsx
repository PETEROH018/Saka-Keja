import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const UnitsContext = createContext()

export function UnitsProvider({children}){

    const [allUnits,setAllUnits] = useState()

    useEffect(()=>{
        fetch(`${API_BASE_URL}/units`)
        .then(response => response.json())
        .then(data => setAllUnits(data))
    },[])

    return(
        <UnitsContext.Provider value={{allUnits}}  >
            {children}
        </UnitsContext.Provider>
    )

} 

export function useUnits(){
    return useContext(UnitsContext)
}