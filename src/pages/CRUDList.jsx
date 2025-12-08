import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ correct import
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";

export default function CRUDList({ resources }) {
  const { resource } = useParams();
  const config = resources[resource];

  if (!config) return <p>You do not have access to these pages: {resource}</p>; // Prevent crash

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(config.endpoint).then(res => setData(res.data));
  }, [config.endpoint]);

  return (
    <>
      <h1 className="text-2xl font-semibold">{config.label}</h1>

      <Link to={`/${resource}/create`} className="px-4 py-2 bg-blue-600 text-white rounded">
        Create New {config.label}
      </Link>

      <table className="mt-4 w-full border">
        <thead>
          <tr>
            {config.fields.map(f => (
              <th key={f.name} className="border p-2">{f.label}</th>
            ))}
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              {config.fields.map(f => (
                <td key={f.name} className="border p-2">{item[f.name]}</td>
              ))}
              <td className="border p-2">
                <Link className="text-blue-500" to={`/${resource}/${item.id}`}>View</Link> | 
                <Link className="text-green-500" to={`/${resource}/${item.id}/edit`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
