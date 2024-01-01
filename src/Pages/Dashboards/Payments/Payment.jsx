import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckoutForm from "./CheckoutForm";
import Lottie from "lottie-react";
import paymentLottie from '../../../assets/LottieAnimations/payment.json'

const stripePromise = loadStripe(import.meta.env.VITE_stripe_payment_pk);
const Payment = () => {
    return (
        <div className="max-h-screen">
            <Helmet>
                <title>Commerce-Book | Payment</title>
            </Helmet>
            <div className="relative z-50">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>

            <div className="-translate-y-10 md:w-1/2 mx-auto md:-mt-7 lg:-mt-16">
                <Lottie animationData={paymentLottie} loop={true} />
            </div>
        </div>
    )
}

export default Payment