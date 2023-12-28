import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout"
import ErrorPage from "../Pages/ErrorPage/ErrorPage"
import LoginPage from "../Pages/LoginPage/LoginPage"
import RegisterPage from "../Pages/RegisterPage/RegisterPage"
import UserDashboard from "../Pages/Dashboards/UserDashboard/UserDashboard"
import SellerDashboard from "../Pages/Dashboards/SellerDashboard/SellerDashboard"
import AdminDashboard from "../Pages/Dashboards/AdminDashboard/AdminDashboard"

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [

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
        element: <SellerDashboard />,
        children: [

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