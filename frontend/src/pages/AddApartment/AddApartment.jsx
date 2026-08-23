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

             {/* Title */}

        <div className="px-5 pt-7 lg:px-7">

          <h1 className="text-2xl font-bold">
            {currentStep === 1 && "Add a New Property"}
            {currentStep === 2 && "Add Units"}
            {currentStep === 3 && "Review Property"}
          </h1>

          <p className="mt-1 text-[10px] text-[#77717c]">
            {currentStep === 1 &&
              "List a new apartment building or add units to an existing one."}

            {currentStep === 2 &&
              "Define the individual units available in this building."}

            {currentStep === 3 &&
              "Review your property details before publishing."}
          </p>

        </div>
            
        </div>
        </div>
    )
}