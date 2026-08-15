import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form.tsx";
import {Search} from "lucide-react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";

const formSchema = z.object({
    searchQuery: z.string().min(1, { message: "Restaurant Name is required" }),
});
export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeholder: string;
    onReset?: () => void;
    searchQuery: string;
}
const SearchBar = ({onReset, onSubmit, placeholder, searchQuery}: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        }
    });
    useEffect(() => {
        form.reset({searchQuery});
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({
            searchQuery: "",
        });
        if (onReset) {
            onReset();
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}>
                <Search className="ml-1 text-orange-500 hidden md:block" size={30} strokeWidth={2.5} />
                <FormField
                    control={form.control}
                    render={({field}) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input {...field} className="border-none shadow-nonw text-xl focus-visible:ring-0" placeholder={placeholder}/>
                            </FormControl>
                        </FormItem>
                    )}
                    name="searchQuery"
                />
                    <Button variant='outline' className="rounded-full" type='button' onClick={handleReset}>
                        Clear
                    </Button>
                <Button className="rounded-full bg-orange-500" type='submit'>Search</Button>
            </form>
        </Form>
    )
}
export default SearchBar
