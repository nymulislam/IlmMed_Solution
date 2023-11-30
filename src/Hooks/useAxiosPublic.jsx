import axios from "axios";


const axiosPublic = axios.create({
    baseURL: 'https://ilm-med-solution-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;