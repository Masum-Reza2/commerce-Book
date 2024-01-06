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
import Payment from "../Pages/Dashboards/Payments/Payment"
import PaymentHistory from "../Pages/Dashboards/PaymentHistory/PaymentHistory"
import UserHome from "../Pages/Dashboards/UserDashboard/UserHome"
import AdminHome from "../Pages/Dashboards/AdminDashboard/AdminHome"
import UserPayments from "../Pages/Dashboards/AdminDashboard/UserPayments"
import ManageUsers from "../Pages/Dashboards/AdminDashboard/ManageUsers"
import Settings from "../Pages/Settings/Settings"
import BecomeSeller from "../Pages/BecomeSeller/BecomeSeller"
import Chat from "../Pages/Chat/Chat"

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/message', element: <Chat /> },
        ]
    },
    // userDashboard
    {
        path: '/userDashboard',
        element: <UserRoute><UserDashboard /></UserRoute>,
        children: [
            { index: true, element: <UserHome /> },
            { path: 'cart', element: <Cart /> },
            { path: 'payment', element: <Payment /> },
            { path: 'paymentHistory', element: <PaymentHistory /> },
            { path: 'settings', element: <Settings /> },
            { path: 'becomeSeller', element: <BecomeSeller /> },
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
            { path: 'payment', element: <Payment /> },
            { path: 'paymentHistory', element: <PaymentHistory /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    // adminDashboard
    {
        path: '/adminDashboard',
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
        children: [
            { index: true, element: <AdminHome /> },
            { path: 'cart', element: <Cart /> },
            { path: 'payment', element: <Payment /> },
            { path: 'paymentHistory', element: <PaymentHistory /> },
            { path: 'userPayments', element: <UserPayments /> },
            { path: 'manageUsers', element: <ManageUsers /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    { path: '/register', element: <RegisterPage /> },
    { path: '/login', element: <LoginPage /> },
])
export default Routes