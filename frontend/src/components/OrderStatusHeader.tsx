import type {Order} from "@/types.ts";
import {Progress} from "@/components/ui/progress.tsx";

type Props = {
    order: Order;
}
const OrderStatusHeader = ({order}: Props) => {
    const getExpectedDeliveryTime = () => {
        const createdAt = new Date(order.createdAt);
        createdAt.setMinutes(createdAt.getMinutes() + order.restaurant.estimatedDeliveryTime);
        const hours = createdAt.getHours();
        const minutes = createdAt.getMinutes();
        const paddedMinutes = minutes<10 ? `0${minutes}` : minutes;
        return `${hours}:${paddedMinutes}`;
    }
    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight flex flex-col gap-5 md:flex-row justify-between">
                <span className="">Order Status: {order.status}</span>
                <span>Expected by: {getExpectedDeliveryTime()}</span>
            </h1>
            <Progress value={50} className="animate-pulse"/>
        </>
    )
}
export default OrderStatusHeader
