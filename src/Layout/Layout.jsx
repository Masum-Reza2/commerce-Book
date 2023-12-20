import { Outlet, useNavigation } from "react-router-dom"
import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";

const Layout = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Navbar />
            <div className="min-h-[80vh]">
                {
                    navigation.state === "loading" ?
                        <Spinner />
                        :
                        <Outlet />

                }
            </div>
            footer here
        </div>
    )
}

export default Layout