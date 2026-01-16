import { render, screen } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { createRoutesStub, useOutletContext } from "react-router";
import type { Mock } from "vitest";
import type { CartItem } from "../../types/data";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", async () => {
    const actual = await import("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

const mockData = {
    success: true,
    data: {
        id: "7e0664ce-e5d7-4987-b5c2-a4de1d8033d9",
        name: "Modern Wooden Sofa",
        category: "sofa",
        description:
            "This modern wooden sofa combines comfort with contemporary design, perfect for any living space.",
        wood_type: "walnut",
        finish: "medium",
        dimensions: {
            depth: 35,
            width: 80,
            height: 30,
        },
        price: 599.99,
        weight: 75,
        image_path:
            "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
        stock: 1000,
        sku: "test_sku",
        status: "active",
        created_at: "2024-11-10T14:32:30.520177+00:00",
        updated_at: "2024-11-11T22:49:09.508134+00:00",
        featured: true,
        discount_price: 485,
        tags: null,
    },
};

describe("ProductDetail", () => {
    describe("Without items in cart", () => {
        beforeEach(() => {
            const Stub = createRoutesStub([
                { path: "/shop/:sku", Component: ProductDetail, loader: () => mockData },
            ]);
            (useOutletContext as Mock).mockReturnValue({
                cartItems: new Map(),
                addToCart: vi.fn(),
            });
            render(<Stub initialEntries={["/shop/:sku"]} />);
        });

        test("Should properly render component using loader", async () => {
            const productDetailWrapper = await screen.findByRole("article");
            expect(productDetailWrapper).toBeInTheDocument();
        });

        test("if item not in cart, counter should be equal to 1", async () => {
            const input = await screen.findByDisplayValue(1);
            expect(input).toBeInTheDocument();
        });
    });

    describe("With items in cart", () => {
        let mocked: Mock;
        beforeEach(() => {
            const Stub = createRoutesStub([
                { path: "/shop/:sku", Component: ProductDetail, loader: () => mockData },
            ]);

            mocked = (useOutletContext as Mock).mockReturnValue({
                cartItems: new Map([
                    [
                        "7e0664ce-e5d7-4987-b5c2-a4de1d8033d9",
                        {
                            count: 2,
                            id: "7e0664ce-e5d7-4987-b5c2-a4de1d8033d9",
                            name: "Modern Wooden Sofa",
                            image_path:
                                "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
                            price: 599.99,
                        },
                    ],
                ]),
                addToCart: vi.fn(),
            });

            render(<Stub initialEntries={["/shop/:sku"]} />);
        });

        test("Input with product counter should be rendered using cart data", async () => {
            const input = await screen.findByDisplayValue(2);
            expect(input).toBeInTheDocument();
        });

        test("Increasing or descreasing value of item's counter input", async () => {
            const user = userEvent.setup();
            const input = (await screen.findByDisplayValue(2)) as HTMLInputElement;
            const increaseBtn = await screen.findByRole("button", { name: "+" });
            const dereaseBtn = await screen.findByRole("button", { name: "-" });

            expect(increaseBtn).toBeInTheDocument();
            expect(dereaseBtn).toBeInTheDocument();

            await user.click(increaseBtn);
            expect(input.valueAsNumber).toBe(3);
            await user.click(dereaseBtn);
            await user.click(dereaseBtn);
            expect(input.valueAsNumber).toBe(1);
        });

        test("adding to cart function will be called", async () => {
            const user = userEvent.setup();
            const increaseBtn = await screen.findByRole("button", { name: "+" });
            const addToCardBtn = await screen.findByRole("button", { name: "Add to cart" });
            await user.click(increaseBtn);
            await user.click(addToCardBtn);

            const addToCartFn = mocked.mock.results[1].value.addToCart;

            expect(addToCartFn).toBeCalled();
            expect(addToCartFn).toBeCalledWith({
                count: 3,
                id: "7e0664ce-e5d7-4987-b5c2-a4de1d8033d9",
                name: "Modern Wooden Sofa",
                image_path:
                    "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
                price: 599.99,
            });
        });
    });
});
