/* eslint-disable react/prop-types */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useForm } from "react-hook-form";
import useGlobal from '../../Hooks/useGlobal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import uploadImage from '../../Hooks/uploadPhoto';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

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

export default function UpdateName({ name, email, password, profile }) {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { user, updateUserProfile, updateUserEmail, passResMail, verificationEmail } = useGlobal();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async (data) => {
        setLoading(true);
        const name = data?.name;
        const email = data?.email;
        const password = data?.password;
        const image = data?.image[0];
        if (name) {
            try {
                await updateUserProfile(name, user?.photoURL);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Name updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                handleClose();
                setLoading(false);
            } catch (error) {
                toast.error(error?.message)
            }
        }
        if (email) {
            if (!user?.emailVerified) {
                setLoading(false);
                handleClose();
                await verificationEmail();
                reset();
                return Swal.fire({
                    position: "center",
                    icon: "info",
                    title: `Please verify your current email to goto next step.Verification mail send to ${user?.email}`,
                    showConfirmButton: false,
                    timer: 5000
                });
            }
            try {
                await updateUserEmail(email);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Email updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                handleClose();
                setLoading(false);
            } catch (error) {
                toast.error(error?.message)
            }
        }
        if (password) {
            // try {
            //     await updateUserPassword(password);
            //     Swal.fire({
            //         position: "center",
            //         icon: "success",
            //         title: "Password updated",
            //         showConfirmButton: false,
            //         timer: 1500
            //     });
            //     reset();
            //     handleClose();
            //     setLoading(false);
            // } catch (error) {
            //     toast.error(error?.message)
            // }
            try {
                await passResMail(password);
                reset();
                handleClose();
                setLoading(false);
                await Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Password reset mail send to ${password}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            } catch (error) {
                setLoading(false);
                toast.error(error?.message);
            }
        }
        if (image) {
            try {
                const imageUrl = await uploadImage(image);
                await updateUserProfile(user?.displayName, imageUrl);
                setLoading(false);
                handleClose();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Profile updated!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            } catch (error) {
                toast.error(error?.message);
                setLoading(false);
            }
        }
        setLoading(false);
    }
    return (
        <div>
            {name && <Button className='w-full' onClick={handleOpen} variant="contained">Update Name</Button>}
            {email && <Button className='w-full' onClick={handleOpen} variant="contained">Update Email</Button>}
            {password && <Button className='w-full' onClick={handleOpen} variant="contained">Update Password</Button>}
            {profile && <Button className='w-full' onClick={handleOpen} variant="contained">Update Photo</Button>}
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
                            {name && 'Your Name'}
                            {email && 'Your Email'}
                            {password && 'Get a password reset mail to'}
                            {profile && 'Update your profile image.'}
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            {name && <TextField
                                {...register("name")}
                                defaultValue={user?.displayName}
                                type="text"
                                required
                                className='w-full'
                                id="filled-password-input"
                                multiline
                                rows={1}
                            />}
                            {email && <TextField
                                defaultValue={user?.email}
                                {...register("email")}
                                type="text"
                                required
                                className='w-full'
                                id="filled-password-input"
                                multiline
                                rows={1}
                            />}
                            {password && <TextField
                                defaultValue={user?.email}
                                {...register("password")}
                                type="text"
                                required
                                className='w-full'
                                id="filled-password-input"
                                multiline
                                rows={1}
                            />}
                            {profile && <Button className='w-full' component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                Upload photo
                                <VisuallyHiddenInput {...register("image")} type="file" />
                            </Button>}
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