// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Home,
//   User,
//   Clock,
//   BarChart3,
//   Settings,
//   LogOut,
//   Dumbbell,
//   Sun,
//   Moon,
//   ChevronDown,
// } from "lucide-react";

// type DashboardLayoutProps = {
//   children: React.ReactNode;
//   activePage?: string; // optional: name of the current page for highlighting
// };

// export default function DashboardLayout({ children, activePage }: DashboardLayoutProps) {

//   //----------------------------------------------------------------------For storing the state of the toggle button------------------------------
//     const [darkMode, setDarkMode] = useState(true);

//       // Set from localStorage only on client
//       useEffect(() => {
//         if (typeof window !== "undefined") {
//           const storedTheme = localStorage.getItem("theme");
//           const isDark = storedTheme !== "light"; // default to dark
//           setDarkMode(isDark);
//           document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
//         }
//       }, []);

//       const toggleTheme = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         if (typeof window !== "undefined") {
//           localStorage.setItem("theme", newMode ? "dark" : "light");
//           document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
//         }
//       };

//   ////////////////////////--------------------------------------------------------------------------------------------------------------------------------------//////////////////////

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       router.push("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-dots loading-lg text-orange-500"></span>
//       </div>
//     );
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   const menuItems = [
//     { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard" },
//     { icon: <User size={18} />, label: "Users", href: "/users" },
//     { icon: <Clock size={18} />, label: "Login activity", href: "/loginActivity" },
//     { icon: <BarChart3 size={18} />, label: "Performance", href: "/Performance" },
//     { icon: <Settings size={18} />, label: "Settings", href: "/settings" },
//     { icon: <LogOut size={18} />, label: "Logout", danger: true, onClick: handleLogout },
//   ];

//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//       {/* Main content */}
//       <div
//         className={`drawer-content flex flex-col p-6 min-h-screen transition-all duration-500 ${
//           darkMode ? "bg-black text-white" : "bg-white text-zinc-800"
//         }`}
//       >
//         {/* Mobile drawer toggle button */}
//         <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
//           Open Sidebar
//         </label>

//         {/* Top bar */}
//         <div className="flex justify-end items-center mb-6">
//           <div className="flex items-center gap-4 relative">
//             {/* Theme Toggle Button */}
//                 <button
//                     onClick={toggleTheme}
//                     className={`transition-all duration-300 transform ${
//                       darkMode ? "text-zinc-400" : "text-zinc-500"
//                     } hover:text-orange-500 hover:scale-110`}
//                   >
//                     {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                 </button>


//             {/* Profile dropdown */}
//             <div className="relative">
//               <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
//                 <img src="/profile.jpg" alt="User Avatar" className="w-11 h-11 rounded-full" />
//                 <ChevronDown className="w-4 h-4 text-zinc-400" />
//               </button>

//               {profileOpen && (
//                 <div
//                   className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${
//                     darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
//                   }`}
//                 >
//                   <ul className="text-sm">
//                     <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
//                       Profile
//                     </li>
//                     <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
//                       Settings
//                     </li>
//                     <li
//                       onClick={handleLogout}
//                       className={`px-4 py-2 cursor-pointer text-red-400 ${
//                         darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"
//                       }`}
//                     >
//                       Logout
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <div>{children}</div>
//       </div>

//       {/* Sidebar */}
//       <ul
//         className={`menu p-4 w-80 min-h-full text-lg space-y-2 transition-colors duration-500 ${
//           darkMode ? "text-zinc-400" : "text-zinc-700 bg-zinc-100"
//         }`}
//         style={
//           darkMode
//             ? {
//                 backgroundColor: "#212529",
//                 backgroundImage: `
//                   radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
//                   radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%)`,
//               }
//             : {
//                 backgroundColor: "#f4f4f5",
//                 backgroundImage: `
//                   radial-gradient(at bottom left, rgba(252, 165, 165, 0.25), transparent 70%),
//                   radial-gradient(at top right, rgba(167, 243, 208, 0.25), transparent 70%)`,
//               }
//         }
//       >
//         <div className="flex items-center gap-2 mb-6">
//           <Dumbbell className={`w-9 h-9 ${darkMode ? "text-green-500" : "text-green-600"}`} />
//           <h2 className="text-2xl font-bold">FitTrack</h2>
//         </div>

//         {menuItems.map((item, idx) => (
//           <li key={idx}>
//             {item.onClick ? (
//               <button
//                 onClick={item.onClick}
//                 className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition duration-300 ${
//                   item.danger ? "hover:text-red-400" : "hover:text-orange-400"
//                 } hover:bg-zinc-800`}
//               >
//                 {item.icon} {item.label}
//               </button>
//             ) : (
//               <Link
//                 href={item.href}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${
//                   activePage === item.label
//                     ? "bg-orange-500 text-white"
//                     : "hover:bg-zinc-800 hover:text-orange-400"
//                 }`}
//               >
//                 {item.icon} {item.label}
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }




// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Home,
//   User,
//   Clock,
//   BarChart3,
//   Settings,
//   LogOut,
//   Dumbbell,
//   Sun,
//   Moon,
//   ChevronDown,
// } from "lucide-react";

// type DashboardLayoutProps = {
//   children: React.ReactNode;
//   activePage?: string; // optional: name of the current page for highlighting
// };

// export default function DashboardLayout({ children, activePage }: DashboardLayoutProps) {

//   //----------------------------------------------------------------------For storing the state of the toggle button------------------------------
//     const [darkMode, setDarkMode] = useState(true);

//       // Set from localStorage only on client
//       useEffect(() => {
//         if (typeof window !== "undefined") {
//           const storedTheme = localStorage.getItem("theme");
//           const isDark = storedTheme !== "light"; // default to dark
//           setDarkMode(isDark);
//           document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
//         }
//       }, []);

//       const toggleTheme = () => {
//         const newMode = !darkMode;
//         setDarkMode(newMode);
//         if (typeof window !== "undefined") {
//           localStorage.setItem("theme", newMode ? "dark" : "light");
//           document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
//         }
//       };

//   ////////////////////////--------------------------------------------------------------------------------------------------------------------------------------//////////////////////

//   const [profileOpen, setProfileOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (!user) {
//       router.push("/login");
//     } else {
//       setLoading(false);
//     }
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <span className="loading loading-dots loading-lg text-orange-500"></span>
//       </div>
//     );
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     router.push("/login");
//   };

//   const menuItems = [
//     { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard" },
//     { icon: <User size={18} />, label: "Users", href: "/users" },
//     { icon: <Clock size={18} />, label: "Login activity", href: "/loginActivity" },
//     { icon: <BarChart3 size={18} />, label: "Performance", href: "/Performance" },
//     { icon: <Settings size={18} />, label: "Settings", href: "/settings" },
//     { icon: <LogOut size={18} />, label: "Logout", danger: true, onClick: handleLogout },
//   ];

//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

//       {/* Main content */}
//       <div
//   className={`drawer-content flex flex-col p-6 min-h-screen transition-all duration-500 ${
//     darkMode ? "bg-black text-white" : "bg-white text-gray-900"
//   }`}
//   style={{ backgroundColor: darkMode ? "#000000" : "#ffffff" }}
// >
//         {/* Mobile drawer toggle button */}
//         <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
//           Open Sidebar
//         </label>

//         {/* Top bar */}
//         <div className="flex justify-end items-center mb-6">
//           <div className="flex items-center gap-4 relative">
//             {/* Theme Toggle Button */}
//                 <button
//                     onClick={toggleTheme}
//                     className={`transition-all duration-300 transform ${
//                       darkMode ? "text-zinc-400" : "text-zinc-500"
//                     } hover:text-orange-500 hover:scale-110`}
//                   >
//                     {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//                 </button>


//             {/* Profile dropdown */}
//             <div className="relative">
//               <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
//                 <img src="/profile.jpg" alt="User Avatar" className="w-11 h-11 rounded-full" />
//                 <ChevronDown className="w-4 h-4 text-zinc-400" />
//               </button>

//               {profileOpen && (
//                 <div
//                   className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${
//                     darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
//                   }`}
//                 >
//                   <ul className="text-sm">
//                     <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
//                       Profile
//                     </li>
//                     <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
//                       Settings
//                     </li>
//                     <li
//                       onClick={handleLogout}
//                       className={`px-4 py-2 cursor-pointer text-red-400 ${
//                         darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"
//                       }`}
//                     >
//                       Logout
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Page content */}
//         <div>{children}</div>
//       </div>

