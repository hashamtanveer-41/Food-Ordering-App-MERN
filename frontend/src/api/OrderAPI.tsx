import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";
import type {Order} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOrders = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/order`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },

        });
        if (!response.ok){
            throw new Error("Failed to get orders")
        }
        return response.json();
    }
    const {data:orders, isPending ,error} = useQuery({
        queryKey: ["orders"],
        queryFn: getOrdersRequest,
        refetchInterval: 5000,
    });
    if (error){
        toast.error(error.toString());
    }
    return {
        orders,
        isPending
    }
};

export type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    restaurantId: string;
}
export const useCreateCheckoutSession = () => {
    const {getAccessTokenSilently} = useAuth0();
    const createCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) =>{
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest),
        });
        if(!response.ok){
            throw new Error("Unable to create checkout session");
        }
        return response.json();
    };

    const {mutateAsync: checkoutSession, isPending, error, reset} = useMutation({
        mutationFn: (formData: CheckoutSessionRequest) => createCheckoutSessionRequest(formData),
        onError: ()=>console.log("Error creating checkout session."),
    });
    if (error){
        toast.error(error.toString());
        reset();
    }
    return {
        checkoutSession, isPending
    }

}