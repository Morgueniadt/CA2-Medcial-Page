import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';


export default function CreatePatient() {

  const [form, setForm] = useState({
    patient_id: "",
    doctor_id: "",
    diagnosis_id: "",
    medication: "",
    dosage: "",
    start_date: "",
    end_date: ""
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
      url: `https://ca2-med-api.vercel.app/prescriptions`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: form
    };

    try {
      const response = await axios.request(options);
      navigate('/prescriptions');
    } catch (err) {
      console.log("Create prescription error:", err);
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
          name="doctor_id"
          placeholder="Doctor ID"
          value={form.doctor_id}
          onChange={handleChange}
        />

        <Input
          name="diagnosis_id"
          placeholder="Diagnosis ID"
          value={form.diagnosis_id}
          onChange={handleChange}
        />

        <Input
          name="medication"
          placeholder="Medication"
          value={form.medication}
          onChange={handleChange}
        />

        <Input
          name="dosage"
          placeholder="Dosage"
          value={form.dosage}
          onChange={handleChange}
        />

        <Input
          name="start_date"
          placeholder="Start Date"
          value={form.start_date}
          onChange={handleChange}
        />

        <Input
          name="end_date"
          placeholder="End Date"
          value={form.end_date}
          onChange={handleChange}
        />
          
        <Button className="mt-4" type="submit" variant="outline">
          Create Perscription
        </Button>
      </form>
    </>
  );
}
