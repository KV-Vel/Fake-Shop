import { createRoutesStub } from "react-router";
import { test } from "vitest";
import ShopPage from "./ShopPage";
import { screen, render } from "@testing-library/react";
import type { Product } from "../../types/data";

vi.mock("../../components/ProductCard/ProductCard", () => {
    // Partially mocking product card
    return {
        default: ({ product }) => {
            return (
                <>
                    <div data-testid="product-card">{product.name}</div>
                </>
            );
        },
    };
});

const mockData = {
    products: {
        data: [
            {
                id: "0",
                name: "test",
                category: "furniture",
                description: "good looking furniture",
                wood_type: "test",
                finish: "TEST",
                dimensions: {
                    depth: 256,
                    width: 344,
                    height: 190,
                },
                price: 355,
                weight: 25,
                image_path: "test_path",
                stock: 9,
                sku: "s0_0",
                status: "active",
                created_at: "19",
                updated_at: "10",
                featured: false,
                discount_price: 300,
                tags: null,
            },
        ],
    },
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
        });

        test("should render header for shop page", async () => {
            const shopHeader = await screen.findByText("Explore latest collection");
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
            const Stub = createRoutesStub([
                {
                    path: "/shop",
                    Component: ShopPage,
                    loader: () => ({}),
                },
            ]);

            render(<Stub initialEntries={["/shop"]} />);
        });

        test("if api will return nothing, page will have corresponding message about it", async () => {
            const articles = screen.queryAllByRole("article");
            expect(articles).toHaveLength(0);
            const para = await screen.findByText(
                "No available data for now. Please come back later",
            );
            expect(para).toBeInTheDocument();
        });
    });
});
