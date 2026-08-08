import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "@/pages/HomePage";
import AuthCallBackPage from "@/pages/AuthCallBackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
            <Route path='/' element={<Layout><HomePage /></Layout>}/>
            <Route path='/user-profile' element={<Layout><UserProfilePage /></Layout>}/>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
export default AppRoutes
