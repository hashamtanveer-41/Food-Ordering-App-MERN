    import {z} from "zod";
    import {useForm} from "react-hook-form";
    import {zodResolver} from "@hookform/resolvers/zod";
    import {Form} from "@/components/ui/form.tsx";
    import DetailsSection from "@/forms/manage-restaurant-form/DetailsSection.tsx";
    import {Separator} from "@/components/ui/separator.tsx";
    import CuisinesSection from "@/forms/manage-restaurant-form/CuisinesSection.tsx";
    import MenuSection from "@/forms/manage-restaurant-form/MenuSection.tsx";
    import ImageSection from "@/forms/manage-restaurant-form/ImageSection.tsx";
    import LoadingButton from "@/components/LoadingButton.tsx";
    import {Button} from "@/components/ui/button.tsx";
    import type {RestaurantType} from "@/types.ts";
    import {useEffect} from "react";

    const formSchema = z.object({
        restaurantName: z.string({
            message: "Restaurant name is required",
        }).min(1, "Restaurant name is required"),

        city: z.string({
            message: "City is required",
        }).min(1, "City is required"),

        country: z.string({
            message: "Country is required",
        }).min(1, "Country is required"),

        deliveryPrice: z.coerce.number({
            message: "Delivery price is required and must be a number",
        }).min(0, "Delivery price cannot be negative"),

        estimatedDeliveryTime: z.coerce.number({
            message: "Estimated delivery time is required and must be a number",
        }).min(0, "Estimated delivery time cannot be negative"),

        cuisines: z.array(z.string()).min(1, "Please select at least one cuisine"),

        menuItems: z.array(
            z.object({
                name: z.string().min(1, "Menu item name is required"),
                price: z.coerce.number().min(0, "Menu item price must be greater than or equal to 0"),
            })
        ),
        imageUrl: z.string().optional(),
        imageFile: z.instanceof(File, { message: "Image file is required" })
            .optional()
            .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
                message: "Image file size must be less than or equal to 5MB",
            }),
    }).refine((data) => data.imageFile || data.imageUrl, {
        message: "Either image URL or image File must be provided",
        path: ["imageFile"],
    });

    type RestaurantFormData = z.infer<typeof formSchema>;

    type Props = {
        onSave: (restaurantData: FormData) => void;
        isLoading: boolean;
        restaurant?: RestaurantType;
    }
    const ManageRestaurantForm = ({onSave, isLoading, restaurant}:Props) => {
        const form = useForm<RestaurantFormData>({
            resolver: zodResolver(formSchema) as any,
            defaultValues: {
                restaurantName: "",
                city: "",
                country: "",
                deliveryPrice: 0,
                estimatedDeliveryTime: 0,
                cuisines: [],
                menuItems: [{ name: "", price: 0 }],
            }
        })
        useEffect(() => {
            if (!restaurant){
                return;
            }
            const restaurantData = (restaurant as any).restaurant || restaurant;

            const updatedRestaurant = {
                ...restaurantData
            };
            console.log(updatedRestaurant)
            form.reset(updatedRestaurant);
        }, [form, restaurant]);
        const handleSubmit = (data: RestaurantFormData) => {
            const formData = new FormData();
            formData.append("restaurantName", data.restaurantName);
            formData.append("city", data.city);
            formData.append("country", data.country);
            formData.append("deliveryPrice", (data.deliveryPrice).toString());
            formData.append("estimatedDeliveryTime", (data.estimatedDeliveryTime).toString());
            data.cuisines.forEach((cuisine,index) => {
                formData.append(`cuisines[${index}]`, cuisine);
            });
            data.menuItems.forEach((menuItem, index) => {
                formData.append(`menuItems[${index}][name]`, menuItem.name);
                formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
            });
            if (data.imageFile) {
                formData.append("imageFile", data.imageFile);
            }
            onSave(formData);
        }

        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 bg-gray-50 rounded-lg p-10"
                >
                    <DetailsSection />
                    <Separator />
                    <CuisinesSection />
                    <Separator />
                    <MenuSection />
                    <Separator />
                    <ImageSection />
                    {isLoading? <LoadingButton /> : <Button type='submit'>Submit</Button>}
                </form>
            </Form>
        )
    }
    export default ManageRestaurantForm
