import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AddATest from "../Pages/Dashboard/Admin/AddATest";
import AllTests from "../Pages/Dashboard/Admin/AllTests";
import Reservation from "../Pages/Dashboard/Admin/Reservation";
import AddBanner from "../Pages/Dashboard/Admin/AddBanner";
import AllBanners from "../Pages/Dashboard/Admin/AllBanners";
import UpcomingAppointments from "../Pages/Dashboard/User/UpcomingAppointments";
import TestResults from "../Pages/Dashboard/User/TestResults";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import Dashboard from "../Layout/Dashboard";
import AdminRoute from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ErrorPage from "../Layout/ErrorPage";
import UpdateForm from "../Components/UpdateForm/UpdateForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // admin Routes
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addATest",
        element: (
          <AdminRoute>
            <AddATest></AddATest>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allTests",
        element: (
          <AdminRoute>
            <AllTests></AllTests>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reservation",
        element: (
          <AdminRoute>
            <Reservation></Reservation>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addBanner",
        element: (
          <AdminRoute>
            <AddBanner></AddBanner>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allBanners",
        element: (
          <AdminRoute>
            <AllBanners></AllBanners>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateForm/:id",
        element: (
          <AdminRoute>
            <UpdateForm></UpdateForm>
          </AdminRoute>
        ),
        loader: ({ params }) => fetch(`http://localhost:5000/allTests/${params.id}`),
      },

      // user routes
      {
        path: "/dashboard/upcomingAppointments",
        element: (
          <PrivateRoute>
            <UpcomingAppointments></UpcomingAppointments>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/testResults",
        element: (
          <PrivateRoute>
            <TestResults></TestResults>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/myProfile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
