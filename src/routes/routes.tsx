import App from "../pages/App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import type { RouteObject } from "react-router";
import ShopPage from "../pages/ShopPage/ShopPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

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

                    // if (!response.ok) {
                    //     throw new Error("Can't access sku data");
                    // }

                    return { products };
                },
            },
            {
                path: "shop/:sku",
                element: <ProductDetail />,
                loader: async ({ params }) => {
                    const response = await fetch(
                        `https://furniture-api.fly.dev/v1/products/${params.sku}`,
                    );

                    if (!response.ok) {
                        throw new Error("Can't access sku data");
                    }

                    return response.json();
                },
            },
            {
                path: "cart",
                element: <CartPage />,
            },
        ],
    },
];

export default routes;
