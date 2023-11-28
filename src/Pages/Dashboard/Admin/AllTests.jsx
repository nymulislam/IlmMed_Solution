import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const AllTests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tests = [], refetch } = useQuery({
    queryKey: ["tests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allTests");
      return res.data;
    },
  });

  const handleDeleteTest = (id) => {
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
          axiosSecure.delete(`/allTests/${id}`).then((res) => {
            console.log(res);
            refetch();
          });
        } else {
          console.error("User ID is undefined.");
        }
        Swal.fire({
          title: "Deleted!",
          text: "A test has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <section className="shadow-xl mt-10 max-w-4xl mx-auto h-screen mb-14 rounded-xl">
      <Helmet>
        <title>IlmMed Solution | All Tests</title>
      </Helmet>
      <div className="flex items-center rounded-t-xl bg-gradient-to-r from-[#2ecc70] to-[#3398db]">
        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
          <h4 className="text-2xl font-semibold text-[#edf1f2]">
            Manage All Medical Tests
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
                <th>Action</th>
                <th>See Info</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={test._id}>
                  <th>{index + 1}</th>
                  <td>{test.name}</td>
                  <td>{test.category}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="btn btn-warning btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/dashboard/updateForm/${test._id}`}>
                      <button className="btn btn-sm btn-primary btn-outline">
                        Update
                      </button>
                    </Link>
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
