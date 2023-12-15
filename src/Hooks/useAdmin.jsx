import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const {user, loading} = useAuth();
    console.log("🚀 ~ file: useAdmin.jsx:8 ~ useAdmin ~ user:", user)
    const axiosSecure = useAxiosSecure();
    
    const {data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }

    });
    console.log("🚀 ~ file: useAdmin.jsx:19 ~ useAdmin ~ isAdmin:", isAdmin)
    return [isAdmin, isAdminLoading]
};

export default useAdmin;