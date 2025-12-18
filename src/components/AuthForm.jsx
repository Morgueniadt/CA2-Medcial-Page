import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login"); // 'login' or 'register'

  const adminCredentials = {
    email: "admin@example.com",
    password: "admin123",
    role: "doctor",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded admin login
    if (
      mode === "login" &&
      form.email === adminCredentials.email &&
      form.password === adminCredentials.password
    ) {
      onLogin(true, "admin-token", "admin");
      setLoading(false);
      return;
    }

    // API login or register
    const endpoint =
      mode === "login"
        ? "https://doctors-api.vercel.app/login"
        : "https://doctors-api.vercel.app/register";

    try {
      const response = await axios.post(endpoint, form);
      const { token, user } = response.data;

      if (!["doctor", "patient"].includes(user.role)) {
        setError("Your account role is not recognized.");
        setLoading(false);
        return;
      }

      onLogin(true, token, user.role);
    } catch (err) {
      console.error(err);
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
          <CardDescription className="text-gray-500 mt-1">
            {mode === "login"
              ? "Enter your credentials to login"
              : "Fill the form to create an account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "register" && (
              <div className="flex flex-col">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            )}

            <div className="flex flex-col">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {mode === "register" && (
              <div className="flex flex-col">
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  id="role"
                  required
                  onChange={handleChange}
                  className="mt-1 border p-2 rounded"
                >
                  <option value="">Select role</option>
                  <option value="doctor">Doctor</option>
                  <option value="patient">Patient</option>
                </select>
              </div>
            )}

            <Button
              type="submit"
              variant="solid"
              className={`mt-4 w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? `${mode}ing...` : mode === "login" ? "Login" : "Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-gray-500 text-sm mt-2">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-blue-500 underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-blue-500 underline"
              >
                Login
              </button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
