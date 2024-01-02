import { Button, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useGlobal from "../Hooks/useGlobal";
import { NavLink, useNavigate } from "react-router-dom";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import useRole from "../Hooks/useRole";

const Logout = () => {
    const { logOutUser } = useGlobal();
    const navigate = useNavigate();
    const { userRole } = useRole();
    const role = userRole?.role;

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
        <div className='absolute bottom-1 w-full space-y-1'>
            <NavLink to={(role === 'user' && '/userDashboard/settings') || (role === 'seller' && '/sellerDashboard/settings') || (role === 'admin' && '/adminDashboard/settings')}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsSuggestIcon />
                        </ListItemIcon>
                        <ListItemText primary={`Settings`} />
                    </ListItemButton>
                </ListItem>
            </NavLink>
            <div onClick={handleLogout} className='text-center mx-auto w-full'>
                <Button variant='contained' className='w-full'>Logout</Button>
            </div>
        </div>
    )
}

export default Logout