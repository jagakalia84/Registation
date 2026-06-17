import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/volunteers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setVolunteers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVolunteers();
  }, [token]);

  const exportReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/volunteers/export",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "volunteers-report.csv");

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Volunteer Dashboard
            </h1>

            <button
              onClick={exportReport}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Export CSV Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Skills</th>
                  <th className="px-4 py-3 text-left">Availability</th>
                </tr>
              </thead>

              <tbody>
                {volunteers.length > 0 ? (
                  volunteers.map((volunteer) => (
                    <tr
                      key={volunteer._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">
                        {volunteer.fullName}
                      </td>

                      <td className="px-4 py-3 break-all">
                        {volunteer.email}
                      </td>

                      <td className="px-4 py-3">
                        {volunteer.phone}
                      </td>

                      <td className="px-4 py-3">
                        {volunteer.skills}
                      </td>

                      <td className="px-4 py-3">
                        {volunteer.availability}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-gray-500"
                    >
                      No volunteers registered yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;