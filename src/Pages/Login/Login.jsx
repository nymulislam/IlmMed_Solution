import { Link, useLocation, useNavigate } from "react-router-dom";
import SmallSlider from "../../Components/Sliders/smallSlider";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { RiErrorWarningFill } from "react-icons/ri";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPass } = useAuth();

  const from = location?.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const email = data.email;
      const password = data.password;
      const result = await loginWithPass(email, password);
      const user = result.user;
      reset();
      console.log(user);
      toast.success("Login successful!", {
        position: "top-right",
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.log("Login error", error);
      toast.error("Login failed! Please check your credentials.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="mt-5 lg:mt-10 overflow-x-hidden">
      <Helmet>
        <title>IlmMed Solution | Login</title>
      </Helmet>
      <div className="bg-[#2ecc70] lg:w-[800px] w-[350px] h-screen rounded-3xl relative shadow-lg ml-8 lg:ml-20 lg:h-[720px]">
        <SmallSlider></SmallSlider>
      </div>
      <div className=" w-[350px] lg:w-[550px] ld:h-[90vh] bg-[#d6f5e3] rounded-3xl absolute top-[580px] lg:top-44 lg:right-36 z-10 shadow-lg ml-8 md:ml-0">
        <div className="card w-full max-w-sm lg:ml-20">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <h2 className="text-4xl font-medium text-center mb-5">Login</h2>
              <label className="label">
                <span className="label-text text-lg">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Name is required</p>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Email is required</p>
                </div>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Password is required</p>
                </div>
              )}
              <label className="label">
                <Link
                  to="/login"
                  className="label-text-alt link link-hover text-base"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            <div></div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-xl">Login</button>
            </div>
            <h4>
              New here? <Link to="/register">Create a New Account</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
