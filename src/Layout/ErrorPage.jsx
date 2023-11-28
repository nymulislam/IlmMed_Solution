import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#d6f5e3]">
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-[#354a5f]">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </p>
        <Link
          to="/"
          className="px-4 py-2 font-medium text-white bg-[#2ecc70] rounded-md hover:bg-[#13c45d] transition-all duration-200 ease-in-out"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
