import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout"
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "../Pages/RegisterPage/RegisterPage"
import UserDashboard from "../Pages/Dashboards/UserDashboard/UserDashboard"
import SellerDashboard from "../Pages/Dashboards/SellerDashboard/SellerDashboard"
import AdminDashboard from "../Pages/Dashboards/AdminDashboard/AdminDashboard"
import SellerHome from "../Pages/Dashboards/SellerDashboard/SellerHome"
import AddProduct from "../Pages/Dashboards/SellerDashboard/AddProduct"
import Home from "../Pages/Home/Home"
import SellerRoute from "./SellerRoute"
import AdminRoute from "./AdminRoute"
import UserRoute from "./UserRoute"
import Cart from "../Pages/Dashboards/Cart/Cart"

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Home /> }
        ]
    },
    // userDashboard
    {
        path: '/userDashboard',
        element: <UserRoute><UserDashboard /></UserRoute>,
        children: [
            { path: 'cart', element: <Cart /> },
        ]
    },
    // sellerDashboard
    {
        path: '/sellerDashboard',
        element: <SellerRoute><SellerDashboard /></SellerRoute>,
        children: [
            { index: true, element: <SellerHome /> },
            { path: 'addProduct', element: <AddProduct /> },
            { path: 'cart', element: <Cart /> },
        ]
    },
    // adminDashboard
    {
        path: '/adminDashboard',
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
        children: [
            { path: 'cart', element: <Cart /> },
        ]
    },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
])
export default Routes