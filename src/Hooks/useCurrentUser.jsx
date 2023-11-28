import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCurrentUser = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userProfile, isPending: isCurrentUserLoading, refetch} = useQuery({
        queryKey: [user?.email, 'isCurrentUser'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/userProfile/${user?.email}`);
            return res.data;
        }
    });
    return [userProfile, isCurrentUserLoading, refetch]
};

export default useCurrentUser;