import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';

export default function CreatePatient() {

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    email: "",
    phone: ""
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
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
        />

        <Input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
        />

        <Input
          name="date of birth"
          placeholder="Date of Birth"
          value={form.date_of_birth}
          onChange={handleChange}
        />

        <Input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <Button className="mt-4" type="submit" variant="outline">
          Create Patient
        </Button>
      </form>
    </>
  );
}
