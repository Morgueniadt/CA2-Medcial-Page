import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/patients/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatient(res.data);
      } catch (err) {
        console.log("Fetch patient error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Patient Details</h1>

      <p><strong>First Name:</strong> {patient.first_name}</p>
      <p><strong>Last Name:</strong> {patient.last_name}</p>
      <p><strong>Date of Birth:</strong> {patient.date_of_birth}</p>
      <p><strong>Email:</strong> {patient.email}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
    </>
  );
}
