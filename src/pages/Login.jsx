import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Login successful!");
      const role = res.payload?.role;
      if (role === "recruiter") navigate("/recruiterdashboard");
      else navigate("/dashboard");
    } else {
      toast.error(res.payload || "Login failed");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <input className={inputClass} type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input className={inputClass} type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-500">
          No account? <Link to="/register" className="text-gray-900 hover:underline">Register</Link>
        </p>
      </form>




    </div>
  );
}
