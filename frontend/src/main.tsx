import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Auth0ProviderWithNavigate from "@/auth/Auth0ProviderWithNavigate.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
})
createRoot(document.getElementById('root')!).render(
   <Router>
       <QueryClientProvider client={queryClient}>
           <Auth0ProviderWithNavigate>
               <AppRoutes />
               <Toaster visibleToasts={1} position={"top-right"} richColors />
           </Auth0ProviderWithNavigate>
       </QueryClientProvider>
   </Router>
)
