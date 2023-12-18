import { FaGooglePlusG } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";


const AdditionalAuth = () => {
    return (
        <>
            <div className="flex items-center justify-center gap-3">
                <FaGooglePlusG className="border rounded text-2xl cursor-pointer transition-all hover:scale-105" />
                <FaFacebookF className="border rounded text-2xl cursor-pointer transition-all hover:scale-105" />
                <FaGithub className="border rounded text-2xl cursor-pointer transition-all hover:scale-105" />
                <RiLinkedinFill className="border rounded text-2xl cursor-pointer transition-all hover:scale-105" />
            </div>
        </>
    )
}

export default AdditionalAuth