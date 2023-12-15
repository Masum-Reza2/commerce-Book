import { Link, useRouteError } from 'react-router-dom';
import errorImg from '../../assets/logos/error-removebg-preview.png'
const ErrorPage = () => {
    const error = useRouteError();
    return (
        <div className='bg-[#cbd7fc]'>
            <div className="h-full md:h-screen flex flex-col md:flex-row items-center justify-center">
                <div className='md:flex-1'>
                    <img src={errorImg} alt="error cartoon img" />
                </div>
                <div className='text-center pb-5 space-y-2 md:flex-1'>
                    <h1 className='font-bold text-xl md:text-2xl'>Oops!</h1>
                    <p className='font-semibold'>Sorry, an unexpected error has occurred.</p>
                    <p className='font-semibold'>
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <Link to={'/'}>
                        <button className='btn btn-sm btn-outline '>
                            Goto Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage