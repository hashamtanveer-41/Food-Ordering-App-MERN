import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant} from "@/api/RestaurantAPI.tsx";

const ManageRestaurantPage = () => {
    const {createRestaurant,isPending}= useCreateRestaurant();
    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isPending} />
    )
}
export default ManageRestaurantPage
