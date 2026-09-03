import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
import { API_BASE_URL } from "../../config/api";
import { useAuth } from "../../context/useAuth";
import ApartmentEditingForm from "../../components/ApartmentEditingForm/ApartmentEditingForm";

const toForm = (data) => {
    return {
        buildingName: data.name,
        propertyType: data.type,
        location: data.location,
        description: data.description,
        imageURLs: data.imageURLs ?? [],

    }
}

export default function EditProperty() {

    const { id } = useParams();
    const {
        data: property,
        loading,
        error,
    } = useFetch(`${API_BASE_URL}/apartments/${id}`);
    const { token } = useAuth();
    const childRef = useRef(null)
    const [isSaving, setIsSaving] = useState(false);
    const [form,setForm] = useState({})

    useEffect(()=>{
        if(!loading && property){
            setForm(toForm(property))
        }
    },[property,id,loading])

    console.log(property)

    if (error){
        alert(error)
    }

    async function handleSubmit(e) {

        setIsSaving(true);

        try {
              let uploadedUrls = []
              setIsSaving(true)
              if (childRef.current) {
              uploadedUrls = await childRef.current.triggerChildSubmit();
                }
              const propertyData = {
                    name : form.buildingName,
                    type : form.propertyType,
                    location : form.location,
                    description : form.description,
                    imageURLs: [...(form.imageURLs || []), ...uploadedUrls].filter(Boolean),

                    
              }
              const response = await fetch(
                `${API_BASE_URL}/apartments/${property.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(propertyData)
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(
                    errorData.message ||
                    errorData.error ||
                    "Failed to update property"
                );
            }

            alert("Property updated successfully");

        } catch (error) {
            console.error("Update property failed:", error);
            alert("Update property failed!")

        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="flex min-h-screen bg-[#faf8fc]">
            <AdminSideBar />
            {loading ? <p>Loading apartment details ...</p>

            : <main className="flex-1 px-8 py-7">
                <Link
                    to="/my-properties"
                    className="mb-3 inline-block text-sm font-medium text-violet-600 hover:text-violet-800"
                >
                    ← Back to My Properties
                </Link>

                <h1 className="text-3xl font-bold text-gray-900">
                    Edit Property
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update your property details.
                </p>

                {loading && (
                    <p className="mt-6 text-sm text-gray-500">
                        Loading property...
                    </p>
                )}

                {error && (
                    <p className="mt-6 text-sm text-red-500">
                        Failed to load property: {error}
                    </p>
                )}

                {property && (
                    <div className="mt-6 max-w-3xl">
                        <ApartmentEditingForm
                            form={form}
                            setForm={setForm}
                            onSubmit={handleSubmit}
                            ref={childRef}
                            isSaving={isSaving}
                        />
                    </div>
                )}
            </main>}
        </div>
    );
}