import { Navigate } from "react-router-dom";

const ProtectedRoute = ({element}) =>
{
    const userLoggedIn = localStorage.getItem("user");

    return userLoggedIn ? element : <Navigate to="/" replace /> 
}

export default ProtectedRoute;