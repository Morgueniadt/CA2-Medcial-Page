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
    patient_id: "",
    condition: "",
    diagnosis_date: ""
  });

  useEffect(() => {
    const fetchPatient = async () => {
      const options = {
        method: "GET",
        url: `https://ca2-med-api.vercel.app/diagnoses/${id}`,
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        const response = await axios.request(options);
        const diagnosis = response.data;

        setForm({
          patient_id: diagnosis.patient_id,
          condition: diagnosis.condition,
          diagnosis_date: diagnosis.diagnosis_date
        });
      } catch (err) {
        console.log("Fetch diagnosis error:", err);
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
      url: `https://ca2-med-api.vercel.app/diagnoses/${id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: form
    };

    try {
      await axios.request(options);
      navigate("/diagnoses");
    } catch (err) {
      console.log("Update diagnosis error:", err);
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
        <Input name="condition" value={form.condition} onChange={handleChange} placeholder="Condition" />
        <Input name="diagnosis_date" value={form.diagnosis_date} onChange={handleChange} placeholder="Diagnosis Date" />

        <Button className="mt-4" type="submit" variant="outline">
          Save Changes
        </Button>
      </form>
    </>
  );
}
