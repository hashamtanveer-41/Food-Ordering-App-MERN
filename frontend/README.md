# HashEats — Frontend

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind" alt="Frontend tech stack icons" />

This UI lets customers search restaurants, inspect menus, build a cart, and complete checkout through Stripe. Auth0 protects profile and restaurant-owner workflows, while React Query keeps server data in sync with the backend. The app is built with Vite, React Router, shadcn-style UI primitives, and Tailwind CSS.

## Directory Structure
```text
src/
├── api/                # Fetch wrappers and React Query hooks for backend access
├── auth/               # Auth0 provider and protected route guard
├── components/         # Reusable UI blocks for headers, cards, search, and orders
├── forms/              # Profile and restaurant management forms
├── layouts/            # App shell with header, hero, and footer
├── pages/              # Route-level screens
├── config/             # UI config for cuisines and order states
├── types.ts            # Shared frontend TypeScript types
└── main.tsx            # App bootstrap, router, query client, toaster
```

## Environment Variables
| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_BASE_URL` | Base URL for the backend API | `http://localhost:8000` |
| `VITE_AUTH0_DOMAIN` | Auth0 tenant domain | `dev-example.us.auth0.com` |
| `VITE_AUTH0_CLIENT_ID` | Auth0 SPA client ID | `abc123def456` |
| `VITE_AUTH0_CALLBACK_URL` | Redirect URL after Auth0 login | `http://localhost:5173/auth-callback` |
| `VITE_AUTH0_AUDIENCE` | Auth0 audience for API tokens | `https://hasheats-api` |

## Local Development Setup
1. Install dependencies.
   ```bash
   npm install
   ```
2. Create `frontend/.env` with the variables above.
3. Start the Vite dev server.
   ```bash
   npm run dev
   ```
4. Open the app at `http://localhost:5173`.

## Build & Preview
1. Create a production build.
   ```bash
   npm run build
   ```
2. Preview the build locally.
   ```bash
   npm run preview
   ```

## Key Pages and Routes
| Route | Component | Description | Auth Required |
| --- | --- | --- | --- |
| `/` | `HomePage` | Landing page with city search and marketing content. | No |
| `/search/:city` | `SearchPage` | Restaurant search with filters, sort, and pagination. | No |
| `/detail/:restaurantId` | `DetailPage` | Restaurant details, menu, cart, and checkout flow. | No |
| `/auth-callback` | `AuthCallBackPage` | Auth0 callback that provisions the local user. | No |
| `/user-profile` | `UserProfilePage` | View and edit the authenticated user profile. | Yes |
| `/order-status` | `OrderStatusPage` | Track the authenticated user’s orders. | Yes |
| `/manage-restaurant` | `ManageRestaurantPage` | Owner dashboard for restaurant and order management. | Yes |

## State Management
Server state is handled with React Query and wrapped in a shared `QueryClientProvider` in `main.tsx`. Local UI state covers search filters, form state, and cart contents, and the cart is persisted in `sessionStorage` per restaurant. There is no Redux store or global context for application data beyond Auth0 and React Query.

## API Integration Notes
- The API base URL comes from `VITE_API_BASE_URL`; set it explicitly for every environment.
- Backend calls are implemented with fetch-based hooks in `src/api/*`, not Axios, so there are no Axios interceptors in this codebase.
- Protected requests obtain an Auth0 access token via `getAccessTokenSilently()` and send it as a Bearer token to the backend.
- React Query retries failed requests once and does not refetch on window focus.
- Request errors surface through `sonner` toasts, which are mounted once in `main.tsx`.

## Component Architecture
- `layouts/` provides the shared page shell: header, optional hero, content container, and footer.
- `components/` holds reusable blocks for navigation, search, restaurant cards, order status, and checkout UI.
- `forms/` contains the structured form sections for user profiles and restaurant management.
- `pages/` composes the app’s route-level experiences from the reusable pieces above.
- `components/ui/` contains the low-level visual primitives used across the app.

## Deployment Notes
- Run `npm run build` and deploy the generated `dist/` folder to Netlify, Vercel, or any static host.
- Set all `VITE_*` environment variables in the host dashboard before deployment.
- Point `VITE_API_BASE_URL` at the deployed backend URL.
- If the backend serves the frontend build in production, deploy the frontend build artifacts so `frontend/dist` is available to the API server.
