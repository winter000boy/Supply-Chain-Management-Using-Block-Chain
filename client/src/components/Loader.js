import React from "react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-4 border-blue-500 border-dashed rounded-full w-16 h-16 animate-spin"></div>
      <p className="ml-3">Loading...</p>
    </div>
  );
}

export default Loader;
