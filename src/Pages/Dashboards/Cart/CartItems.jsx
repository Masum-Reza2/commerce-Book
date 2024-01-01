import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import useCarts from '../../../Hooks/useCarts';
import Spinner from '../../../Components/Spinner';

// icons
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Button, Divider } from '@mui/material';
import Swal from 'sweetalert2';
import useSecureAxios from '../../../Hooks/useSecureAxios';
import useCartNumber from '../../../Hooks/useCartNumber';
import useProducts from '../../../Hooks/useProducts';
import useProduct from '../../../Hooks/useProduct';
import { Link } from 'react-router-dom';
import useRole from '../../../Hooks/useRole';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function CartItems() {
    const [secondary, setSecondary] = React.useState(false);
    const { carts, refetch, isPending } = useCarts();
    const totalPrice = carts?.reduce((prev, curr) => prev + curr.price, 0)
    const secureAxios = useSecureAxios();
    const { refetch: cartNumberRefetch } = useCartNumber();
    const { refetch: productsRefetch } = useProducts();
    const { refetch: productRefetch } = useProduct();
    const { userRole } = useRole();
    const role = userRole?.role;

    const handleRemoveCart = (cartId, productId) => {
        Swal.fire({
            title: "Confirm delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await secureAxios.delete(`/removeCart?cartId=${cartId}&productId=${productId}`)
                await refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Deleted.",
                    showConfirmButton: false,
                    timer: 1500
                });
                await cartNumberRefetch();
                await productsRefetch();
                await productRefetch();
            }
        });
    }
    if (isPending) return <Spinner />
    return (
        <Box className='my-5 md:my-0 max-h-screen overflow-y-auto' sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography className='text-center' sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Your cart items.
                    </Typography>
                    <Demo className='shadow rounded-lg'>
                        <List>
                            {carts?.map((cart, index) => {
                                return <ListItem className='bg-orange-100' key={cart?._id}
                                    secondaryAction={
                                        <IconButton onClick={() => handleRemoveCart(cart?._id, cart?.productId)} edge="end" aria-label="delete">
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ShoppingCartCheckoutIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${index + 1}. ${cart?.name} ($${cart?.price})`}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                </ListItem>
                            })
                            }
                        </List>
                    </Demo>
                </Grid>

            </Grid>

            <br />
            <Divider variant="middle" />
            <Typography className='text-center pb-5 md:pb-0 font-bold' variant='h6'>Total Price : ${totalPrice}</Typography>
            <div className='text-center'>
                <Link to={(role === 'user' && '/userDashboard/payment') || (role === 'seller' && '/sellerDashboard/payment') || (role === 'admin' && '/adminDashboard/payment')}>
                    <Button variant="contained">Place-Order</Button>
                </Link>
            </div>
        </Box>
    );
}