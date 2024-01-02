import Lottie from "lottie-react";
import Spinner from "../../../Components/Spinner";
import usePaymentHistory from "../../../Hooks/usePaymentHistory";
import historyLottie from '../../../assets/LottieAnimations/paymentHistory.json'
import HistoryItems from "./HistoryItems";

const PaymentHistory = () => {
    const { isPending, history } = usePaymentHistory();
    if (isPending) return <Spinner />
    return (
        <div className="grid grid-cols-12 min-h-screen place-items-center bg-white">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1 w-full max-h-screen overflow-y-auto px-2">
                {
                    history?.length ? <HistoryItems /> :
                        <strong className="text-center text-xl">No Payment yet!</strong>
                }

            </div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2 mx-auto">
                <Lottie animationData={historyLottie} loop={true} />
            </div>
        </div>
    )
}

export default PaymentHistory