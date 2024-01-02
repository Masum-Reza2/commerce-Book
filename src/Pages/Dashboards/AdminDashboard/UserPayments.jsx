import { Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import useUserPayments from "../../../Hooks/useUserPayments";
import Paper from '@mui/material/Paper';
import Spinner from "../../../Components/Spinner";
import Swal from "sweetalert2";
import useSecureAxios from "../../../Hooks/useSecureAxios";
import toast from "react-hot-toast";

const UserPayments = () => {
    const { userPayments, isPending, refetch } = useUserPayments();
    const secureAxios = useSecureAxios();
    const handleDelivery = (id, isDelivered) => {
        if (isDelivered) {
            return Swal.fire({
                position: "center",
                icon: "info",
                title: "Already delivered!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        Swal.fire({
            title: "Confirm Delivery?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await secureAxios.put(`/deliverProduct/${id}`);
                    await refetch();
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Delivered!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    toast.error(error?.message);
                }
            }
        });
    }

    if (isPending) return <Spinner />
    return (
        <div className="max-h-screen overflow-y-auto">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Img</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>TransactionId</TableCell>
                            <TableCell>Delivery-Status</TableCell>
                            <TableCell>Receiver-Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userPayments?.map((payment, index) => (
                            <TableRow
                                key={payment?._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left"><Avatar className='-translate-x-2' alt="user image" src={history?.img} />
                                </TableCell>
                                <TableCell align="left">{payment?.email}</TableCell>
                                <TableCell align="left">${payment?.price}</TableCell>
                                <TableCell align="left">{payment?.transactionId}</TableCell>

                                <TableCell onClick={() => handleDelivery(payment?._id, payment?.isDelivered)} align="left"><span className={`font-bold cursor-pointer ${payment?.isDelivered ? 'text-green-600' : 'text-blue-600'}`}>{payment?.isDelivered ? 'Delivered' : 'Deliver?'}</span></TableCell>

                                <TableCell align="left"><span className={`font-bold cursor-pointer ${payment?.isReceived ? 'text-green-600' : 'text-red-600'}`}>{payment?.isReceived ? 'Received' : 'Not received'}</span></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default UserPayments