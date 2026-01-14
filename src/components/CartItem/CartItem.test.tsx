import { useOutletContext } from "react-router";
import { test, type Mock } from "vitest";
import type { CartContext } from "../../types/data";
import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import userEvent from "@testing-library/user-event";

vi.mock("react-router", async () => {
    const actual = await import("react-router");

    return {
        ...actual,
        useOutletContext: vi.fn(),
    };
});

const cartContext: CartContext = {
    cartItems: new Map(),
    addToCart: vi.fn(),
    deleteFromCart: vi.fn(),
};

describe("CartItem", () => {
    let mocked: Mock;
    beforeEach(() => {
        mocked = (useOutletContext as Mock).mockReturnValue(cartContext);
        render(<CartItem count={3} id="2" name="chair" image_path="image_path" price={50} />);
    });

    test("should render CartItem with proper props provided", () => {
        const cartItemArticle = screen.getByRole("article");
        expect(cartItemArticle).toBeInTheDocument();
    });

    test("if more than 1 item in the cart, should display correct overall value", () => {
        const overAllPrice = screen.getByText("$150.00");
        expect(overAllPrice).toBeInTheDocument();
    });

    test("Can successfully delete item from cart", async () => {
        const user = userEvent.setup();
        const deleteBtn = screen.getByRole("button", { name: /delete/i });

        expect(deleteBtn).toBeInTheDocument();
        await user.click(deleteBtn);

        const mockedDeleteFunc: Mock = mocked.mock.results[0].value.deleteFromCart;
        expect(mockedDeleteFunc).toBeCalled();
        expect(mockedDeleteFunc).toBeCalledWith("2");
    });

    test.todo("add Link to picures of cart items and test if it navigates to page");
});
