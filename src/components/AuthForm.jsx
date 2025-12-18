import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function AuthForm({ onLogin }) {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login");

  const adminCredentials = { email: "admin@example.com", password: "admin123", role: "admin" };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitForm = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.email === adminCredentials.email && form.password === adminCredentials.password) {
      onLogin(true, "admin-token", "admin");
      setLoading(false);
      return;
    }

    const endpoint = mode === "login" ? "/login" : "/register";

    try {
      const res = await axios.post(`https://doctors-api.vercel.app${endpoint}`, form);
      const { token, user } = res.data;
      if (!["doctor", "patient"].includes(user.role)) {
        setError("Role not recognized");
        setLoading(false);
        return;
      }
      onLogin(true, token, user.role);
    } catch (err) {
      setError(err.response?.data?.message || `${mode} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-sm shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-700 capitalize">{mode}</CardTitle>
          <CardDescription>{mode === "login" ? "Enter your credentials" : "Fill form to register"}</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          <form className="flex flex-col gap-4" onSubmit={submitForm}>
            {mode === "register" && (
              <div className="flex flex-col">
                <Label>Name</Label>
                <Input name="name" required onChange={handleChange} />
              </div>
            )}
            <div className="flex flex-col">
              <Label>Email</Label>
              <Input name="email" type="email" required onChange={handleChange} />
            </div>
            <div className="flex flex-col">
              <Label>Password</Label>
              <Input name="password" type="password" required onChange={handleChange} />
            </div>
            {mode === "register" && (
              <div className="flex flex-col">
                <Label>Role</Label>
                <select name="role" required onChange={handleChange} className="border p-2 rounded">
                  <option value="">Select role</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
            )}
            <Button type="submit" className="mt-4">{loading ? "Processing..." : mode === "login" ? "Login" : "Register"}</Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-gray-500 text-sm mt-2">
          {mode === "login" ? (
            <>Don't have an account? <button onClick={() => setMode("register")} className="text-blue-500 underline">Register</button></>
          ) : (
            <>Already have an account? <button onClick={() => setMode("login")} className="text-blue-500 underline">Login</button></>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
