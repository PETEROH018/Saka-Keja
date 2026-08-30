import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import ApartmentDetailsForm from "../../components/ApartmentDetailsForm/ApartmentDetailsForm";
import ApartmentUnitForm from "../../components/ApartmentUnitForm/ApartmentUnitForm";
import ApartmentReview from "../../components/ApartmentReview/ApartmentReview";

export default function AddApartment(){
  const emptyForm= {
              buildingName: "",
              propertyType: "",
              address: "",
              description: "",
              apartment_amenities: [],
              images: [],
            }
  const emptyAmenities = [
              { title: "", distance: "" },
            ]
  const [currentStep, setCurrentStep] = useState(1);
  const [units, setUnits] = useState([]);
  const [apartmentData,setApartmentData] = useState({});

  const [form, setForm] = useState(emptyForm);
  
  
  const [amenities, setAmenities] = useState(emptyAmenities);
  const handleEditProperty = () => {
    setCurrentStep(1)
  }

  const handleEditUnit =()=>{
    setCurrentStep(2)
  }

  const handleApartmentContinue = (e) => {
    e.preventDefault()
    const propertyData = {
              ...form,
              amenities,
              };
      
      setApartmentData(propertyData);
      setCurrentStep(2);
  };


  const handleUnitsContinue = () => {
    setApartmentData((prev) => ({
      ...prev,
      units: units,
    }));

    setCurrentStep(3);
  };


  const handleBack = () => {
    setCurrentStep((prev) =>
      Math.max(1, prev - 1)
    );
  };

  function handleSubmit(){
          console.log(apartmentData)
          alert("Apartment added successfully")
          setApartmentData({})
          setForm(emptyForm)
          setUnits([])
          setAmenities(emptyAmenities)
          setCurrentStep(1)
        }
    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">

  <div className="flex min-h-screen">

    <AdminSideBar />

    <main className="min-w-0 flex-1">

      <div className="border-b border-[#e4dce8] bg-[#fcf8fd]">

        {/* TITLE */}

        <div className="px-5 pt-7 lg:px-7">

          <h1 className="text-2xl font-bold">
            {currentStep === 1 &&
              "Add a New Property"}

            {currentStep === 2 &&
              "Add Units"}

            {currentStep === 3 &&
              "Review Property"}
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


        {/* STEPPER */}

        <div className="px-5 pb-6 pt-6 lg:px-7">

          <div className="mx-auto flex w-full max-w-[650px] items-start">

            {[
              ["1", "Property"],
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

                    {/* CIRCLE */}

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


                    {/* LABEL */}

                    <span
                      className={`text-[8px] ${
                        isActive ||
                        isCompleted
                          ? "font-medium text-[#5e3b95]"
                          : "text-[#aaa4ad]"
                      }`}
                    >
                      {label}
                    </span>

                  </div>


                  {/* CONNECTING LINE */}

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


      {/* CONTENT */}

      <div className="px-5 py-7 lg:px-7">

        {currentStep === 1 && (
          <ApartmentDetailsForm
            onContinue={
              handleApartmentContinue
            }
            form={form}
            setForm={setForm}
            amenities={amenities}
            setAmenities={setAmenities}
          />
        )}


        {currentStep === 2 && (
          <ApartmentUnitForm
            onBack={handleBack}
            onContinue={
              handleUnitsContinue
            }
            units={units}
            setUnits={setUnits}
          />
        )}


        {currentStep === 3 && (
          <ApartmentReview 
           apartmentData={apartmentData}
           onBack={handleBack}
           onEditProperty={handleEditProperty}
           onEditUnits={handleEditUnit}
           onSubmit={handleSubmit}
          />
        )}

      </div>

    </main>

  </div>

</div>

    )
}