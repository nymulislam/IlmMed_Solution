import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

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
        refetch();
      });
    } else {
      console.error("User ID is undefined.");
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    if (id) {
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';

        axiosSecure.patch(`/users/status/${id}`, {status: newStatus}).then((res) => {
            console.log(res);
            refetch();
        })
    } else {
        console.error("User ID is undefined.");
    }

  }

  return (
    <section>
      <div>
        <h2 className="text-3xl text-center mt-10">Manage All Users</h2>
        <h4 className="text-2xl font-medium mt-10 ml-4">
          Total Users: {users.length}
        </h4>
      </div>
      <div>
        <div className="overflow-x-auto ml-4 mt-10">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleToggleAdmin(user._id, user.role)}
                        className="btn btn-outline btn-warning btn-sm"
                      >
                        Remove Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleAdmin(user._id, user.role)}
                        className="btn btn-sm btn-outline btn-success"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
                  {user.status === "active" ? (
                      <button
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        className="btn btn-outline btn-warning btn-sm"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggleStatus(user._id, user.status)}
                        className="btn btn-sm btn-outline btn-success"
                      >
                        Active
                      </button>
                    )}
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
