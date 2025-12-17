import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DoctorForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    specialisation: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (!id) return;
    fetch(`https://ca2-med-api.vercel.app/doctors/${id}`)
      .then(res => res.json())
      .then(setForm)
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = id
      ? `https://ca2-med-api.vercel.app/doctors/${id}`
      : "https://ca2-med-api.vercel.app/doctors";
    const method = id ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(() => navigate("/doctors"))
      .catch(console.error);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{id ? "Edit Doctor" : "Create New Doctor"}</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          value={form.first_name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          value={form.last_name}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="specialisation"
          placeholder="Specialisation"
          value={form.specialisation}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Save Changes" : "Create"}
        </button>
      </form>
    </div>
  );
}
