import { render } from "@testing-library/react";

import { BrowserRouter, useRouteError } from "react-router";
import ErrorPage from "./ErrorPage";

vi.mock("react-router", async () => {
    const actual = await vi.importActual("react-router");
    return {
        ...actual,
        useRouteError: vi.fn(),
    };
});

describe("ErrorPage", () => {
    test("if error as Response, page should show error response code", () => {
        vi.mocked(useRouteError).mockReturnValue({
            status: 404,
            statusText: "Not Found",
            data: "Page not found",
            internal: true,
        });
        const { getByText } = render(<ErrorPage />, { wrapper: BrowserRouter });

        const errorCode = getByText(/404/i);
        expect(errorCode).toBeInTheDocument();
    });

    test("if error is instanceof Error should show error message", () => {
        vi.mocked(useRouteError).mockReturnValue(new Error("test error message"));
        const { getByText } = render(<ErrorPage />, { wrapper: BrowserRouter });

        const errorMessage = getByText(/test error message/i);
        expect(errorMessage).toBeInTheDocument();
    });

    test("if error does not match error Response and Error, app should show Unknown error", () => {
        vi.mocked(useRouteError).mockReturnValue({});
        const { getByText } = render(<ErrorPage />, { wrapper: BrowserRouter });

        const errorMessage = getByText(/unknown error/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
