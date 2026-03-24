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
        ErrorBoundary: ErrorPage,

        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "shop",
                element: <ShopPage />,
                loader: async () => {
                    const response = fetch(
                        "https://api.escuelajs.co/api/v1/products/?categorySlug=furniture",
                    )
                        .then((resp) => {
                            if (!resp.ok) {
                                throw new Error("Can not load the data");
                            }
                            return resp.json();
                        })
                        .catch((err) => {
                            throw new Error(err);
                        });

                    return { products: response };
                },
            },
            {
                path: "shop/:id",
                element: <ProductDetail />,
                loader: async ({ params }) => {
                    const response = await fetch(
                        `https://api.escuelajs.co/api/v1/products/${params.id}`,
                    );

                    if (!response.ok) {
                        throw new Error("Can not load the data");
                    }
                    const data = await response.json();
                    return { data };
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
