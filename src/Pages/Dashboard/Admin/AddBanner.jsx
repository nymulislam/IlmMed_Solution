import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import { TERipple } from "tw-elements-react";
// import "tw-elements-react/dist/css/tw-elements-react.min.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddBanner = () => {
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

    const title = data.title;
    const coupon = data.coupon;
    const couponRate = data.couponRate;
    const bannerImage = data.bannerImage;
    const description = data.description;

    try {
      const userInfo = {
        title: title,
        coupon: coupon,
        couponRate: couponRate,
        bannerImage: bannerImage,
        description: description,
        status: "block"
      };

      const serverResponse = await axiosSecure.post("/allBanners", userInfo);

      if (serverResponse.data.insertedId) {
        console.log("Banner added successfully!");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Banner Added Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
        reset();
        navigate("/dashboard/allBanners");
      }
    } catch (error) {
      console.error("Test add failed:", error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>IlmMed Solution | Add Banner</title>
      </Helmet>

      <div className="mt-10 mb-14 pb-11 rounded-xl max-w-3xl mx-auto shadow-xl">
        <div className="flex items-center rounded-t-xl bg-gradient-to-r from-[#2ecc70] to-[#3398db]">
          <div className="px-4 py-6 text-white md:mx-6 md:p-12">
            <h4 className="text-2xl font-semibold text-[#edf1f2]">
              Home Page Banner Setup: Admin Input
            </h4>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-10 pt-8">
          <div>
            {/* Banner  Title */}
            <div className="form-control w-full mb-5">
              <label className="label">
                <span className="label-text text-base font-medium text-[#354a5f]">
                  Banner Title
                </span>
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Type here"
                className="input input-sm input-success py-5 input-bordered w-full"
              />
              {errors.title && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Banner Title is required</p>
                </div>
              )}
            </div>
          </div>

          {/* Banner Image Url */}
          <div className="form-control w-full mb-5">
            <label className="label">
              <span className="label-text text-base font-medium">
                Banner Image Url
              </span>
            </label>
            <input
              {...register("bannerImage", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-sm input-success py-5 input-bordered w-full"
            />
            {errors.bannerImage && (
              <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                <RiErrorWarningFill className="text-lg" />
                <p>Banner Image Url is required</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Coupon Code */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Coupon Code</span>
              </label>
              <select
                {...register("coupon", { required: true })}
                className="select select-sm select-success w-full text-xs max-w-xs"
              >
                <option disabled selected value="default">
                  Choose one
                </option>
                <option value="HEALTHY">HEALTHY</option>
                <option value="CARE">CARE</option>
                <option value="DIAGNOSTIC">DIAGNOSTIC</option>
                <option value="WELLNESS">WELLNESS</option>
                <option value="MEDICAL">MEDICAL</option>
              </select>
              {errors.coupon && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Coupon Code is required</p>
                </div>
              )}
            </div>

            {/* Coupon Code Rate*/}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Coupon Code Rate</span>
              </label>
              <select
                {...register("couponRate", { required: true })}
                className="select select-sm select-success w-full text-xs max-w-xs"
              >
                <option disabled selected value="default">
                  Choose one
                </option>
                <option value="15">15% off</option>
                <option value="18">18% off</option>
                <option value="20">20% off</option>
                <option value="25">25% off</option>
                <option value="30">30% off</option>
              </select>
              {errors.couponRate && (
                <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                  <RiErrorWarningFill className="text-lg" />
                  <p>Coupon Code Rate is required</p>
                </div>
              )}
            </div>
          </div>

          <div className="form-control my-6">
            <label className="label">
              <span className="label-text">Banner Description</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24 textarea-accent"
              placeholder="Banner description"
            ></textarea>
            {errors.description && (
              <div className="text-red-600 flex items-center gap-1 mt-2 ml-1">
                <RiErrorWarningFill className="text-lg" />
                <p>Banner description is required</p>
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

export default AddBanner;
