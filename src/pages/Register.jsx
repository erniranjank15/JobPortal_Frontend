import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunk";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";


export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "applicant" });
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (form.role === "applicant" && resume) formData.append("resume", resume);
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Registered successfully! Please login.");
      navigate("/login");
    } else {
      toast.error(res.payload?.message || "Registration failed");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-900">Register</h2>
        <input className={inputClass} placeholder="Full Name" value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className={inputClass} type="email" placeholder="Email" value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input className={inputClass} type="password" placeholder="Password (min 10 chars)" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} required />
        <select className={inputClass} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>
        {form.role === "applicant" && (
          <div>
            <label className="text-sm text-gray-700 block mb-1">Resume (PDF/DOC)</label>
            <input type="file" accept=".pdf,.doc,.docx"
              onChange={e => setResume(e.target.files[0])}
              className="text-sm text-gray-900 w-full" required />
          </div>
        )}
        <button type="submit" disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-gray-900 hover:underline">Login</Link>
        </p>


      
      </form>


    
    </div>
    
  );
}
