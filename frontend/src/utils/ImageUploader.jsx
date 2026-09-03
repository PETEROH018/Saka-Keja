import { useEffect, useState } from "react";
import Icon from "../components/Icon/Icon";
import React, { forwardRef, useImperativeHandle } from 'react';


const ImageUploader = forwardRef(({type},ref) => {
    const [imageFiles, setImageFiles] = useState([])

    const CLOUD_NAME = "pdxdbkuz"; 
    const UPLOAD_PRESET = "fofv56oc";
    
    const handleFileChange = (e) => {
        setImageFiles([...imageFiles,...Array(e.target.files[0])])
    }

    const removeImageFile = (indexToRemove) => {
        setImageFiles((prevFiles) => 
            prevFiles.filter((_, index) => index !== indexToRemove)
        );
        if (imageFiles.length == 0) {
        }
    };

  const uploadImage = async () => {
    try {
        // 1. Mapping image files into an array of upload promises
        const uploadPromises = imageFiles.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
            method: "POST",
            body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Failed to upload an image to Cloudinary");
        }

        const data = await response.json();
        return data.secure_url; // Return the string URL directly
        });

        // 2. Waiting for ALL uploads to finish successfully
        const newUploadedUrls = await Promise.all(uploadPromises);

        // 3. Marking completion and clearing files
        alert("Your images have been uploaded successfully")
        setImageFiles([]); 
        return newUploadedUrls;
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Error uploading images");
        } 
    };

    useImperativeHandle(ref, () => ({
        triggerChildSubmit: uploadImage
    }));

  return(
    <section className="mb-8">
       
        {type === 'apartment' 
                   ?<>
                   <h3 className="mb-1 text-[13px] font-semibold"> Property Photos </h3>
                   <p className="mb-3 text-[9px] text-[#8b858f]">
                    Upload photos of the building, rooms, compound and
                    other useful areas.
                   </p>
                   </>
                   :<>
                   <h3 className="mb-1 text-[13px] font-semibold"> Unit Photos </h3>
                   <p className="mb-3 text-[9px] text-[#8b858f]">
                    Upload photos of the unit's interior, rooms, kitchen, washroom and balcony
                  </p>
                   </>
        }
    
                  <label className="relative flex min-h-[125px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#9b82bb] bg-[#fdf9ff] text-center hover:bg-[#faf3ff]">
    
                    <div className="mb-2 grid h-8 w-8 place-items-center rounded-full bg-[#ede4f6] text-[#603d96]">
                      <Icon name="plus" size={15} />
                    </div>
    
                    <strong className="text-[10px] font-semibold text-[#553589]">
                      Select Images to Upload
                    </strong>
    
                    <span className="mt-1 text-[8px] text-[#99929d]">
                      PNG, JPG or WEBP · You can select multiple images
                    </span>
    
                    <input
                      type="file"
                      name="images"
                      accept="image/png,image/jpeg,image/webp"
                      multiple
                      onChange={handleFileChange}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                  </label>
                
                  {/* Selected images */}
                  {imageFiles.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {imageFiles.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className="relative overflow-hidden rounded-md border border-[#e2dce6] bg-[#fcf8fd]"
                        >
                            {/* ❌ The Remove Button */}
                            <button
                            type="button"
                            onClick={() => removeImageFile(index)} // Passes the current index
                            className="absolute right-1 top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/80 text-white font-bold text-[10px] hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
                            title="Remove image"
                            >
                            ✕
                            </button>

                            <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="h-20 w-full object-cover"
                            />

                            <div className="flex items-center gap-1 truncate px-2 py-1.5 text-[8px] text-[#5b5361]">
                            <Icon name="image" size={11} />
                            <span className="truncate">
                                {file.name}
                            </span>
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </section>
    
                
  )
})

export default ImageUploader