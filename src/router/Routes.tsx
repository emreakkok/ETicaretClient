import { createBrowserRouter, Navigate } from "react-router";
import App from "../components/appComponent/App";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetailsPage from "../pages/catalog/ProductDetails";
import ErrorPage from "../pages/ErrorPage";
import ServerError from "../pages/errors/ServerError";
import NotFound from "../pages/errors/NotFound";
import ShoppingCartPage from "../pages/cart/ShoppingCartPage";
import LoginPage from "../pages/account/LoginPage";
import RegisterPage from "../pages/account/RegisterPage";
import CheckoutPage from "../pages/CheckoutPage";

import AuthGuard from "./AuthGuard";
import OrdersPage from "../pages/OrdersPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "catalog/:id", element: <ProductDetailsPage /> },
            { path: "cart", element: <ShoppingCartPage /> },
            { path: "error", element: <ErrorPage /> },

            {
                path: "checkout",
                element: (
                    <AuthGuard>
                        <CheckoutPage />
                    </AuthGuard>
                ),
            },
            {
                path: "orders",
                element: (
                    <AuthGuard>
                        <OrdersPage />
                    </AuthGuard>
                ),
            },
            {
                path: "orders/:id",
                element: (
                    <AuthGuard>
                        <OrderDetailsPage />
                    </AuthGuard>
                ),
            },

            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "server-error", element: <ServerError /> },
            { path: "not-found", element: <NotFound /> },
            { path: "*", element: <Navigate to="/not-found" /> },
        ],
    },
]);
