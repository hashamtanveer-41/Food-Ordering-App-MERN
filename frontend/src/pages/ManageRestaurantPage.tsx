import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm.tsx";
import {
    useCreateRestaurant,
    useGetMyRestaurantOrders,
    useGetRestaurants,
    useUpdateRestaurant
} from "@/api/RestaurantAPI.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import OrderItemCard from "@/components/OrderItemCard.tsx";

const ManageRestaurantPage = () => {
    const {createRestaurant,isPending: isCreateLoading}= useCreateRestaurant();
    const {restaurant} = useGetRestaurants();
    const {updateRestaurant, isPending: isUpdateLoading} = useUpdateRestaurant();
    const {orders} = useGetMyRestaurantOrders();
    const isEditing = !!restaurant;
    return (
        <Tabs defaultValue="orders">
            <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
                <h2 className="text-2xl font-bold">{orders?.length} active Ordes</h2>
                {orders?.map((order)=>(
                    <OrderItemCard order={order}/>
                ))}
            </TabsContent>
            <TabsContent value="manage-restaurant">
                <ManageRestaurantForm
                    restaurant={restaurant}
                    onSave={isEditing? updateRestaurant : createRestaurant}
                    isLoading={isCreateLoading|| isUpdateLoading}
                />
            </TabsContent>
        </Tabs>
    )
}
export default ManageRestaurantPage
