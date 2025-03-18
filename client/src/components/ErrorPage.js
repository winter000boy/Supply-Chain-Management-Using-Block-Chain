import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate();

  // Default messages based on error code
  const errorMessages = {
    404: "Oops! The page you're looking for doesn't exist.",
    500: "Something went wrong on our end. Please try again later.",
    default: "An unexpected error occurred. Please try again.",
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        {errorCode || "Error"}
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        {errorMessage || errorMessages[errorCode] || errorMessages.default}
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
