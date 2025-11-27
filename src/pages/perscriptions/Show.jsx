import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPatient() {
  const { id } = useParams();
  const [perscription, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/perscriptions/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatient(res.data);
      } catch (err) {
        console.log("Fetch perscription error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!perscription) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Patient Details</h1>

      <p><strong>patient:</strong> {perscription.patient_id}</p>
      <p><strong>Doctor ID:</strong> {perscription.doctor_id}</p>
      <p><strong>Diagnosis ID:</strong> {perscription.diagnosis_id}</p>
      <p><strong>Medication:</strong> {perscription.medication}</p>
      <p><strong>Dosage:</strong> {perscription.dosage}</p>
      <p><strong>Start Date:</strong> {perscription.start_date}</p>
      <p><strong>End Date:</strong> {perscription.end_date}</p>
    </>
  );
}
