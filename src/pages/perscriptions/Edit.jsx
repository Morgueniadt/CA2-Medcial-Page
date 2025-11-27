import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router";

export default function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/perscriptions/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.request(options);
        const perscription = response.data;

        setForm({
          patient_id: perscription.patient_id,
          doctor_id: perscription.doctor_id,
          diagnosis_id: perscription.diagnosis_id,
          medication: perscription.medication,
          dosage: perscription.dosage,
          start_date: perscription.start_date,
          end_date: perscription.end_date
        });
      } catch (err) {
        console.log("Fetch perscription error:", err);
      }
    };

    fetchPatient();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const updatePatient = async () => {
    const options = {
      method: "PATCH",
      url: `https://ca2-med-api.vercel.app/perscriptions/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: form
    };

    try {
      await axios.request(options);
      navigate("/perscriptions");
    } catch (err) {
      console.log("Update perscription error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePatient();
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Edit Patient</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <Input name="patient_id" value={form.patient_id} onChange={handleChange} placeholder="Patient ID" />
        <Input name="doctor_id" value={form.doctor_id} onChange={handleChange} placeholder="Doctor ID" />
        <Input name="diagnosis_id" value={form.diagnosis_id} onChange={handleChange} placeholder="Diagnosis ID" />
        <Input name="medication" value={form.medication} onChange={handleChange} placeholder="Medication" />
        <Input name="dosage" value={form.dosage} onChange={handleChange} placeholder="Dosage" />
        <Input name="start_date" value={form.start_date} onChange={handleChange} placeholder="Start Date" />
        <Input name="end_date" value={form.end_date} onChange={handleChange} placeholder="End Date" />

        <Button className="mt-4" type="submit" variant="outline">
          Save Changes
        </Button>
      </form>
    </>
  );
}
