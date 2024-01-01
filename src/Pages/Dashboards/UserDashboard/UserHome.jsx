import Lottie from "lottie-react"
import homeLottie from '../../../assets/LottieAnimations/userDash.json'
import useGlobal from "../../../Hooks/useGlobal"

const UserHome = () => {
    const { user } = useGlobal();
    return (
        <div className="md:w-1/2 lg:w-1/3 mx-auto">
            <h1 className="font-bold text-center text-xl">Welcom back <span className="text-red-500">{user?.displayName}</span>!</h1>
            <Lottie animationData={homeLottie} loop={true} />
        </div>
    )
}

export default UserHome