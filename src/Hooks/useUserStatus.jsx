import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isActive, isPending: isStatusLoading } = useQuery({
        queryKey: [user?.email, 'isActive'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/status/${user?.email}`);
            return res.data?.status === 'active';
        }
    });

    return [isActive, isStatusLoading];
};

export default useUserStatus;
