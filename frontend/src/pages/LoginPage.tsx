import { Link } from "react-router-dom";
import Input from "../components/shared/Input";

const LoginPage = () => {
  return (
    <div className="flex justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-5">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-green-950">Login</h1>
          <p className="text-sm text-gray-600">
            Access your fridge items account
          </p>
        </div>

        <form className="space-y-4">
          <Input
            label="Email"
            type="email"
            required
            className="py-2"
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            className="py-2"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="w-full px-6 py-2 text-sm font-medium text-[#fdf5ea] bg-green-950 rounded-lg hover:bg-green-900 disabled:opacity-70"
          >
            Login
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
