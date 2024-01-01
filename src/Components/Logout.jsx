import { Button } from "@mui/material"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useGlobal from "../Hooks/useGlobal";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const { logOutUser } = useGlobal();
    const navigate = useNavigate();
    const handleLogout = async () => {
        Swal.fire({
            title: "Confirm Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await logOutUser();
                    toast.success('Logout successful.');
                    navigate('/login');
                } catch (error) {
                    toast.error(error?.message)
                }
            }
        });
    }
    return (
        <div onClick={handleLogout} className='absolute bottom-1 text-center mx-auto w-full'>
            <Button variant='contained' className='w-full'>Logout</Button>
        </div>
    )
}

export default Logout