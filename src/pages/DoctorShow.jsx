import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DoctorShow() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://ca2-med-api.vercel.app/doctors/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or Doctor not found");
        }
        return res.json();
      })
      .then(setDoctor)
      .catch(() => setError("You are not authorized to view this doctor."));
  }, [id]);

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!doctor) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor Details</h1>

      <p><strong>First Name:</strong> {doctor.first_name}</p>
      <p><strong>Last Name:</strong> {doctor.last_name}</p>
      <p><strong>Specialisation:</strong> {doctor.specialisation}</p>
      <p><strong>Email:</strong> {doctor.email}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/doctors/${id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Edit
        </Link>

        <Link
          to="/doctors"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
