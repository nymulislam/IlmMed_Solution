import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import { TERipple } from "tw-elements-react";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddATest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const name = data.name;
    const date = data.date;
    const slot = data.slot;
    const price = data.price;
    const category = data.category;
    const testImage = data.testImage;
    const description = data.description;

    try {
      const userInfo = {
        slot: slot,
        currentDate: new Date().toISOString().split("T")[0],
        deadline: date,
        name: name,
        price: price,
        category: category,
        testImage: testImage,
        description: description,
      };

      const serverResponse = await axiosSecure.post("/allTests", userInfo);

      if (serverResponse.data.insertedId) {
        console.log("test added successfully");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Medical Test Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
        navigate("/dashboard/allTests");
      }
    } catch (error) {
      console.error("test add failed:", error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>IlmMed Solution | Medical Test</title>
      </Helmet>

      <div className="mt-10 mb-14 pb-11 rounded-xl max-w-3xl mx-auto shadow-xl">
        <div className="flex items-center rounded-t-xl bg-gradient-to-r from-[#2ecc70] to-[#3398db]">
          <div className="px-4 py-6 text-white md:mx-6 md:p-12">
            <h4 className="text-2xl font-semibold text-[#edf1f2]">
              Medical Test Setup: Admin Input
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
                {...register("name", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-sm input-success py-5 input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Test name is required</p>
                </div>
              )}
            </div>

            {/* Test Deadline Date */}
            <div className="form-control w-full max-w-xs mb-5">
              <label className="label">
                <span className="label-text">Test Deadline</span>
              </label>
              <input
                {...register("date", { required: true })}
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                min={new Date().toISOString().split("T")[0]}
                className="input input-sm input-accent py-5 input-bordered w-full max-w-xs"
              />
              {errors.date && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Test Deadline is required</p>
                </div>
              )}
            </div>
          </div>

          {/* Test Image */}
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text">Test Image Url</span>
            </label>
            <input
              {...register("testImage", { required: true })}
              type="text"
              placeholder="test image url"
              className="input input-sm input-success py-5 input-bordered w-full"
            />
            {errors.testImage && (
              <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                <RiErrorWarningFill className="text-lg" />
                <p>Image Url is required</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Test Category */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Test Category</span>
              </label>
              <select
                {...register("category", { required: true })}
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
              {errors.category && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Test Category is required</p>
                </div>
              )}
            </div>

            {/* Test Price */}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text">Test Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-accent input-sm input-bordered w-full"
              />
              {errors.price && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Test price is required</p>
                </div>
              )}
            </div>

            {/* Test Slot*/}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text">Test Slot</span>
              </label>
              <input
                {...register("slot")}
                type="number"
                defaultValue="0"
                min="0"
                className="input input-accent input-sm input-bordered w-full"
              />
              {errors.slot && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Test slot is required</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Test Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24 textarea-accent"
              placeholder="Test description"
            ></textarea>
            {errors.description && (
              <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                <RiErrorWarningFill className="text-lg" />
                <p>Test description is required</p>
              </div>
            )}
          </div>

          {/* Submit button */}
          <TERipple rippleColor="light" className="w-full">
            <button
              type="submit"
              className="block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-lg font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] bg-gradient-to-r from-[#2ecc70] to-[#3398db]"
            >
              Submit
            </button>
          </TERipple>
        </form>
      </div>
    </>
  );
};

export default AddATest;
