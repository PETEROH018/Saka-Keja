import React, { useState } from "react";
import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
export default function AddAppartment(){
    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        <div className="flex min-h-screen">
            
            {/* SIDEBAR */}
            <AdminSideBar />

            <main className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-11">
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-bold tracking-tight sm:text-[27px]">
                Add a New Property
                </h1>

                <p className="mt-1.5 text-[10px] text-[#77717c]">
                List a new apartment building or add units to an existing one.
                </p>
            </div>

            <div className="mx-auto mb-7 flex w-full max-w-[650px] items-start">
                        {[
                          ["1", "Location"],
                          ["2", "Units"],
                          ["3", "Review"],
                        ].map(([number, label], index) => (
                          <React.Fragment key={number}>
            
                            <div className="flex min-w-[55px] flex-col items-center gap-1.5">
                              <div
                                className={`grid h-[18px] w-[18px] place-items-center rounded-full text-[8px] ${
                                  index === 0
                                    ? "bg-[#5e3b95] text-white"
                                    : "bg-[#eeeaf0] text-[#746d78]"
                                }`}
                              >
                                {number}
                              </div>
            
                              <span
                                className={`text-[8px] ${
                                  index === 0
                                    ? "text-[#5e3b95]"
                                    : "text-[#aaa4ad]"
                                }`}
                              >
                                {label}
                              </span>
                            </div>
            
                            {index < 3 && (
                              <div className="mt-2 h-px flex-1 bg-[#dad3de]" />
                            )}
            
                          </React.Fragment>
                        ))}
                      </div>


            </main>
        </div>
        </div>
    )
}