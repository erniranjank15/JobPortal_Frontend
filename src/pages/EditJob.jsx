import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobByIdThunk, updateJobThunk, deleteJobThunk } from "../features/job/jobThunk";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { confirmToast } from "../components/ConfirmToast";

const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EditJob() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobDetails, loading } = useSelector((state) => state.job);
  const [form, setForm] = useState(null);

  useEffect(() => { dispatch(getJobByIdThunk(id)); }, [id]);

  useEffect(() => {
    if (jobDetails) {
      setForm({
        title: jobDetails.title || "",
        description: jobDetails.description || "",
        company: jobDetails.company || "",
        location: jobDetails.location || "",
        jobType: jobDetails.jobType || "Full-time",
        skills: Array.isArray(jobDetails.skills) ? jobDetails.skills.join(", ") : "",
        salary: jobDetails.salary || "",
      });
    }
  }, [jobDetails]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateJobThunk({ id, jobData: form }));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Job updated successfully!");
      navigate("/recruiterdashboard");
    } else {
      toast.error(res.payload || "Update failed");
    }
  };

  const handleDelete = async () => {
    confirmToast("Are you sure you want to delete this job?", async () => {
      const res = await dispatch(deleteJobThunk(id));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Job deleted!");
        navigate("/recruiterdashboard");
      } else {
        toast.error(res.payload || "Delete failed");
      }
    });
  };

  if (loading || !form) return <Loading />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h2>
      <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow p-6 space-y-4">
        <input className={inputClass} placeholder="Job Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input className={inputClass} placeholder="Company" value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })} required />
        <input className={inputClass} placeholder="Location" value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })} required />
        <textarea className={`${inputClass} h-28 resize-none`} placeholder="Description"
          value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
        <input className={inputClass} placeholder="Skills (comma separated)" value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })} required />
        <input className={inputClass} placeholder="Salary" value={form.salary}
          onChange={e => setForm({ ...form, salary: e.target.value })} />
        <select className={inputClass} value={form.jobType} onChange={e => setForm({ ...form, jobType: e.target.value })}>
          {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium">
            {loading ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 font-medium">
            Delete Job
          </button>
        </div>
      </form>
    </div>
  );
}
