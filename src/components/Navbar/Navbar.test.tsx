import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../pages/App";
import { BrowserRouter } from "react-router";

describe("Navigation", () => {
    beforeEach(() => {
        render(<App />, { wrapper: BrowserRouter });
    });

    test("initial render should be Homepage", () => {
        expect(window.location.pathname).toBe("/");
    });

    test("mobile menu should have 3 links rendered after mobile menu opened", async () => {
        const user = userEvent.setup();

        const mobileMenuBtn = screen.getByRole("button", { name: "Open navigation" });
        await user.click(mobileMenuBtn);

        const shopLink = screen.getByRole("link", { name: /shop/i });
        const homeLink = screen.getByRole("link", { name: /home/i });
        const cartLink = screen.getByRole("link", { name: /cart/i });

        expect(shopLink).toBeInTheDocument();
        expect(homeLink).toBeInTheDocument();
        expect(cartLink).toBeInTheDocument();
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
});
