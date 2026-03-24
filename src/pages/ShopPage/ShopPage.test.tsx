import { createRoutesStub, useOutletContext } from "react-router";
import { test } from "vitest";
import ShopPage from "./ShopPage";
import { screen, render } from "@testing-library/react";
import type { CartContext, Product } from "../../types/data";

type TestProps = {
    product: Product;
};
const product: Product = {
    description: "test description",
    images: ["...", "..."],
    price: 25,
    title: "Test title",
    id: 2,
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

vi.mock("../../components/ProductCard/ProductCard", () => {
    // Partially mocking product card
    return {
        default: ({ product }: TestProps) => {
            return <div data-testid="product-card">{product.title}</div>;
        },
    };
});

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

const mockData = {
    products: [product],
};

describe("ShopPage", () => {
    describe("With shop data", () => {
        beforeEach(() => {
            const Stub = createRoutesStub([
                {
                    path: "/shop",
                    Component: ShopPage,
                    loader: () => mockData,
                },
            ]);
            render(<Stub initialEntries={["/shop"]} />);
            vi.mocked(useOutletContext).mockReturnValue({
                cartItems: new Map(),
                addToCart: vi.fn(),
                deleteFromCart: vi.fn(),
            } as CartContext);
        });

        test("should render header for shop page", async () => {
            const shopHeader = await screen.findByText(/explore latest collection/i);
            expect(shopHeader).toBeInTheDocument();
        });

        test("if api returns data it should be displayed on the screen", async () => {
            const productCard = await screen.findByTestId("product-card");
            expect(productCard).toBeInTheDocument();
            expect(productCard.textContent).toMatch(/test/i);
        });
    });

    describe("Without shop data", () => {
        beforeEach(() => {
            vi.mocked(useOutletContext).mockReturnValue({
                cartItems: new Map(),
                addToCart: vi.fn(),
                deleteFromCart: vi.fn(),
            } as CartContext);
        });

        test("if api will return empty data, page will have corresponding message about it", async () => {
            const Stub = createRoutesStub([
                {
                    path: "/shop",
                    Component: ShopPage,
                    loader: () => ({ products: [] }),
                },
            ]);
            render(<Stub initialEntries={["/shop"]} />);

            const articles = screen.queryAllByRole("article");
            expect(articles).toHaveLength(0);
            const para = await screen.findByText(
                "No available data for now. Please come back later",
            );
            expect(para).toBeInTheDocument();
        });

        test("rejected request should assert to error element of Await component", async () => {
            const rejected = vi.fn();
            rejected.mockRejectedValue(new Error("Test"));

            const Stub = createRoutesStub([
                {
                    path: "/shop",
                    Component: ShopPage,
                    loader: () => ({
                        products: rejected(),
                    }),
                },
            ]);
            render(<Stub initialEntries={["/shop"]} />);

            const errorElement = await screen.findByText(/unexpected error!/i);
            expect(errorElement).toBeInTheDocument();
        });

        describe("Loader", () => {
            test("When request is in progress, loading state will be shown", async () => {
                const Stub = createRoutesStub([
                    {
                        path: "/shop",
                        Component: ShopPage,
                        loader: () => ({
                            products: Promise.resolve(mockData.products),
                        }),
                    },
                ]);
                render(<Stub initialEntries={["/shop"]} />);

                const found = await screen.findByText(/loading/i);
                expect(found).toBeInTheDocument();
            });
        });
    });
});
