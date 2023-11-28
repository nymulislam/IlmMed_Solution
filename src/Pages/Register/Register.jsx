import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SmallSlider from '../../Components/Sliders/smallSlider';
import usePlaces from '../../Hooks/usePlaces';
import useAuth from '../../Hooks/useAuth';
import RegisterForm from '../../Components/RegisterForm/RegisterForm';

const Register = () => {

  const { divisions, districts } = usePlaces();
  const { createUser } = useAuth();
  const navigate = useNavigate();


  return (
    <div className="mt-5 lg:mt-20 overflow-x-hidden">
      <Helmet>
        <title>IlmMed Solution | Register</title>
      </Helmet>
      <div className="bg-[#2ecc70] lg:w-[800px] w-[350px] h-screen rounded-3xl relative shadow-lg ml-8 lg:ml-20 lg:h-[800px]">
        <SmallSlider></SmallSlider>
      </div>
      <div className=" w-[350px] lg:w-[550px] ld:h-[90vh] bg-[#d6f5e3] rounded-3xl absolute top-[580px] lg:top-48 lg:right-36 z-10 shadow-lg ml-8 md:ml-0">
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
  );
};

export default Register;
