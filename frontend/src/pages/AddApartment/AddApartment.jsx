import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";



export default function AddApartment(){
  const [currentStep, setCurrentStep] = useState(1);

  const handleLocationContinue = (locationData) => {
    // setPropertyData((prev) => ({
    //   ...prev,
    //   location: locationData,
    // }));

    setCurrentStep(2);
  };


  const handleUnitsContinue = (unitsData) => {
    // setPropertyData((prev) => ({
    //   ...prev,
    //   units: unitsData,
    // }));

    setCurrentStep(3);
  };


  const handleBack = () => {
    setCurrentStep((prev) =>
      Math.max(1, prev - 1)
    );
  };
    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        <div className="flex min-h-screen">
            
            {/* SIDEBAR */}
            <AdminSideBar />

            
        </div>
        </div>
    )
}