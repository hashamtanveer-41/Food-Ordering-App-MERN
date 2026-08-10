import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Button} from "@/components/ui/button.tsx";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    addressLine1: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
})

type UserFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (userProfileData: UserFormData)=>void;
    isLoading: boolean;
}
const UserProfileForm = ({onSave, isLoading}: Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            name: "",
            addressLine1: "",
            city: "",
            country: "",
        },
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                <div>
                    <h2 className="text-2xl font-bold">User Profile Form</h2>
                    <FormDescription>
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField control={form.control} render={({field})=>(
                    <FormItem>
                        <FormLabel>
                            Email
                        </FormLabel>
                        <FormControl>
                            <Input {...field} disabled className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )} name="email"
                />
                <FormField control={form.control} render={({field})=>(
                    <FormItem className="flex-1">
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} name="name"
                />

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>
                                Address Line 1
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} name="addressLine1"
                    />
                    <FormField control={form.control} render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>
                                City
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} name="city"
                    />
                    <FormField control={form.control} render={({field})=>(
                        <FormItem className="flex-1">
                            <FormLabel>
                                Country
                            </FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} name="country"
                    />
                </div>
                {isLoading?
                    <LoadingButton /> :
                    <Button type='submit' className="bg-orange-500 ">
                        Submit
                    </Button>
                }
            </form>
        </Form>
    )
}
export default UserProfileForm;
