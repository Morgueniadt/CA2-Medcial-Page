import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPatient() {
  const { id } = useParams();
  const [diagnosis, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/diagnoses/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatient(res.data);
      } catch (err) {
        console.log("Fetch diagnosis error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!diagnosis) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Diagnosis Details</h1>

      <p><strong>Patient ID:</strong> {diagnosis.patient_id}</p>
      <p><strong>Condition:</strong> {diagnosis.condition}</p>
      <p><strong>Diagnosis Date:</strong> {diagnosis.diagnosis_date}</p>
    </>
  );
}
