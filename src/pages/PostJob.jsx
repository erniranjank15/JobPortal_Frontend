import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobThunk } from "../features/job/jobThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";



const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900";

export default function PostJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.job);
  const [form, setForm] = useState({
    title: "", description: "", company: "", location: "",
    jobType: "Full-time", skills: "", salary: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createJobThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Job posted successfully!");
      navigate("/recruiterdashboard");
    } else {
      toast.error(res.payload || "Failed to post job");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <input className={inputClass} placeholder="Job Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input className={inputClass} placeholder="Company Name" value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })} required />
        <input className={inputClass} placeholder="Location" value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })} required />
        <textarea className={`${inputClass} h-28 resize-none`} placeholder="Job Description"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input className={inputClass} placeholder="Skills (comma separated e.g. React, Node.js)"
          value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} required />
        <input className={inputClass} placeholder="Salary (e.g. 5-8 LPA)" value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })} />
        <select className={inputClass} value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })}>
          {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
        </select>
        <button type="submit" disabled={loading}
          className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50 font-medium">
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>



     
    </div>
  );
}
