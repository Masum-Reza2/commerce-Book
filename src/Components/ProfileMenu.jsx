/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import useGlobal from "../Hooks/useGlobal"
import defaultProfile from '../assets/logos/defaultProfile.jpg'

const ProfileMenu = ({ handleOpenUserMenu, anchorElUser, handleCloseUserMenu }) => {
    const { user } = useGlobal();

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
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">items</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default ProfileMenu