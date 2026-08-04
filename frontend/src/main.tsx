import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate.tsx";

createRoot(document.getElementById('root')!).render(
   <Router>
       <Auth0ProviderWithNavigate>
           <AppRoutes />
       </Auth0ProviderWithNavigate>
   </Router>
)
