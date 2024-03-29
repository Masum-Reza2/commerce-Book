import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import './navbar.css'
import ProfileMenu from './ProfileMenu';
import useGlobal from '../Hooks/useGlobal';

// icons
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useRole from '../Hooks/useRole';
import useCartNumber from '../Hooks/useCartNumber';
import ForumIcon from '@mui/icons-material/Forum';

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { searchText, setSearchText } = useGlobal();
    const { userRole } = useRole();
    const { user } = useGlobal();
    const role = userRole?.role;
    const { cartNumber, refetch } = useCartNumber()

    React.useEffect(() => {
        refetch()
    }, [user, refetch])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pageItems = <div className='lg:flex'>
        <Button
            onClick={handleCloseNavMenu}
            sx={{ my: 2, display: 'block' }}
        >
            <NavLink to={'/'} className='text-white hover:bg-gray-500 bg-gray-500 lg:bg-transparent p-3 hover:border-b-[5px] rounded-[10%] hover:border-black'>
                <HomeIcon />
            </NavLink>
        </Button>
        <Button
            className='relative'
            onClick={handleCloseNavMenu}
            sx={{ my: 2, display: 'block' }}
        >
            <NavLink to={(role === 'user' && '/userDashboard/cart') || (role === 'seller' && '/sellerDashboard/cart') || (role === 'admin' && '/adminDashboard/cart')} className='text-white hover:bg-gray-500 bg-gray-500 lg:bg-transparent p-3 hover:border-b-[5px] rounded-[10%] hover:border-black'>
                <ShoppingCartIcon />
            </NavLink>
            <Typography className='text-white font-bold absolute top-0 right-2 lg:right-2'>{cartNumber?.cartCount}</Typography>
        </Button>
        {/* <Button
            className='relative'
            onClick={handleCloseNavMenu}
            sx={{ my: 2, display: 'block' }}
        >
            <NavLink to={'/message'} className='text-white hover:bg-gray-500 bg-gray-500 lg:bg-transparent p-3 hover:border-b-[5px] rounded-[10%] hover:border-black'>
                <ForumIcon />
            </NavLink>
        </Button> */}
    </div>

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FaMoneyBillTrendUp className='hidden lg:block mr-4 text-lg' />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Commerce Book
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pageItems}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Comm-Book
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, color: 'red' }}>
                        {pageItems}
                    </Box>
                    {/* search box */}
                    <div className='items-center justify-center hidden md:flex relative'>
                        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" placeholder="Search Commerce-Book" className="input input-bordered md:px-5 mr-5 p-2 rounded-md text-black focus:outline-none" />
                    </div>

                    {/* profile */}
                    <ProfileMenu handleOpenUserMenu={handleOpenUserMenu} anchorElUser={anchorElUser} handleCloseUserMenu={handleCloseUserMenu} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Navbar;