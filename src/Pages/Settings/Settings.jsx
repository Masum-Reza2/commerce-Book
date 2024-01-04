import Lottie from "lottie-react";
import settingsLottie from '../../assets/LottieAnimations/settings.json'
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateName from './UpdateName'
import useGlobal from "../../Hooks/useGlobal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Settings = () => {
    const navigate = useNavigate();
    const { deleteHimOrHer } = useGlobal();
    const handledeleteUser = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Very confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteHimOrHer();
                    await toast.success('Account deleted!')
                    navigate('/login')
                } catch (error) {
                    toast.error(error?.message)
                }
            }
        });
    }
    return (
        <div className="grid grid-cols-12 min-h-screen border place-items-center">
            <div className="col-span-12 md:col-span-8 order-2 md:order-1 flex flex-col gap-2">
                <UpdateName name />
                <UpdateName profile />
                <UpdateName email />
                <UpdateName password />
                <Button onClick={handledeleteUser} color="error" variant="contained" startIcon={<DeleteIcon />}>
                    Delete Account
                </Button>
            </div>
            <div className="col-span-12 md:col-span-4 order-1 md:order-2 ">
                <Lottie animationData={settingsLottie} loop={true} />
            </div>
        </div>
    )
}

export default Settings