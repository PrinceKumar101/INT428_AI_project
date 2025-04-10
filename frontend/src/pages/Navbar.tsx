import { Link } from "react-router-dom";
import {Compass, Palette, User} from "lucide-react";
const Navbar = () => {
  return (
    <>
      <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">ArtInspire</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/explore"
              className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
            >
              <Compass className="h-5 w-5" />
              <span>Explore</span>
            </Link>

            {User ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600"
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                
              </>
            ) : (
              <Link
                to="/login"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