//       {/* Sidebar */}
//       <ul
//         className={`menu p-4 w-80 min-h-full text-lg space-y-2 transition-colors duration-500 ${
//           darkMode ? "text-zinc-400" : "text-zinc-700 bg-zinc-100"
//         }`}
//         style={
//           darkMode
//             ? {
//                 backgroundColor: "#212529",
//                 backgroundImage: `
//                   radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
//                   radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%)`,
//               }
//             : {
//                 backgroundColor: "#f4f4f5",
//                 backgroundImage: `
//                   radial-gradient(at bottom left, rgba(252, 165, 165, 0.25), transparent 70%),
//                   radial-gradient(at top right, rgba(167, 243, 208, 0.25), transparent 70%)`,
//               }
//         }
//       >
//         <div className="flex items-center gap-2 mb-6">
//           <Dumbbell className={`w-9 h-9 ${darkMode ? "text-green-500" : "text-green-600"}`} />
//           <h2 className="text-2xl font-bold">FitTrack</h2>
//         </div>

//         {menuItems.map((item, idx) => (
//           <li key={idx}>
//             {item.onClick ? (
//               <button
//                 onClick={item.onClick}
//                 className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition duration-300 ${
//                   item.danger ? "hover:text-red-400" : "hover:text-orange-400"
//                 } hover:bg-zinc-800`}
//               >
//                 {item.icon} {item.label}
//               </button>
//             ) : (
//               <Link
//                 href={item.href}
//                 className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${
//                   activePage === item.label
//                     ? "bg-orange-500 text-white"
//                     : "hover:bg-zinc-800 hover:text-orange-400"
//                 }`}
//               >
//                 {item.icon} {item.label}
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }








