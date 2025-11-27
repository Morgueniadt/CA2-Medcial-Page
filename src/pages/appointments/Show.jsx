import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPatient() {
  const { id } = useParams();
  const [appointment, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/appointments/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatient(res.data);
      } catch (err) {
        console.log("Fetch appointment error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!appointment) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Appointment Details</h1>

      <p><strong>Appointment date:</strong> {appointment.appointment_date}</p>
      <p><strong>Doctor ID:</strong> {appointment.doctor_id}</p>
      <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
    </>
  );
}
