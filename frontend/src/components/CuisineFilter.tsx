import {cuisineList} from "@/config/resturant-options-config.ts";
import { Label } from "./ui/label";
import {Check, ChevronDown, ChevronUp} from "lucide-react";
import {type ChangeEvent} from "react";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisine: string[];
    isExpanded: boolean;
    onExpandedClick: () => void;
}
function CuisineFilter({onChange, selectedCuisine, isExpanded, onExpandedClick}: Props) {
    const handleCuisineReset= ()=> onChange([]);
    const handleCuisineChange = (event:ChangeEvent<HTMLInputElement>) =>{
        const clickedCuisine = event.target.value;
        const isChecked = event.target.checked;
        const newCuisinesList = isChecked ? [...selectedCuisine, clickedCuisine] : selectedCuisine.filter((cuisine)=> cuisine!==clickedCuisine) ;
        onChange(newCuisinesList);
    }
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">
                    Filter By Cuisine
                </div>
                <div onClick={handleCuisineReset} className="text-sm font-semibold mb-2 underline cursor-pointer ">
                    Reset Filters
                </div>
            </div>

            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded? cuisineList.length : 7).map((cuisine)=>{
                    const isSelected = selectedCuisine.includes(cuisine);
                    return <div className="flex">
                        <input id={`cuisine_${cuisine}`} type="checkbox" className="hidden" value={cuisine} checked={isSelected} onChange={handleCuisineChange} />
                        <Label htmlFor={`cuisine_${cuisine}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected?"border border-green-600 text-green-600":"border-slate-300"}`}>
                            {isSelected && <Check size={20} strokeWidth={3} />}
                            {cuisine}
                        </Label>
                    </div>
                })}
                <Button onClick={onExpandedClick} variant='link' className="mt-4 flex-1">
                    {isExpanded?
                        (
                            <span className="flex flex-row items-center">View Less <ChevronUp /></span>
                        )
                            :
                            (
                            <span className="flex flex-row items-center">
                                View More <ChevronDown />
                            </span>
                            )
                    }
                </Button>
            </div>
        </>
    )
}

export default CuisineFilter
