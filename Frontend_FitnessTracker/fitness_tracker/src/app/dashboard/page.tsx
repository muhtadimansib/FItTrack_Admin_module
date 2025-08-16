"use client";
import dynamic from "next/dynamic";
import React from "react";
import {
  Home,
  User,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Mail,
} from "lucide-react"; //For sidebar menu
import { Users, ClipboardList, Dumbbell, Apple, Brain, SquareActivity } from "lucide-react"; // For top stats
import { MessageCircle, UserPlus, Bell, AlertCircle, FileWarning } from "lucide-react"; //For notifications
import { Moon, Sun, ChevronDown } from "lucide-react"; //Toogle for theme
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Lottie from "lottie-react";
import usersAnimation from "@/../public/lottie/users.json";
import workoutPlansAnimation from "@/../public/lottie/workoutPlans.json";
import pushUpAnimation from "@/../public/lottie/pushUp.json";
import nutritionAnimation from "@/../public/lottie/Nutrition.json";


interface DashboardData {
  message: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
  unreadMessages: number;
  totalClients: number,
  totalTrainers: number,
  totalNutritionists: number,
  totalUsers: number;
  pendingRequests: number;
  latestUsersCount: number;
  latestUsers: {
    name: string;
    email: string;
    createdAt: string;
    role: string;
  }[];
  totalWorkoutPlans: number;
  totalExercises: number;
  totalNutritionEntries: number;
  totalOpenReports: number;
}

type Exercise = {
  name: string;
  category: string;
  equipment: string;
  date: string;
};

const fallbackExercises: Exercise[] = [
  {
    name: "Jumping Jacks",
    category: "Cardio",
    equipment: "None",
    date: "06/10/2025",
  },
  {
    name: "Lunges",
    category: "Legs",
    equipment: "None",
    date: "06/09/2025",
  },
  {
    name: "Shoulder Press",
    category: "Shoulders",
    equipment: "Dumbbell",
    date: "06/08/2025",
  },
  {
    name: "Russian Twist",
    category: "Core",
    equipment: "Medicine Ball",
    date: "06/07/2025",
  },
];


type ReportType = {
  id: number;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  user: {
    UserId: number;
    UName: string;
    Email: string;
    Password: string;
    Role: 'Trainer' | 'Nutritionist';
    Certification: string;
    Specialization: string;
    ExperienceYears: number;
    Bio: string;
    SubmittedAt: string;
    ApprovedAt: string;
    ProfileImageUrl: string;
  };
};

interface PendingUser {
  UserId: number;
  UName: string;
  Email: string;
  RoleRequested: 'Trainer' | 'Nutritionist';
  Certification: string;
  Specialization: string;
  ExperienceYears: number;
  Bio: string;
  SubmittedAt: string;
  ProfileImageUrl: string;
  Status: 'Pending' | 'Approved' | 'Rejected';
}

const Charts = dynamic(() => import("./components/Charts"), { ssr: false });


