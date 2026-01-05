import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import type { RouteObject } from "react-router";
import ShopPage from "../pages/ShopPage/ShopPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import { Suspense } from "react";

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

                loader: async () => {
                    const products = fetch(
                        "https://furniture-api.fly.dev/v1/products?category=sofa",
                    ).then((resp) => resp.json());

                    return { products };
                },
                errorElement: <div>Error during fetch</div>,
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
];

export default routes;
