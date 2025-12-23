import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import type { RouteObject } from "react-router";
import ShopPage from "../pages/ShopPage/ShopPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "shop",
                element: <ShopPage />,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
];

export default routes;
