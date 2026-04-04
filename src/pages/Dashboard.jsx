import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplicationsThunk } from "../features/application/applnThunk";
import { fetchCurrentUser } from "../features/auth/authThunk";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

const statusStyle = {
  pending: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { applications, loading, error } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(getMyApplicationsThunk());
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 mb-6 flex flex-wrap items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shrink-0">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 truncate">{user?.name}</h2>
          <p className="text-gray-500 text-sm truncate">{user?.email}</p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
        </div>
        {user?.resume && (
          <a href={user.resume} target="_blank" rel="noreferrer"
            className="text-sm text-blue-600 hover:underline whitespace-nowrap">View Resume</a>
        )}
      </div>

      {/* Applications Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">My Applications</h3>
        <Link to="/jobs" className="text-sm text-blue-600 hover:underline">Browse Jobs →</Link>
      </div>

      {loading ? <Loading /> : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : applications?.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
          <p className="text-4xl mb-3">📋</p>
          <p>No applications yet. <Link to="/jobs" className="text-blue-600 hover:underline">Browse jobs</Link></p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications?.map(app => (
            <div key={app._id} className="bg-white rounded-xl shadow p-4 flex flex-wrap justify-between items-start gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 truncate">{app.job?.title || "Job"}</p>
                <p className="text-gray-500 text-sm">{app.job?.company} · {app.job?.location}</p>
                <p className="text-gray-400 text-xs mt-1">{new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize shrink-0 ${statusStyle[app.status] || "bg-gray-100 text-gray-600"}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
