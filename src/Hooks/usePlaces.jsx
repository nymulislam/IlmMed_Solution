import { useEffect, useState } from "react";


const usePlaces = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  useEffect(() => {
    fetch("divisions.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data));

    fetch("districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

    return {divisions, districts}
};

export default usePlaces;