/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useSecureAxios from '../Hooks/useSecureAxios';
import useGlobal from '../Hooks/useGlobal';
import toast from 'react-hot-toast';
import CommentModal from './CommentModal';
import TotalComments from './TotalComments';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useCartNumber from '../Hooks/useCartNumber';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ProductCard({ product, refetch }) {
    const [expanded, setExpanded] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const { _id, name, description, quantity, image, likes, price, ownerImg, date } = product;

    const [qty, setQty] = React.useState(quantity || 0)
    const [likeCount, setLikeCount] = React.useState(likes?.length || 0);

    const secureAxios = useSecureAxios();
    const { user } = useGlobal();
    const navigate = useNavigate();
    const { refetch: cartNumberRefetch } = useCartNumber();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        let alreadyLiked = likes?.find(email => email === user?.email);
        if (alreadyLiked) {
            setIsLiked(true)
        }
    }, [user, likes])


    const handleLike = async () => {
        if (!user) {
            return Swal.fire({
                title: "You are not logged in!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }
        if (!isLiked) {
            try {
                secureAxios.put(`/like/${_id}?email=${user?.email}`);
                setLikeCount(likeCount + 1)
                setIsLiked(true);
            } catch (error) {
                toast.error(error?.message)
            }
        } else {
            try {
                secureAxios.put(`/disLike/${_id}?email=${user?.email}`);
                setLikeCount(likeCount - 1)
                setIsLiked(false);
            } catch (error) {
                toast.error(error?.message)
            }
        }
    }

    const handleCart = async () => {
        if (!user) {
            return Swal.fire({
                title: "You are not logged in!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }
        if (qty < 1) {
            return Swal.fire({
                position: "center",
                icon: "info",
                title: "Out of Stock!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        try {
            const cartProduct = {
                name,
                productId: _id,
                email: user?.email,
                price,
                date: new Date().toLocaleString(),
            }
            await secureAxios.put(`/addTocart`, cartProduct);
            await cartNumberRefetch();
            toast.success('Added to cart.')
            setQty(qty - 1);
        } catch (error) {
            toast.error(error?.message);
        }
    }
    return (
        <>
            <Card>
                <CardHeader
                    avatar={
                        <Avatar alt="Remy Sharp" src={ownerImg} />
                    }
                    title={name}
                    subheader={date}
                />
                {image &&
                    <CardMedia
                        component="img"
                        height="100"
                        image={image}
                        alt="Paella dish"
                    />}
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {description.slice(0, 150) + '...'}
                    </Typography>
                </CardContent>
                <p className='ml-4 text-xs'>Likes : {likeCount}</p>
                {/* All comments */}
                <TotalComments _id={_id} />
                <CardActions disableSpacing>
                    <IconButton onClick={handleLike} aria-label="like">
                        {/* like functionality */}
                        <ThumbUpIcon className={isLiked ? 'text-blue-600' : ''} />
                    </IconButton>
                    {/* Add comment */}
                    <CommentModal id={_id} refetch={refetch} />
                    <IconButton onClick={handleCart} aria-label="add-to-cart">
                        {/* Cart functionality */}
                        <AddShoppingCartIcon />
                    </IconButton>

                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Price : ${price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Quantity : {qty}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            <span className='underline'>Details</span> : {description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}