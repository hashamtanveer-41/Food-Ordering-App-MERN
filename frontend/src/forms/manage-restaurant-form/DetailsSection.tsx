import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useFormContext} from "react-hook-form";

const DetailsSection = () => {
    const {control} = useFormContext();
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Details</h2>
                <FormDescription >
                    Enter your restaurant details here
                </FormDescription>
            </div>
            <FormField
                control={control}
                render={({field}) =>(
                    <FormItem className="flex-1">
                        <FormLabel>
                            Restaurant Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                name='restaurantName'
            />
            <div className="flex gap-4">
                <FormField
                    control={control}
                    render={({field}) =>(
                        <FormItem className="flex-1">
                            <FormLabel>
                                City
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name='city'
                />
                <FormField
                    control={control}
                    render={({field}) =>(
                        <FormItem className="flex-1">
                            <FormLabel>
                                Country
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    name='country'
                />
            </div>
            <FormField
                control={control}
                render={({field}) =>(
                    <FormItem className="max-w-[25%]">
                        <FormLabel>
                            Delivery Price (Rs)
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder='1.50'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                name='deliveryPrice'
            />
            <FormField
                control={control}
                render={({field}) =>(
                    <FormItem className="max-w-[25%]">
                        <FormLabel>
                            Estimated Delivery Time (mins)
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" placeholder='30'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                name='estimatedDeliveryTime'
            />
        </div>
    )
}
export default DetailsSection
