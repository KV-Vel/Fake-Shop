import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import type { RouteObject } from "react-router";
import ShopPage from "../pages/ShopPage/ShopPage";
import CartPage from "../pages/CartPage/CartPage";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
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
