import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("https://ca2-med-api.vercel.app/prescriptions", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPrescriptions)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Prescriptions</h1>
        <Link
          to="/prescriptions/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Prescription
        </Link>
      </div>

      <ul className="space-y-3">
        {prescriptions.map((p) => (
          <li
            key={p.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <span>{p.medication}</span>
            <Link
              to={`/prescriptions/${p.id}`}
              className="text-blue-600"
            >
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
