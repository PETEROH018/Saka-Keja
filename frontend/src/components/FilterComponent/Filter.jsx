import { LocationEditIcon } from "lucide-react"


export default function Filter() {
    return (
        <>
        <form action="" className="mt-4 bg-purple-100 border-2 border-purple-200 rounded-lg flex justify-around">
            <div className="flex-row gap-3">
            <label htmlFor="location">Location</label>
            <input name="location"  type="text" placeholder="e.g. Kahawa Sukari"/>
            </div>    
            <label htmlFor="price">Max Rent</label>        
            <select name="price" id="" className="bg-red-200">
                <option value="">Any price</option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <label htmlFor="bedrooms"></label>
            <select name="bedrooms" id="" className="bg-red-200">
                <option value="">Any</option>
                <option value=""></option>
                <option value=""></option>
            </select>
            <button className="bg-yellow-200">search</button>
        </form>
        </>
    )
}