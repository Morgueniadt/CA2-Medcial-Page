import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PrescriptionShow() {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    fetch(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPrescription)
      .catch(console.error);
  }, [id]);

  if (!prescription) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Prescription</h1>

      <p><strong>Medication:</strong> {prescription.medication}</p>
      <p><strong>Dosage:</strong> {prescription.dosage}</p>
      <p><strong>Patient ID:</strong> {prescription.patient_id}</p>
      <p><strong>Doctor ID:</strong> {prescription.doctor_id}</p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/prescriptions/${id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <Link
          to="/prescriptions"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
