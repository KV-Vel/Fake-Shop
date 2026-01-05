import { createRoutesStub, data, type LoaderFunction } from "react-router";
import { test } from "vitest";
import ShopPage from "./ShopPage";
import { render, screen } from "@testing-library/react";

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

function setupStub(fn: LoaderFunction) {
    const Stub = createRoutesStub([
        {
            path: "/shop",
            Component: ShopPage,
            loader: fn,
        },
    ]);

    render(<Stub initialEntries={["/shop"]} />);
}

describe("Shop page tests", () => {
    test("if api returns data it should be displayed on the screen", async () => {
        setupStub(() => mockData);
        const articles = await screen.findAllByRole("article");

        expect(articles).toHaveLength(1);
    });

    test("If api will return empty array, app will have corresponding message about it", async () => {
        setupStub(() => ({
            products: { data: [] },
        }));
        const articles = screen.queryAllByRole("article");

        expect(articles).toHaveLength(0);
    });
});
