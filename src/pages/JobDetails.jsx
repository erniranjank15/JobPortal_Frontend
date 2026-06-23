import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getJobByIdThunk } from "../features/job/jobThunk";
import { applyForJobThunk } from "../features/application/applnThunk";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

export default function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobDetails, loading } = useSelector((state) => state.job);
  const { user } = useSelector((state) => state.auth);
  const { loading: applying } = useSelector((state) => state.application);
  const [applied, setApplied] = useState(false);

  useEffect(() => { dispatch(getJobByIdThunk(id)); }, [id]);

  const handleApply = async () => {
    const res = await dispatch(applyForJobThunk({ jobId: id }));
    if (res.meta.requestStatus === "fulfilled") {
      setApplied(true);
      toast.success("Application submitted successfully!");
    } else {
      toast.error(res.payload || "Failed to apply");
    }
  };

  if (loading) return <Loading />;
  if (!jobDetails) return <p className="text-center mt-10 text-gray-500">Job not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="text-gray-900 text-sm mb-4 hover:underline">← Back</button>
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{jobDetails.title}</h1>
          <p className="text-gray-900 font-semibold text-lg">{jobDetails.company}</p>
        </div>
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
          <span>📍 {jobDetails.location}</span>
          <span>💼 {jobDetails.jobType}</span>
          <span>💰 {jobDetails.salary || "Not specified"}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{jobDetails.description}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Required Skills</h3>
          <div className="flex flex-wrap gap-2">
            {jobDetails.skills?.map(skill => (
              <span key={skill} className="bg-blue-100 text-gray-900 text-xs px-3 py-1 rounded-full">{skill}</span>
            ))}
          </div>
        </div>
        {user?.role === "applicant" && !applied && (
          <button onClick={handleApply} disabled={applying}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-900 disabled:opacity-50">
            {applying ? "Applying..." : "Apply Now"}
          </button>
        )}
        {applied && (
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">✓ Applied</span>
        )}
        {!user && (
          <p className="text-sm text-gray-500">
            <a href="/login" className="text-gray-900 hover:underline">Login</a> to apply for this job.
          </p>
        )}
      </div>

    
    </div>
  );
}
