import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">
          Volunteer System
        </h1>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            Volunteer Registration
          </Link>

          {!token ? (
            <Link
              to="/admin-login"
              className="hover:text-blue-200 transition"
            >
              Admin Login
            </Link>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-200 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;