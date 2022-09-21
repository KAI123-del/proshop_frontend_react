import React from "react";

function Loader() {
  return (
    <div style={{height:'75vh'}} className="flex justify-center items-center space-x-4">
      <div
        className="
       spinner-grow  w-4 h-4  rounded-full 
        bg-teal-200 animate-pulse
      "></div>
      <div
        className="
       spinner-grow  w-6 h-6 animate-pulse  rounded-full 
        bg-teal-300
      "></div>
      <div
        className="
       spinner-grow  w-8 h-8  rounded-full 
        bg-teal-400 animate-pulse
      "></div>
      <div
        className="
       spinner-grow  w-10 h-10  rounded-full 
        bg-teal-500 animate-pulse
      "></div>
      <div
        className="
       spinner-grow  w-12 h-12  rounded-full 
        bg-teal-600 animate-pulse
      "></div><div className="text-6xl font-gotham bg-gradient-to-r from-teal-700 animate-pulse to-purple-600 bg-clip-text text-transparent">Loading</div>
    </div>
  );
}

export default Loader;
