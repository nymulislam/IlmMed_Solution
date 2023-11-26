import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SmallSlider from "../../Components/Sliders/smallSlider";
import usePlaces from "../../Hooks/usePlaces";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { RiErrorWarningFill } from "react-icons/ri";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { toast } from "sonner";

const Register = () => {
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [bloodGroups, setBloodGroups] = useState([]);
  const { divisions, districts } = usePlaces();
  const axiosPublic = useAxiosPublic();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const imageHostingKey = import.meta.env.VITE_IMAGE_HOST_KEY;

  const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const selectedDivision = watch("division");

  const onSubmit = async (data) => {
    console.log(data);
    const name = data.name;
    const email = data.email;
    const password = data.password;
    const profileImage = data.image;

    const formData = new FormData();
    formData.append("image", profileImage);

    try {
      const imgBbResponse = await axiosPublic.post(imageHostingApi, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (imgBbResponse.data && imgBbResponse.data.data) {
        const imageUrl = imgBbResponse.data.data.url;

        // create user in firebase
        await createUser(email, password, name, imageUrl);

        // display success message
        toast.success("Registered successful!", {
          position: "top-right",
        });

        // add use info
        const userInfo = {
          name: name,
          email: email,
          profileImageUrl: imageUrl,
        };

        const serverResponse = await axiosPublic.post("/users", userInfo);

        if (serverResponse.data.insertedId) {
          console.log("user added successfully");
        }

        // navigate to dashboard
        navigate("/dashboard");

        // reset the form
        reset();
      } else {
        toast.error("Image upload failed. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      // handle errors
      console.error("Registration failed:", error.message);
      toast.error("Registration failed! Please check your credentials.", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetch("blood_groups.json")
      .then((res) => res.json())
      .then((data) => setBloodGroups(data));

    const districtsForDivision = districts.filter(
      (district) => district.division_id === selectedDivision
    );
    setFilteredDistricts(districtsForDivision);

    setValue("district", null);
  }, [selectedDivision, districts, setValue]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

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
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <h2 className="text-4xl font-medium text-center mb-5">
                Register
              </h2>
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

            {/* email*/}
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

            <div className="grid grid-cols-2 gap-3 items-center">
              {/* profile image */}
              <div className="relative rounded-xl w-40 mt-4">
                <label
                  title="Click to upload"
                  htmlFor="fileInput"
                  className="cursor-pointer rounded-3xl flex items-center gap-4 pl-3 py-2 before:border-gray-400/60 hover:before:border-gray-300 group dark:before:bg-darker dark:hover:before:border-gray-500 before:bg-gray-100 dark:before:border-gray-600 before:absolute before:inset-0 before:rounded-xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                >
                  <div className="w-max relative">
                    {imagePreview ? (
                      <img
                        className="h-16 w-16 rounded-full"
                        src={imagePreview}
                        alt="file preview"
                      />
                    ) : (
                      <img
                        id="preview_img"
                        className="h-16 w-16 object-cover rounded-full"
                        src="https://www.svgrepo.com/show/485545/upload-cicle.svg"
                        alt="Current profile photo"
                      />
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                    />
                    <span className="block text-base font-semibold relative text-blue-900 dark:text-white group-hover:text-blue-500">
                      Profile <br /> Image
                    </span>
                  </div>
                </label>
              </div>

              {/* select blood group */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-lg">Blood Group</span>
                </label>
                <select
                  {...register("blood_group")}
                  className="select select-bordered font-semibold"
                  defaultValue="default"
                >
                  <option disabled value="default">
                    Choose One
                  </option>
                  {bloodGroups.map((bloodGroup) => (
                    <option key={bloodGroup.group} className="font-semibold">
                      {bloodGroup.group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full">
              {/* select division */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-lg">Your Division</span>
                </label>
                <select
                  defaultValue="default"
                  onChange={(e) => setValue("division", e.target.value)}
                  {...register("division")}
                  className="select select-bordered text-lg"
                >
                  <option disabled value="default">
                    Choose One
                  </option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* select district */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text text-lg">Your District</span>
                </label>
                <select
                  {...register("district")}
                  defaultValue="Choose One"
                  className="select select-bordered text-lg"
                >
                  <option disabled value="">
                    Choose One
                  </option>
                  {filteredDistricts.map((district) => (
                    <option value={district.id} key={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                })}
                placeholder="password"
                className="input input-bordered"
              />
              {errors.password && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Password is required</p>
                </div>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-xl">
                Register
              </button>
            </div>
            <h4>
              Already registered? <Link to="/login">Go to Login</Link>
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
