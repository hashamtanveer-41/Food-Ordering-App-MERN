import UserProfileForm from "@/forms/user-profile-form/UserProfileForm.tsx";
import {useUpdateUserProfile} from "@/api/UserAPI.tsx";

const UserProfilePage = () => {
    const {updateUser, isPending} = useUpdateUserProfile();
    return (
        <UserProfileForm onSave={updateUser} isLoading={isPending} />
    )
}
export default UserProfilePage
