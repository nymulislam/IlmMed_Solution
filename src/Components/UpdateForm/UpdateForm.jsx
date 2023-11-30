import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { TERipple } from "tw-elements-react";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateForm = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const test = useLoaderData();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const name = data.name;
    const deadline = data.date;
    const slot = data.slot;
    const price = data.price;
    const category = data.category;
    const testImage = data.testImage;
    const description = data.description;

    try {
      const userInfo = {
        slot: slot,
        deadline: deadline,
        name: name,
        price: price,
        category: category,
        testImage: testImage,
        description: description,
      };

      const serverResponse = await axiosSecure.put(
        `/allTests/${test._id}`,
        userInfo
      );

      if (serverResponse.data.modifiedCount > 0) {
        console.log("test updated successfully");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Medical Test Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/dashboard/allTests");
      }
    } catch (error) {
      console.error("test updated failed:", error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>IlmMed Solution | Test Info Update</title>
      </Helmet>

      <div className="mt-10 mb-14 pb-11 rounded-xl max-w-3xl mx-auto shadow-xl">
        <div className="flex items-center rounded-t-xl bg-gradient-to-l from-[#2ecc70] to-[#3398db]">
          <div className="px-4 py-6 text-white md:mx-6 md:p-12">
            <h4 className="text-2xl font-semibold text-[#edf1f2]">
              Medical Test Update: Admin Input
            </h4>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-10 pt-8">
          <div className="grid grid-cols-2 gap-4">
            {/* Test Name */}
            <div className="form-control w-full max-w-xs mb-5">
              <label className="label">
                <span className="label-text">Test Name</span>
              </label>
              <input
                {...register("name")}
                type="text"
                defaultValue={test.name}
                className="input input-sm input-success py-5 input-bordered w-full max-w-xs"
              />
            </div>

            {/* Test Deadline */}
            <div className="form-control w-full max-w-xs mb-5">
              <label className="label">
                <span className="label-text">Test Deadline</span>
              </label>
              <input
                {...register("date")}
                type="date"
                defaultValue={test.deadline}
                min={new Date().toISOString().split("T")[0]}
                className="input input-sm input-accent py-5 input-bordered w-full max-w-xs"
              />
            </div>
          </div>

          {/* Test Image */}
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Test Image Url</span>
            </label>
            <input
              {...register("testImage")}
              type="text"
              defaultValue={test.testImage}
              className="input input-sm input-success py-5 input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Test Category */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Test Category</span>
              </label>
              <select
                {...register("category")}
                value={test.category}
                className="select select-sm select-success w-full text-xs max-w-xs"
              >
                <option disabled selected value="default">
                  Choose one
                </option>
                <option>Neurology</option>
                <option>Ophthalmology</option>
                <option>Hematology</option>
                <option>Gastroenterology</option>
                <option>Cardiology</option>
                <option>Urology</option>
                <option>Gynecology</option>
                <option>Orthopedics</option>
                <option>Immunology</option>
                <option>Genetics</option>
                <option>Endocrinology</option>
              </select>
            </div>

            {/* Test Price */}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text">Test Price</span>
              </label>
              <input
                {...register("price")}
                type="text"
                defaultValue={test.price}
                className="input input-accent input-sm input-bordered w-full"
              />
            </div>

            {/* Test Slot*/}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text">Test Slot</span>
              </label>
              <input
                {...register("slot")}
                type="number"
                defaultValue={test.slot}
                min="0"
                className="input input-accent input-sm input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Test Description</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24 textarea-accent"
              defaultValue={test.description}
            ></textarea>
          </div>

          {/* Submit button */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="submit"
              className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] bg-gradient-to-l from-[#2ecc70] to-[#3398db]"
            >
              Update
            </button>
          </TERipple>
        </form>
      </div>
    </>
  );
};

export default UpdateForm;
