import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { render } from "@testing-library/react";
import App from "../App";
import HomePage from "./HomePage";
import userEvent from "@testing-library/user-event";

describe("HomePage", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>,
        );
    });
    test("Homepage have hero section with 2 articles", () => {
        screen.debug();
        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(2);
    });

    test("Clicking on Explore Collection button should navigate to shop", async () => {
        const user = userEvent.setup();

        const shopButton = screen.getByRole("button", { name: "Explore collection" });
        expect(shopButton).toBeInTheDocument();

        await user.click(shopButton);
        expect(window.location.pathname).toBe("/shop");
    });
});
