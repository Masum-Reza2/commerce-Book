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
import AddCommentIcon from '@mui/icons-material/AddComment';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import useSecureAxios from '../Hooks/useSecureAxios';
import useGlobal from '../Hooks/useGlobal';
import toast from 'react-hot-toast';

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

export default function ProductCard({ product }) {
    const [expanded, setExpanded] = React.useState(false);
    const [isLiked, setIsLiked] = React.useState(false);
    const { _id, ownerName, ownerEmail, name, description, quantity, image, likes, price, comments, ownerImg, date } = product;

    const [likeCount, setLikeCount] = React.useState(likes?.length || 0);
    const [commentCount, setCommentCount] = React.useState(comments?.length || 0);

    const secureAxios = useSecureAxios();
    const { user } = useGlobal();

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

    return (
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
                    {description.slice(0, 100) + '...'}
                </Typography>
            </CardContent>
            <p className='ml-4 text-xs'>Likes : {likeCount}</p>
            <p className='ml-4 text-xs'>Comments : {commentCount}</p>
            <CardActions disableSpacing>
                <IconButton onClick={handleLike} aria-label="like">
                    <ThumbUpIcon className={isLiked ? 'text-blue-600' : ''} />
                </IconButton>
                <IconButton aria-label="comment">
                    <AddCommentIcon />
                </IconButton>
                <IconButton aria-label="add-to-cart">
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
                        Quantity : ${quantity}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        <span className='underline'>Details</span> : {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}