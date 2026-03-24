import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router";
import Navbar from "./Navbar";

describe("Navigation", () => {
    beforeEach(() => {
        render(<Navbar cartItemsSize={2} />, { wrapper: BrowserRouter });
    });

    test("initial render should be Homepage", () => {
        expect(window.location.pathname).toBe("/");
    });

    test("mobile menu should have 3 links rendered after mobile menu opened", async () => {
        const user = userEvent.setup();

        const mobileMenuBtn = screen.getByRole("button", { name: "Open navigation" });
        await user.click(mobileMenuBtn);

        const shopLink = screen.getAllByRole("link", { name: /shop/i });
        const homeLink = screen.getAllByRole("link", { name: /home/i });
        const cartLink = screen.getAllByRole("link", { name: /cart/i });

        expect(shopLink[0]).toBeInTheDocument();
        expect(homeLink[0]).toBeInTheDocument();
        expect(cartLink[0]).toBeInTheDocument();
    });

    test("click on links should change url according to link", async () => {
        const user = userEvent.setup();

        const mobileMenuBtn = screen.getByRole("button", { name: "Open navigation" });
        await user.click(mobileMenuBtn);

        const [homeLink, shopLink, cartLink] = screen.getAllByRole("link");

        await user.click(shopLink);
        expect(window.location.pathname).toBe("/shop");

        await user.click(cartLink);
        expect(window.location.pathname).toBe("/cart");

        await user.click(homeLink);
        expect(window.location.pathname).toBe("/");
    });

    test("If there are items in the cart, number of items should be displayed", () => {
        // Mobile + Desktop menu
        const itemsCount = screen.getAllByLabelText("2 items in cart");
        expect(itemsCount).toHaveLength(2);
    });
});
