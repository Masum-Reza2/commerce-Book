import { Pagination, Stack } from "@mui/material"
import * as React from 'react';
import useProductCount from "../../Hooks/useProductCount";
import useProducts from "../../Hooks/useProducts";
import SkeletonCom from "../../Components/Skeleton";
import ProductCard from "../../Components/ProductCard";
import useGlobal from "../../Hooks/useGlobal";
import useRole from "../../Hooks/useRole";


const Home = () => {
    const { searchText, user } = useGlobal();
    const { productCount } = useProductCount();
    const totalProduct = productCount?.productCount || 0;
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    const { products, isPending, refetch } = useProducts(page, 10, searchText);
    const { userRole } = useRole();

    if (isPending) return <SkeletonCom />
    return (
        <div className='grid py-5  grid-cols-12'>
            <div className='col-span-3 border hidden md:block h-screen overflow-y-auto'>
                <img className="p-3 md:max-w-[180px] lg:max-w-[300px] mx-auto" src={user?.photoURL} alt="" />
                <h5 className="text-xl text-center font-bold">{user?.displayName}</h5>
                <p className="text-center">You are a <span className="font-semibold text-green-500">{userRole?.role}</span></p>
            </div>

            <div className="h-screen col-span-12 md:col-span-6 flex flex-col items-center overflow-y-auto">
                <div className="grid grid-cols-1 gap-5 px-2 md:px-4">
                    {
                        products?.reverse()?.map(product => <ProductCard product={product} key={product?._id} refetch={refetch} />)
                    }
                    {!products?.length && <h1 className="font-bold text-xl">No products found for <span className="italic">{`'${searchText}'`}</span></h1>}
                </div>
                <Stack className="pt-5" spacing={2} >
                    <Pagination count={Math.ceil(totalProduct / 10)} page={page} onChange={handleChange} color="secondary" />
                </Stack>
            </div>

            <div className='col-span-3 border hidden md:block h-screen overflow-y-auto'>hello</div>
        </div>
    )
}

export default Home