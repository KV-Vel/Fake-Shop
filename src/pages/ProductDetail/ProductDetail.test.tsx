import { render, screen } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { createRoutesStub, useOutletContext } from "react-router";
import type { Mock } from "vitest";
import type { Product } from "../../types/data";
import userEvent from "@testing-library/user-event";

const testData: Product = {
    description: "test description",
    images: [
        "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
    ],
    price: 599.99,
    title: "Modern Wooden Sofa",
    id: 7,
    creationAt: "2 created",
    updatedAt: "2 updated",
    slug: "2",
    category: {
        name: "furniture",
        image: "...",
        id: 1,
        slug: "1",
        creationAt: "test",
        updatedAt: "tested",
    },
};
const mockData = {
    data: testData,
};

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("ProductDetail", () => {
    describe("Without items in cart", () => {
        beforeEach(() => {
            const Stub = createRoutesStub([
                { path: "/shop/:id", Component: ProductDetail, loader: () => mockData },
            ]);
            vi.mocked(useOutletContext).mockReturnValue({
                cartItems: new Map(),
                addToCart: vi.fn(),
            });
            render(<Stub initialEntries={["/shop/:id"]} />);
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
                { path: "/shop/:id", Component: ProductDetail, loader: () => mockData },
            ]);

            mocked = vi.mocked(useOutletContext).mockReturnValue({
                cartItems: new Map([
                    [
                        "7",
                        {
                            count: 2,
                            id: "7",
                            title: "Modern Wooden Sofa",
                            images: [
                                "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
                            ],
                            price: 599.99,
                        },
                    ],
                ]),
                addToCart: vi.fn(),
            });

            render(<Stub initialEntries={["/shop/:id"]} />);
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
            const addToCardBtn = await screen.findByRole("button", { name: "Update" });
            await user.click(increaseBtn);
            await user.click(addToCardBtn);

            const addToCartFn = mocked.mock.results[1].value.addToCart;

            expect(addToCartFn).toBeCalled();
            expect(addToCartFn).toBeCalledWith({
                count: 3,
                id: "7",
                title: "Modern Wooden Sofa",
                images: [
                    "https://wvxxlssoccbctxspmtyy.supabase.co/storage/v1/object/public/products/public/4551ca3b-1db8-498a-980c-afab89ef2e1f.jpeg",
                ],
                price: 599.99,
            });
        });
    });
});
