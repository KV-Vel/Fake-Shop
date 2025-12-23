import { render, screen } from "@testing-library/react";
import Homepage from "./Homepage";

describe("Homepage tests", () => {
    beforeEach(() => {
        render(<Homepage />);
    });

    it("Homepage should render at the start and have nav bar", () => {
        expect(screen.getByRole("main")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
});
