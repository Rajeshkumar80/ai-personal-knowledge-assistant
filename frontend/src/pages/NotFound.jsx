import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div
            style={{
                padding: "50px",
                textAlign: "center"
            }}
        >

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <br />

            <Link to="/dashboard">

                Go Back

            </Link>

        </div>

    );

}

export default NotFound;