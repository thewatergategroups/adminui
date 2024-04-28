import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Page not found.</p>
            <Link to={""}>Home</Link>
        </div>
    );
}
