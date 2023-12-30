/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Avatar, IconButton } from '@mui/material';

// icons
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Swal from 'sweetalert2';
import useSecureAxios from '../Hooks/useSecureAxios';
import useGlobal from '../Hooks/useGlobal';
import useProduct from '../Hooks/useProduct';
import toast from 'react-hot-toast';

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

export default function TotalComments({ _id }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { product, refetch } = useProduct(_id);
    const comments = product?.comments || [];
    const secureAxios = useSecureAxios();
    const { user } = useGlobal();


    const isMyComment = comments.find(comment => comment?.email === user?.email)

    const handleDeleteComments = async () => {
        handleClose()
        Swal.fire({
            title: "Confirm delete your comments?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await secureAxios.delete(`/deleteComments/${product?._id}?email=${user?.email}`)
                    await refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: 'Your comments deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    toast.error(error?.message);
                }
            }
        });
    }
    return (
        <div>
            <p onClick={handleOpen} className='ml-4 text-xs underline cursor-pointer'>Comments : {comments?.length}</p>
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
                            {comments?.length ? 'Comments' : 'No comments'}
                        </Typography>
                        {
                            comments?.map((comment, index) => <div key={index} className='p-2 rounded-md shadow'>
                                <div className='flex items-center gap-3'>
                                    <Avatar alt="commentor" src={comment?.img} />
                                    <p className='font-semibold capitalize'>{comment?.name}</p>
                                </div>
                                <p className='text-sm'>{comment?.text}</p>
                            </div>)
                        }

                        {isMyComment && <div className='flex items-center'>
                            <Typography className='text-sm font-semibold'>Delete your comments?</Typography>
                            <IconButton onClick={handleClose}><CancelIcon /></IconButton>
                            <IconButton onClick={handleDeleteComments}><CheckCircleIcon /></IconButton>
                        </div>}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}