import { FaGooglePlusG } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobal from "../Hooks/useGlobal";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";


const AdditionalAuth = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { additionalLogin } = useGlobal();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleAdditional = async (provider) => {
        try {
            await additionalLogin(provider);
            toast.success('Login successful');
            navigate(state || '/');
        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <>
            <div className="flex items-center justify-center gap-3">
                <FaGooglePlusG onClick={() => handleAdditional(googleProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <FaFacebookF onClick={() => handleAdditional(facebookProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <FaGithub onClick={() => handleAdditional(githubProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <RiLinkedinFill className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
            </div>
        </>
    )
}

export default AdditionalAuth