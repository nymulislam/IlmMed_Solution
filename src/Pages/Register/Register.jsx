import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import usePlaces from "../../Hooks/usePlaces";
import useAuth from "../../Hooks/useAuth";
import RegisterForm from "../../Components/RegisterForm/RegisterForm";
import SmallSlider from "../../Components/Sliders/SmallSlider";

const Register = () => {
  const { divisions, districts } = usePlaces();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mt-5 lg:mt-20 overflow-x-hidden">
      <Helmet>
        <title>IlmMed Solution | Register</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="bg-[#2ecc70] lg:w-[800px] w-[350px] h-screen rounded-3xl shadow-lg  lg:h-[800px]">
          <SmallSlider />
        </div>
        <div className=" w-[350px] lg:w-[550px] ld:h-[90vh] bg-[#d6f5e3] rounded-3xl z-10 shadow-lg ml-0 md:-ml-60 md:mt-0 -mt-44">
          <div className="card w-full max-w-sm lg:ml-20">
            <RegisterForm
              divisions={divisions}
              districts={districts}
              createUser={createUser}
              navigate={navigate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
