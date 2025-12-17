import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DiagnosisShow() {
  const { id } = useParams();
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    fetch(`https://ca2-med-api.vercel.app/diagnoses/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setDiagnosis)
      .catch(console.error);
  }, [id]);

  if (!diagnosis) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Diagnosis</h1>

      <p><strong>Description:</strong> {diagnosis.description}</p>
      <p><strong>Patient ID:</strong> {diagnosis.patient_id}</p>
      <p><strong>Doctor ID:</strong> {diagnosis.doctor_id}</p>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/diagnoses/${id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Edit
        </Link>

        <Link
          to="/diagnoses"
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
