import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import usePaymentHistory from '../../../Hooks/usePaymentHistory';
import { Avatar } from '@mui/material';

export default function HistoryItems() {
    const { history: histories, isPending, refetch } = usePaymentHistory();
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

                            {history?.isDelivered && <TableCell align="left"><span className={`cursor-pointer font-bold ${history?.isReceived ? 'text-green-600' : 'text-gray-500'}`}>{history?.isReceived ? 'Received' : 'Receive'}</span></TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}