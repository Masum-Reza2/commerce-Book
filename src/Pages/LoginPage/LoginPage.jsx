import { useForm } from "react-hook-form"

import { useState } from "react"
import AdditionalAuth from "../../Components/AdditionalAuth"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import loginLottie from '../../assets/LottieAnimations/login (1).json'
import useGlobal from "../../Hooks/useGlobal"
import { TbFidgetSpinner } from "react-icons/tb"
import toast from "react-hot-toast"

/* eslint-disable react/no-unescaped-entities */
const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [eye, setEye] = useState(false)
    const handleEye = () => {
        setEye(!eye)
    }
    const { loginUser } = useGlobal();
    const { state } = useLocation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await loginUser(data?.email, data?.password);
            setLoading(false);
            toast.success('Login successful!');
            navigate(state || '/');
        } catch (error) {
            toast.error(error?.message);
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col-reverse gap-10 px-2 lg:px-20 md:flex-row items-center justify-center  py-2 md:py-10 lg:py-0 lg:h-screen overflow-hidden md:gap-5 bg-[#cbd7fc]">
            <form onSubmit={handleSubmit(onSubmit)} className="relative flex-1 flex flex-col w-full md:max-w-md lg:max-w-lg md: mx-auto text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">

                {/* heading */}
                <div
                    className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-[#5547b2]">
                    <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                        Sign In
                    </h3>
                    <AdditionalAuth />
                </div>

                <div className="flex flex-col gap-4 p-6">

                    {/* email */}
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            type="email"
                            {...register("email")}
                            required
                            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Email
                        </label>
                    </div>

                    {/* password */}
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input
                            {...register("password")}
                            type={eye ? "text" : "password"}
                            required
                            className="w-full h-full px-3 py-3 font-sans text-sm font-normal transition-all bg-transparent border rounded-md peer border-blue-gray-200 border-t-transparent text-blue-gray-700 outline outline-0 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" " />
                        <label
                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Password
                        </label>
                        {eye ? <FaEyeSlash onClick={handleEye} className="absolute right-5 top-4 cursor-pointer" /> : <FaEye onClick={handleEye} className="absolute right-5 top-4 cursor-pointer" />}
                    </div>

                </div>
                <div className="p-6 pt-0">
                    <button
                        type="submit"
                        className="w-full select-none rounded-lg bg-[#5547b2] py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2">
                        Sign In {loading && <TbFidgetSpinner className="text-white animate-spin font-bold" />}
                    </button>
                    <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                        Don't have an account?
                        <Link to="/register"
                            className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </form>

            <div className="flex-1">
                <Lottie animationData={loginLottie} loop={true} />
            </div>
        </div>
    )
}

export default LoginPage