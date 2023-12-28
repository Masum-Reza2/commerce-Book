import { Outlet, useNavigation } from "react-router-dom"
import Spinner from "../Components/Spinner";
import Navbar from "../Components/Navbar";

const Layout = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-12'>
                <div className='col-span-3 border hidden md:block'>hi</div>
                <div className="min-h-[80vh] col-span-12 md:col-span-6 border">
                    {
                        navigation.state === "loading" ?
                            <Spinner />
                            :
                            <Outlet />
                    }
                </div>
                <div className='col-span-3 border hidden md:block'>hi</div>
            </div>
        </div>
    )
}

export default Layout