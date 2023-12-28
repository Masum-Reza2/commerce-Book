import { Button, TextField } from "@mui/material"
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import { useForm } from "react-hook-form"
import uploadImage from "../../../Hooks/uploadPhoto";
import useGlobal from "../../../Hooks/useGlobal";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useSecureAxios from "../../../Hooks/useSecureAxios";


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
const AddProduct = () => {
    const { user } = useGlobal();
    const secureAxios = useSecureAxios();
    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        Swal.fire({
            title: "Confirm add product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const image = data?.image[0];
                    const imageUrl = await uploadImage(image);
                    const product = {
                        ownerName: user?.displayName,
                        ownerEmail: user?.email,
                        name: data?.name,
                        description: data?.description,
                        quantity: Number.parseFloat(data?.quantity),
                        image: imageUrl || null,
                        likeCount: 0,
                        comments: []
                    }
                    await secureAxios.post(`/products`, product);
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product Added.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    toast.error(error?.message);
                }
            } else {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "Cencelled",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    }
    return (
        <div className='flex flex-col justify-center h-screen'>
            <h1 className='text-center pt-2 font-bold text-xl md:text-2xl'>Add a Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='px-2 md:px-4 mt-2 space-y-3'>
                <TextField
                    {...register("name")}
                    required
                    className='w-full'
                    id="outlined-number"
                    label="Product Name"
                    type="text"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    {...register("description")}
                    required
                    className='w-full'
                    id="outlined-multiline-static"
                    label="What's on your mind?"
                    multiline
                    rows={6}
                />
                <TextField
                    {...register("quantity")}
                    required
                    className='w-full'
                    id="outlined-number"
                    label="Available quantity"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className='text-center'>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                        Upload photo
                        <VisuallyHiddenInput {...register("image")} type="file" />
                    </Button>
                </div>

                <div>
                    <button type="submit" className='border px-3 py-1 rounded-md text-base font-bold bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-600 transition-all active:outline-none hover:-translate-y-[0.10rem] active:translate-y-[0.10rem]'>Post <SendIcon /></button>
                </div>
            </form>
        </div>
    )
}

export default AddProduct