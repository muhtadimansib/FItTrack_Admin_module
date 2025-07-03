// // components/TopPerformer/TopPerformerModal.tsx

// "use client";
// import { ModalData } from "./types";

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// type Props = {
//   modalData: ModalData;
//   onClose: () => void;
// };

// export default function TopPerformerModal({ modalData, onClose }: Props) {
//   if (!modalData) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-lg w-full relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//           onClick={onClose}
//         >
//           ✕
//         </button>

//         <div className="flex items-center gap-4 mb-4">
//           <div className="avatar avatar-placeholder">
//             {modalData.data.image ? (
//               <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                 <img src={modalData.data.image} alt="Profile" />
//               </div>
//             ) : (
//               <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
//                 <span>{getInitials(modalData.data.name)}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold">{modalData.data.name}</h2>
//             <p className="text-sm text-gray-400 capitalize">{modalData.type}</p>
//           </div>
//         </div>

//         <p className="mb-2">Details</p>

//         {modalData.type === "trainer" ? (
//           <>
//             <p>Average Rating: {modalData.data.rating}</p>
//             <p>Clients Served: {modalData.data.clients}</p>
//             <p>Specialization {modalData.data.specialization}</p>
//             <p>Certification {modalData.data.specialization}</p>
//             <p>Certification {modalData.data.bio}</p>
//           </>
//         ) : (
//           <>
//             <p>Average Rating: {modalData.data.rating}</p>
//             <p>Clients Served: {modalData.data.clients}</p>
//             <p>Specialization {modalData.data.specialization}</p>
//             <p>Certification {modalData.data.specialization}</p>
//             <p>Certification {modalData.data.bio}</p>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

















// "use client";
// import { createPortal } from "react-dom";
// import { ModalData } from "./types";
// import { useEffect, useState } from "react";

// function getInitials(name: string) {
//   return name
//     ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
//     : "";
// }

// type Props = {
//   modalData: ModalData;
//   onClose: () => void;
// };

// export default function TopPerformerModal({ modalData, onClose }: Props) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!modalData || !mounted) return null;
//   if (!modalData || !modalData.data) return null;

//   const { name, image, rating, clients, specialization, certification, bio } = modalData.data;

//   return createPortal(
//     <div
//       className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-zinc-900/30 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-zinc-900 p-6 rounded-xl max-w-lg w-full relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           ✕
//         </button>

//         <div className="flex items-center gap-4 mb-4">
//           <div className="avatar avatar-placeholder">
//             {image ? (
//               <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
//                 <img src={image} alt="Profile" />
//               </div>
//             ) : (
//               <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
//                 <span>{getInitials(name)}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold">{name}</h2>
//             <p className="text-sm text-gray-400 capitalize">{modalData.type}</p>
//           </div>
//         </div>

//         <p className="mb-2">Details</p>
//         <p>⭐ Average Rating: {rating}</p>
//         <p>👥 Clients Served: {clients}</p>
//         <p>🏋️ Specialization: {specialization}</p>
//         <p>📜 Certification: {certification}</p>
//         <p>📝 Bio: {bio}</p>
//       </div>
//     </div>,
//     document.body
//   );
// }









// "use client";
// import { createPortal } from "react-dom";
// import { ModalData } from "./types";
// import { useEffect, useState } from "react";

// function getInitials(name: string) {
//   return name
//     ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
//     : "";
// }

// type Props = {
//   modalData: ModalData;
//   onClose: () => void;
// };

// export default function TopPerformerModal({ modalData, onClose }: Props) {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!modalData || !mounted) return null;
//   if (!modalData || !modalData.data) return null;

//   const { name, image, rating, clients, specialization, certification, bio } = modalData.data;

//   return createPortal(
//     <div
//       className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-zinc-900/30 flex justify-center items-center z-50"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-zinc-900 p-8 rounded-2xl w-full max-w-2xl relative shadow-xl slide-fade-in"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <button
//           className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           ✕
//         </button>

