import { useEffect, useState } from "react";
import Icon from "../components/Icon/Icon";

export default function ImageUploader({imageUrl,setImageUrl,form,setForm}) {
    // const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imageFiles, setImageFiles] = useState([])

    const CLOUD_NAME = "pdxdbkuz"; 
    const UPLOAD_PRESET = "fofv56oc";
    
    const handleFileChange = (e) => {
        
        // setImage(e.target.files[0]);
        setImageFiles([...imageFiles,...Array(e.target.files[0])])
    }

    const removeImageFile = (indexToRemove) => {
        setImageFiles((prevFiles) => 
            prevFiles.filter((_, index) => index !== indexToRemove)
        );
    };

    const uploadImage = async () => {
    if (imageFiles.length < 0) return alert("Please select an image first!");

    for (const image of imageFiles) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
        // Send the POST request directly to Cloudinary
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
            method: "POST",
            body: formData,
            }
        );

        if (!response.ok) {
            throw new Error("Failed to upload image to Cloudinary");
        }

        const data = await response.json();
        
        // The secure_url property contains your usable image URL
        setImageUrl(data.secure_url); 
        setForm((prev) => ( {...prev,images : [...(prev.images || []).filter(Boolean),String(imageUrl)].filter(Boolean)} ))
        console.log("Cloudinary URL:", data.secure_url);
        
        } catch (error) {
        console.error("Error uploading image:", error);
        return alert("Error uploading image")

        } finally {
        setLoading(false);
        }
    }
    setImageFiles([])

  };
    


  return(
    <section className="mb-8">
                  <h3 className="mb-1 text-[13px] font-semibold">
                    Property Photos
                  </h3>
    
                  <p className="mb-3 text-[9px] text-[#8b858f]">
                    Upload photos of the building, rooms, compound and
                    other useful areas.
                  </p>
    
                  <label className="relative flex min-h-[125px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#9b82bb] bg-[#fdf9ff] text-center hover:bg-[#faf3ff]">
    
                    <div className="mb-2 grid h-8 w-8 place-items-center rounded-full bg-[#ede4f6] text-[#603d96]">
                      <Icon name="upload" size={16} />
                    </div>
    
                    <strong className="text-[10px] font-semibold text-[#553589]">
                      Upload Property Images
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

                  <button onClick={uploadImage} disabled={loading}  className="flex h-9 items-center gap-1.5 rounded-md border border-[#5b3894] bg-[#5b3894] px-4 text-[9px] font-semibold text-white hover:bg-[#4f3084] mt-2">
                        {loading ? "Uploading..." : "Upload"}
                  </button>
    
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
}