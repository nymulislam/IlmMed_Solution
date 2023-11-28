import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";


const usePlaces = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const axiosPublic = useAxiosPublic();
  
  useEffect(() => {
    axiosPublic.get("/divisions")
      .then((res) => setDivisions(res.data))
      .catch((error) => {
        console.error("Error fetching divisions:", error);
      });

    axiosPublic.get("/districts")
      .then((res) => setDistricts(res.data))
      .catch((error) => {
        console.error("Error fetching districts:", error);
      });
  }, [axiosPublic]);

  return { divisions, districts };
};

export default usePlaces;