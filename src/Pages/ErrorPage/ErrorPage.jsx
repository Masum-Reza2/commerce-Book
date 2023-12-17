import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@mui/material';
import Lottie from "lottie-react";
import errorJSON from './error.json'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='bg-[#cbd7fc]'>
            <div className="h-full md:h-screen flex flex-col md:flex-row items-center justify-center">
                <div className=''>
                    <Lottie animationData={errorJSON} loop={true} />
                </div>
                <div className='text-center pb-5  md:h-[60vh] md:flex md:flex-col md:items-center md:justify-center md:shadow-md md:border md:rounded-xl md:px-5 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl'>Oops!</h1>
                    <p className='font-semibold'>Sorry, an unexpected error has occurred.</p>
                    <p className='font-semibold'>
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <Link to={'/'}>
                        <Button variant="contained" color="success">
                            Goto Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage