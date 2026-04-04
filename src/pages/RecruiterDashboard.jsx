import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsThunk, deleteJobThunk } from "../features/job/jobThunk";
import { updateApplicationStatus, getApplicationsForJob } from "../API/applicationAPI";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { confirmToast } from "../components/ConfirmToast";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function JobRow({ job, onDelete }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleApplications = async () => {
    if (open) { setOpen(false); return; }
    setOpen(true);
    if (applications.length > 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await getApplicationsForJob(job._id);
      const data = res.data?.data ?? res.data ?? [];
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      setApplications(prev =>
        prev.map(app => app._id === applicationId ? { ...app, status } : app)
      );
      toast.success(`Applicant ${status}!`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow mb-4">
      <div className="p-4">
        <div className="flex flex-wrap justify-between items-start gap-3">
          <div className="min-w-0">
            <p className="font-semibold text-gray-800">{job.title}</p>
            <p className="text-gray-500 text-sm">{job.company} · {job.location}</p>
            <p className="text-gray-400 text-xs">{job.jobType}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => navigate(`/edit-job/${job._id}`)}
              className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded hover:bg-gray-200">Edit</button>
            <button onClick={() => onDelete(job._id)}
              className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded hover:bg-red-200">Delete</button>
            <button onClick={toggleApplications}
              className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700">
              {open ? "Hide" : "View Applications"}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t px-4 pb-4 pt-3 bg-gray-50 rounded-b-xl">
          {loading ? (
            <p className="text-sm text-gray-500 text-center py-4">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500 text-center py-4">{error}</p>
          ) : applications.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">No applications yet.</p>
          ) : (
            <div className="space-y-3 mt-2">
              {applications.map(app => (
                <div key={app._id} className="bg-white rounded-lg border p-3 flex flex-wrap justify-between items-center gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{app.applicant?.name}</p>
                    <p className="text-gray-500 text-xs">{app.applicant?.email}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusStyle[app.status] || "bg-gray-100 text-gray-600"}`}>
                      {app.status}
                    </span>
                    <button onClick={() => handleStatus(app._id, "shortlisted")}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">✓ Shortlist</button>
                    <button onClick={() => handleStatus(app._id, "rejected")}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">✗ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RecruiterDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, loading } = useSelector((state) => state.job);

  useEffect(() => { dispatch(getAllJobsThunk()); }, []);

  const handleDelete = (id) => {
    confirmToast("Are you sure you want to delete this job?", () => {
      dispatch(deleteJobThunk(id));
      toast.success("Job deleted!");
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Recruiter Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome, {user?.name}</p>
        </div>
        <Link to="/post-job" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium">
          + Post New Job
        </Link>
      </div>

      {loading ? <Loading /> : jobs?.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          No jobs posted yet. <Link to="/post-job" className="text-blue-600 hover:underline">Post one</Link>
        </div>
      ) : (
        jobs?.map(job => <JobRow key={job._id} job={job} onDelete={handleDelete} />)
      )}
    </div>
  );
}
