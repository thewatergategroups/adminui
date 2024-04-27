import { ErrorResponse, Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>{error?.statusText || "Page not found."}</p>
      <Link to={""}>Home</Link>
    </div>
  );
}
