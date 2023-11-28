import { useState, useEffect } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const RegisterForm = ({ divisions, districts, createUser, navigate }) => {
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const axiosPublic = useAxiosPublic();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

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
    const bloodGroup = data.bloodGroup;
    const division = divisions.find(
      (division) => division.id === data.division
    );
    const district = districts.find(
      (district) => district.id === data.district
    );

    // reset the form
    reset();

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
          status: "active",
          role: "user",
          blood: bloodGroup,
          profile: imageUrl,
          division: division.name,
          district: district.name,
        };

        const serverResponse = await axiosPublic.post("/users", userInfo);

        if (serverResponse.data.insertedId) {
          console.log("user added successfully");
        }

        // navigate to dashboard
        navigate("/dashboard");
      } else {
        toast.error("Image upload failed. Please try again.", {
          position: "top-right",
        });
      }
    } catch (error) {
      // handle errors
      console.error("Registration failed:", error.message);
      if (error.code === "auth/email-already-in-use") {
        // Email is already in use, show relevant toast
        toast.error("Email is already in use. Please use a different email.", {
          position: "top-right",
        });
      } else {
        // Generic error message for other cases
        toast.error("Registration failed! Please check your credentials.", {
          position: "top-right",
        });
      }
    }
  };

  useEffect(() => {
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
    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
      {/* name */}
      <div className="form-control">
        <h2 className="text-4xl font-medium text-center mb-5">Register</h2>
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
            {...register("bloodGroup")}
            className="select select-bordered font-semibold"
            defaultValue="default"
          >
            <option disabled value="default">
              Choose One
            </option>
            {bloodGroups.map((group) => (
              <option key={group} className="font-semibold">
                {group}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full">
        {/* select division */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text text-lg">Division</span>
          </label>
          <select
            {...register("division")}
            className="select select-bordered text-lg"
            defaultValue="default"
            onChange={(e) => setValue("division", e.target.value)}
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
            <span className="label-text text-lg">District</span>
          </label>
          <select
            {...register("district")}
            defaultValue="default"
            className="select select-bordered text-lg"
          >
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
  );
};

export default RegisterForm;
