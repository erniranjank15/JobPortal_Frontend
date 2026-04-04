# Job Portal - Frontend Guide

## API Base URL
```
http://localhost:3000/api
```

---

## Auth (Users)

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/users/register` | ❌ | any | Register user |
| POST | `/users/login` | ❌ | any | Login |
| GET | `/users/logout` | ✅ | any | Logout |
| GET | `/users/me` | ✅ | any | Get current user |
| PUT | `/users/update-profile` | ✅ | any | Update name/email |
| PUT | `/users/change-password` | ✅ | any | Change password |
| PATCH | `/users/update-resume` | ✅ | applicant | Update resume |
| DELETE | `/users/delete-user/:id` | ✅ | any | Delete user |
| GET | `/users/all-users` | ✅ | admin | Get all users |

---

## Jobs

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/jobs/create` | ✅ | recruiter | Create job |
| GET | `/jobs/all` | ✅ | any | Get all jobs |
| GET | `/jobs/search?keyword=` | ✅ | any | Search jobs |
| GET | `/jobs/:id` | ✅ | recruiter/admin | Get job by ID |
| PUT | `/jobs/update/:id` | ✅ | recruiter/admin | Update job |
| DELETE | `/jobs/delete/:id` | ✅ | recruiter/admin | Delete job |

---

## Applications

| Method | Endpoint | Auth | Role | Description |
|--------|----------|------|------|-------------|
| POST | `/applications/apply/:jobId` | ✅ | applicant | Apply for job |
| GET | `/applications/my-applications` | ✅ | applicant | My applications |
| GET | `/applications/:jobId` | ✅ | recruiter | Job applications |
| PUT | `/applications/status/:applicationId` | ✅ | recruiter | Update status |

---

## Pages & Components

```
src/
├── pages/
│   ├── Register.jsx        → applicant/recruiter registration
│   ├── Login.jsx           → login form
│   ├── Home.jsx            → landing page
│   ├── Jobs.jsx            → all jobs list + search
│   ├── JobDetails.jsx      → single job + apply button
│   ├── PostJob.jsx         → recruiter: create job
│   ├── EditJob.jsx         → recruiter: edit job
│   ├── Dashboard.jsx       → applicant: my applications
│   └── RecruiterDashboard.jsx → recruiter: job applications
├── components/
│   ├── Navbar.jsx
│   ├── JobCard.jsx
│   ├── ProtectedRoute.jsx
│   └── Loading.jsx
├── features/
│   ├── auth/authSlice.js + authThunk.js
│   ├── job/jobSlice.js + jobThunk.js
│   └── application/applnSlice.js + applnThunk.js
├── API/
│   ├── authAPI.js
│   ├── jobAPI.js
│   └── applicationAPI.js
└── services/axios.js
```

---

## React + Tailwind Code Examples

### Register.jsx
```jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "applicant" });
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (resume) formData.append("resume", resume);
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === "fulfilled") navigate("/login");
    else setError(res.payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Register</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="input" type="password" placeholder="Password (min 10 chars)" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <select className="input" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>
        {form.role === "applicant" && (
          <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} className="text-sm text-gray-500" />
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Register</button>
        <p className="text-center text-sm">Already have an account? <a href="/login" className="text-blue-600">Login</a></p>
      </form>
    </div>
  );
}
```

### Login.jsx
```jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/jobs");
    else setError(res.payload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Login</button>
        <p className="text-center text-sm">No account? <a href="/register" className="text-blue-600">Register</a></p>
      </form>
    </div>
  );
}
```

### Jobs.jsx
```jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsThunk, searchJobThunk } from "../features/job/jobThunk";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector(state => state.job);
  const [keyword, setKeyword] = useState("");

  useEffect(() => { dispatch(getAllJobsThunk()); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) dispatch(searchJobThunk(keyword));
    else dispatch(getAllJobsThunk());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="input flex-1"
          placeholder="Search by title, company, location..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Search</button>
      </form>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs?.map(job => <JobCard key={job._id} job={job} />)}
        </div>
      )}
    </div>
  );
}
```

### JobCard.jsx
```jsx
import { useNavigate } from "react-router-dom";

export default function JobCard({ job }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow p-5 hover:shadow-md transition cursor-pointer" onClick={() => navigate(`/jobs/${job._id}`)}>
      <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
      <p className="text-blue-600 font-medium">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location} · {job.jobType}</p>
      <p className="text-gray-500 text-sm">💰 {job.salary}</p>
      <div className="flex flex-wrap gap-1 mt-2">
        {job.skills?.map(skill => (
          <span key={skill} className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{skill}</span>
        ))}
      </div>
    </div>
  );
}
```

