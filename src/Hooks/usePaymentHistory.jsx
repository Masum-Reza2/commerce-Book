import { useQuery } from "@tanstack/react-query";
import useGlobal from "./useGlobal"
import useSecureAxios from "./useSecureAxios";

const usePaymentHistory = () => {
    const { user } = useGlobal();
    const secureAxios = useSecureAxios();
    const { data: history, isPending, refetch } = useQuery({
        queryKey: [user?.email, 'history'],
        queryFn: async () => {
            const res = await secureAxios.get(`/paymentHistory?email=${user?.email}`);
            return res?.data;
        }
    })
    return { history, isPending, refetch }
}

export default usePaymentHistory