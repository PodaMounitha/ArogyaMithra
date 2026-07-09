import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaFileMedical,
  FaUsers,
  FaShieldAlt,
  FaLink,
  FaUpload,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import StatCard from "../components/StatCard";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    records: 0,
    doctors: 0,
    patients: 0,
    access: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-100 via-blue-50 to-indigo-100">

      <aside className="w-72 min-h-screen bg-gradient-to-b from-cyan-600 via-sky-600 to-blue-700 text-white shadow-2xl flex flex-col">

        <div className="py-8 text-center border-b border-cyan-400">
          <h1 className="text-3xl font-bold">🏥 Arogya Mithra</h1>
          <p className="mt-2 text-cyan-100">
            Blockchain EHR Platform
          </p>
        </div>

        <div className="flex-1 px-5 py-8 space-y-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="w-full flex items-center gap-4 bg-white text-cyan-700 rounded-xl px-5 py-3 font-semibold shadow-lg"
          >
            <FaUserMd size={20} />
            Dashboard
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="w-full flex items-center gap-4 hover:bg-cyan-500 rounded-xl px-5 py-3 transition duration-300"
          >
            <FaUpload size={20} />
            Upload Record
          </button>

          <button
            onClick={() => navigate("/records")}
            className="w-full flex items-center gap-4 hover:bg-cyan-500 rounded-xl px-5 py-3 transition duration-300"
          >
            <FaFileMedical size={20} />
            My Records
          </button>

          <button
            onClick={() => navigate("/verify/1")}
            className="w-full flex items-center gap-4 hover:bg-cyan-500 rounded-xl px-5 py-3 transition duration-300"
          >
            <FaLink size={20} />
            Blockchain
          </button>

          <button
            onClick={() => navigate("/audit")}
            className="w-full flex items-center gap-4 hover:bg-cyan-500 rounded-xl px-5 py-3 transition duration-300"
          >
            <FaHistory size={20} />
            Audit Logs
          </button>

          <button
            onClick={() => navigate("/access")}
            className="w-full flex items-center gap-4 hover:bg-cyan-500 rounded-xl px-5 py-3 transition duration-300"
          >
            <FaShieldAlt size={20} />
            Manage Access
          </button>

        </div>

        <div className="p-5">

          <button
            onClick={logout}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-3 shadow-lg transition"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 p-10 overflow-y-auto">

        <div className="rounded-3xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 shadow-2xl p-8 text-white">

          <h1 className="text-4xl font-bold">
            Welcome, {localStorage.getItem("name")}
          </h1>

          <p className="mt-3 text-cyan-100 text-lg">
            Secure Blockchain Electronic Health Record Management System
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-10">

          <StatCard
            title="Medical Records"
            value={stats.records}
            color="bg-cyan-500"
            icon={<FaFileMedical size={28} />}
          />

          <StatCard
            title="Doctors"
            value={stats.doctors}
            color="bg-emerald-500"
            icon={<FaUserMd size={28} />}
          />

          <StatCard
            title="Patients"
            value={stats.patients}
            color="bg-violet-500"
            icon={<FaUsers size={28} />}
          />

          <StatCard
            title="Access Granted"
            value={stats.access}
            color="bg-pink-500"
            icon={<FaShieldAlt size={28} />}
          />

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          {/* Blockchain Card */}

          <div className="bg-white rounded-3xl shadow-xl border border-cyan-200 p-8">

            <h2 className="text-2xl font-bold text-black mb-8">
                🔗 Blockchain Status
            </h2>

            <div className="space-y-6">

              <div className="flex justify-between items-center">

                <span className="text-slate-700 font-semibold text-lg">
                  Status
                </span>

                <span className="text-emerald-600 font-bold text-lg">
                  ● Connected
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-slate-700 font-semibold text-lg">
                  Network
                </span>

                <span className="text-blue-700 font-bold text-lg">
                  Ethereum Tester
                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-slate-700 font-semibold text-lg">
                  Smart Contract
                </span>

                <span className="text-cyan-600 font-bold text-lg">
                  Active
                </span>

              </div>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl shadow-xl border border-cyan-200 p-8">

            <h2 className="text-2xl font-bold text-cyan-700 mb-8">

              ⚡ Quick Actions

            </h2>

            <div className="grid grid-cols-2 gap-5">

              <button
                onClick={() => navigate("/upload")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl py-5 shadow-lg transition"
              >
                Upload Record
              </button>

              <button
                onClick={() => navigate("/records")}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl py-5 shadow-lg transition"
              >
                View Records
              </button>

              <button
                onClick={() => navigate("/verify/2")}
                className="bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl py-5 shadow-lg transition"
              >
                Verify Record
              </button>

              <button
                onClick={() => navigate("/access")}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl py-5 shadow-lg transition"
              >
                Manage Access
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;