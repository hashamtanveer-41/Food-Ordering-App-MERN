import type {Order} from "@/types.ts";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Label} from "@/components/ui/label.tsx";
import {ORDER_STATUS} from "@/config/order-status-config.ts";
import {Select, SelectContent, SelectValue, SelectTrigger, SelectItem} from "@/components/ui/select.tsx";
type Props = {
    order: Order;
}
const OrderItemCard = ({order}: Props) => {
    const getTime = () =>{
        const orderDateTime = new Date(order.createdAt);
        const hours = orderDateTime.getHours();
        const minutes = orderDateTime.getMinutes();
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 justify-between mb-3">
                    <div>
                        Customer Name:
                        <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
                    </div>
                    <div>
                        Delivery Address :
                        <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
                    </div>
                    <div>
                         Time :
                        <span className="ml-2 font-normal">{getTime()}</span>
                    </div>
                    <div>
                        Total Cost :
                        <span className="ml-2 font-normal">Rs {order.totalAmount}</span>
                    </div>
                </CardTitle>
                <Separator />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((item)=>(
                        <span>
                            <Badge variant='outline' className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">What is the status for this order?</Label>
                    <Select>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status"></SelectValue>
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {ORDER_STATUS.map(status => (
                                <SelectItem value={status.value}>{status.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
export default OrderItemCard
