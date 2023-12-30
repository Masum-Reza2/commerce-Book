/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useGlobal from "../Hooks/useGlobal";
import Spinner from "../Components/Spinner";

const UserRoute = ({ children }) => {
    const { userRole, isPending } = useRole();
    const { pathname } = useLocation();
    const { user, loading } = useGlobal();
    if (loading || isPending) return <Spinner />
    if (user && userRole?.role === 'user') return children
    return <Navigate to={'/login'} state={pathname}></Navigate>
}


export default UserRoute