import React, { useRef, useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import ApartmentDetailsForm from "../../components/ApartmentDetailsForm/ApartmentDetailsForm";
import ApartmentReview from "../../components/ApartmentReview/ApartmentReview";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/useAuth";

export default function AddApartment(){
      const {user} = useAuth()
      const emptyForm= {
              buildingName: "",
              location: "",
              propertyType: "",
              address: "",
              description: "",
              furnished: false,
              wifiIncluded: false,
              waterReliable: false,
              securityGuard: false,
            }
  const emptySocialAmenities = [
              { title: "", distance: "" },
            ]
  
  const emptyApartmentAmenities = [
              {name: "", description: ""},
          ]
  const childRef = useRef(null);
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [form, setForm] = useState(emptyForm);
  const [socialAmenities, setSocialAmenities] = useState(emptySocialAmenities);
  const [apartmentAmenities, setApartmentAmenities] = useState(emptyApartmentAmenities);

  const handleSubmit = async () => {
          let uploadedUrls = []
          setIsSubmitting(true)
          if (childRef.current) {
              uploadedUrls = await childRef.current.triggerChildSubmit();
            }
          
          const propertyData = {
              ...form,
              "owner_id": user.id,
              images: [...(form.images || []), ...uploadedUrls].filter(Boolean),
              socialAmenities,
              apartmentAmenities
              };
          console.log(propertyData)

          fetch(`${API_BASE_URL}/apartments`,{
            method : 'POST',
            headers : {
               "Content-Type": "application/json"
            },
            body : JSON.stringify(propertyData)
          })
          .then(response => {
            if (!response.ok){
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            response.json()
          })
          .then( data => {
            alert("Apartment and added successfuly")
            console.log(data)
            setIsSubmitting(false)
            setForm(emptyForm)
            setSocialAmenities(emptySocialAmenities)
            setApartmentAmenities(emptyApartmentAmenities)
          })
          .catch( (error) => {
            console.error(error)
            alert("An error occured and the apartment could not be listed!")
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

        <div className="px-5 pt-7 lg:px-7">

          <h1 className="text-2xl font-bold">
            Add a New Property
          </h1>


          <p className="mt-1 text-[10px] text-[#77717c]">
            List a new apartment building 
          </p>

        </div>
      </div>


      {/* CONTENT */}

      <div className="px-5 py-7 lg:px-7">

          <ApartmentDetailsForm
            form={form}
            setForm={setForm}
            socialAmenities={socialAmenities}
            setSocialAmenities={setSocialAmenities}
            apartmentAmenities={apartmentAmenities}
            setApartmentAmenities={setApartmentAmenities}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            ref={childRef}
          />
      </div>

    </main>

  </div>

</div>

    )
}