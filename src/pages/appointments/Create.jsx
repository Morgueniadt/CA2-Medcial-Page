import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function CreatePatient() {

  const [form, setForm] = useState({
    appointment_date: "",
    doctor_id: "",
    patient_id: ""
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
      url: `https://ca2-med-api.vercel.app/patients`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: form
    };

    try {
      const response = await axios.request(options);
      navigate('/patients');
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
          name="appointment_date"
          placeholder="Appointment Date"
          value={form.appointment_date}
          onChange={handleChange}
        />

        <Input
          name="doctor_id"
          placeholder="Doctor ID"
          value={form.doctor_id}
          onChange={handleChange}
        />

        <Input
          name="patient_id"
          placeholder="Patient ID"
          value={form.patient_id}
          onChange={handleChange}
        />

        

        <Button className="mt-4" type="submit" variant="outline">
          Create Appointment
        </Button>
      </form>
    </>
  );
}
