import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Loading from "../../../Components/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import format from "date-fns/format";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: bookings = [],
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allBookings?${user?.email}`);
      return res.data;
    },
  });

  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Cancelling the appointment is irreversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2ecc70",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (id) {
          axiosSecure.delete(`/allBookings/${id}`).then((res) => {
            console.log(res);
            refetch();
          });
        } else {
          console.error("User ID is undefined.");
        }
        Swal.fire({
          title: "Cancelled!",
          text: "Your appointment has been successfully cancelled.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="shadow-xl mt-10 max-w-xs md:max-w-4xl mx-auto md:h-screen mb-14 rounded-xl">
      {isFetching && <Loading />}
      <Helmet>
        <title>IlmMed Solution | Upcoming Appointment</title>
      </Helmet>
      <div className="flex items-center rounded-t-xl bg-gradient-to-r from-[#2ecc70] to-[#3398db]">
        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
          <h4 className="text-2xl font-semibold text-[#edf1f2]">
            Upcoming Appointment
          </h4>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto ml-4 mt-10">
          <table className="table text-lg">
            {/* head */}
            <thead className="text-lg">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Category</th>
                <th>Test Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((test, index) => (
                <tr key={test._id}>
                  <th>{index + 1}</th>
                  <td>{test.name}</td>
                  <td>{test.category}</td>
                  <td>{format( new Date(test.deadline), 'dd/MM/yyyy')}</td>
                  <td>
                    <button
                      onClick={() => handleCancelBooking(test._id)}
                      className="btn btn-warning btn-sm"
                    >
                     Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllTests;
