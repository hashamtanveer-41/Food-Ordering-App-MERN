import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant, useGetRestaurants} from "@/api/RestaurantAPI.tsx";

const ManageRestaurantPage = () => {
    const {createRestaurant,isPending}= useCreateRestaurant();
    const {restaurant} = useGetRestaurants();
    return (
        <ManageRestaurantForm restaurant={restaurant} onSave={createRestaurant} isLoading={isPending} />
    )
}
export default ManageRestaurantPage
