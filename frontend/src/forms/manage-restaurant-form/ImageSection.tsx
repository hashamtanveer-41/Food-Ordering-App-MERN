import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";

const ImageSection = () => {
    const {control, watch} = useFormContext ();
    const existingImageUrl = watch("imageUrl");
    return (
        <div>
            <h2 className="text-2xl font-bold">
                Images
            </h2>
            <FormDescription>
                Add an image that will be displayed on your restaurant page.
                Adding an image will overwrite the existing image.
            </FormDescription>
            <div className="flex flex-col gap-8 w-[50%]">
                {
                    existingImageUrl && (
                        <AspectRatio ratio={16/9}>
                            <img src={existingImageUrl} alt="Restaurant" className="object-cover h-full w-full rounded-lg"/>
                        </AspectRatio>
                    )
                }
                <FormField control={control} render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input className="bg-white" type='file' accept='.jpg, .jpeg, .png' onChange={(e)=>field.onChange(e.target.files?e.target.files[0]:null)}/>
                        </FormControl>
                    </FormItem>
                )} name="imageFile">

                </FormField>
            </div>
        </div>
    )
}
export default ImageSection
