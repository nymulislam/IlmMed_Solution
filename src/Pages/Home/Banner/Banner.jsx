import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allBanners");
      return res.data;
    },
  });

  const handleCopy = async (coupon, couponRate) => {
    const couponText = `${coupon}${couponRate}`;

    try {
      await navigator.clipboard.writeText(couponText);
      toast.success("Coupon copied!", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Failed to copy coupon:", err);
      toast.error("Failed to copy coupon. Please try again.");
    }
  };

  return (
    <div>
      {banners.map(
        (banner) =>
          banner.status === "active" && (
            <div
              key={banner._id}
              className="hero h-[70vh] shadow-xl"
              style={{
                backgroundImage: `url(${banner.bannerImage})`,
              }}
            >
              <div className="hero-overlay bg-[#edf1f2] bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                  <h1 className="mb-5 text-5xl font-bold text-[#1a202c]">
                    {banner.title}
                  </h1>
                  <p className="mb-5 text-[#1a202c] text-lg font-semibold">
                    {banner.description}
                  </p>

                  <div className="grid gap-4">
                    <Link to="/allTestsPage">
                      <button className="px-6 max-w-xs mx-auto text-lg btn btn-primary bg-gradient-to-r from-[#2ecc70] to-[#3398db] border-[#2ecc70] text-white hover:border-[#3398db]">
                        All Tests
                      </button>
                    </Link>
                    <button
                      onClick={() =>
                        handleCopy(banner.coupon, banner.couponRate)
                      }
                      data-tooltip-id="coupon-tooltip"
                      data-tooltip-content="Click to Copy Coupon Code"
                      data-tooltip-place="bottom"
                      className=" mt-5 px-6 text-lg max-w-md mx-auto btn btn-secondary text-white hover:border-[#3398db] bg-gradient-to-r from-[#ff7675] to-[#d63031]"
                    >
                      Apply Coupon:{" "}
                      <span className="font-bold">
                        {banner.coupon}
                        {banner.couponRate}
                      </span>{" "}
                      - Get {banner.couponRate}% off
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
      )}
      <Tooltip id="coupon-tooltip" />
    </div>
  );
};

export default Banner;
