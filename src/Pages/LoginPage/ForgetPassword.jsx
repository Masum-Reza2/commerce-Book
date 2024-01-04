/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { TbFidgetSpinner } from 'react-icons/tb';
import useGlobal from '../../Hooks/useGlobal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';


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

export default function ForgetPassword() {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [email, setEmail] = React.useState('');
    const { passResMail } = useGlobal();

    const onSubmit = async () => {
        try {
            setLoading(true);
            await passResMail(email)
            handleClose();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Reset mail send to ${email}`,
                showConfirmButton: false,
                timer: 2500
            });
            setEmail('');
            setLoading(false);
        } catch (error) {
            toast.error(error?.message);
            setLoading(false);
        }
    }
    return (
        <div>
            <p onClick={handleOpen} className="w-fit cursor-pointer hover:underline mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">Forget password?</p>
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
                            Your email
                        </Typography>
                        <form className='space-y-2'>
                            <TextField
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='w-full'
                                id="outlined-multiline-static"
                                label="Type here"
                                multiline
                            />
                            <Button onClick={onSubmit} type='button' variant="outlined" className='flex items-center justify-center w-full'>
                                {loading ? <TbFidgetSpinner className="animate-spin text-xl font-bold" /> : 'Get reset mail'}
                            </Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}