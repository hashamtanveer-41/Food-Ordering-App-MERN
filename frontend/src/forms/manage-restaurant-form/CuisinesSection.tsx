import {useFormContext} from "react-hook-form";
import {FormDescription, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {cuisineList} from "@/config/resturant-options-config.ts";
import CuisineCheckbox from "@/forms/manage-restaurant-form/CuisineCheckbox.tsx";

const CuisinesSection = () => {
    const {control} = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
               <FormDescription>
                   Select the cuisines that your resturant serves
               </FormDescription>
            </div>
            <FormField
                control={control}
                render={({field}) => (
                    <FormItem className="flex-1">
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisine) => (
                                <CuisineCheckbox cuisine={cuisine} field={field}/>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
                name='cuisines'>

            </FormField>
        </div>
    )
}
export default CuisinesSection
