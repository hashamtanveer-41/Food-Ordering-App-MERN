export type User = {
    _id: string;
    auth0Id: string;
    email: string;
    name: string,
    addressLine1: string,
    city: string,
    country: string,
};

export type RestaurantType = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryPrice: number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItem[];
    imageUrl: string;
    lastUpdated: string;
}
export type MenuItem = {
    _id: string;
    name: string;
    price: number;
};

export type RestaurantSearchResponse = {
    data: RestaurantType[],
    pagination: {
        total: number,
        page: number,
        pages: number,
    }
}
export type OrderStatus = "placed" | "paid" | "inProgress" | "outForDelivery" | "delivered";

export type Order = {
    _id: string;
    user: User;
    restaurant: RestaurantType;
    restaurantId: string;
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: number;
    }[];
    totalAmount: number;
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
    };
    status: OrderStatus;
    createdAt: string;
}
