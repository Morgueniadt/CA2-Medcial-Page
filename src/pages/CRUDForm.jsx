import { useEffect, useState } from "react";
import { Link, useParams  } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth"; // Assuming your AuthContext

export default function CRUDShow({ resources }) {
  const { resource, id } = useParams();
  const config = resources[resource];
  const { token } = useAuth(); // get token
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`${config.endpoint}/${id}`, {
      headers: { Authorization: `Bearer ${token}` } // optional for protected API
    }).then(res => setItem(res.data));
  }, [resource, id, token]);

  if (!item) return <p>Loading...</p>;

  return (
    <>
      <h1 className="text-2xl font-semibold">{config.label} Details</h1>

      <div className="mt-4">
        {config.fields.map(f => (
          <p key={f.name}>
            <strong>{f.label}:</strong> {item[f.name]}
          </p>
        ))}
      </div>

      {/* Only render the edit button if the user is admin */}
      {token && (
        <Link
          to={`/${resource}/${id}/edit`}
          className="px-4 py-2 mt-4 inline-block bg-green-600 text-white rounded"
        >
          Edit
        </Link>
      )}
    </>
  );
}
