import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios"

const useProductCount = () => {
    const publicAxios = usePublicAxios();
    const { data: productCount = {} } = useQuery({
        queryKey: ['productCount'],
        queryFn: async () => {
            const res = await publicAxios.get('/productCount');
            return res?.data;
        }
    })
    return { productCount }
}

export default useProductCount