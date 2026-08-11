import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {useCreateRestaurant, useGetRestaurants, useUpdateRestaurant} from "@/api/RestaurantAPI.tsx";

const ManageRestaurantPage = () => {
    const {createRestaurant,isPending: isCreateLoading}= useCreateRestaurant();
    const {restaurant} = useGetRestaurants();
    const {updateRestaurant, isPending: isUpdateLoading} = useUpdateRestaurant();
    const isEditing = !!restaurant;
    return (
        <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing? updateRestaurant : createRestaurant}
            isLoading={isCreateLoading|| isUpdateLoading}
        />
    )
}
export default ManageRestaurantPage
