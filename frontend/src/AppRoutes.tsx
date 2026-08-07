import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "@/pages/HomePage";
import AuthCallBackPage from "@/pages/AuthCallBackPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
            <Route path='/' element={<Layout><HomePage /></Layout>}/>
            <Route path='/user-profile' element={<span>User Profile Page</span>}/>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
export default AppRoutes
