import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, changeUserPassword, updateUserResume, deleteUserById } from "../features/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmToast } from "../components/ConfirmToast";

const inputClass = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [profileForm, setProfileForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "" });
  const [resume, setResume] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const res = await dispatch(updateUserProfile(profileForm));
    if (res.meta.requestStatus === "fulfilled") toast.success("Profile updated!");
    else toast.error(res.payload || "Update failed");
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const res = await dispatch(changeUserPassword(passwordForm));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password changed!");
      setPasswordForm({ oldPassword: "", newPassword: "" });
    } else toast.error(res.payload || "Failed to change password");
  };

  const handleResumeUpdate = async (e) => {
    e.preventDefault();
    if (!resume) return;
    const formData = new FormData();
    formData.append("resume", resume);
    const res = await dispatch(updateUserResume(formData));
    if (res.meta.requestStatus === "fulfilled") toast.success("Resume updated!");
    else toast.error(res.payload || "Resume update failed");
  };

  const handleDelete = () => {
    confirmToast("Are you sure you want to delete your account? This cannot be undone.", async () => {
      const res = await dispatch(deleteUserById(user._id));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Account deleted");
        navigate("/");
      } else toast.error(res.payload || "Delete failed");
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-8 space-y-5">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex flex-wrap items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shrink-0">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 truncate">{user?.name}</p>
            <p className="text-gray-500 text-sm truncate">{user?.email}</p>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full capitalize">{user?.role}</span>
          </div>
          {user?.resume && (
            <a href={user.resume} target="_blank" rel="noreferrer"
              className="text-sm text-blue-600 hover:underline">View Resume</a>
          )}
        </div>
        <form onSubmit={handleProfileUpdate} className="space-y-3">
          <h3 className="font-semibold text-gray-700">Edit Profile</h3>
          <input className={inputClass} placeholder="Full Name" value={profileForm.name}
            onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} required />
          <input className={inputClass} type="email" placeholder="Email" value={profileForm.email}
            onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} required />
          <button type="submit" disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50">
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow p-5">
        <form onSubmit={handlePasswordChange} className="space-y-3">
          <h3 className="font-semibold text-gray-700">Change Password</h3>
          <input className={inputClass} type="password" placeholder="Current Password"
            value={passwordForm.oldPassword}
            onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} required />
          <input className={inputClass} type="password" placeholder="New Password (min 10 chars)"
            value={passwordForm.newPassword}
            onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required />
          <button type="submit" disabled={loading}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Update Resume */}
      {user?.role === "applicant" && (
        <div className="bg-white rounded-xl shadow p-5">
          <form onSubmit={handleResumeUpdate} className="space-y-3">
            <h3 className="font-semibold text-gray-700">Update Resume</h3>
            <input type="file" accept=".pdf,.doc,.docx"
              onChange={e => setResume(e.target.files[0])}
              className="text-sm text-gray-500 w-full" required />
            <button type="submit" disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50">
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>
      )}

      {/* Danger Zone */}
      <div className="bg-white rounded-xl shadow p-5 border border-red-100">
        <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
        <p className="text-gray-500 text-sm mb-4">Deleting your account is permanent and cannot be undone.</p>
        <button onClick={handleDelete}
          className="w-full sm:w-auto bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 text-sm">
          Delete Account
        </button>
      </div>
    </div>
  );
}
