import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, NavLink, Outlet } from 'react-router-dom';

// icons
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCartNumber from '../../../Hooks/useCartNumber';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import Logout from '../../../Components/Logout';

export default function UserDashboard() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const { cartNumber } = useCartNumber();

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <NavLink to={'/userDashboard/cart'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary={`My Cart (${cartNumber?.cartCount || 0})`} />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink to={'/userDashboard/paymentHistory'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkHistoryIcon />
              </ListItemIcon>
              <ListItemText primary={`Payment History`} />
            </ListItemButton>
          </ListItem>
        </NavLink>

      </List>

      <Divider />

      <Link to={'/'}>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItemButton>
      </Link>
      <Logout />
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><ListIcon fontSize="large" /></Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <div className='bg-red-50 min-h-screen'>
        <Outlet />
      </div>
    </div>
  );
}
