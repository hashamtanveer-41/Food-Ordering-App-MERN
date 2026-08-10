import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "@/pages/HomePage";
import AuthCallBackPage from "@/pages/AuthCallBackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoutes from "@/auth/ProtectedRoutes.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
            <Route path='/' element={<Layout showHero={true}><HomePage /></Layout>}/>
            <Route element={<ProtectedRoutes />}>
                <Route path='/user-profile' element={<Layout><UserProfilePage /></Layout>}/>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
export default AppRoutes
