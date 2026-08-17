import type {RestaurantType} from "@/types.ts";
import type {CartItem} from "@/pages/DetailPage.tsx";
import {CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Trash} from "lucide-react";

type Props = {
    restaurant: RestaurantType;
    cartItems: CartItem[];
    removeFromCart: (cartItem: CartItem)=>void;
}
const OrderSummary = ({restaurant, cartItems, removeFromCart}:Props) => {
    const getTotalCost = () => {
        const itemsCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        return itemsCost + restaurant.deliveryPrice;
    }
    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your Order</span>
                    <span>Rs {getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((cartItem)=>(
                    <div className="flex justify-between">
                        <span>
                            <Badge variant='outline' className="mr-2">
                                {cartItem.quantity}
                            </Badge>
                            {cartItem.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash className="cursor-pointer" color='red' size={20} onClick={()=>removeFromCart(cartItem)}/>
                            Rs {cartItem.price * cartItem.quantity}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span className="font-bold">Delivery</span>
                    <span>Rs {restaurant.deliveryPrice}</span>
                </div>
                <Separator />

            </CardContent>
        </>
    )
}
export default OrderSummary
