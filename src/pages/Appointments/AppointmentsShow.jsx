import { useEffect, useState } from "react";
import { api, setToken } from "@/utils/api";
import { useParams, Link } from "react-router-dom";

export default function AppointmentsShow() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) setToken(token);
    api.get(`/appointments/${id}`)
      .then(res => setAppointment(res.data))
      .catch(err => console.error(err));
  }, [id, token]);

  if (!appointment) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Appointment</h1>
      <p><strong>Doctor ID:</strong> {appointment.doctorId}</p>
      <p><strong>Patient ID:</strong> {appointment.patientId}</p>
      <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
      <Link to={`/appointments/${id}/edit`} className="text-blue-500 mt-4 inline-block">Edit Appointment</Link>
    </div>
  );
}