### JobDetails.jsx
```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getJobByIdThunk } from "../features/job/jobThunk";
import { applyForJobThunk } from "../features/application/applnThunk";

export default function JobDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentJob } = useSelector(state => state.job);
  const { user } = useSelector(state => state.auth);

  useEffect(() => { dispatch(getJobByIdThunk(id)); }, [id]);

  const handleApply = () => dispatch(applyForJobThunk({ jobId: id }));

  if (!currentJob) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{currentJob.title}</h1>
        <p className="text-blue-600 font-semibold text-lg">{currentJob.company}</p>
        <div className="flex gap-4 text-gray-500 text-sm">
          <span>📍 {currentJob.location}</span>
          <span>💼 {currentJob.jobType}</span>
          <span>💰 {currentJob.salary}</span>
        </div>
        <p className="text-gray-700">{currentJob.description}</p>
        <div className="flex flex-wrap gap-2">
          {currentJob.skills?.map(skill => (
            <span key={skill} className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">{skill}</span>
          ))}
        </div>
        {user?.role === "applicant" && (
          <button onClick={handleApply} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
```

### PostJob.jsx (Recruiter)
```jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createJobThunk } from "../features/job/jobThunk";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", company: "", location: "", jobType: "Full-time", skills: "", salary: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(createJobThunk(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/recruiter-dashboard");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-2xl font-bold text-blue-600">Post a Job</h2>
        {["title", "company", "location", "salary"].map(field => (
          <input key={field} className="input" placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} />
        ))}
        <textarea className="input h-28 resize-none" placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <input className="input" placeholder="Skills (comma separated)" value={form.skills} onChange={e => setForm({...form, skills: e.target.value})} />
        <select className="input" value={form.jobType} onChange={e => setForm({...form, jobType: e.target.value})}>
          {["Full-time", "Part-time", "Contract", "Internship"].map(t => <option key={t}>{t}</option>)}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Post Job</button>
      </form>
    </div>
  );
}
```

### Dashboard.jsx (Applicant - My Applications)
```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyApplicationsThunk } from "../features/application/applnThunk";

const statusColor = { pending: "bg-yellow-100 text-yellow-700", shortlisted: "bg-green-100 text-green-700", rejected: "bg-red-100 text-red-700" };

export default function Dashboard() {
  const dispatch = useDispatch();
  const { applications } = useSelector(state => state.application);

  useEffect(() => { dispatch(getMyApplicationsThunk()); }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Applications</h2>
      {applications?.length === 0 ? (
        <p className="text-gray-500">No applications yet.</p>
      ) : (
        <div className="space-y-4">
          {applications?.map(app => (
            <div key={app._id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{app.job?.title}</p>
                <p className="text-gray-500 text-sm">{app.job?.company} · {app.job?.location}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[app.status]}`}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### RecruiterDashboard.jsx
```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplicationsForJobThunk, updateApplicationStatusThunk } from "../features/application/applnThunk";

export default function RecruiterDashboard() {
  const dispatch = useDispatch();
  const { applications } = useSelector(state => state.application);
  const { currentJob } = useSelector(state => state.job);

  useEffect(() => {
    if (currentJob?._id) dispatch(getApplicationsForJobThunk(currentJob._id));
  }, [currentJob]);

  const updateStatus = (applicationId, status) => {
    dispatch(updateApplicationStatusThunk({ applicationId, status }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Applications</h2>
      <div className="space-y-4">
        {applications?.map(app => (
          <div key={app._id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{app.applicant?.name}</p>
              <p className="text-gray-500 text-sm">{app.applicant?.email}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => updateStatus(app._id, "shortlisted")} className="bg-green-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-green-600">Shortlist</button>
              <button onClick={() => updateStatus(app._id, "rejected")} className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### ProtectedRoute.jsx
```jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useSelector(state => state.auth);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}
```

### App.jsx (Routes)
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";
import Dashboard from "./pages/Dashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/jobs/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute roles={["recruiter"]}><PostJob /></ProtectedRoute>} />
        <Route path="/edit-job/:id" element={<ProtectedRoute roles={["recruiter"]}><EditJob /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute roles={["applicant"]}><Dashboard /></ProtectedRoute>} />
        <Route path="/recruiter-dashboard" element={<ProtectedRoute roles={["recruiter"]}><RecruiterDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Tailwind Reusable Class

Add this to your `index.css` for the `input` class used above:

```css
@layer components {
  .input {
    @apply w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500;
  }
}
```

---

## Redux State Shape

```js
// auth slice
{ user: null, loading: false, error: null }

// job slice
{ jobs: [], currentJob: null, loading: false, error: null }

// application slice
{ applications: [], loading: false, error: null }
```

---

## Notes

- Token is stored in **httpOnly cookie** — no need to manually attach it, axios `withCredentials: true` handles it
- `applicant` role requires resume upload on register (PDF/DOC)
- Only **one admin** can be registered
- Search uses `?keyword=` query param
