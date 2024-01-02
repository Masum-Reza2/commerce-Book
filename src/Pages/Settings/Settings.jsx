import Lottie from "lottie-react";
import settingsLottie from '../../assets/LottieAnimations/settings.json'

const Settings = () => {
    return (
        <div className="grid grid-cols-12 min-h-screen border place-items-center">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1"></div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2 ">
                <Lottie animationData={settingsLottie} loop={true} />
            </div>
        </div>
    )
}

export default Settings