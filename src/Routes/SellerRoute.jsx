/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useGlobal from "../Hooks/useGlobal";
import Spinner from "../Components/Spinner";

const SellerRoute = ({ children }) => {
    const { userRole, isPending } = useRole();
    const { pathname } = useLocation();
    const { user, loading } = useGlobal();
    if (loading || isPending) return <Spinner />
    if (user && userRole?.role === 'seller') return children
    return <Navigate to={'/'} state={pathname}></Navigate>
}

export default SellerRoute
