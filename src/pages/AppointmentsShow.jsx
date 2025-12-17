import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function AppointmentShow() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    fetch(`https://ca2-med-api.vercel.app/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setAppointment)
      .catch(console.error);
  }, [id]);

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>

      <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
      <p><strong>Doctor ID:</strong> {appointment.doctor_id}</p>
      <p><strong>Date:</strong> {appointment.appointment_date}</p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/appointments/${id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <Link
          to="/appointments"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
