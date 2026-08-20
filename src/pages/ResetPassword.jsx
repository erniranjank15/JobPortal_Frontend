import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../features/auth/authThunk";
import { clearResetPasswordError } from "../features/auth/authSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPasswordLoading, resetPasswordError } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearResetPasswordError());
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (form.password.length < 10) {
      toast.error("Password must be at least 10 characters long");
      return;
    }

    const res = await dispatch(resetPasswordUser({ token, passwordData: form }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password has been reset successfully");
      navigate("/login");
    } else {
      toast.error(res.payload || "Failed to reset password");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (!tokenValid) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-gray-100">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
            <h2 className="text-2xl font-bold text-center text-gray-900">Invalid Reset Link</h2>
            <p className="text-center text-sm text-gray-500 mt-4">
              This password reset link is invalid or has expired.
            </p>
            <Link to="/forgot-password" className="text-gray-900 hover:underline mt-4 inline-block">
              Request a new reset link
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">Reset Password</h2>
          <p className="text-center text-sm text-gray-500">
            Enter your new password below.
          </p>
          <input 
            className={inputClass} 
            type="password" 
            name="password"
            placeholder="New Password (min 10 characters)" 
            value={form.password}
            onChange={handleChange} 
            required 
          />
          <input 
            className={inputClass} 
            type="password" 
            name="confirmPassword"
            placeholder="Confirm New Password" 
            value={form.confirmPassword}
            onChange={handleChange} 
            required 
          />
          {resetPasswordError && (
            <p className="text-red-500 text-sm text-center">{resetPasswordError}</p>
          )}
          <button type="submit" disabled={resetPasswordLoading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50">
            {resetPasswordLoading ? "Resetting..." : "Reset Password"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Remember your password? <Link to="/login" className="text-gray-900 hover:underline">Login</Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}