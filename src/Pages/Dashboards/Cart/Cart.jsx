/* eslint-disable react/no-unescaped-entities */
import Lottie from "lottie-react";
import shoppingLottie from '../../../assets/LottieAnimations/shoppingCart.json'
import CartItems from "./CartItems";
import useCarts from "../../../Hooks/useCarts";
import Spinner from "../../../Components/Spinner";

const Cart = () => {
    const { carts, isPending } = useCarts();

    if (isPending) return <Spinner />
    return (
        <div className="grid grid-cols-12 place-items-center min-h-screen">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1 px-2 w-full">
                {carts?.length ? <CartItems /> : <h1 className="font-bold text-xl text-center">You don't have any cart item!</h1>}

            </div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2">
                <Lottie animationData={shoppingLottie} loop={true} />
            </div>
        </div>
    )
}

export default Cart