export default function Dashboard() {

  /////////////////-------------------------Fetching Latest Report--------------/////////////////////////
  const [report, setReport] = useState<ReportType | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/admin/latestOpenReport`);
        const data: ReportType = await response.json();
        setReport(data);
      } catch (error) {
        console.error('Failed to fetch report:', error);
      }
    };

    fetchReport();
  }, []);

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const profileImageUrl = "https://i.postimg.cc/Pr1jQ1Hf/download.jpg";

  const closeModals = () => {
    setShowReportModal(false);
    setShowApprovalModal(false);
  };

  /////////////////-------------------------Fetching Latest pending user for notification bar--------------/////////////////////////

  const [pendingUser, setPendingUser] = useState<PendingUser | null>(null);
  useEffect(() => {
    const fetchLatestPendingUser = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/admin/latestPendingUser`);
        const data: PendingUser = await response.json();
        if (data?.Status === "Pending") {
          setPendingUser(data);
        }
      } catch (error) {
        console.error("Failed to fetch pending user:", error);
      }
    };

    fetchLatestPendingUser();
  }, []);


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////-------------------------Fetching Dashboard Data---------------------------------------///////////////////////////
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = userStr ? JSON.parse(userStr).Login_token : null;
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiBase}/admin/dashboard`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        console.log("Dashboard data fetched:", data);
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////-------------------------Fetching Recent Exercises---------------------------------------///////////////////////////
  const [recentExercises, setRecentExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${apiBase}/admin/latest-exercises`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((ex: any) => ({
          name: ex.name,
          category: ex.muscleGroup,
          equipment: ex.equipment,
          date: new Date(ex.createdAt).toLocaleDateString(), // formats to MM/DD/YYYY
        }));
        setRecentExercises(formatted);
      })
      .catch((err) => console.error("Failed to fetch exercises", err));
  }, []);


  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const stats = [
  {
    label: "Users",
    value: dashboardData?.totalUsers || 0,
    icon: (
      <Lottie
        animationData={usersAnimation}
        className="w-10 h-10"
        loop={true}
      />
    ),
  },
  {
    label: "Workout Plans",
    value: dashboardData?.totalWorkoutPlans || 0,
    icon: (
      <Lottie
        animationData={workoutPlansAnimation}
        className="w-16 h-16"
        loop={true}
      />
    ),
  },
  {
    label: "Exercises",
    value: dashboardData?.totalExercises || 0,
    icon: (
      <Lottie
        animationData={pushUpAnimation}
        className="w-16 h-16"
        loop={true}
      />
    ),
  },
  {
    label: "Nutrition Entries",
    value: dashboardData?.totalNutritionEntries || 0,
    icon: (
      <Lottie
        animationData={nutritionAnimation}
        className="w-16 h-16"
        loop={true}
      />
    ),
  },
];

  console.log("Rendering with dashboardData:", dashboardData);

  //const [darkMode, setDarkMode] = useState(true);
  //----------------------------------------------------------------------For storing the state of the toggle button------------------------------
  const [darkMode, setDarkMode] = useState(true);

  // Set from localStorage only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      const isDark = storedTheme !== "light"; // default to dark
      setDarkMode(isDark);
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-lg text-orange-500"></span>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove session
    router.push("/login"); // Redirect to login
  };



  return (

    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div
        className={`drawer-content flex flex-col p-6 min-h-screen transition-all duration-500 animate-fadeIn ${darkMode ? "bg-black text-white" : "bg-white text-zinc-800"
          }`}
      >
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open Sidebar
        </label>



        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold animate-slideIn">Good Morning!!</h1>

          {/* Right Corner: Theme Toggle & User Profile */}
          <div className="flex items-center gap-4 relative">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`transition-all duration-300 transform ${darkMode ? "text-zinc-400" : "text-zinc-500"
                } hover:text-orange-500 hover:scale-110`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>


            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src="/profile.jpg"
                  alt="User Avatar"
                  className="w-11 h-11"
                />
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {profileOpen && (
                <div className={`absolute right-0 mt-2 w-40 text-white rounded-md shadow-lg z-50" ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
                  }`}>
                  <ul className="text-sm">
                    <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>Profile</li>
                    <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>Settings</li>
                    <li className={`px-4 py-2 cursor-pointer text-red-400 ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>Logout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>



        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl p-4 shadow-md transition-transform hover:scale-105 duration-300 flex items-center gap-4 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
                }`}
            >
              {stat.icon}
              <div>
                <p className="text-xl font-semibold">{stat.value}</p>
                <p className="text-sm text-zinc-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Charts */}
        {/*<Charts darkMode={darkMode} />*/}
        <Charts
          darkMode={darkMode}
          totalClients={dashboardData?.totalClients ?? 0}
          totalTrainers={dashboardData?.totalTrainers ?? 0}
          totalNutritionists={dashboardData?.totalNutritionists ?? 0}
          totalUsers={dashboardData?.totalUsers ?? 0}
        />
        {/* Recent Exercises */}
        <div
          className={`rounded-2xl p-4 shadow-md mt-6 animate-fadeIn ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
            }`}
        >
          <h2 className="text-lg font-semibold mb-2">Recent Exercises</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-zinc-400 text-sm">
                <th>Name</th>
                <th>Muscle Group</th>
                <th>Equipment</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
              {recentExercises.map((ex, idx) => (
                <tr
                  key={idx}
                  className={`border-t text-sm ${darkMode ? "border-zinc-700" : "border-zinc-200"
                    }`}
                >
                  <td>{ex.name}</td>
                  <td>{ex.category}</td>
                  <td>{ex.equipment}</td>
                  <td>{ex.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Side Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className={`rounded-2xl p-4 text-center shadow-md relative hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-2 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
            }`}>
            <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full"></span>
            <MessageCircle className="w-8 h-8 text-green-400" />
            <p className="text-lg font-semibold">+{dashboardData?.unreadMessages ?? 1}</p>
            <p className="text-sm text-zinc-400">Messages</p>
          </div>
          <div className={`rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-1 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
            }`}>
            <UserPlus className="w-8 h-8 text-orange-400" />
            <p className="text-lg font-semibold">{dashboardData?.latestUsersCount ?? 10}</p>
            <p className="text-sm text-zinc-400">New Users</p>
          </div>
          <div className={`rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-1 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
            }`}>
            <Bell className="w-8 h-8 text-blue-400" />
            <p className="text-lg font-semibold">{dashboardData?.pendingRequests ?? 10}</p>
            <p className="text-sm text-zinc-400">Pending Requests</p>
          </div>
          <div className={`rounded-2xl p-4 text-center shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-center gap-1 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
            }`}>
            <AlertCircle className="w-8 h-8 text-orange-400" />
            <p className="text-lg font-semibold">{dashboardData?.totalOpenReports ?? 10}</p>
            <p className="text-sm text-zinc-400">Reported Contents</p>
          </div>
        </div>


        {/* Notifications */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className={`rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300 ${darkMode ? "bg-red-900 text-zinc-400" : "bg-red-100 text-zinc-500"}`}>
            <p>An issue has been reported</p>
            <button className="mt-2 px-4 py-1 border rounded border-white hover:bg-white hover:text-black transition duration-300">See</button>
          </div>
          <div className={` rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300 ${darkMode ? "bg-orange-800 text-zinc-400" : "bg-orange-100 text-zinc-500"}`}>
            <p>A user wants approval</p>
            <button className="mt-2 px-4 py-1 border rounded border-white hover:bg-white hover:text-black transition duration-300">See</button>
          </div>
        </div> */}

        {/* Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Report Notification */}
          <div
            className={`rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300 ${darkMode ? 'bg-red-900 text-zinc-400' : 'bg-red-100 text-zinc-500'
              }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={report?.user?.ProfileImageUrl}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-base">{report?.user?.UName
              }</span>
            </div>
            <p>An issue has been reported</p>
            <button
              onClick={() => setShowReportModal(true)}
              className="mt-2 px-4 py-1 border rounded border-white hover:bg-white hover:text-black transition duration-300"
            >
              See
            </button>
          </div>

          {/* Approval Notification */}
          <div
            className={`rounded-2xl p-4 shadow-md hover:scale-105 transition-transform duration-300 ${darkMode ? 'bg-orange-800 text-zinc-400' : 'bg-orange-100 text-zinc-500'
              }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={pendingUser?.ProfileImageUrl || "https://via.placeholder.com/40"}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium text-base">{pendingUser?.UName}</span>
            </div>
            <p>A user wants approval</p>
            <button
              onClick={() => setShowApprovalModal(true)}
              className="mt-2 px-4 py-1 border rounded border-white hover:bg-white hover:text-black transition duration-300"
            >
              See
            </button>
          </div>
        </div>

        {/* Report Modal */}
        {showReportModal && report && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
            <div
              className={`w-11/12 max-w-2xl p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
                }`}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                  <FileWarning className="text-red-600 dark:text-red-400 w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{report.user.UName}</h2>
                  <p className="text-sm text-zinc-400 dark:text-zinc-500 mb-1">
                    {report.user.Email}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Reported on {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-2">Subject</h3>
                <p className="mb-6">{report.subject}</p>
              </div>

              {/* Detailed Description */}
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-2">Details</h3>
                <p className="mb-6">{report.message}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModals}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}


        {/* Approval Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
            <div
              style={{ fontFamily: '"Segoe UI", sans-serif' }}
              className={`w-11/12 max-w-4xl p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
                }`}
            >
              {/* Header Section */}
              <div className="flex items-center gap-4 border-b pb-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-zinc-300 dark:bg-zinc-600 overflow-hidden flex items-center justify-center text-2xl font-semibold text-white">
                  {profileImageUrl ? (
                    <img
                      src={pendingUser?.ProfileImageUrl || "https://via.placeholder.com/60"}
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "JS"
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-1">Pending User Review</h2>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>
                    Review the applicant’s details and take appropriate action.
                  </p>
                </div>
              </div>

              {/* User Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base font-semibold mb-1">Full Name</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.UName}</p>
                </div>
                <div >
                  <h3 className="text-base font-semibold mb-1">Email</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.Email}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Requested Role</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.RoleRequested}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Submitted On</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.SubmittedAt}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Certification</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.Certification}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Specialization</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.Specialization}</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1">Experience</h3>
                  <p className={darkMode ? "text-zinc-400" : "text-black"}>{pendingUser?.ExperienceYears}</p>
                </div>
              </div>


              {/* Bio Section */}
              <div className="mt-6">
                <h3 className="text-base font-semibold mb-1">Bio</h3>
                <p className={darkMode ? "text-zinc-400" : "text-black"}>
                  {pendingUser?.Bio}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex justify-end gap-3">
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-300">
                  Approve
                </button>
                <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300">
                  Reject
                </button>
                <button
                  onClick={closeModals}
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}






      </div>

      {/* Drawer Sidebar */}
      {/* <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul
          className="menu p-4 w-80 min-h-full text-white text-md space-y-2 relative overflow-hidden bg-[#212529] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-24 after:bg-[radial-gradient(circle_at_bottom_left,_rgba(34,197,94,0.15)_0%,_transparent_70%),_radial-gradient(circle_at_bottom_right,_rgba(239,68,68,0.15)_0%,_transparent_70%)] after:pointer-events-none"
        >
          <div className="flex items-center gap-2 mb-6">
            <Dumbbell className="text-green-500 w-8 h-8" />
            <h2 className="text-2xl font-bold">FitTrack</h2>
          </div>

          {[
            { icon: <Home size={18} />, label: "Dashboard", active: true },
            { icon: <User size={18} />, label: "Users" },
            { icon: <Clock size={18} />, label: "Login activity" },
            { icon: <BarChart3 size={18} />, label: "Performance" },
            { icon: <Settings size={18} />, label: "Settings" },
            { icon: <LogOut size={18} />, label: "Logout", danger: true },
          ].map((item, idx) => (
            <li key={idx}>
              <a
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${
                  item.active
                    ? "bg-orange-500 text-white"
                    : "hover:bg-zinc-800 hover:text-orange-400"
                } ${item.danger ? "hover:text-red-400" : ""}`}
              >
                {item.icon} {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div> */}




      {/* Drawer Sidebar */}
      <ul
        className={`menu p-4 w-80 min-h-full text-lg space-y-2 transition-colors duration-500 ${darkMode ? "text-zinc-400" : "text-zinc-700 bg-zinc-100"
          }`}
        style={
          darkMode
            ? {
              backgroundColor: "#212529",
              backgroundImage: `
            radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
            radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%)`,
            }
            : {
              backgroundColor: "#f4f4f5",
              backgroundImage: `
            radial-gradient(at bottom left, rgba(252, 165, 165, 0.25), transparent 70%),
            radial-gradient(at top right, rgba(167, 243, 208, 0.25), transparent 70%)`,
            }
        }
      >
        <div className="flex items-center gap-2 mb-6">
          <Dumbbell
            className={`w-9 h-9 ${darkMode ? "text-green-500" : "text-green-600"}`}
          />
          <h2 className="text-2xl font-bold">FitTrack</h2>
        </div>

        {[
          { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard", active: true },
          { icon: <Mail size={18} />, label: "Inbox", href: "/inbox" },
          { icon: <User size={18} />, label: "Users", href: "/users" },
          { icon: <SquareActivity size={18} />, label: "Exercises", href: "/exercises" },
          { icon: <Clock size={18} />, label: "Login activity", href: "/loginActivity" },
          { icon: <BarChart3 size={18} />, label: "Performance", href: "/Performance" },
          { icon: <Brain size={18} />, label: "AI Suggestions", href: "/aiSuggestions" },
          { icon: <LogOut size={18} />, label: "Logout", danger: true, onClick: handleLogout },

        ].map((item, idx) => (
          <li key={idx}>
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition duration-300 ${item.danger ? "hover:text-red-400" : "hover:text-orange-400"
                  } hover:bg-zinc-800`}
              >
                {item.icon} {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${item.active
                    ? "bg-orange-500 text-white"
                    : "hover:bg-zinc-800 hover:text-orange-400"
                  } ${item.danger ? "hover:text-red-400" : ""}`}
              >
                {item.icon} {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>



    </div>
  );
}