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
import { Divider } from '@mui/material';


const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function CartItems() {
    const [secondary, setSecondary] = React.useState(false);
    const { carts, refetch, isPending } = useCarts();
    const totalPrice = carts?.reduce((prev, curr) => prev + curr.price, 0)

    if (isPending) return <Spinner />
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography className='text-center' sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Your cart items.
                    </Typography>
                    <Demo className='shadow rounded-lg'>
                        <List>
                            {carts?.map((cart, index) => {
                                return <ListItem key={cart?._id}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
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
                                        primary={`${index + 1}. ${cart?.name}`}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                    <ListItemText
                                        primary={`$${cart?.price}`}
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
        </Box>
    );
}
