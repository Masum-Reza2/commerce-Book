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
        element: <UserDashboard />,
        children: [

        ]
    },
    // sellerDashboard
    {
        path: '/sellerDashboard',
        element: <SellerRoute><SellerDashboard /></SellerRoute>,
        children: [
            { index: true, element: <SellerHome /> },
            { path: 'addProduct', element: <AddProduct /> },
        ]
    },
    // adminDashboard
    {
        path: '/adminDashboard',
        element: <AdminDashboard />,
        children: [

        ]
    },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
])
export default Routes