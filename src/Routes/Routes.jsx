import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout"

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
    }
])
export default Routes