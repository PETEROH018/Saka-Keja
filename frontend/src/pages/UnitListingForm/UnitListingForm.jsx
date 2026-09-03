import { useState } from "react";
import React, { useRef } from 'react';
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import ApartmentUnitForm from "../../components/ApartmentUnitForm/ApartmentUnitForm";
import { API_BASE_URL } from "../../config/api";

const emptyUnit = {
  apartment_id:"",
  unitType:"",
  description:"",
  monthlyRent: "",
  depositAmount: "",
  size: 0,
  shared: false,
  bathrooms: 0,
  bedrooms: 0,
  maxOccupants: 1,
  unitAmenities: [],
};

export default function UnitListingForm(){
      const [isSubmitting,setIsSubmitting] = useState(false)
      const [unit, setUnit] = useState(emptyUnit);
      const childRef = useRef(null);
      
const  handleSubmit =async () => {
              if(!unit.unitType || !unit.description || !unit.monthlyRent || !unit.depositAmount)
                {
                    alert("Please fill the required fields")
                    return
                }
                
              let uploadedUrls = []
              setIsSubmitting(true)
              if (childRef.current) {
                uploadedUrls = await childRef.current.triggerChildSubmit();
                }
              const unitData = {
                ...unit,
                imageURLS: [...(unit.imageURLS || []), ...uploadedUrls].filter(Boolean),
              }
              console.log(unitData)
              fetch(`${API_BASE_URL}/apartments/${unit.apartment_id}/units`,{
                method : 'POST',
                headers : {
                   "Content-Type": "application/json"
                },
                body : JSON.stringify(unitData)
              })
              .then(response => {
                if (!response.ok){
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
               return response.json()
              })
              .then( data => {
                alert("Unit added successfuly")
                console.log(data)
                setUnit(emptyUnit)
                setIsSubmitting(false)
                
              })
              .catch( (error) => {
                console.error(error)
                alert("An error occured and the unit could not be listed!")
                setIsSubmitting(false)
              })
    
            }

    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        
          <div className="flex min-h-screen">
        
            <AdminSideBar />
        
            <main className="min-w-0 flex-1">
        
              <div className="border-b border-[#e4dce8] bg-[#fcf8fd]">
        
                {/* TITLE */}
        
                 < div className="px-5 pt-7 lg:px-7">
        
                  <h1 className="text-2xl font-bold">
                      Add Unit
                  </h1>
        
                  <p className="mt-1 text-[10px] text-[#77717c]">
                      List a vacant unit in the selected property
                  </p>
                 </div>
              </div>
        
              {/* CONTENT */}
        
              <div className="px-5 py-7 lg:px-7">
                
                  <ApartmentUnitForm
                    unit={unit}
                    setUnit={setUnit}
                    ref={childRef}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
        
              </div>
        
            </main>
        
          </div>
        
        </div>
        
    )
}