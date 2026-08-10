import {useMutation, useQuery} from "@tanstack/react-query";
import {useAuth0} from "@auth0/auth0-react";
import {toast} from "sonner";
import type {User} from "@/types.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userGetCurrentUser = ()=>{
    const {getAccessTokenSilently } = useAuth0();
    const getCurrentUser = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: "GET",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to fetch current user");
        }
        return response.json();
    };
    const { data: currentUser, isPending, isError, error } = useQuery({
        queryKey: ["fetchCurrentUser"],
        queryFn: getCurrentUser,
    });
    if (isError){
        toast.error(error.toString);
    }
    return {
        currentUser,
        isPending,
    };
}

type CreateUserRequest = {
    auth0Id: string,
    email: string,
}
export const useCreateUser = () => {
    const {getAccessTokenSilently } = useAuth0();
    const createNewUser = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: "POST",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Failed to create user");
        }
    }
    const {mutateAsync: createUser, isPending, isError, isSuccess} = useMutation({
        mutationFn: (user: CreateUserRequest) => createNewUser(user),
        onError: ()=>console.log("Error creating user"),
    });
    return {
        createUser,
        isPending,
        isError,
        isSuccess,
    }
};
type UpdateUserProfileRequest = {
    name: string,
    addressLine1: string,
    city:  string,
    country: string,
}

export const useUpdateUserProfile = () => {
    const {getAccessTokenSilently } = useAuth0();
    const updateUserProfile = async (formData: UpdateUserProfileRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/users`, {
            method: "PUT",
            headers:{
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user profile");
        }
    }
    const {mutateAsync: updateUser, isPending, isError, isSuccess, error, reset} = useMutation({
        mutationFn: (formData: UpdateUserProfileRequest) => updateUserProfile(formData),
        onError: ()=>console.log("Error updating user profile"),
    });
    if (isSuccess){
        toast.success("Profile updated successfully");
    }
    if (isError){
        toast.error(error.toString());
        reset();
    }
    return {
        updateUser,
        isPending,
        isError,
        isSuccess,
    }
}
