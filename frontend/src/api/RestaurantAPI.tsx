import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import type {Order, RestaurantSearchResponse, RestaurantType} from "@/types.ts";
import type {SearchState} from "@/pages/SearchPage.tsx";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const useGetRestaurants = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getRestaurantRequest = async (): Promise<RestaurantType> => {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch restaurants");
        }
        return response.json();
    };
    const {data: restaurant, isPending, error} = useQuery({
        queryKey: ["fetchRestaurant"],
        queryFn: getRestaurantRequest,
    });
    return {
        restaurant,
        isPending,
        error,
    }
}

export const useCreateRestaurant = ()=> {
    const {getAccessTokenSilently} = useAuth0();
    const createRestaurantRequest = async (restaurantData: FormData): Promise<RestaurantType> => {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: restaurantData,
        });
        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }
        return response.json();
    };
    const {mutate: createRestaurant, isPending, isSuccess, error} = useMutation({
        mutationFn: (data: FormData) => createRestaurantRequest(data),
        onError: ()=>console.log("Error creating user"),
    });
    if (isSuccess){
        toast.success("Restaurant created successfully");
    }
    if (error){
        toast.error("Unable to update Restaurant");
    }
    return {
        createRestaurant,
        isPending,
    }
}

export const useUpdateRestaurant = ()=> {
    const {getAccessTokenSilently} = useAuth0();
    const updateRestaurantRequest = async (restaurantData: FormData): Promise<RestaurantType> => {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurants`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: restaurantData,
        });
        if (!response.ok) {
            throw new Error("Failed to update restaurant");
        }
        return response.json();
    };
    const {mutate: updateRestaurant, isPending, isSuccess, error} = useMutation({
        mutationFn: (data: FormData) => updateRestaurantRequest(data),
        onError: ()=>console.log("Error updating user"),
    });
    if (isSuccess){
        toast.success("Restaurant updated successfully");
    }
    if (error){
        toast.error("Unable to update Restaurant");
    }
    return {
        updateRestaurant,
        isPending,
    }
}

export const useSearchRestaurant = (searchState: SearchState, city?:string)=>{
    const createSearchRequest = async (): Promise<RestaurantSearchResponse>=>{
        const params = new URLSearchParams();
        params.set("searchQuery", searchState.searchQuery);
        params.set("page", searchState.page.toString());
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)
        const response  = await fetch(`${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`);
        if(!response.ok){
            throw new Error("Failed to get restaurant")
        }
        return response.json();
    };
    const {data: results, isLoading} = useQuery({
        queryKey: ["searchRestaurants", searchState],
        queryFn: createSearchRequest
    });
    return {
        results,isLoading
    }
}

export const useGetRestaurantById = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<RestaurantType> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurants/${restaurantId}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
        }
        return response.json();
    };
    const {data: restaurant, isPending, error} = useQuery({
        queryKey: ["fetchRestaurantById", restaurantId],
        queryFn: getRestaurantByIdRequest,
    });
    if (error){
        toast.error("Unable to fetch Restaurant");
    }
    return {
        restaurant,
        isPending
    }
}

export const useGetMyRestaurantOrders = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurants/order`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch restaurant orders");
        }
        return response.json();
    };
    const {data: orders, isPending, error} = useQuery({
        queryKey: ["fetchMyRestaurantOrders"],
        queryFn: getMyRestaurantOrdersRequest,
    });
    if (error){
        toast.error("Unable to fetch Restaurant Orders");
    }
    return {
        orders,
        isPending
    }
}

type UpdateOrderStatusRequest = {
    orderId: string;
    status: string;
}
export const useUpdateOrderStatus = ()=>{
    const {getAccessTokenSilently} = useAuth0();
    const updateOrderStatusRequest = async (updateOrderStatusRequest: UpdateOrderStatusRequest): Promise<Order> => {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/restaurants/order/${updateOrderStatusRequest.orderId}/status`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({status: updateOrderStatusRequest.status}),
        });
        if (!response.ok) {
            throw new Error("Failed to update order status");
        }
        return response.json();
    };
    const {mutate: updateOrderStatus, isPending, isSuccess, error} = useMutation({
        mutationFn: (updateOrderStatus: UpdateOrderStatusRequest) => updateOrderStatusRequest(updateOrderStatus),
        onError: ()=>console.log("Error updating order status"),
    });
    if (isSuccess){
        toast.success("Order status updated successfully");
    }
    if (error){
        toast.error("Unable to update order status");
    }
    return {
        updateOrderStatus,
        isPending,
    }
}