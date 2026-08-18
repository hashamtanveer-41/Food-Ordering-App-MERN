import type {Order} from "@/types.ts";
import {Progress} from "@/components/ui/progress.tsx";
import {ORDER_STATUS} from "@/config/order-status-config.ts";

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
    const getOrderStatusInfo = () => {
        return ORDER_STATUS.find((o)=> o.value===order.status ) || ORDER_STATUS[0];
    }
    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight flex flex-col gap-5 md:flex-row justify-between">
                <span className="">Order Status: {getOrderStatusInfo().label}</span>
                <span>Expected by: {getExpectedDeliveryTime()}</span>
            </h1>
            <Progress value={getOrderStatusInfo().progressValue} className="animate-pulse"/>
        </>
    )
}
export default OrderStatusHeader
