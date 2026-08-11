import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import type {RestaurantType} from "@/types.ts";

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