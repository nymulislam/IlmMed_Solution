import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const AllBanners = () => {
  const axiosSecure = useAxiosSecure();

  const { data: banners = [], refetch } = useQuery({
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

  return (
    <div className="max-w-4xl mx-auto">
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
          <figure className="w-11/12 h-52">
            <img src={banner?.bannerImage} alt="Album" />
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
                <button className="btn btn-primary">Deactive</button>
              ) : (
                <button className="btn btn-primary btn-sm">Active</button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllBanners;
