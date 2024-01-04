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

export default function UpdateProfile() {
    const [loading, setLoading] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <Button className='w-full' onClick={handleOpen} variant="contained">Update Profile</Button>
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
                            Your Name
                        </Typography>
                        <form className='space-y-2'>
                            <TextField
                                required
                                className='w-full'
                                id="outlined-multiline-static"
                                label="Type here"
                                multiline
                                rows={1}
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