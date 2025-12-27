import { screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { render } from "../../../tests/test-utils";
import App from "../App";
import HomePage from "./HomePage";

describe("Homepage tests", () => {
    beforeEach(() => {
        render(<HomePage />);
    });
    it("Homepage have hero section with 2 articles", () => {
        screen.debug();
        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(2);
    });
});