//         <div className="flex items-center gap-4 mb-4">
//           <div className="avatar avatar-placeholder">
//             {image ? (
//               <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
//                 <img src={image} alt="Profile" />
//               </div>
//             ) : (
//               <div className="bg-neutral text-neutral-content w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold">
//                 <span>{getInitials(name)}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold">{name}</h2>
//             <p className="text-sm text-gray-400 capitalize">{modalData.type}</p>
//           </div>
//         </div>

//         <p className="mb-2">Details</p>
//         <p>⭐ Average Rating: {rating}</p>
//         <p>👥 Clients Served: {clients}</p>
//         <p>🏋️ Specialization: {specialization}</p>
//         <p>📜 Certification: {certification}</p>
//         <p>📝 Bio: {bio}</p>
//       </div>
//     </div>,
//     document.body
//   );
// }















// "use client";
// import { createPortal } from "react-dom";
// import { ModalData } from "./types";
// import { useEffect, useState } from "react";

// function getInitials(name: string) {
//   return name
//     ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
//     : "";
// }

// type Props = {
//   modalData: ModalData;
//   onClose: () => void;
//   darkMode: boolean;
// };

// export default function TopPerformerModal({ modalData, onClose }: Props) {
//   const [mounted, setMounted] = useState(false);
//   const [darkMode, setDarkMode] = useState<boolean | null>(null);

//   useEffect(() => {
//     const theme = localStorage.getItem("theme");
//     setDarkMode(theme === "dark");
//     setMounted(true);
//   }, []);

//   if (!modalData || !mounted || darkMode === null || !modalData.data) return null;
//   const bgClass = darkMode ? "bg-zinc-800 text-white" : "bg-white text-black";


//   const { name, image, rating, clients, specialization, certification, bio } = modalData.data;

//  return createPortal(
//     <div
//       className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50"
//       onClick={onClose}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         style={{ fontFamily: '"Segoe UI", sans-serif' }}
//         className={`w-11/12 max-w-4xl p-8 rounded-2xl shadow-xl slide-fade-in relative ${bgClass}`}
//       >
//         {/* Close Button */}
//         <button
//           className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
//           onClick={onClose}
//           aria-label="Close modal"
//         >
//           ✕
//         </button>

//         {/* Header */}
//         <div className="flex items-center gap-4 border-b pb-6 mb-6">
//           {image ? (
//             <div className="avatar">
//               <div className="w-20 h-20 rounded-full overflow-hidden">
//                 <img src={image.trim()} alt="Profile" />
//               </div>
//             </div>
//           ) : (
//             <div className="avatar avatar-placeholder">
//               <div className="w-20 h-20 rounded-full bg-base-300 text-base-content flex items-center justify-center">
//                 <span className="text-2xl font-semibold leading-none">
//                   {getInitials(name).slice(0, 2)}
//                 </span>
//               </div>
//             </div>
//           )}
//           <div>
//             <h2 className="text-2xl font-bold mb-1">Top Performer</h2>
//             <p className={darkMode ? "text-zinc-400" : "text-zinc-600"}>
//               {modalData.type} profile overview
//             </p>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="space-y-3">
//           <p className="font-semibold">
//             ⭐ Average Rating: <span className="font-normal">{rating}</span>
//           </p>
//           <p className="font-semibold">
//             👥 Clients Served: <span className="font-normal">{clients}</span>
//           </p>
//           <p className="font-semibold">
//             🏋️ Specialization: <span className="font-normal">{specialization}</span>
//           </p>
//           <p className="font-semibold">
//             📜 Certification: <span className="font-normal">{certification}</span>
//           </p>
//           <p className="font-semibold">
//             📝 Bio: <span className="font-normal">{bio}</span>
//           </p>
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }




"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ModalData } from "./types";
import TrainerRatingChart from "../charts/TrainerRatingTrendChart";
import TrainerGoalCompletionChart from "../charts/GoalCompletionChart";


