import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PrescriptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    medication: "",
    dosage: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`https://ca2-med-api.vercel.app/prescriptions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then(setForm);
    }
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://ca2-med-api.vercel.app/prescriptions${id ? `/${id}` : ""}`,
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      }
    ).then(() => navigate("/prescriptions"));
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Prescription" : "Create Prescription"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="patient_id"
          placeholder="Patient ID"
          value={form.patient_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="doctor_id"
          placeholder="Doctor ID"
          value={form.doctor_id}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="medication"
          placeholder="Medication"
          value={form.medication}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="dosage"
          placeholder="Dosage"
          value={form.dosage}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
