/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobal from "../../../Hooks/useGlobal";
import useSecureAxios from "../../../Hooks/useSecureAxios";
import useCarts from "../../../Hooks/useCarts";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";
import { Button } from "@mui/material";

const CheckoutForm = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useGlobal();
    const [error, setError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [paymentSucces, setPaymentSuccess] = useState(false);
    const navigate = useNavigate();

    // from github docs
    const stripe = useStripe();
    const elements = useElements();

    // >>>>>>>>>>>>>>>>>>getting the client secret from stripe docs
    const { carts } = useCarts();
    const price = carts?.reduce((prev, curr) => prev + curr.price, 0);
    const [clientSecret, setClientSecret] = useState('');
    const secureAxios = useSecureAxios();
    useEffect(() => {
        if (price > 0) {
            secureAxios.post(`/create-payment-intent`, { price })
                .then(res => {
                    setClientSecret(res?.data?.clientSecret)
                })
        }
    }, [secureAxios, price])
    // >>>>>>>>>>>>>>>>>>getting the client secret

    const handleSubmit = async (event) => {
        event.preventDefault();
        Swal.fire({
            title: `Paying $${price}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm Payment"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                if (!stripe || !elements) {
                    return;
                }


                const card = elements.getElement(CardElement);

                if (card == null) {
                    return;
                }

                // Use your card Element with other Stripe.js APIs
                const { error, paymentMethod } = await stripe.createPaymentMethod({
                    type: 'card',
                    card,
                });

                if (error) {
                    console.log('[error]', error);
                    setError(error.message)
                } else {
                    console.log('[PaymentMethod]', paymentMethod);
                    setError('')
                }

                // >>>>>>>>>Confirm card payment from another doc in the same web
                const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
                    clientSecret,
                    {
                        payment_method: {
                            card: card,
                            billing_details: {
                                name: user?.displayName || 'anonymous',
                                email: user?.email || 'anonymous',
                            },
                        },
                    },
                );

                if (confirmError) {
                    console.log('confirm error', confirmError)
                } else {
                    console.log('payment intent', paymentIntent)
                    if (paymentIntent.status === 'succeeded') {
                        console.log(paymentIntent.id);
                        setTransactionId(paymentIntent.id);
                        setPaymentSuccess(true);

                        // saving payment history on the database
                        // const paymentInfo = {
                        //     contestName: payContest?.contestName,
                        //     contestType: payContest?.contestType,
                        //     creatorEmail: payContest?.creatorEmail,
                        //     email: user?.email,
                        //     name: user?.displayName,
                        //     img: user?.photoURL,
                        //     price,
                        //     transactionId: paymentIntent.id,
                        //     date: new Date(),
                        //     contestId: payContest?._id,
                        //     isWin: false,
                        //     prizeMoney: payContest?.prizeMoney,
                        //     submittedTask
                        // }

                        // saving to data base
                        // const dbResult = await secureAxios.post('/payments', paymentInfo)
                        // if (dbResult?.data?.insertedId) {
                        //     setLoading(false)
                        //     await Swal.fire({
                        //         position: "center",
                        //         icon: "success",
                        //         title: `Successfully paid $${price}`,
                        //         showConfirmButton: false,
                        //         timer: 1500
                        //     });
                        //     navigate('/dashboard/user/participations');
                        // }
                    }
                }
            } else {
                Swal.fire({
                    title: "Payment cancelled!",
                    icon: "info"
                });
            }
        });
    };


    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <form onSubmit={handleSubmit} className="w-[90%] md:w-[70%] mx-auto">
                <h1 className="font-bold text-xl mb-2">Please pay ${price}</h1>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {price ?
                    <Button sx={{ mt: 2 }} variant="contained" size="small" className="btn btn-sm btn-primary my-4 btn-block" type="submit" disabled={!stripe || paymentSucces}>
                        {paymentSucces ? 'Paid' : 'Pay'} {loading && <AiOutlineLoading className="text-white animate-spin mx-auto text-lg font-extrabold" />}
                    </Button>
                    : <Button variant="contained" size="small" sx={{ mt: 2 }} disabled>
                        No items
                    </Button>}

                <p className="text-red-700 font-semibold">{error}</p>
                {transactionId && <p className="text-green-700">Your transaction id is : {transactionId}</p>}
            </form>
        </div >
    )
}

export default CheckoutForm