import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../Hooks/useSecureAxios";
import Swal from "sweetalert2";
const ManageUsers = () => {
    const secureAxios = useSecureAxios();
    const { data: promotionUsers, refetch } = useQuery({
        queryKey: ['promotionRequests'],
        queryFn: async () => {
            const res = await secureAxios.get('/promotionRequests')
            return res?.data;
        }
    })

    const handlePromote = (email) => {
        Swal.fire({
            title: "Confirm promote?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await secureAxios.put(`/promoteUser?email=${email}`);
                await refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Promoted!",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        });
    }

    const handleDemote = (email) => {
        Swal.fire({
            title: "Confirm deomote?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await secureAxios.put(`/demoteUser?email=${email}`);
                await refetch();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Demoted!",
                    showConfirmButton: false,
                    timer: 1500
                });

            }
        });
    }
    return (
        <div className="max-h-screen overflow-y-auto">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {promotionUsers?.map((user, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell align="left">{user?.name}</TableCell>
                                <TableCell align="left">{user?.email}</TableCell>
                                <TableCell align="left">{user?.role}</TableCell>
                                <TableCell align="left">
                                    <p className={`font-bold cursor-pointer ${user?.role === 'user' ? 'text-green-600' : 'text-red-600'}`}>
                                        {user?.role === 'user' ? <span onClick={() => handlePromote(user?.email)} >Promote</span> : <span onClick={() => handleDemote(user?.email)}>demote</span>}
                                    </p>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!promotionUsers?.length && <h1 className="text-center">No requests</h1>}
            </TableContainer>
        </div >
    )
}

export default ManageUsers