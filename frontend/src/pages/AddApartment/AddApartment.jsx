import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";



export default function AddApartment(){

    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        <div className="flex min-h-screen">
            
            {/* SIDEBAR */}
            <AdminSideBar />

            
        </div>
        </div>
    )
}