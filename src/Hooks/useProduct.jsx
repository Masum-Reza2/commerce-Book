import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios"

const useProduct = (id) => {
    const secureAxios = useSecureAxios();
    const { data: product = {}, refetch } = useQuery({
        queryKey: [id],
        queryFn: async () => {
            const res = await secureAxios.get(`/singleProduct/${id}`)
            return res?.data;
        }
    })
    return { product, refetch }
}

export default useProduct