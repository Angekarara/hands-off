import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";
import { apiClient } from "../api/client";
import { setToken } from "../auth/token";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const token = (response.data as { token: string }).token;
      if (!token) {
        throw new Error("No token returned");
      }

      setToken(token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-green-950">Login</h1>
          <p className="text-sm text-gray-600">
            Access your fridge items account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            required
            className="py-2"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            required
            className="py-2"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-2 text-sm font-medium text-[#fdf5ea] bg-green-950 rounded-lg hover:bg-green-900 disabled:opacity-70"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-green-950 font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
