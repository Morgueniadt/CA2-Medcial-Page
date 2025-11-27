import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";

export default function CRUDShow({ resources }) {
  const { resource, id } = useParams();
  const config = resources[resource];

  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`${config.endpoint}/${id}`).then(res => setItem(res.data));
  }, [resource, id]);

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

      <Link
        to={`/${resource}/${id}/edit`}
        className="px-4 py-2 mt-4 inline-block bg-green-600 text-white rounded"
      >
        Edit
      </Link>
    </>
  );
}
