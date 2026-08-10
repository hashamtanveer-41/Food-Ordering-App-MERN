import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {userGetCurrentUser, useUpdateUserProfile} from "@/api/UserAPI.tsx";

const UserProfilePage = () => {
    const {updateUser, isPending: isUpdateLoading} = useUpdateUserProfile();
    const {isPending: isGetLoading, currentUser}= userGetCurrentUser();
    if (isGetLoading){
        return <span>Loading...</span>
    }

    if (!currentUser){
        return <span>Unable to load user profile</span>
    }

    return (
        <UserProfileForm
            onSave={updateUser}
            currentUser={currentUser}
            isLoading={isUpdateLoading}
        />
    )
}
export default UserProfilePage
