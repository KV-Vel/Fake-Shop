import { Link } from "react-router";

export default function ErrorPage() {
    return (
        <div>
            <h1>404 Page not found</h1>
            <Link to="/">Get back</Link>
        </div>
    );
}
