import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import usePaymentHistory from '../../../Hooks/usePaymentHistory';
import { Avatar } from '@mui/material';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useSecureAxios from '../../../Hooks/useSecureAxios';
import Spinner from '../../../Components/Spinner';

export default function HistoryItems() {
    const { history: histories, isPending, refetch } = usePaymentHistory();
    const secureAxios = useSecureAxios();
    const handleReceive = (id, isReceived) => {
        if (isReceived) {
            return Swal.fire({
                position: "center",
                icon: "info",
                title: "Already received!",
                showConfirmButton: false,
                timer: 1500
            });
        }
        Swal.fire({
            title: "Confirm Received?",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await secureAxios.put(`/receiveProduct/${id}`);
                    await refetch();
                    await Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Received!",
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
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>$Price</TableCell>
                        <TableCell>TransactionId</TableCell>
                        <TableCell>Img</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {histories?.map((history, index) => (
                        <TableRow
                            key={history?._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">${history?.price}</TableCell>
                            <TableCell align="left">{history?.transactionId}</TableCell>
                            <TableCell align="left"><Avatar className='-translate-x-2' alt="user image" src={history?.img} />
                            </TableCell>
                            <TableCell align="left"><span className={`font-bold ${history?.isDelivered ? 'text-green-600' : 'text-red-600'}`}>{history?.isDelivered ? 'Delivered' : 'Pending'}</span></TableCell>

                            {history?.isDelivered && <TableCell onClick={() => handleReceive(history?._id, history?.isReceived)} align="left"><span className={`cursor-pointer font-bold ${history?.isReceived ? 'text-green-600' : 'text-gray-500'}`}>{history?.isReceived ? 'Received' : 'Receive'}</span></TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}