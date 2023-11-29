import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleToggleAdmin = (id, currentRole) => {
    if (id) {
      const newRole = currentRole === "admin" ? "user" : "admin";

      axiosSecure.patch(`/users/admin/${id}`, { role: newRole }).then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          toast.success("User Role Changed Successfully!", {
            position: "top-right",
          });
        }
        refetch();
      });
    } else {
      console.error("User ID is undefined.");
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    if (id) {
      const newStatus = currentStatus === "active" ? "blocked" : "active";

      axiosSecure
        .patch(`/users/status/${id}`, { status: newStatus })
        .then((res) => {
          console.log(res);
          if (res.data.modifiedCount > 0) {
            toast.success("User Status Changed Successfully!", {
              position: "top-right",
            });
          }
          refetch();
        });
    } else {
      console.error("User ID is undefined.");
    }
  };

  const handleUserInfo = (id) => {
    axiosSecure.get(`/users/${id}`).then((res) => {
      const user = res.data;
      const imageUrl = user.profile || "https://unsplash.it/400/200";

      const userInfo = `
          <div style="text-align: left;">
            <div>
              <div style= "display: flex; justify-content: space-between; margin-bottom: 12px">
              <p style="background-color: #d6f5e3; color: #354a5f; padding: 0px 8px 2px 8px; border-radius: 9999px; font-weight: 600;"> ${user.role}</p>
              <p style="background-color: #d6f5e3; color: #354a5f; padding: 0px 8px 2px 8px; border-radius: 9999px; font-weight: 600;">${user.status}</p>
              </div>
              <p><strong>Name:</strong> ${user.name}</p>
              <p><strong>Email:</strong> ${user.email}</p>
              <p><strong>Blood Type:</strong> ${user.blood}</p>
              <p><strong>Division:</strong> ${user.division}</p>
              <p><strong>District:</strong> ${user.district}</p>
              
            </div>
          </div>
        `;

      Swal.fire({
        title: "User Information",
        html: userInfo,
        imageUrl: imageUrl,
        confirmButtonColor: " #2ecc70",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "User Image",
      });
    });
  };

  return (
    <section className="shadow-xl mt-10 max-w-4xl mx-auto h-screen mb-14 rounded-xl">
      <Helmet>
        <title>IlmMed Solution | All Users</title>
      </Helmet>
      <div className="flex items-center rounded-t-xl bg-gradient-to-r from-[#2ecc70] to-[#3398db]">
        <div className="px-4 py-6 text-white md:mx-6 md:p-12">
          <h4 className="text-2xl font-semibold text-[#edf1f2]">
            Manage All Users
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
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
                <th>See Info</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user?._id}>
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.role === "admin" ? (
                      <button
                        onClick={() => handleToggleAdmin(user?._id, user?.role)}
                        className="btn btn-outline btn-warning btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleAdmin(user?._id, user?.role)}
                        className="btn btn-sm btn-outline btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                    {user?.status === "active" ? (
                      <button
                        onClick={() =>
                          handleToggleStatus(user?._id, user?.status)
                        }
                        className="btn btn-warning btn-sm"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleToggleStatus(user?._id, user?.status)
                        }
                        className="btn btn-sm btn-success"
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary btn-outline"
                      onClick={() => handleUserInfo(user?._id)}
                    >
                      See Info
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

export default AllUsers;