"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  User,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Dumbbell,
  Sun,
  Moon,
  ChevronDown,
  Mail,
  Brain,
  SquareActivity
} from "lucide-react";

type DashboardLayoutProps = {
  children: (props: { darkMode: boolean }) => React.ReactNode; // children is a render prop receiving darkMode
  activePage?: string; // optional: name of the current page for highlighting
};

export default function DashboardLayout({ children, activePage }: DashboardLayoutProps) {
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

  ////////////////////////--------------------------------------------------------------------------------------------------------------------------------------//////////////////////

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
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    { icon: <Home size={18} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Mail size={18} />, label: "Inbox", href: "/inbox" },
    { icon: <User size={18} />, label: "Users", href: "/users" },
    { icon: <SquareActivity size={18} />, label: "Exercises", href: "/exercises" },
    { icon: <Clock size={18} />, label: "Login activity", href: "/loginActivity" },
    { icon: <BarChart3 size={18} />, label: "Performance", href: "/Performance" },
    { icon: <Brain size={18} />, label: "AI Suggestions", href: "/aiSuggestions" },
    { icon: <LogOut size={18} />, label: "Logout", danger: true, onClick: handleLogout },
  ];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div
        className={`drawer-content flex flex-col p-6 min-h-screen transition-all duration-500 ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"
          }`}
        style={{ backgroundColor: darkMode ? "#000000" : "#ffffff" }}
      >
        {/* Mobile drawer toggle button */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden mb-4">
          Open Sidebar
        </label>

        {/* Top bar */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex items-center gap-4 relative">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`transition-all duration-300 transform ${darkMode ? "text-zinc-400" : "text-zinc-500"
                } hover:text-orange-500 hover:scale-110`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2">
                <img src="/profile.jpg" alt="User Avatar" className="w-11 h-11 rounded-full" />
                <ChevronDown className="w-4 h-4 text-zinc-400" />
              </button>

              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-zinc-800"
                    }`}
                >
                  <ul className="text-sm">
                    <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
                      Profile
                    </li>
                    <li className={`px-4 py-2 cursor-pointer ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"}`}>
                      Settings
                    </li>
                    <li
                      onClick={handleLogout}
                      className={`px-4 py-2 cursor-pointer text-red-400 ${darkMode ? "hover:bg-zinc-700" : "hover:bg-zinc-200"
                        }`}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        {/* Render children as function and pass darkMode */}
        {children({ darkMode })}
      </div>

      {/* Sidebar */}
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
          <Dumbbell className={`w-9 h-9 ${darkMode ? "text-green-500" : "text-green-600"}`} />
          <h2 className="text-2xl font-bold">FitTrack</h2>
        </div>

        {menuItems.map((item, idx) => (
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
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 ${activePage === item.label
                    ? "bg-orange-500 text-white"
                    : "hover:bg-zinc-800 hover:text-orange-400"
                  }`}
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
