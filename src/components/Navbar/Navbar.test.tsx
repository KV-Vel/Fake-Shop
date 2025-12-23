import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../pages/App";
import { BrowserRouter } from "react-router";

describe("Navigation", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>,
        );
    });

    it("initial render should be Homepage", () => {
        expect(window.location.pathname).toBe("/");
    });

    it("should have all 3 links rendered", () => {
        const shopLink = screen.getByRole("link", { name: /shop/i });
        const homeLink = screen.getByRole("link", { name: /home/i });
        const cartLink = screen.getByRole("link", { name: /cart/i });

        expect(shopLink).toBeInTheDocument();
        expect(homeLink).toBeInTheDocument();
        expect(cartLink).toBeInTheDocument();
    });

    it("click on links should change url according to link", async () => {
        const user = userEvent.setup();

        const [homeLink, shopLink, cartLink] = screen.getAllByRole("link");

        await user.click(shopLink);
        expect(window.location.pathname).toBe("/shop");

        await user.click(cartLink);
        expect(window.location.pathname).toBe("/cart");

        await user.click(homeLink);
        expect(window.location.pathname).toBe("/");
    });
});
