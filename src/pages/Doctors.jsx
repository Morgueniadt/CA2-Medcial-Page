import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ca2-med-api.vercel.app/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold">Doctors</h1>

        <Link
          to="/doctors/create"
          className="inline-flex items-center justify-center bg-gray-600 text-white px-4 py-2 rounded-md
                     hover:bg-gray-700 transition"
        >
          + Create New Doctor
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-500">Loading doctors...</p>
      )}

      {/* Doctor Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!loading &&
          doctors.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-lg shadow-sm border p-4
                         hover:shadow-md hover:-translate-y-1
                         transition-all duration-200"
            >
              <h2 className="text-lg font-semibold">
                {d.first_name} {d.last_name}
              </h2>

              <p className="text-gray-600">{d.specialisation}</p>

              <div className="flex gap-3 mt-4">
                <Link
                  to={`/doctors/${d.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>

                <Link
                  to={`/doctors/${d.id}/edit`}
                  className="text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {!loading && doctors.length === 0 && (
        <p className="text-gray-500 mt-4">No doctors found.</p>
      )}
    </div>
  );
}
