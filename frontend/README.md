# HashEats — Frontend

> Vite + React SPA for the HashEats food ordering platform.

<img src="https://skillicons.dev/icons?i=react,typescript,vite,tailwind" alt="Frontend Tech Stack" />

---

## Overview

The frontend delivers a fast, responsive experience for two user roles: customers searching restaurants, building carts, and completing checkout; and restaurant owners managing their profile, menu, and order pipeline from a protected dashboard. Auth0 handles authentication. React Query manages all server state. The app is built with Vite and styled with Tailwind CSS + shadcn/ui.

---

## Directory Structure

```text
frontend/
├── src/
│   ├── api/                   # React Query hooks wrapping all API calls
│   │   ├── MyUserApi.tsx
│   │   ├── MyRestaurantApi.tsx
│   │   ├── RestaurantApi.tsx
│   │   └── OrderApi.tsx
│   ├── components/            # Shared UI components (Header, Footer, etc.)
│   │   ├── ui/                # shadcn/ui primitives
│   │   └── ...
│   ├── pages/                 # Route-level page components
│   │   ├── HomePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── DetailPage.tsx
│   │   ├── UserProfilePage.tsx
│   │   ├── ManageRestaurantPage.tsx
│   │   ├── OrderStatusPage.tsx
│   │   └── AuthCallbackPage.tsx
│   ├── auth/                  # Auth0 provider config
│   ├── AppRoutes.tsx          # React Router route definitions + guards
│   ├── App.tsx
│   └── main.tsx
├── .env
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_AUTH0_DOMAIN` | Auth0 tenant domain | `dev-example.us.auth0.com` |
| `VITE_AUTH0_CLIENT_ID` | Auth0 SPA client ID | `abc123def456` |
| `VITE_AUTH0_CALLBACK_URL` | Post-login redirect URI | `http://localhost:5173/auth-callback` |
| `VITE_AUTH0_AUDIENCE` | Auth0 audience for API tokens | `https://hasheats-api` |

> ⚠️ Vite bakes all `VITE_*` variables into the static bundle at build time. Changing them in your hosting dashboard has no effect on an existing build — you must trigger a full rebuild after any change.

---

## Local Development

1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```

2. Create the env file
   ```bash
   cp .env.example .env
   # Fill in all VITE_* values
   ```

3. Start the dev server
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`. The backend must also be running for API calls to succeed.

---

## Build & Preview

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

The compiled output lands in `frontend/dist/`. In the monolith deployment, the Express backend serves this directory as static files.

---

## Pages & Routes

| Route | Page Component | Auth Required | Description |
|---|---|---|---|
| `/` | `HomePage` | ❌ | Landing page with city search |
| `/search/:city` | `SearchPage` | ❌ | Restaurant search results with filters |
| `/detail/:restaurantId` | `DetailPage` | ❌ | Menu, cart, and checkout entry point |
| `/auth-callback` | `AuthCallbackPage` | ❌ | Auth0 post-login callback handler |
| `/user-profile` | `UserProfilePage` | ✅ | Edit delivery address and name |
| `/manage-restaurant` | `ManageRestaurantPage` | ✅ (owner) | Create / update restaurant and menu |
| `/order-status` | `OrderStatusPage` | ✅ | View active and past orders |

Route guards are implemented in `AppRoutes.tsx` using Auth0's `withAuthenticationRequired` HOC. Unauthenticated users attempting to access protected routes are redirected to the Auth0 login page.

---

## State Management

All server state is managed by **React Query** (`@tanstack/react-query`). Each resource has a dedicated hook file in `src/api/`:

- `useGetMyUser` / `useCreateMyUser` / `useUpdateMyUser` — user profile
- `useGetMyRestaurant` / `useCreateMyRestaurant` / `useUpdateMyRestaurant` / `useGetMyRestaurantOrders` / `useUpdateMyRestaurantOrder` — owner dashboard
- `useSearchRestaurants` / `useGetRestaurant` — public search
- `useGetMyOrders` / `useCreateCheckoutSession` — customer orders

Local UI state (cart contents, selected filters, active tab) lives in `useState` inside the relevant page component. There is no global client-side store (Redux / Zustand).

---

## API Integration

All requests go through a shared `fetch`-based pattern inside the React Query hooks. The `VITE_API_BASE_URL` env variable sets the base URL. Auth0's `getAccessTokenSilently` is called inside each authenticated hook to attach the `Bearer` token before the request fires.

```ts
const { getAccessTokenSilently } = useAuth0();

const accessToken = await getAccessTokenSilently();

const response = await fetch(`${API_BASE_URL}/api/my/user`, {
  method: "PUT",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(formData),
});
```

Errors returned from the API are surfaced via React Query's `error` state and shown to the user through toast notifications (`sonner`).

---

## Component Architecture

| Group | Location | Responsibility |
|---|---|---|
| Layout | `components/Header.tsx`, `components/Footer.tsx` | App shell, nav, auth buttons |
| Search | `components/SearchBar.tsx`, `components/SearchResultCard.tsx` | City search input and result rendering |
| Restaurant detail | `components/MenuItem.tsx`, `components/OrderSummary.tsx`, `components/CheckoutButton.tsx` | Menu display, cart state, Stripe redirect |
| Owner dashboard | `components/ManageRestaurantForm/` | Multi-section form for restaurant and menu CRUD |
| Order tracking | `components/OrderStatusHeader.tsx`, `components/OrderStatusDetail.tsx` | Live order progress display |
| UI primitives | `components/ui/` | shadcn/ui components (Button, Input, Select, etc.) |

---

## Deployment

### Netlify / Vercel (static)

```bash
# Build command
npm run build

# Publish directory
frontend/dist
```

Set all `VITE_*` environment variables in the platform's dashboard. After any env change, trigger a full redeploy — the variables are baked into the bundle at build time.

### Monolith (served by Express)

No separate deployment needed. Run `npm run build` in the frontend directory and the Express backend will serve `frontend/dist` automatically. Ensure the `FRONTEND_URL` backend variable matches the live domain.

### Auth0 Configuration for Production

Update the following in the Auth0 dashboard before going live:

- **Allowed Callback URLs** → `https://your-domain.com/auth-callback`
- **Allowed Logout URLs** → `https://your-domain.com`
- **Allowed Web Origins** → `https://your-domain.com`