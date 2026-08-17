import {useParams} from "react-router-dom";
import {useGetRestaurantById} from "@/api/RestaurantAPI.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import RestaurantInfo from "@/components/RestaurantInfo.tsx";
import MenuItem from "@/components/MenuItem.tsx";
import {useState} from "react";
import {Card, CardFooter} from "@/components/ui/card.tsx";
import OrderSummary from "@/components/OrderSummary.tsx";
import type {MenuItem as MenuItemType} from "../types.ts";
import CheckoutButton from "@/components/CheckoutButton.tsx";
import type {UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";

export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;
}
const DetailPage = () => {
    const {restaurantId} = useParams<{restaurantId: string}>()
    const {restaurant, isPending}  = useGetRestaurantById(restaurantId);
    const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`)
        return storedCartItems? JSON.stringify(storedCartItems): [];
    });
    const addToCart = (menuItem: MenuItemType) => {
        setCartItems((prevCartItems) => {
            const existingItem = prevCartItems.find(item => item._id === menuItem._id);
            if (existingItem) {
                return prevCartItems.map(item =>
                    item._id === menuItem._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCartItems, { ...menuItem, quantity: 1 }];
            }
        });
    }

    const removeFromCart = (cartItem: CartItem)=>{
        setCartItems((prevState)=>{
            const updatedCartItems = prevState.filter((item)=>cartItem._id !== item._id)
            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    }
    const onCheckout = (userFormData: UserFormData) =>{
        console.log("userFormData", userFormData)
    }
    if (isPending || !restaurant){
        return <span>Loading...</span>
    }

    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full"/>
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem)=>(
                        <MenuItem menuItem={menuItem} addToCart={()=>addToCart(menuItem)}/>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart}/>
                        <CardFooter>
                            <CheckoutButton onCheckout={onCheckout} disabled={cartItems.length===0} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default DetailPage
