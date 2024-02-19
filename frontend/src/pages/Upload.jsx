import React from "react";
import DropZone from "../components/DropZone";

export default function Upload() {
  return (<>
  <div className="mt-4">
    {/* Header page */}
    <div className="ml-8 text-gray-600 text-sm">
      Upload page
    </div>

    {/* content page */}
    <div className="bg-white text-center text-gray-700 p-4 m-6 rounded-lg shadow-2xl">
      Upload your Videos or Images
    </div>
    <div className="bg-gray-100 text-white p-4 m-6 rounded-lg shadow-2xl">
      <DropZone/>
    </div>
  </div>
  </>);
}
