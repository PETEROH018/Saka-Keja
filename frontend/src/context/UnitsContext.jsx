import { createContext, useEffect } from "react";

const UnitsContext = createContext()

export default function UnitsProvider({children}){

    const [allUnits,setAllUnits] = useState()

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/units')
        .then(response => response.json())
        .then(data => setAllUnits(data))
    },[])

    return(
        <UnitsContext.Provider value={{allUnits}}  >
            {children}
        </UnitsContext.Provider>
    )

} 