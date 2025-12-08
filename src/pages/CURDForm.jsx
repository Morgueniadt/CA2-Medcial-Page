import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth"; // Assuming your AuthContext

export default function CRUDForm({ resources }) {
  const { resource, id } = useParams();
  const config = resources[resource];
  const navigate = useNavigate();
  const { token } = useAuth(); // Get token from AuthContext

  const isEdit = Boolean(id);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch existing data for edit mode
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      axios
        .get(`${config.endpoint}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // Include token
        })
        .then((res) => {
          setForm(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err.response?.data || err.message);
          setError(err.response?.data?.message || "Failed to load data");
          setLoading(false);
        });
    }
  }, [isEdit, id, config.endpoint, token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEdit) {
        await axios.put(`${config.endpoint}/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(config.endpoint, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate(`/${resource}`);
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-semibold">
        {isEdit ? `Edit ${config.label}` : `Create ${config.label}`}
      </h1>

      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}

      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        {config.fields.map((f) => (
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
          className="mt-4 px-4 py-2 bg-gray-600 text-white rounded"
        >
          {isEdit ? "Save Changes" : "Create"}
        </button>
      </form>
    </>
  );
}
