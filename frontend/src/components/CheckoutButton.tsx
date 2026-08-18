import {useAuth0} from "@auth0/auth0-react";
import {useLocation} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import LoadingButton from "@/components/LoadingButton.tsx";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog.tsx";
import UserProfileForm, {type UserFormData} from "@/forms/user-profile-form/UserProfileForm.tsx";
import {userGetCurrentUser} from "@/api/UserAPI.tsx";

type Props = {
    onCheckout: (userFormData: UserFormData) =>void;
    disabled: boolean;
    isLoading: boolean;
}
const CheckoutButton = ({onCheckout, disabled, isLoading}: Props) => {
    const {isAuthenticated, isLoading: isAuthLoading, loginWithRedirect} = useAuth0();
    const {pathname} = useLocation();

    const {currentUser, isPending} = userGetCurrentUser();
    const onLogin = async () =>{
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }

    if (!isAuthenticated){
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Log in to check out</Button>
    }
    if (isAuthLoading || !currentUser || isLoading){
        return <LoadingButton />
    }
    // @ts-ignore
    return (
        <Dialog>
            <DialogTrigger render={<Button disabled={disabled} className="bg-orange-500" />}>
                    Go to checkout
            </DialogTrigger>
            <DialogContent className="max-w-106.25 md:min-w-175 bg-gray-50">
                <UserProfileForm currentUser={currentUser} onSave={onCheckout} isLoading={isAuthLoading} title="Confirm Delivery Details" buttonText='Continue to payment'/>
            </DialogContent>
        </Dialog>
    )
}
export default CheckoutButton
