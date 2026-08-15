import {useAuth0} from "@auth0/auth0-react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {toast} from "sonner";
import type {RestaurantSearchResponse, RestaurantType} from "@/types.ts";
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