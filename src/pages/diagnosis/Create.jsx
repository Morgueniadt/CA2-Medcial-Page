import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function CreatePatient() {

  const [form, setForm] = useState({
    patient_id: "",
    condition: "",
    diagnosis_date: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const createPatient = async () => {
    const options = {
      method: "POST",
      url: `https://ca2-med-api.vercel.app/diagnoses`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: form
    };

    try {
      const response = await axios.request(options);
      navigate('/diagnoses');
    } catch (err) {
      console.log("Create patient error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPatient();
  };

  return (
    <>
      <h1 className="text-xl font-semibold mb-4">Create New Patient</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        
        <Input
          name="patient_id"
          placeholder="Patient ID"
          value={form.patient_id}
          onChange={handleChange}
        />

        <Input
          name="condition"
          placeholder="Condition"
          value={form.condition}
          onChange={handleChange}
        />

        <Input
          name="diagnosis_date"
          placeholder="Diagnosis Date"
          value={form.diagnosis_date}
          onChange={handleChange}
        />

        <Button className="mt-4" type="submit" variant="outline">
          Create Diagnosis
        </Button>
      </form>
    </>
  );
}
