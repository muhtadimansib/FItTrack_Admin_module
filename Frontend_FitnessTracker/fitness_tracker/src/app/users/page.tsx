'use client'
import CommonLayout from "../layouts/commonLayout";
import Image from "next/image";
import { useState, useEffect } from "react";
import { fetchClients } from "@/app/users/api";
import { fetchTrainers } from "@/app/users/api";
import { fetchNutritionists } from "@/app/users/api";
import { fetchPendingUsers } from "@/app/users/api";


// Mock user data (with roles)
const roles = ["Client", "Trainer", "Nutritionist", "Pending Users"];
const users = Array.from({ length: 30 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  signup: `0${(i % 9) + 1}/0${(i % 12) + 1}/2023`,
  image: `/images/user${(i % 6) + 1}.jpg`,
  role: roles[i % roles.length], // Assign roles in cycle
}));





export default function UsersPage() {
  ///-----------------------------------------------------------Search an user----------------------------------------------////////////////////////////

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = async () => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    try {
      setIsSearching(true);
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/admin/search-users?query=${encodeURIComponent(trimmed)}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      alert("Search failed.");
    }
  };




  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  interface UserItem {
  name: string;
  email: string;
  signup: string; // formatted date or "N/A"
  image: string;  // resolved image URL
  role: "Client" | "Trainer" | "Nutritionist" | "Pending Users" | string;

  // Add these fields so TS doesn’t complain during mapping:
  profileImageUrl?: string; 
  createdAt?: string; // ISO date string from backend
}
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [selectedRole, setSelectedRole] = useState("Client");

  //---------------------------------------Use Effect for loading the users according to the dropdown selected role-------------------------------------
  useEffect(() => {
    const loadUsers = async () => {
      setAnimateRows(false); // Reset animation
      try {
        if (selectedRole === "Client") {
          const data = await fetchClients();
          setAllUsers(
            data.map((client) => ({
              ...client,
              name: client.name,
              email: client.email,
              signup: client.createdAt?.split("T")[0] || "N/A",
              image: client.profileImageUrl || "/images/default.jpg",
              role: "Client",
            }))
          );
        } else if (selectedRole === "Trainer") {
          const data = await fetchTrainers();
          setAllUsers(
            data.map((trainer) => ({
              ...trainer,
              name: trainer.name,
              email: trainer.email,
              signup: trainer.createdAt?.split("T")[0] || "N/A",
              image: trainer.profileImageUrl || "/images/default.jpg",
              role: "Trainer",
            }))
          );
        } else if (selectedRole === "Nutritionist") {
          const data = await fetchNutritionists();
          setAllUsers(
            data.map((nutri) => ({
              ...nutri,
              name: nutri.name,
              email: nutri.email,
              signup: nutri.createdAt?.split("T")[0] || "N/A",
              image: nutri.profileImageUrl || "/images/default.jpg",
              role: "Nutritionist",
            }))
          );
        } else if (selectedRole === "Pending Users") {
          const data = await fetchPendingUsers();
          setAllUsers(
            data.map((user) => ({
              ...user,
              name: user.UName,
              email: user.Email,
              signup: user.SubmittedAt?.split("T")[0] || "N/A",
              image: "/images/default.jpg",
              role: user.RoleRequested,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setTimeout(() => setAnimateRows(true), 100); // Re-enable animation
      }
    };

    loadUsers();
  }, [selectedRole]);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [animateRows, setAnimateRows] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleDetails = (user: any) => {
    setSelectedUser(user);
    setShowEmailModal(false); // make sure email modal is closed
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setAlertMessage(null);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  const [showEmailModal, setShowEmailModal] = useState(false);



  // Filter users based on role
  const filteredUsers =
    selectedRole === "Client"
      ? users
      : users.filter((u) => u.role === selectedRole);

  // const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  // const startIdx = (currentPage - 1) * USERS_PER_PAGE;
  // const currentUsers = filteredUsers.slice(startIdx, startIdx + USERS_PER_PAGE);

  // Calculate pagination range
  const USERS_PER_PAGE = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  useEffect(() => {
    const total = Math.ceil(allUsers.length / USERS_PER_PAGE);
    setTotalPages(total);
    if (currentPage > total) {
      setCurrentPage(1); // reset if current page exceeds total pages
    }
  }, [allUsers]);

  // // Reset to page 1 when role changes
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [selectedRole]);

  useEffect(() => {
    setTotalPages(Math.ceil(allUsers.length / 10));
    setCurrentPage(1); // Reset to page 1 when data changes
  }, [allUsers]);


  useEffect(() => {
    setAnimateRows(false);
    const timeout = setTimeout(() => setAnimateRows(true), 50);
    return () => clearTimeout(timeout);
  }, [currentPage, selectedRole]);


  //////////////////////////////////////////////////////------------------Fetching Pending User List---------------------////////////////////////////////////////////////

  ///Assigned Trainers and Nutritionists
  const [alertMessage, setAlertMessage] = useState<string | null>(null);//If assigned users are null
  const [assignedUserData, setAssignedUserData] = useState<any>(null);
  const [modalType, setModalType] = useState<"trainer" | "nutritionist" | null>(null);
  //Assigned Clients
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [clientIndex, setClientIndex] = useState(0);
  //Approve a user
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState("");


  const handleApprove = (user: any) => {
    console.log("Selected user for approval:", user);
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const approvePendingUser = async (userId: number | undefined) => {
    if (!userId) {
      console.error("No user ID provided for approval.");
      setApprovalMessage("User ID is missing.");
      setShowConfirmModal(false);
      setShowResponseModal(true);
      return;
    }

    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).Login_token : null;
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/admin/approve-user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const text = await res.text();  // <-- parse as text
      setApprovalMessage(text || "Approval completed.");
      setShowConfirmModal(false);
      setShowResponseModal(true);
    } catch (err) {
      console.error("Approval failed:", err);
      setApprovalMessage("An error occurred during approval.");
      setShowConfirmModal(false);
      setShowResponseModal(true);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





  //////////////////////////////////////////////////////------------------Send Email---------------------////////////////////////////////////////////////

  const [isSending, setIsSending] = useState(false);
  const sendEmail = async ({
    to,
    subject,
    message,
    attachments,
  }: {
    to: string[];
    subject: string;
    message: string;
    attachments: File[];
  }) => {
    const formData = new FormData();
    formData.append("recipients", JSON.stringify(to));
    formData.append("subject", subject);
    formData.append("message", message);
    if (attachments.length > 0) {
      formData.append("attachment", attachments[0]); // Backend handles single file for now
    }
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiBase}/admin/send-bulk`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Failed to send email: ${text}`);
    }

    return response.text(); // or response.json() if you return JSON
  };


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  console.log("Search Results:", searchResults);
  return (
    <CommonLayout activePage="Users">
      {({ darkMode }) => (
        <>
          <style>{`
            @keyframes slideFadeIn {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .slide-fade-in {
              animation: slideFadeIn 0.6s ease forwards;
            }
            .row-fade-in {
              opacity: 0;
              transform: translateY(15px);
              animation: fadeInUp 0.5s ease forwards;
              animation-delay: var(--delay);
            }
            @keyframes fadeInUp {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>

          {/*Dropdown for Users*/}
          <div className="p-1 relative z-0">
            <div className="text-3xl font-bold mb-4 slide-fade-in">Users</div>

            <div
              className="flex justify-between items-center mb-4 slide-fade-in relative z-10"
              style={{ animationDelay: "0.1s" }}
            >
              {/* Search bar section */}
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search users by name or email..."
                  className={`w-70 max-w-sm px-4 py-2 border rounded-lg outline-none focus:ring-2 ${darkMode
                    ? "bg-zinc-800 border-zinc-700 text-white"
                    : "bg-white border-gray-300 text-black"
                    }`}
                />
                <button
                  onClick={handleSearch}
                  className="ml-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Search
                </button>

                {searchResults.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setIsSearching(false);
                    }}
                    className="ml-3 px-4 py-2 text-red-500 border border-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="dropdown dropdown-end relative z-50">
                <label
                  tabIndex={0}
                  className="btn bg-orange-600 text-white hover:bg-orange-700"
                >
                  {selectedRole} ▾
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[999] absolute"
                >
                  {["Client", "Trainer", "Nutritionist", "Pending Users"].map(
                    (role) => (
                      <li key={role}>
                        <a onClick={() => setSelectedRole(role)}>{role}</a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>




            {/*Showing table of users */}
            <div
              className="overflow-x-auto slide-fade-in relative z-0"
              style={{ animationDelay: "0.2s" }}
            >
              <table className="table w-full text-base">
                <thead>
                  <tr className="border-b-2 border-orange-500 z-0">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Signup Date</th>
                    <th>Role</th>
                    <th className="flex justify-center relative">
                      <span className="absolute left-1/2 -translate-x-1/2">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(isSearching ? searchResults : currentUsers).map((user, idx) => (
                    <tr
                      key={idx}
                      className={`hover cursor-pointer ${animateRows ? "row-fade-in" : ""}`}
                      style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}
                    >
                      <td className="flex items-center gap-3">
                        {user.profileImageUrl && user.profileImageUrl !== "/images/default.jpg" ? (
                          <div className="avatar">
                            <div className="w-15 rounded-full">
                              <Image
                                src={user.profileImageUrl.trim()}
                                alt={user.name}
                                width={40}
                                height={40}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="avatar avatar-placeholder">
                            <div className="bg-base-300 text-base-content w-15 rounded-full">
                              <span className="text-sm">
                                {(user.name ?? "AI")
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                                  .slice(0, 2)}
                              </span>
                            </div>
                          </div>

                        )}
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-500">
                            {user.email.split("@")[0]}
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>{user.role}</td>
                      <td className="flex justify-center gap-2">
                        <button
                          className="btn btn-sm bg-green-700 text-white hover:bg-green-800"
                          onClick={() => handleDetails(user)}
                        >
                          See Details
                        </button>

                        <button
                          className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEmailModal(true);
                          }}
                        >
                          Send Email
                        </button>

                        {selectedRole === "Pending Users" && (
                          <button
                            className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                            onClick={() => handleApprove(user)}
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}

                  {(isSearching ? searchResults : allUsers).length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-4 text-gray-400">
                        No users found for selected role.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>


            {/* Pagination
            <div
              className="mt-4 flex justify-center gap-4 slide-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>
              <span className="self-center">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div> */}


            {/*Pagination */}
            {!isSearching && (
              <div
                className="mt-4 flex justify-center gap-4 slide-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <button
                  className="btn btn-sm"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
                <span className="self-center">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="btn btn-sm"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            )}

          </div>



          {/* See Details Modal */}
          {selectedUser && !showConfirmModal && !showEmailModal && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
              <div
                style={{ fontFamily: '"Segoe UI", sans-serif' }}
                className={`w-11/12 max-w-4xl p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
                  }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 border-b pb-6 mb-6">
                  {selectedUser.image && selectedUser.image !== "/images/default.jpg" ? (
                    <div className="avatar">
                      <div className="w-25 rounded-full">
                        <Image
                          src={selectedUser.image.trim()}
                          alt={selectedUser.name}
                          width={40}
                          height={40}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar avatar-placeholder">
                      <div className="w-20 h-20 rounded-full bg-base-300 text-base-content flex items-center justify-center">
                        <span className="text-2xl font-semibold leading-none">
                          {(selectedUser.name ?? "AI")
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)}
                        </span>
                      </div>
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-1">User Details</h2>
                    <p className={darkMode ? "text-zinc-400" : "text-black"}>
                      {selectedUser.role} profile overview
                    </p>
                  </div>
                </div>

                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-base font-semibold mb-1">Full Name</h3>
                    <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.name}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">Email</h3>
                    <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.email}</p>
                  </div>

                  {/* Client fields */}
                  {selectedUser.role === "Client" && (
                    <>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Age</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.age || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Gender</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.gender || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Phone</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.phone || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Address</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.address || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Height (cm)</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.height || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Weight (kg)</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.weight || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">BMI</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.bmi || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-1">Medical History</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.medicalHistory || "N/A"}</p>
                      </div>
                    </>
                  )}

                  {/* Trainer/Nutritionist fields */}
                  {(selectedUser.role === "Trainer" || selectedUser.role === "Nutritionist") && (
                    <>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Gender</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.gender || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Phone</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.phone || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Specialization</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.specialization || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Certification</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.certification || "N/A"}</p>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">Experience (Years)</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.experience || "N/A"}</p>
                      </div>
                      <div className="md:col-span-2">
                        <h3 className="text-base font-semibold mb-1">Bio</h3>
                        <p className={darkMode ? "text-zinc-400" : "text-black"}>{selectedUser.bio || "N/A"}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Role-based Buttons */}
                {selectedUser.role === "Client" && (
                  <div className="mt-6 flex gap-4">
                    <button
                      onClick={() => {
                        if (selectedUser.trainer) {
                          setAssignedUserData(selectedUser.trainer);
                          setModalType("trainer");
                        } else {
                          setAlertMessage("No trainer has been assigned.");
                        }
                      }}
                      className="px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                      Assigned Trainer
                    </button>

                    <button
                      onClick={() => {
                        if (selectedUser.nutritionist) {
                          setAssignedUserData(selectedUser.nutritionist);
                          setModalType("nutritionist");
                        } else {
                          setAlertMessage("No nutritionist has been assigned.");
                        }
                      }}
                      className="px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:scale-105 transition duration-300">
                      Assigned Nutritionist
                    </button>
                  </div>
                )}

                {(selectedUser.role === "Trainer" || selectedUser.role === "Nutritionist") && (
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        if (selectedUser.clients && selectedUser.clients.length > 0) {
                          setClientIndex(0);
                          setClientModalOpen(true);
                        } else {
                          setAlertMessage("No clients have been assigned.");
                        }
                      }}
                      className="px-4 py-2 rounded text-white bg-purple-600 hover:bg-purple-700 hover:shadow-lg transform hover:scale-105 transition duration-300"
                    >
                      Assigned Clients
                    </button>

                  </div>
                )}

                {/* Alert Popup */}
                {alertMessage && (
                  <div className="mt-6 w-full flex justify-center">
                    <div className="bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 px-4 py-2 rounded shadow-md text-sm flex items-center gap-2">
                      <span>{alertMessage}</span>
                      <button
                        onClick={() => setAlertMessage(null)}
                        className="ml-4 text-xs text-red-600 dark:text-red-300 underline"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                {/* Close Button */}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* See Send Mail Modal */}
          {showEmailModal && (
            <div className="fixed inset-0 bg-transparent z-50 flex items-end justify-end p-6 pointer-events-none">
              <div
                className={`w-full max-w-lg rounded-xl shadow-2xl pointer-events-auto border ${darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"
                  }`}
              >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <h2 className="text-lg font-semibold">New Message</h2>
                  <button
                    onClick={() => {
                      setShowEmailModal(false);
                      setAttachments([]);
                    }}
                    className="text-xl hover:text-red-500 transition"
                  >
                    ×
                  </button>
                </div>

                {/* Form */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSending) return;
                    setIsSending(true);
                    const form = e.currentTarget;
                    const subject = (form.querySelector("input[placeholder='Subject']") as HTMLInputElement)?.value;
                    const message = (form.querySelector("textarea") as HTMLTextAreaElement)?.value;

                    if (!selectedUser) {
                      alert("No user selected.");
                      return;
                    }

                    try {
                      const formData = new FormData();
                      formData.append("recipients", JSON.stringify([selectedUser.email]));
                      formData.append("subject", subject);
                      formData.append("message", message);
                      if (attachments.length > 0) {
                        formData.append("attachment", attachments[0]); // single file support
                      }
                      const apiBase = process.env.NEXT_PUBLIC_API_URL;
                      const res = await fetch(`${apiBase}/admin/send-bulk`, {
                        method: "POST",
                        body: formData,
                      });

                      if (!res.ok) {
                        const errText = await res.text();
                        throw new Error(errText);
                      }

                      alert("Email sent successfully!");
                      setShowEmailModal(false);
                      setSelectedUser(null);
                      setAttachments([]);
                    } catch (err: unknown) {
                      let errorMessage = "Unknown error";
                      if (err instanceof Error) {
                        errorMessage = err.message;
                      }
                      alert("Error sending email: " + errorMessage);
                    } finally {
                      setIsSending(false); 
                    }
                  }}
                >
                  {/* To */}
                  <div className="px-4 py-2 border-b">
                    <label className="block text-sm font-medium">To</label>
                    <input
                      type="email"
                      value={selectedUser?.email || "exa"}
                      readOnly
                      className="w-full bg-transparent outline-none mt-1"
                    />
                  </div>

                  {/* Subject */}
                  <div className="px-4 py-2 border-b">
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      className="w-full bg-transparent outline-none text-base font-medium"
                    />
                  </div>

                  {/* Message */}
                  <div className="px-4 py-2">
                    <textarea
                      placeholder="Compose your message..."
                      rows={6}
                      required
                      className="w-full bg-transparent outline-none resize-none"
                    />
                  </div>

                  {/* Attachments */}
                  <div className="px-4 pb-2">
                    <label className="block text-sm font-medium mb-1">Attachments</label>
                    <div
                      className={`w-full border-2 border-dashed rounded p-4 text-center cursor-pointer transition ${darkMode
                        ? "border-zinc-600 hover:border-zinc-400"
                        : "border-gray-300 hover:border-gray-500"
                        }`}
                      onClick={() => document.getElementById("fileInput")?.click()}
                    >
                      <p className="text-sm">Click to attach files or drag them here</p>
                      <input
                        id="fileInput"
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files ?? []);
                          setAttachments((prev) => [...prev, ...newFiles]);
                        }}
                      />
                    </div>

                    {/* File previews */}
                    {attachments.length > 0 && (
                      <ul className="mt-3 space-y-2 text-sm">
                        {attachments.map((file, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between bg-gray-100 dark:bg-zinc-700 rounded px-3 py-1"
                          >
                            <span className="truncate">
                              📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <button
                              onClick={() =>
                                setAttachments((prev) => prev.filter((_, i) => i !== idx))
                              }
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ✕
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 px-4 py-2 border-t">
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`px-5 py-2 rounded-full text-white transition ${isSending ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                      {isSending ? 'Sending...' : 'Send'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmailModal(false);
                        setSelectedUser(null);
                        setAttachments([]);
                      }}
                      className="px-5 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                    >
                      Discard
                    </button>
                  </div>
                </form>

              </div>
            </div>
          )}

          {/* Assigned Trainer or Nutritionist Modal Details */}
          {assignedUserData && modalType && (
            <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
              <div
                style={{ fontFamily: '"Segoe UI", sans-serif' }}
                className={`w-11/12 max-w-2xl p-6 rounded-2xl shadow-xl ${darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
                  }`}
              >
                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                  <div className="avatar">
                    {assignedUserData.image ? (
                      <div className="avatar" >
                        <div className="w-15 rounded-full">
                          <Image
                            src={assignedUserData.image}
                            alt={assignedUserData.name}
                            width={80}
                            height={80}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar avatar-placeholder">
                        <div className="bg-base-300 text-base-content w-15 rounded-full">
                          <span className="text-sm">
                            {assignedUserData.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">
                      {modalType === "trainer" ? "Trainer" : "Nutritionist"} Details
                    </h2>
                    <p className={darkMode ? "text-zinc-400" : "text-black"}>{assignedUserData.name}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <p><strong>Email:</strong> {assignedUserData.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {assignedUserData.phone || "N/A"}</p>
                  <p><strong>Gender:</strong> {assignedUserData.gender || "N/A"}</p>
                  <p><strong>Specialization:</strong> {assignedUserData.specialization || "N/A"}</p>
                  <p><strong>Certification:</strong> {assignedUserData.certification || "N/A"}</p>
                  <p><strong>Experience:</strong> {assignedUserData.experience || "N/A"} years</p>
                  <p><strong>Bio:</strong> {assignedUserData.bio || "N/A"}</p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => {
                      setAssignedUserData(null);
                      setModalType(null);
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Assigned Clients Modal Details */}
          {clientModalOpen && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
              <div
                className={`relative w-11/12 max-w-2xl p-6 rounded-2xl shadow-xl ${darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
                  }`}
              >
                <h2 className="text-xl font-bold mb-4 text-center">Assigned Client Details</h2>

                {/* Client Info */}
                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                  <div className="avatar">
                    <div className="w-20 rounded-full">
                      <Image
                        src={
                          selectedUser.clients[clientIndex]?.profileImageUrl ||
                          "/images/default.jpg"
                        }
                        alt={selectedUser.clients[clientIndex]?.name}
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{selectedUser.clients[clientIndex]?.name}</p>
                    <p className="text-sm text-zinc-400">{selectedUser.clients[clientIndex]?.email}</p>
                  </div>
                </div>

                {/* Client Details */}
                <div className="text-sm space-y-2">
                  <p><strong>Age:</strong> {selectedUser.clients[clientIndex]?.age ?? "N/A"}</p>
                  <p><strong>Gender:</strong> {selectedUser.clients[clientIndex]?.gender ?? "N/A"}</p>
                  <p><strong>Phone:</strong> {selectedUser.clients[clientIndex]?.phone ?? "N/A"}</p>
                  <p><strong>Address:</strong> {selectedUser.clients[clientIndex]?.address ?? "N/A"}</p>
                  <p><strong>Height:</strong> {selectedUser.clients[clientIndex]?.height ?? "N/A"}</p>
                  <p><strong>Weight:</strong> {selectedUser.clients[clientIndex]?.weight ?? "N/A"}</p>
                  <p><strong>BMI:</strong> {selectedUser.clients[clientIndex]?.bmi ?? "N/A"}</p>
                  <p><strong>Medical History:</strong> {selectedUser.clients[clientIndex]?.medicalHistory ?? "N/A"}</p>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    disabled={clientIndex === 0}
                    onClick={() => setClientIndex(clientIndex - 1)}
                    className="px-3 py-1 rounded bg-gray-400 text-white disabled:opacity-50"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => {
                      setClientModalOpen(false);
                      setClientIndex(0);
                    }}
                    className="px-6 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                  >
                    Close
                  </button>
                  <button
                    disabled={clientIndex === selectedUser.clients.length - 1}
                    onClick={() => setClientIndex(clientIndex + 1)}
                    className="px-3 py-1 rounded bg-gray-400 text-white disabled:opacity-50"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation of Approving a user modal */}
          {showConfirmModal && selectedUser && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md w-full max-w-md text-center">
                <h2 className="text-lg font-semibold mb-4">Confirm Approval</h2>
                <p className="mb-6">
                  Are you sure you want to approve <strong>{selectedUser?.UName}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    onClick={() => approvePendingUser(selectedUser.UserId)}
                  >
                    Yes
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    onClick={() => { setShowConfirmModal(false); setSelectedUser(null); }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}


          {showResponseModal && (
            <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md w-full max-w-md text-center">
                <h2 className="text-lg font-semibold mb-4">Approval Status</h2>
                <p className="mb-6">{approvalMessage}</p>
                <button
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setShowResponseModal(false)}
                >
                  OK
                </button>
              </div>
            </div>
          )}

        </>
      )}
    </CommonLayout>
  );
}
