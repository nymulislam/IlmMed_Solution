import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loading from "../../../Components/Loading/Loading";
import usePlaces from "../../../Hooks/usePlaces";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const MyProfile = () => {
  const [userProfile, isUserProfileLoading, refetch] = useCurrentUser();
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const { divisions, districts } = usePlaces();
  const axiosPublic = useAxiosPublic();

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      division: userProfile?.division || "",
      district: userProfile?.district || "",
    },
  });

  const selectedDivision = watch("division");

  useEffect(() => {
    const districtsForDivision = districts.filter(
      (district) => district.division_id === selectedDivision
    );
    setFilteredDistricts(districtsForDivision);

    setValue("district", userProfile?.district);
  }, [selectedDivision, districts, setValue, userProfile]);

  const onSubmit = async (data) => {
    console.log(data);

    const name = data.name;
    const bloodGroup = data.bloodGroup;
    const division = divisions.find(
      (division) => division.id === data.division
    );
    const district = districts.find(
      (district) => district.id === data.district
    );

    try {
      // update user info
      const userInfo = {
        name: name,
        blood: bloodGroup,
        division: division.name,
        district: district.name,
      };

      const serverResponse = await axiosPublic.put(
        `/users/${userProfile._id}`,
        userInfo
      );

      console.log(serverResponse);

      if (serverResponse.data.modifiedCount > 0) {
        toast.success("Profile Updated successfully!", {
          position: "top-right",
        });
        refetch();
      }
    } catch (error) {
      // handle errors
      console.error("Profile Update failed:", error.message);
    }
  };

  if (isUserProfileLoading || !userProfile) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Helmet>
        <title>IlmMed Solution | My Profile</title>
      </Helmet>
      <h1 className="text-4xl mt-10">My Profile</h1>
      <div className="divider"></div>

      <div className="h-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b-2 block md:flex">
            <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
              <div className="flex justify-between">
                <span className="text-xl font-semibold block first-letter:uppercase">
                  {userProfile.role} Profile
                </span>
                <Link
                  to=""
                  className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
                >
                  Edit
                </Link>
              </div>
              <div className="w-full p-8 mx-2 flex justify-center">
                <img
                  id="showImage"
                  className="max-w-xs w-40 items-center border"
                  src={userProfile.profile}
                  alt=""
                />
              </div>

              {/* current password */}
              <div className="pb-6 mt-10">
                <label
                  htmlFor="password"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Current Password
                </label>
                <div className="flex">
                  <input
                    disabled={true}
                    id="password"
                    className="border-1  rounded-r px-4 py-2 w-full input-disabled"
                    type="password"
                    defaultValue=""
                  />
                </div>
              </div>

              {/* new password */}
              <div className="pb-6">
                <label
                  htmlFor="newPassword"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  New Password
                </label>
                <input
                  disabled={true}
                  id="newPassword"
                  className="border-1  rounded-r px-4 py-2 w-full input-disabled"
                  type="password"
                  defaultValue=""
                />
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 lg:mr-10 shadow-md">
              <div className="rounded  shadow p-6">
                {/* name */}
                <div className="pb-6">
                  <label
                    htmlFor="name"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Name
                  </label>
                  <div className="flex">
                    <input
                      {...register("name")}
                      id="username"
                      className="border-1  rounded-r px-4 py-2 w-full"
                      type="text"
                      defaultValue={userProfile.name}
                    />
                  </div>
                </div>

                {/* email */}
                <div className="pb-6">
                  <label
                    htmlFor="email"
                    className="font-semibold text-gray-700 block pb-1"
                  >
                    Email
                  </label>
                  <input
                    disabled={true}
                    id="email"
                    className="border-1 input-disabled  rounded-r px-4 py-2 w-full "
                    type="email"
                    defaultValue={userProfile.email}
                  />
                  <div className="grid gap-2 w-full mt-6">
                    {/* select division */}
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text text-lg">Division</span>
                      </label>
                      <select
                        {...register("division")}
                        className="select select-bordered text-lg"
                        onChange={(e) => setValue("division", e.target.value)}
                        defaultValue={userProfile.division}
                      >
                        <option disabled={true} value="default">
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
                        className="select select-bordered text-lg"
                        value={userProfile.district}
                        onChange={(e) => setValue("district", e.target.value)}
                      >
                        {filteredDistricts.map((district) => (
                          <option value={district.id} key={district.id}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* select blood group */}
                  <div className="form-control w-full max-w-xs">
                    <label className="label">
                      <span className="label-text text-lg">Blood Group</span>
                    </label>
                    <select
                      {...register("bloodGroup")}
                      className="select select-bordered font-semibold"
                      defaultValue={userProfile.blood}
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

                <button className="btn bg-[#2ecc70] mt-5 text-white px-4 py-2 rounded font-medium hover:bg-green-600">
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
