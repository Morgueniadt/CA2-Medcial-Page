import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Diagnoses() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://ca2-med-api.vercel.app/diagnoses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch diagnoses");
        }
        return res.json();
      })
      .then((data) => {
        // ✅ ensure array
        setDiagnoses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Diagnoses</h1>
        <Link
          to="/diagnoses/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          New Diagnosis
        </Link>
      </div>

      {diagnoses.length === 0 ? (
        <p className="text-gray-500">No diagnoses found.</p>
      ) : (
        <ul className="space-y-3">
          {diagnoses.map((d) => (
            <li
              key={d.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center hover:shadow-md transition"
            >
              <span className="text-gray-800">{d.description}</span>
              <Link
                to={`/diagnoses/${d.id}`}
                className="text-blue-600 hover:underline"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
