import { useQuery } from "@tanstack/react-query";
import useGlobal from "./useGlobal"
import useSecureAxios from "./useSecureAxios";

const useIsRequested = () => {
    const { user } = useGlobal();
    const secureAxios = useSecureAxios();
    const { data: isRequested, isPending, refetch } = useQuery({
        queryKey: [user?.email, 'isRequested'],
        queryFn: async () => {
            const res = await secureAxios.get(`/isRequested?email=${user?.email}`)
            return res?.data;
        }
    })
    return { isRequested, isPending, refetch }
}

export default useIsRequested