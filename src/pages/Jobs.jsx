<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsThunk, searchJobThunk } from "../features/job/jobThunk";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

export default function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.job);
  const [keyword, setKeyword] = useState("");

  useEffect(() => { dispatch(getAllJobsThunk()); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) dispatch(searchJobThunk(keyword));
    else dispatch(getAllJobsThunk());
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(getAllJobsThunk());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Jobs</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by title, company, location..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm">Search</button>
        {keyword && (
          <button type="button" onClick={handleClear} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm">Clear</button>
        )}
      </form>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs?.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs?.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
}
=======
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsThunk, searchJobThunk } from "../features/job/jobThunk";
import JobCard from "../components/JobCard";
import Loading from "../components/Loading";

export default function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.job);
  const [keyword, setKeyword] = useState("");

  useEffect(() => { dispatch(getAllJobsThunk()); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) dispatch(searchJobThunk(keyword));
    else dispatch(getAllJobsThunk());
  };

  const handleClear = () => {
    setKeyword("");
    dispatch(getAllJobsThunk());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Jobs</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search by title, company, location..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm">Search</button>
        {keyword && (
          <button type="button" onClick={handleClear} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm">Clear</button>
        )}
      </form>

      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs?.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs?.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
}
>>>>>>> 1f3bf29 (updated)
