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
    // const {} = product;
    const { _id, ownerName, ownerEmail, name, description, quantity, image, likeCount, comments, ownerImg, date } = product;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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
            <p className='ml-4 text-xs'>Likes : </p>
            <p className='ml-4 text-xs'>Comments : </p>
            <CardActions disableSpacing>
                <IconButton aria-label="like">
                    <ThumbUpIcon />
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
                    <Typography paragraph>Details:</Typography>
                    <Typography paragraph>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}