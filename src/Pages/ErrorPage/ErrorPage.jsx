import { Link, useRouteError } from 'react-router-dom';
import { Button } from '@mui/material';
import Lottie from "lottie-react";
import errorJSON from './error.json'

const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='bg-[#cbd7fc]'>
            <div className="h-full md:h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
                <div>
                    <Lottie animationData={errorJSON} loop={true} />
                </div>
                <div className='text-center pb-5 md:h-[60vh] md:w-[60vh] md:flex md:flex-col md:items-center md:justify-center md:shadow-md md:border md:rounded-full md:shadow-purple-900 md:px-5 space-y-5 font-bold relative'>

                    <div className='md:h-[60vh] md:w-[60vh] absolute shadow shadow-blue-500 animate-spin md:rounded-full top-0'></div>


                    <h1 className=' text-xl md:text-2xl text-red-700'>Oops!</h1>
                    <p className='text-blue-700 '>Sorry, an unexpected error has occurred.</p>
                    <p className=' text-red-700'>
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