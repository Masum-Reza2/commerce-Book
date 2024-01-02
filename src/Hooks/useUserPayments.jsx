import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios"
import toast from "react-hot-toast";
import useGlobal from "./useGlobal";

const useUserPayments = () => {
    const secureAxios = useSecureAxios();
    const { user } = useGlobal();
    const { data: userPayments, isPending, refetch } = useQuery({
        queryKey: [user?.email, 'userPayments'],
        queryFn: async () => {
            try {
                const res = await secureAxios.get('/userPayments');
                return res?.data;
            } catch (error) {
                toast.error(error?.message)
            }
        }
    })
    return { userPayments, isPending, refetch }
}

export default useUserPayments