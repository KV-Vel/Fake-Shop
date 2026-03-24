import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    let errorMsg;

    if (isRouteErrorResponse(error)) {
        errorMsg = (
            <>
                <p>
                    {error.status} {error.statusText}
                </p>
                <p>{error.statusText}</p>
            </>
        );
    } else if (error instanceof Error) {
        errorMsg = <p>{error.message}</p>;
    }

    return (
        <div className={styles.errorPageWrapper}>
            <div className={styles.errorInfoWrapper}>
                <h1>Error occured</h1>
                {errorMsg || "Unknown error"}
                <Link to="/">
                    <button type="button" className={styles.getBackBtn}>
                        Get back
                    </button>
                </Link>
            </div>
        </div>
    );
}
