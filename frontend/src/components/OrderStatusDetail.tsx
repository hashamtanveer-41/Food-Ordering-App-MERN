import {Separator} from "@/components/ui/separator.tsx";
import type {Order} from "@/types.ts";

type Props = {
    order : Order
}
const OrderStatusDetail = ({order}: Props) => {
    return (
        <div className="space-y-5">
            <div className="flex flex-col">
                <span className="font-bold">Delivering to: </span>
                <span>{order.deliveryDetails.name}</span>
                <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
            </div>
            <div className="flex flex-col">
                <span className="font-bold">Your Order</span>
                <ul>
                    {order.cartItems.map((cartItem)=>(
                        <li>
                            {cartItem.name} x {cartItem.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <Separator />
            <div className="flex flex-col">
                <span className="font-bold">Total</span>
                <span>Rs {order.totalAmount}</span>
            </div>
        </div>
    )
}
export default OrderStatusDetail
