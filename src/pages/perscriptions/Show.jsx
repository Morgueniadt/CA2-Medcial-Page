import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function ShowPatient() {
  const { id } = useParams();
  const [prescription, setPatient] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(
          `https://ca2-med-api.vercel.app/prescriptions/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPatient(res.data);
      } catch (err) {
        console.log("Fetch prescription error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  if (!prescription) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Patient Details</h1>

      <p><strong>patient:</strong> {prescription.patient_id}</p>
      <p><strong>Doctor ID:</strong> {prescription.doctor_id}</p>
      <p><strong>Diagnosis ID:</strong> {prescription.diagnosis_id}</p>
      <p><strong>Medication:</strong> {prescription.medication}</p>
      <p><strong>Dosage:</strong> {prescription.dosage}</p>
      <p><strong>Start Date:</strong> {prescription.start_date}</p>
      <p><strong>End Date:</strong> {prescription.end_date}</p>
    </>
  );
}
