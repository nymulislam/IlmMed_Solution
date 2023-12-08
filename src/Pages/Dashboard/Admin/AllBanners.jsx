import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { toast } from "sonner";
import Loading from "../../../Components/Loading/Loading";

const AllBanners = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [], isFetching, refetch } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allBanners");
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ecc70",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          axiosSecure.delete(`/allBanners/${id}`).then((res) => {
            console.log(res);
            refetch();
          });
        } else {
          console.error("User ID is undefined.");
        }
        Swal.fire({
          title: "Deleted!",
          text: "Banner has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleToggleStatus = (id) => {
    if (id) {
      axiosSecure.patch(`/deactivatedBanners`).then(() => {
        axiosSecure
          .patch(`/allBanners/${id}`, { status: "active" })
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
              toast.success("Banner Status Changed Successfully!", {
                position: "top-right",
              });
            }

            refetch();
          });
      });
    } else {
      console.error("User ID is undefined.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {isFetching && <Loading />}
      <Helmet>
        <title>IlmMed Solution | All Banners</title>
      </Helmet>
      <h1 className="text-4xl mt-10">All Banners</h1>
      <div className="divider"></div>
      {banners.map((banner) => (
        <div
          key={banner?._id}
          className="card lg:card-side bg-base-100 shadow-xl my-10"
        >
          <figure>
            <img
              src={banner?.bannerImage}
              className="md:h-56 md:w-96"
              alt="Banner Image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-[#354a5f]">{banner?.title}</h2>
            <p>
              <strong className="text-[#354a5f]">Discount Coupon:</strong>{" "}
              <span className="badge badge-[#edf1f2] text-[#3398db] font-semibold">
                {banner?.coupon}
                {banner?.couponRate}
              </span>
            </p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleDelete(banner._id)}
                className="btn btn-warning btn-sm"
              >
                Delete
              </button>
              {banner?.status === "active" ? (
                <button
                  onClick={() => handleToggleStatus(banner._id)}
                  className="btn btn-primary btn-sm"
                >
                  Deactive
                </button>
              ) : (
                <button
                  onClick={() => handleToggleStatus(banner._id)}
                  className="btn btn-primary btn-sm"
                >
                  Active
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBanners;
