import React from "react";

export default function Dashboard() {
  return (
  <>
  <div className="mt-4">
    <div className="ml-8 text-gray-600 text-sm">
      Dashboard
    </div>

    <div className="bg-white text-center text-gray-700 p-4 m-6 rounded-xl shadow-2xl">
      Welcome to your control space 
    </div>

    <div className="flex">
      <div className="bg-[#023e8a] text-center text-white p-4 py-10 m-6 rounded-xl shadow-2xl w-1/2 hover:bg-[#023d8aed]">
        Upload
      </div>
      <div className="bg-[#023e8a] text-center text-white p-4 py-10 m-6 rounded-xl shadow-2xl w-1/2 hover:bg-[#023d8aed]">
        Results
      </div>
    </div>
  </div>
  </>
  );
}
