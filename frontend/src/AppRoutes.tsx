import {Navigate, Route, Routes} from "react-router-dom";
import Layout from "@/layouts/layout";
import HomePage from "@/pages/HomePage";
import AuthCallBackPage from "@/pages/AuthCallBackPage.tsx";
import UserProfilePage from "@/pages/UserProfilePage.tsx";
import ProtectedRoutes from "@/auth/ProtectedRoutes.tsx";
import ManageRestaurantPage from "@/pages/ManageRestaurantPage.tsx";
import SearchPage from "@/pages/SearchPage.tsx";
import DetailPage from "@/pages/DetailPage.tsx";
import OrderStatusPage from "@/pages/OrderStatusPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/auth-callback' element={<AuthCallBackPage/>}/>
            <Route path='/search/:city' element={<Layout showHero={false}><SearchPage/></Layout>}/>
            <Route path='/detail/:restaurantId' element={<Layout showHero={false}><DetailPage /></Layout>}/>
            <Route path='/' element={<Layout showHero={true}><HomePage /></Layout>}/>
            <Route element={<ProtectedRoutes />}>
                <Route path='/user-profile' element={<Layout><UserProfilePage /></Layout>}/>
                <Route path='/order-status' element={<Layout><OrderStatusPage /></Layout>}/>
                <Route path='/manage-restaurant' element={<Layout><ManageRestaurantPage /></Layout>}/>
            </Route>
            <Route path='*' element={<Navigate to='/' />} />
        </Routes>
    )
}
export default AppRoutes