function getInitials(name: string) {
  return name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "";
}

type Props = {
  modalData: ModalData;
  onClose: () => void;
  darkMode: boolean; 
};

export default function TopPerformerModal({ modalData, onClose,darkMode }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const chartTitles = ['Rating Trend (Over Time)', 'Goal Completion Rate'];

  useEffect(() => {
  const fetchData = async () => {
    if (modalData?.type !== "trainer") return; // only fetch if trainer
    setLoading(true);
    try {
      const [rating, goal] = await Promise.all([
        fetch(`http://localhost:3000/admin/performance/trainer/${modalData.data.id}/weekly-rating-chart-jsondata`).then(r => r.json()),
        fetch(`http://localhost:3000/admin/performance/trainer/${modalData.data.id}/goal-completion-jsondata`).then(r => r.json()),
      ]);
      setChartData({ rating, goal });
    } catch (error) {
      console.error("Failed to fetch charts:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [modalData]);

  useEffect(() => {
    setShowModal(true);
  }, []);

  console.log("modalData:", modalData);
  if (!modalData || !modalData.data) return null;

  const { name, image, rating, clients, specialization, certification, bio } = modalData.data;

  const bgClass = darkMode ? "bg-zinc-800 text-white" : "bg-white text-black";
  const subTextClass = darkMode ? "text-zinc-400" : "text-zinc-600";

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-white/30 dark:bg-black/30"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: '"Segoe UI", sans-serif' }}
        className={`
          relative
          w-11/12 max-w-4xl min-h-[300px] p-6 rounded-2xl shadow-xl
          transform transition-all duration-300
          ${bgClass} translate-y-0 opacity-100 z-[9999]
        `}
      >
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>

        <div className="flex items-center gap-4 border-b pb-6 mb-6">
          {image ? (
            <div className="avatar">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img src={image.trim()} alt={`${name} Profile`} />
              </div>
            </div>
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="w-20 h-20 rounded-full bg-base-300 text-base-content flex items-center justify-center">
                <span className="text-2xl font-semibold leading-none">
                  {getInitials(name).slice(0, 2)}
                </span>
              </div>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold mb-1">{name}</h2>
            <p className={`text-sm capitalize ${subTextClass}`}>{modalData.type} profile overview</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-semibold">
            ⭐ Average Rating: <span className="font-normal">{rating}</span>
          </p>
          <p className="font-semibold">
            👥 Clients Served: <span className="font-normal">{clients}</span>
          </p>
          <p className="font-semibold">
            🏋️ Specialization: <span className="font-normal">{specialization}</span>
          </p>
          <p className="font-semibold">
            📜 Certification: <span className="font-normal">{certification}</span>
          </p>
          <p className="font-semibold">
            📝 Bio: <span className="font-normal">{bio}</span>
          </p>
        </div>

        {modalData.type === "trainer" && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-center mb-4">
              {chartTitles[currentChartIndex]}
            </h3>

            {loading ? (
              <p className="text-center">Loading charts...</p>
            ) : (
              <>
                <div className="w-full min-h-[280px]">
                  {currentChartIndex === 0 && chartData.rating && (
                    <TrainerRatingChart data={chartData.rating} darkMode={darkMode} />
                  )}
                  {currentChartIndex === 1 && chartData.goal && (
                    <TrainerGoalCompletionChart data={chartData.goal} darkMode={darkMode} />
                  )}
                </div>

                {/* Next/Previous Button Footer */}
                <div className="flex justify-between mt-6">
                  <button
                    disabled={currentChartIndex === 0}
                    onClick={() => setCurrentChartIndex(i => i - 1)}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    ◀ Previous
                  </button>
                  <button
                    disabled={currentChartIndex === chartTitles.length - 1}
                    onClick={() => setCurrentChartIndex(i => i + 1)}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Next ▶
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        
    </div>
    </div>,
    document.body
  );
}


