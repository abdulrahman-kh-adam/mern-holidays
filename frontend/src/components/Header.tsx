import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/Store";
import SignOutButton from "./SignOutButton";

const Header = ({ headerLoading }: { headerLoading: boolean }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between flex-wrap">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">Mernholidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {headerLoading ? (
            <span className="flex items-center text-gray-100 px-3 font-bold hover:bg-gray-100 hover:text-blue-600 h-10">
              loading...
            </span>
          ) : isLoggedIn ? (
            <>
              <Link
                to="/my-bookings"
                className="flex items-center text-gray-100 px-3 font-bold hover:bg-gray-100 hover:text-blue-600 h-10"
              >
                My Bookings
              </Link>
              <Link
                to="/my-hotels"
                className="flex items-center text-gray-100 px-3 font-bold hover:bg-gray-100 hover:text-blue-600 h-10"
              >
                My Hotels
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white h-10"
              >
                Sign In
              </Link>
              {/* <Link
                to="/register"
                className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white h-10"
              >
                Register
              </Link> */}
            </>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
