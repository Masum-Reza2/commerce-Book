import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import Lottie from "lottie-react";
import paymentLottie from '../../assets/LottieAnimations/payment.json'
import SellerForm from "./SellerForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_pk);
const BecomeSeller = () => {
    return (
        <div>
            <Helmet>
                <title>Commerce-Book | Become a seller</title>
            </Helmet>
            <div className="relative z-50 translate-y-5">
                <Elements stripe={stripePromise}>
                    <SellerForm />
                </Elements>
            </div>

            <div className="-translate-y-10 md:w-1/2 mx-auto md:-mt-7 lg:-mt-16">
                <Lottie animationData={paymentLottie} loop={true} />
            </div>
        </div>
    )
}

export default BecomeSeller