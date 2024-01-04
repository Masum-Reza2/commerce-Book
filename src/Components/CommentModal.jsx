/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { Button, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from 'react-hook-form';
import useSecureAxios from '../Hooks/useSecureAxios';
import useGlobal from '../Hooks/useGlobal';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import useProduct from '../Hooks/useProduct';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function CommentModal({ id, refetch }) {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { refetch: commentRefetch } = useProduct(id);
    const secureAxios = useSecureAxios();
    const { user } = useGlobal();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        if (!user) {
            handleClose();
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

        setLoading(true)
        const comment = {
            email: user?.email,
            date: new Date().toLocaleString(),
            text: data?.comment,
            name: user?.displayName,
            img: user?.photoURL || null,
        }
        try {
            await secureAxios.put(`/comment/${id}`, comment)
            handleClose();
            reset();
            refetch();
            await commentRefetch();
            setLoading(false);
            toast.success('You post a comment.')
        } catch (error) {
            toast.error(error?.message);
            setLoading(false)
        }
    }
    return (
        <div>
            <IconButton onClick={handleOpen} aria-label="comment">
                <AddCommentIcon />
            </IconButton>
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
                    <Box className='max-w-xs md:max-w-lg space-y-2' sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Write a Comment
                        </Typography>
                        <form className='space-y-2' onSubmit={handleSubmit(onSubmit)}>
                            <TextField
                                {...register("comment")}
                                required
                                className='w-full'
                                id="outlined-multiline-static"
                                label="Type here"
                                multiline
                                rows={4}
                            />
                            <Button type='submit' variant="outlined" className='flex items-center justify-center w-full'>
                                {loading ? <TbFidgetSpinner className="animate-spin text-xl font-bold" /> : <SendIcon />}
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}