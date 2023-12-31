import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios"
import useGlobal from "./useGlobal";

const useCarts = () => {
    const secureAxios = useSecureAxios();
    const { user } = useGlobal();
    const { data: carts = [], refetch, isPending } = useQuery({
        queryKey: [user?.email, 'userCarts'],
        queryFn: async () => {
            const res = await secureAxios.get(`/myCart/${user?.email}`);
            return res?.data;
        }
    })
    return { carts, refetch, isPending }
}

export default useCarts