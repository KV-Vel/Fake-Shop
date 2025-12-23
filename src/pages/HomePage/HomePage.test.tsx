import { render, screen } from "@testing-library/react";
import HomePage from "./Homepage";

describe("Homepage tests", () => {
    beforeEach(() => {
        render(<HomePage />);
    });

    it("Homepage should render at the start and have nav bar", () => {
        expect(screen.getByRole("main")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
});
