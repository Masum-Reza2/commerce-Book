import Lottie from "lottie-react";
import shoppingLottie from '../../../assets/LottieAnimations/shoppingCart.json'
import CartItems from "./CartItems";

const Cart = () => {

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 px-2 flex items-center justify-end max-h-screen overflow-y-auto">
                <CartItems />
            </div>
            <div className="col-span-12 md:col-span-6 order-1 md:order-2">
                <Lottie animationData={shoppingLottie} loop={true} />
            </div>
        </div>
    )
}

export default Cart