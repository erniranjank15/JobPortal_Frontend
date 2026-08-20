import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordUser } from "../features/auth/authThunk";
import { clearForgotPasswordError } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPasswordLoading, forgotPasswordError } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearForgotPasswordError());
    const res = await dispatch(forgotPasswordUser(email));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("If the email exists, a password reset link has been sent");
      navigate("/login");
    } else {
      toast.error(res.payload || "Failed to send reset email");
    }
  };

  const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-900">Forgot Password</h2>
          <p className="text-center text-sm text-gray-500">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <input 
            className={inputClass} 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          {forgotPasswordError && (
            <p className="text-red-500 text-sm text-center">{forgotPasswordError}</p>
          )}
          <button type="submit" disabled={forgotPasswordLoading}
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50">
            {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Remember your password? <Link to="/login" className="text-gray-900 hover:underline">Login</Link>
          </p>
        </form>
      </div>
      <Footer/>
    </div>
  );
}