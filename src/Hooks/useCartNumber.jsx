import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios"
import useGlobal from "./useGlobal";

const useCartNumber = () => {
    const secureAxios = useSecureAxios();
    const { user } = useGlobal();
    const { data: cartNumber = {}, refetch } = useQuery({
        queryKey: ['cartNumber'],
        queryFn: async () => {
            const res = await secureAxios.get(`/cartnumber?email=${user?.email}`);
            return res?.data;
        }
    })
    return { cartNumber, refetch }
}

export default useCartNumber