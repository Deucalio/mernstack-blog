import React from "react";
import { useEffect, useRef } from "react";

const Logout = ({ closeForm, logAdminOut }) => {
  const modalElement = useRef(null);

  useEffect(() => {
    let anim;
    document.body.classList.add("overflow-y-hidden");

    anim = setTimeout(() => {
      modalElement.current.classList.remove("scale-0");
    }, 200);

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      clearTimeout(anim);
    };
  });

  return (
    <>
      <div
        ref={modalElement}
        className="fixed top-1/2 left-1/2 scale-0 z-[60] mt-2 h-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2  overflow-x-hidden overflow-y-hidden rounded-md border-2 border-black/30 bg-[#10161d] p-4 shadow-md transition-all sm:h-2/3 md:w-2/4 lg:h-1/2 lg:w-[35rem]"
      >
        <div className="flex flex-col items-center gap-4 lg:px-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-32 w-32 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p className="text-xl text-gray-400">
            Are you sure that you want to log out?
          </p>

          <div className="mt-5 flex flex-wrap gap-4 self-end sm:mt-8">
            <button
              onClick={closeForm}
              className="rounded-md border-2 border-slate-300/50 py-2 px-3 text-slate-300 transition-all hover:border-slate-300 hover:bg-slate-600/60 hover:text-white md:text-xl"
            >
              Close
            </button>
            <button
              onClick={logAdminOut}
              className="w-24 rounded-md bg-red-600/75 py-1 text-white transition-all hover:bg-red-800/90 hover:outline-2 hover:outline-blue-800/50 md:text-xl z-[60] relative"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
