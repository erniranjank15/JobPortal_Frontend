import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-blue-600 text-white py-16 md:py-24 px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p className="text-base md:text-lg text-blue-100 mb-8 max-w-xl mx-auto">
          Thousands of jobs from top companies. Apply in one click.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/jobs" className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50">
            Browse Jobs
          </Link>
          {!user && (
            <Link to="/register" className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {[
          { icon: "🔍", title: "Search Jobs", desc: "Search by title, company, location or skills" },
          { icon: "📄", title: "Easy Apply", desc: "Apply with your uploaded resume in one click" },
          { icon: "📊", title: "Track Status", desc: "Track your application status in real time" },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!user && (
        <div className="bg-blue-50 py-12 text-center px-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Ready to get started?</h2>
          <p className="text-gray-500 mb-6 text-sm md:text-base">Join as an applicant or post jobs as a recruiter.</p>
          <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
            Create Account
          </Link>
        </div>
      )}
    </div>
  );
}
