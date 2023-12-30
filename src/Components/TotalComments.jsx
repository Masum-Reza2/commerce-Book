/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';
import useGlobal from '../Hooks/useGlobal';

// icons
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function TotalComments({ commentCount, product }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const comments = product?.comments;
    const { user } = useGlobal();
    return (
        <div>
            <p onClick={handleOpen} className='ml-4 text-xs underline cursor-pointer'>Comments : {commentCount}</p>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box className='max-w-xs md:max-w-full space-y-2 overflow-y-scroll max-h-[26rem] outline-none' sx={style}>
                        <Typography className='text-center' id="transition-modal-title" variant="h6" component="h2">
                            Comments
                        </Typography>
                        {
                            comments?.map((comment, index) => <div key={index} className='p-2 rounded-md shadow'>
                                <div className='flex items-center gap-3 relative'>
                                    <Avatar alt="commentor" src={comment?.img} />
                                    <p className='font-semibold capitalize'>{comment?.name}</p>
                                    {comment?.email === user?.email && <DeleteIcon className='absolute right-2' />}
                                </div>
                                <p className='text-sm'>{comment?.text}</p>
                            </div>)
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}