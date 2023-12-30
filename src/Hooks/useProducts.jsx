import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useProducts = (page, size, searchText) => {
    const publicAxios = usePublicAxios();
    const { data: products = [], isPending } = useQuery({
        queryKey: [page, size, searchText],
        queryFn: async () => {
            const res = await publicAxios.get(`/products?page=${page}&size=${size}&searchText=${searchText}`);
            return res?.data;
        }
    })
    return { products, isPending }
}

export default useProducts