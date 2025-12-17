import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("https://ca2-med-api.vercel.app/appointments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setAppointments)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Link
          to="/appointments/create"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          New Appointment
        </Link>
      </div>

      <ul className="space-y-3">
        {appointments.map((a) => (
          <li
            key={a.id}
            className="bg-white p-4 rounded shadow flex justify-between"
          >
            <span>
              Patient #{a.patient_id} – Doctor #{a.doctor_id}
            </span>
            <Link
              to={`/appointments/${a.id}`}
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
