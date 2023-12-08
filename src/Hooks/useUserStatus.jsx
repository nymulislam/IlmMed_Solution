import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
    const {user, loading} = useAuth()
    const axiosSecure = useAxiosSecure();
    
    const { data: isActive, isPending: isStatusLoading } = useQuery({
        queryKey: [user?.email, 'isActive'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/status/${user?.email}`);
            return res.data?.active;
        },
        staleTime: 300000,
        
    });
    return [isActive, isStatusLoading];
};

export default useUserStatus;
