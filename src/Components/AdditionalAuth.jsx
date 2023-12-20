import { FaGooglePlusG } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import useGlobal from "../Hooks/useGlobal";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import usePublicAxios from "../Hooks/usePublicAxios";


const AdditionalAuth = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { additionalLogin, user } = useGlobal();
    const publicAxios = usePublicAxios();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const facebookProvider = new FacebookAuthProvider();

    const handleAdditional = async (provider) => {
        try {
            await additionalLogin(provider);
            await publicAxios.post('/users', {
                email: user?.email,
                name: user?.displayName,
                role: 'user',
                promotionRequest: null,
            });
            toast.success('Login successful');
            navigate(state || '/');
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleLinkedIN = () => {
        Swal.fire("Coming soon!");
    }

    return (
        <>
            <div className="flex items-center justify-center gap-3">
                <FaGooglePlusG onClick={() => handleAdditional(googleProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <FaFacebookF onClick={() => handleAdditional(facebookProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <FaGithub onClick={() => handleAdditional(githubProvider)} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
                <RiLinkedinFill onClick={handleLinkedIN} className="border rounded text-2xl cursor-pointer transition-all hover:scale-105 active:scale-125 duration-150" />
            </div>
        </>
    )
}

export default AdditionalAuth