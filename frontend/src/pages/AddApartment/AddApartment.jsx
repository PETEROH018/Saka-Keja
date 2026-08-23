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
        <div className="border-b border-[#e4dce8] bg-[#fcf8fd]">
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
        
        {/*STEPPER*/}
          <div className="px-5 pt-6 lg:px-7">

          <div className="mx-auto mb-7 flex w-full max-w-[650px] items-start">

            {[
              ["1", "Location"],
              ["2", "Units"],
              ["3", "Review"],
            ].map(([number, label], index) => {

              const stepNumber = Number(number);

              const isActive =
                currentStep === stepNumber;

              const isCompleted =
                currentStep > stepNumber;

              return (
                <React.Fragment key={number}>

                  {/* STEP */}

                  <div
                    className={`flex min-w-[55px] flex-col items-center gap-1.5 ${
                      isCompleted
                        ? "cursor-pointer"
                        : ""
                    }`}
                    onClick={() => {
                      if (isCompleted) {
                        setCurrentStep(
                          stepNumber
                        );
                      }
                    }}
                  >

                    <div
                      className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[8px] ${
                        isActive ||
                        isCompleted
                          ? "bg-[#5e3b95] text-white"
                          : "bg-[#eeeaf0] text-[#746d78]"
                      }`}
                    >
                      {isCompleted
                        ? "✓"
                        : number}
                    </div>


                    <span
                      className={`text-[8px] ${
                        isActive ||
                        isCompleted
                          ? "text-[#5e3b95]"
                          : "text-[#aaa4ad]"
                      }`}
                    >
                      {label}
                    </span>

                  </div>


                  {/* LINE */}

                  {index < 2 && (
                    <div
                      className={`mt-2 h-px flex-1 ${
                        currentStep >
                        stepNumber
                          ? "bg-[#5e3b95]"
                          : "bg-[#dad3de]"
                      }`}
                    />
                  )}

                </React.Fragment>
              );
            })}

          </div>

        </div>
        
        </div>
            
        </div>
        </div>
    )
}