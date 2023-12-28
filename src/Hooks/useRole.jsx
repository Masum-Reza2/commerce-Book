import { useQuery } from "@tanstack/react-query";
import useGlobal from "./useGlobal";
import usePublicAxios from "./usePublicAxios";

const useRole = () => {
    const publicAxios = usePublicAxios();
    const { user } = useGlobal();
    const { data: userRole = {}, isPending } = useQuery({
        queryKey: [user?.email],
        queryFn: async () => {
            const res = await publicAxios.get(`/userRole/${user?.email}`)
            return res?.data;
        }
    })
    return { userRole, isPending }
}

export default useRole