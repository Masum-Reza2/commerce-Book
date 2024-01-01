import Lottie from "lottie-react"
import adminLottie from '../../../assets/LottieAnimations/adminHome.json'

const AdminHome = () => {
    return (
        <div className="md:w-4/5 mx-auto">
            <h1 className="font-bold text-center text-xl">Welcom back <span className="text-red-500">Boss</span>!</h1>
            <Lottie className="md:-mt-28 lg:-mt-44 xl:-mt-52" animationData={adminLottie} loop={true} />
        </div>
    )
}

export default AdminHome