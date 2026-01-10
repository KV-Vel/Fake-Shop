import CartPage from "../../pages/CartPage/CartPage";
import { render } from "@testing-library/react";
import { useOutletContext } from "react-router";
import type { Mock } from "vitest";
import type { CartContext } from "../../types/data";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

describe("Cart", () => {
    describe("Items not in cart", () => {
        beforeEach(() => {
            (useOutletContext as Mock).mockReturnValue({
                cartItems: new Map(),
                addToCart: vi.fn(),
                deleteFromCart: vi.fn(),
            } as CartContext);
        });

        test("if no items in cart, should display corresponding message", () => {
            const { getByText } = render(<CartPage />);

            const noItemsMessagePara = getByText(/no items in cart/i);
            expect(noItemsMessagePara).toBeInTheDocument();
        });
    });

    describe("Items in cart", () => {
        beforeEach(() => {
            (useOutletContext as Mock).mockReturnValue({
                cartItems: new Map([
                    [
                        "4",
                        {
                            price: 399,
                            count: 2,
                            id: "1",
                            name: "Modern sofa",
                            image_path: "image_path",
                        },
                    ],
                ]),
                addToCart: vi.fn(),
                deleteFromCart: vi.fn(),
            } as CartContext);
        });

        test("If items in cart, should display them on the page", () => {
            const { getByText } = render(<CartPage />);

            const cartItemHeader = getByText("Modern sofa");
            expect(cartItemHeader).toBeInTheDocument();
        });
    });
});
