import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

export default function CRUDForm({ resources }) {
  const { resource, id } = useParams();
  const config = resources[resource];
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [form, setForm] = useState({});

  useEffect(() => {
    if (isEdit) {
      axios.get(`${config.endpoint}/${id}`).then(res => setForm(res.data));
    }
  }, [isEdit]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(`${config.endpoint}/${id}`, form);
    } else {
      await axios.post(config.endpoint, form);
    }

    navigate(`/${resource}`);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">
        {isEdit ? `Edit ${config.label}` : `Create ${config.label}`}
      </h1>

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        {config.fields.map(f => (
          <div key={f.name}>
            <label>{f.label}</label>
            <input
              className="border p-2 block w-full"
              type={f.type}
              name={f.name}
              value={form[f.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isEdit ? "Save Changes" : "Create"}
        </button>
      </form>
    </>
  );
}
