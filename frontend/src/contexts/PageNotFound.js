import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    // <div className="m-auto">
    // <div className="text-center text-gray-700 bg-gray-300 rounded-xl h-96 w-96 m-8 p-8">
    //   
    // </div>

    // </div>
  
<div class="min-h-screen flex items-center justify-center text-gray-700">
  
  <div class="bg-gray-200 p-8 rounded-lg shadow-lg">
  <div className="text-center h-96 w-96 m-8 p-8">

  <h1 className="text-8xl">404</h1>
    <h3>Page Not Found</h3>
    <p class="text-base text-center mt-8">We're sorry, but the page you are looking for could not be found.</p>
    <p class="text-lg text-center mt-4">Please check the URL for any spelling mistakes or try navigating back to the <Link to="/" class="text-blue-500 hover:underline">homepage</Link>.</p>
    </div>

  </div>
</div>


    );
}
