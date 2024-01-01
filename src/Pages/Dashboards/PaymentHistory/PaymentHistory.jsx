import Lottie from "lottie-react";
import Spinner from "../../../Components/Spinner";
import usePaymentHistory from "../../../Hooks/usePaymentHistory";
import historyLottie from '../../../assets/LottieAnimations/paymentHistory.json'
import HistoryItems from "./HistoryItems";

const PaymentHistory = () => {
    const { isPending, history } = usePaymentHistory();
    if (isPending) return <Spinner />
    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 order-2 md:order-1 flex flex-col justify-center max-h-screen overflow-y-auto px-2">
                {
                    history?.length ? <HistoryItems /> :
                        <strong className="text-center text-xl">No Payment yet!</strong>
                }

            </div>
            <div className="col-span-12 md:col-span-6 order-1 md:order-2 mx-auto">
                <Lottie animationData={historyLottie} loop={true} />
            </div>
        </div>
    )
}

export default PaymentHistory