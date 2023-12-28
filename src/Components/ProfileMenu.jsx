/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import useGlobal from "../Hooks/useGlobal"
import defaultProfile from '../assets/logos/defPro2.webp'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ProfileMenu = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu }) => {
    const { user, logOutUser } = useGlobal();
    const navigate = useNavigate();

    const handleLogout = async () => {
        handleCloseUserMenu();
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
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User profile" src={user?.photoURL || defaultProfile} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {/* 1 */}
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{user?.DisplayName || 'UserName'}</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Dashboard</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default ProfileMenu