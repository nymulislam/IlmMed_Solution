import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Tooltip } from "react-tooltip";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Components/Loading/Loading";
import Button from "../../../Components/Button/Button";
import { TERipple } from "tw-elements-react";

const Banner = () => {
  const axiosPublic = useAxiosPublic();

  const { data: banners = [], isFetching } = useQuery({
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
      {isFetching && <Loading />}
      {banners.map(
        (banner) =>
          banner.status === "active" && (
            <div
              key={banner._id}
              className="hero h-[100vh]"
              style={{
                backgroundImage: `url(${banner.bannerImage})`,
              }}
            >
              <div className="hero-overlay bg-[#edf1f2] bg-opacity-60"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-3xl">
                  <h1 className="mb-10 text-4xl md:text-5xl font-bold text-[#1a202c]">
                    {banner.title}
                  </h1>
                  <p className="mb-10 text-[#1a202c]  md:text-lg font-semibold">
                    {banner.description}
                  </p>

                  <div className="grid gap-10">
                    <Link to="/allTestsPage">
                      <TERipple rippleColor="light">
                        <Button className="text-lg px-4 py-2 pt-2.5 max-w-xs mx-auto font-semibold bg-gradient-to-r  from-[#2ecc70] to-[#3398db] border-[#2ecc70] text-white hover:border-[#3398db]">
                          All Tests
                        </Button>
                      </TERipple>
                    </Link>

                    {/* coupon card */}
                    <div className="bg-gradient-to-r  from-[#2ecc70] to-[#3398db] text-white text-center py-4 rounded-lg shadow-md relative">
                      <h3 className="text-2xl mb-4">
                        Get{" "}
                        <span className="text-[#354a5f] font-bold">
                          {banner.couponRate}% OFF
                        </span>{" "}
                        your next test!
                      </h3>
                      <div className="bg-white text-gray-800 rounded-md px-4 py-2 flex items-center justify-between max-w-xs mx-auto">
                        <span className="text-xl font-semibold">
                          {banner.coupon}
                          {banner.couponRate}
                        </span>

                        {/* copy button */}
                        <TERipple
                          data-tooltip-id="coupon-tooltip"
                          data-tooltip-content="Click to Copy Coupon Code"
                          data-tooltip-place="bottom"
                          rippleColor="light"
                        >
                          <Button
                            onClick={() =>
                              handleCopy(banner.coupon, banner.couponRate)
                            }
                            className="px-2 py-1 pt-1.5 text-base font-semibold bg-gradient-to-r  from-[#2ecc70] to-[#3398db] border-[#2ecc70] text-white"
                          >
                            Copy
                          </Button>
                        </TERipple>
                      </div>
                      <div className="bg-white w-5 h-9 rounded-r-full absolute top-11 left-0"></div>
                      <div className="bg-white w-5 h-9 rounded-l-full absolute top-11 right-0"></div>
                    </div>
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
