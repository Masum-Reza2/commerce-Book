import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios"

const useCartNumber = () => {
    const secureAxios = useSecureAxios();
    const { data: cartNumber = {}, refetch } = useQuery({
        queryKey: ['cartNumber'],
        queryFn: async () => {
            const res = await secureAxios.get('cartnumber');
            return res?.data;
        }
    })
    return { cartNumber, refetch }
}

export default useCartNumber