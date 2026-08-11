import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    index: number,
    removeMenuItem: () => void
}
const MenuItemInput = ({index, removeMenuItem}: Props) => {
    const {control} = useFormContext()
    return (
        <div className="flex gap-2 items-end flex-row" >
            <FormField
                control={control}
                render={({field})=>
                    <FormItem >
                        <FormLabel className="flex items-center gap-1">
                            Name <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="Cheese Pizza" className="bg-white"/>
                        </FormControl>
                    </FormItem>
            }
                name={`menuItems.${index}.name`}
             />
            <FormField
                control={control}
                render={({field})=>
                    <FormItem >
                        <FormLabel className="flex items-center gap-1">
                            Price (Rs) <FormMessage/>
                        </FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="9.00" className="bg-white"/>
                        </FormControl>
                    </FormItem>
                }
                name={`menuItems.${index}.price`}
            />
            <Button type="button" className="bg-red-500 max-h-fit" onClick={removeMenuItem}>
                Remove
            </Button>
        </div>
    )
}
export default MenuItemInput
