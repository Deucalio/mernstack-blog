import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="abslute top-1/2 py-64  px-4 text-3xl text-red-700 bg-slate-900 h-screen text-center -tracking-tight">
      <p className="tracking-wide text-5xl text-red-800 mb-4 -translate-y-4">
        404
      </p>
      <p>Page not found</p>
      <Link to="/">
        <p className="text-[#ECECEC]/80 hover:text-[#ECECEC]/50 transition-all hover:border-[#ECECEC]/50 text-xl border-b-2 border-[#ECECEC] w-fit mx-auto cursor-pointer my-4">
          Back to Blog
        </p>
      </Link>
    </div>
  );
};

export default NotFound;
