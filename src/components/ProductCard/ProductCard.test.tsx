import { BrowserRouter, useOutletContext } from "react-router";
import { test, type Mock } from "vitest";
import type { CartContext, Category, Product } from "../../types/data";
import ProductCard from "./ProductCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", async () => {
    const reactRouter = await vi.importActual("react-router");

    return {
        ...reactRouter,
        useOutletContext: vi.fn(),
    };
});

const cartContext: CartContext = {
    cartItems: new Map(),
    addToCart: vi.fn(),
    deleteFromCart: vi.fn(),
};

const productData: Product = {
    id: 1,
    slug: "test_slug",
    title: "Modern Chair",
    category: {} as Category,
    description: "Modern Chair from our store",
    price: 125,
    images: ["image_path"],
    creationAt: "today",
    updatedAt: "today",
};

describe("ProductCard", () => {
    let context: Mock;

    test("Product Card renders", () => {
        context = vi.mocked(useOutletContext).mockReturnValue(cartContext);
        render(<ProductCard inCart={false} product={productData} />, { wrapper: BrowserRouter });

        const productName = screen.getByText("Modern Chair");
        const cardArticle = screen.getByRole("article");

        expect(cardArticle).toBeInTheDocument();
        expect(productName).toBeInTheDocument();
    });

    test("Add to cart should change text depending on the product buy state", async () => {
        const user = userEvent.setup();

        context = vi.mocked(useOutletContext).mockReturnValue(cartContext);
        const { rerender } = render(<ProductCard inCart={false} product={productData} />, {
            wrapper: BrowserRouter,
        });

        const addToCartbtn = screen.getByRole("button", { name: /add to cart/i });
        expect(addToCartbtn).toBeInTheDocument();
        expect(addToCartbtn).toHaveTextContent(/add to cart/i);

        await user.click(addToCartbtn);

        rerender(<ProductCard inCart={true} product={productData} />);
        expect(addToCartbtn).toHaveTextContent(/update/i);
    });

    describe("Interactions (functions, inputs, buttons)", () => {
        beforeEach(() => {
            context = vi.mocked(useOutletContext).mockReturnValue(cartContext);
            render(<ProductCard inCart={false} product={productData} />, {
                wrapper: BrowserRouter,
            });
        });
        test("At first render count variable should be 1", () => {
            const input = screen.getByDisplayValue(1);
            expect(input).toBeInTheDocument();
        });

        test("Clicking on plus button will increase number of items to put in the cart", async () => {
            const user = userEvent.setup();
            const input = screen.getByDisplayValue(1) as HTMLInputElement;
            const increaseButton = screen.getByRole("button", { name: "+" });

            expect(increaseButton).toBeInTheDocument();
            await user.click(increaseButton);

            // By default will make value as string
            expect(input.valueAsNumber).toBe(2);
        });

        test("Can not add less than 1 product to cart, value will still be 1", async () => {
            const user = userEvent.setup();
            const input = screen.getByDisplayValue(1) as HTMLInputElement;
            const decreaseButton = screen.getByRole("button", { name: "-" });

            expect(decreaseButton).toBeInTheDocument();
            await user.click(decreaseButton);

            expect(input.valueAsNumber).toBe(1);
        });

        test("Clicking on minus button will descrease number of items to put in the cart", async () => {
            const user = userEvent.setup();
            const input = screen.getByDisplayValue(1) as HTMLInputElement;
            const increaseButton = screen.getByRole("button", { name: "+" });
            const decreaseButton = screen.getByRole("button", { name: "-" });

            await user.click(increaseButton);
            expect(input.valueAsNumber).toBe(2);

            await user.click(decreaseButton);
            expect(input.valueAsNumber).toBe(1);
        });

        test("clicking on add button adds 1 or more items in cart", async () => {
            const user = userEvent.setup();
            const addBtn = screen.getByRole("button", { name: "Add to cart" });

            await user.click(addBtn);

            const mockedAddToCart = context.mock.results[0].value.addToCart;
            expect(mockedAddToCart).toHaveBeenCalled();
        });

        test("typing value in input should be correctly displayed", async () => {
            const user = userEvent.setup();
            const input = screen.getByDisplayValue(1) as HTMLInputElement;

            await user.clear(input);
            await user.type(input, "100");

            expect(input.valueAsNumber).toBe(100);

            await user.clear(input);
            await user.type(input, "0");
            // to trigger blur event
            await user.tab();
            expect(input.valueAsNumber).toBe(1);
        });
    });
});
