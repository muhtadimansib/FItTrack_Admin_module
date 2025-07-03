// "use client";
// import { useEffect, useState } from "react";
// import { TrainerData, NutritionistData } from "./types";

// type Props = {
//   performer: TrainerData["data"] | NutritionistData["data"];
//   type: "trainer" | "nutritionist";
//   delay?: number;
//   onClick: () => void;
// };

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// export default function TopPerformerCard({
//   performer,
//   type,
//   delay = 0,
//   onClick,
// }: Props) {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, delay * 1000); // respect the delay passed in seconds

//     return () => clearTimeout(timeout);
//   }, [delay]);

//   const bgGradient =
//     type === "trainer"
//       ? "from-emerald-900 via-emerald-800 to-emerald-700"
//       : "from-cyan-900 via-cyan-800 to-cyan-700";

//   const buttonColor =
//     type === "trainer"
//       ? "hover:text-emerald-900"
//       : "hover:text-yellow-800";

//   const label =
//     type === "trainer"
//       ? "Top Performing Trainer"
//       : "Top Performing Nutritionist";

      

//   return (
//     <div
//       className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-r ${bgGradient} transform transition-all duration-700 ease-out ${
//         visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
//       }`}
//     >
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="avatar avatar-placeholder">
//             {performer.image ? (
//               <div className="w-14 rounded-full ring ring-white ring-offset-2">
//                 <img src={performer.image} alt={label} />
//               </div>
//             ) : (
//               <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//                 <span>{getInitials(performer.name)}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <div className="text-lg font-semibold">{label}</div>
//             <div>⭐ Avg Rating: {performer.rating}</div>
//             <div>
//               {type === "trainer"
//                 ? `${(performer as TrainerData["data"]).clients} Clients`
//                 : `${(performer as NutritionistData["data"]).plansCreated} Plans Created`}
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={onClick}
//           className={`btn btn-sm btn-outline text-white border-white hover:bg-white ${buttonColor}`}
//         >
//           See
//         </button>
//       </div>
//     </div>
//   );
// }















// "use client";
// import { useEffect, useState } from "react";
// import { TrainerData, NutritionistData } from "./types";

// type Props = {
//   type: "trainer" | "nutritionist";
//   delay?: number;
//   onClick: () => void;
//   setData: (data: TrainerData["data"] | NutritionistData["data"]) => void;
// };

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// export default function TopPerformerCard({ type, delay = 0, onClick, setData }: Props) {
//   const [visible, setVisible] = useState(false);
//   const [performer, setPerformer] = useState<TrainerData["data"] | NutritionistData["data"] | null>(null);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, delay * 1000);
//     return () => clearTimeout(timeout);
//   }, [delay]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`http://localhost:3000/admin/performance/top-${type}`);
//       const json = await res.json();

//       const transformed = {
//         name: json.name,
//         rating: parseFloat(json.averageRating),
//         clients: parseInt(json.clientsCount),
//         image: json.image || "",
//         description: json.bio || "",
//         ...(type === "trainer"
//           ? {
//               sessions: 0,
//               specialization: json.specialization,
//               certification: json.certification,
//             }
//           : {
//               plansCreated: 0,
//               avgPlanDuration: "",
//               specialization: json.specialization,
//               certification: json.certification,
//             }),
//       };

//       setPerformer(transformed);
//       setData(transformed);
//     };

//     fetchData();
//   }, [type, setData]);

//   const bgGradient =
//     type === "trainer"
//       ? "from-emerald-900 via-emerald-800 to-emerald-700"
//       : "from-cyan-900 via-cyan-800 to-cyan-700";

//   const buttonColor = type === "trainer" ? "hover:text-emerald-900" : "hover:text-yellow-800";
//   const label = type === "trainer" ? "Top Performing Trainer" : "Top Performing Nutritionist";

//   if (!performer) return null;

//   return (
//     <div
//       className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-r ${bgGradient} transform transition-all duration-700 ease-out ${
//         visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
//       }`}
//     >
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="avatar avatar-placeholder">
//             {performer.image ? (
//               <div className="w-14 rounded-full ring ring-white ring-offset-2 overflow-hidden">
//                 <img src={performer.image} alt={label} />
//               </div>
//             ) : (
//               <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//                 <span>{getInitials(performer.name)}</span>
//               </div>
//             )}
//           </div>
//           <div>
//             <div className="text-lg font-semibold">{label}</div>
//             <div>⭐ Avg Rating: {performer.rating}</div>
//             <div>{performer.clients} Clients</div>
//           </div>
//         </div>
//         <button
//           onClick={onClick}
//           className={`btn btn-sm btn-outline text-white border-white hover:bg-white ${buttonColor}`}
//         >
//           See
//         </button>
//       </div>
//     </div>
//   );
// }














// "use client";
// import { useEffect, useState } from "react";
// import { TrainerData, NutritionistData } from "./types";

// type Props = {
//   type: "trainer" | "nutritionist";
//   delay?: number;
//   onClick: () => void;
//   setData: (data: TrainerData | NutritionistData) => void;
// };

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase();
// }

// export default function TopPerformerCard({ type, delay = 0, onClick, setData }: Props) {
//   const [visible, setVisible] = useState(false);
//   const [performer, setPerformer] = useState<TrainerData["data"] | NutritionistData["data"] | null>(null);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setVisible(true);
//     }, delay * 1000);
//     return () => clearTimeout(timeout);
//   }, [delay]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(`http://localhost:3000/admin/performance/top-${type}`);
//       const json = await res.json();

//       const transformed = {
//       id: json.id, // 👈 include ID here
//       name: json.name,
//       rating: parseFloat(json.averageRating),
//       clients: parseInt(json.clientsCount),
//       image: json.image || "",
//       description: json.bio || "",
//       specialization: json.specialization,
//       certification: json.certification,
//       bio: json.bio,
//       ...(type === "trainer"
//         ? {
//             sessions: 0,
//           }
//         : {
//             plansCreated: 0,
//             avgPlanDuration: "",
//           }),
//     };

//       setPerformer(transformed);
//       setData({ type, data: transformed }); // ✅ fix here
//     };

//     fetchData();
//   }, [type, setData]);

//   const bgGradient =
//     type === "trainer"
//       ? "from-emerald-900 via-emerald-800 to-emerald-700"
//       : "from-cyan-900 via-cyan-800 to-cyan-700";

//   const buttonColor = type === "trainer" ? "hover:text-emerald-900" : "hover:text-yellow-800";
//   const label = type === "trainer" ? "Top Performing Trainer" : "Top Performing Nutritionist";

//   if (!performer) return null;

// return (
//   <div
//     className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-r ${bgGradient}
//       transition-opacity transition-transform duration-700 ease-out
//       ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
//   >
//     <div className="flex justify-between items-center">
//       <div className="flex items-center gap-4">
//         <div className="avatar avatar-placeholder">
//           {performer.image ? (
//             <div className="w-14 rounded-full ring ring-white ring-offset-2 overflow-hidden">
//               <img src={performer.image} alt={label} />
//             </div>
//           ) : (
//             <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
//               <span>{getInitials(performer.name)}</span>
//             </div>
//           )}
//         </div>
//         <div>
//           <div className="text-lg font-semibold">{label}</div>
//           <div>⭐ Avg Rating: {performer.rating}</div>
//           <div>{performer.clients} Clients</div>
//         </div>
//       </div>
//       <button
//         onClick={onClick}
//         className={`btn btn-sm btn-outline text-white border-white hover:bg-white ${buttonColor}`}
//       >
//         See
//       </button>
//     </div>
//   </div>
// );
// }



















"use client";
import { useEffect, useState } from "react";
import { TrainerData, NutritionistData } from "./types";

type Props = {
  type: "trainer" | "nutritionist";
  delay?: number;
  onClick: () => void;
  setData: (data: TrainerData | NutritionistData) => void;
};

function getInitials(name: string) {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";
}

export default function TopPerformerCard({ type, delay = 0, onClick, setData }: Props) {
  const [visible, setVisible] = useState(false);
  const [performer, setPerformer] = useState<TrainerData["data"] | NutritionistData["data"] | null>(null);

  useEffect(() => {
    // DEBUG: log delay for this card to ensure useEffect triggers
    console.log(`TopPerformerCard [${type}] delay: ${delay}`);

    const timeout = setTimeout(() => {
      setVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay, type]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/admin/performance/top-${type}`);
      const json = await res.json();

      const transformed = {
        id: json.id,
        name: json.name,
        rating: parseFloat(json.averageRating),
        clients: parseInt(json.clientsCount),
        image: json.image || "",
        description: json.bio || "",
        specialization: json.specialization,
        certification: json.certification,
        bio: json.bio,
        ...(type === "trainer"
          ? { sessions: 0 }
          : { plansCreated: 0, avgPlanDuration: "" }),
      };

      setPerformer(transformed);
      setData({ type, data: transformed });
    };

    fetchData();
  }, [type, setData]);

  const bgGradient =
    type === "trainer"
      ? "from-emerald-900 via-emerald-800 to-emerald-700"
      : "from-cyan-900 via-cyan-800 to-cyan-700";

  const buttonColor = type === "trainer" ? "hover:text-emerald-900" : "hover:text-yellow-800";
  const label = type === "trainer" ? "Top Performing Trainer" : "Top Performing Nutritionist";

  if (!performer) return null;

  return (
    <div
      className={`p-4 rounded-xl shadow-lg text-white bg-gradient-to-r ${bgGradient} 
        transition-opacity transition-transform duration-700 ease-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="avatar avatar-placeholder">
            {performer.image ? (
              <div className="w-14 rounded-full ring ring-white ring-offset-2 overflow-hidden">
                <img src={performer.image} alt={label} />
              </div>
            ) : (
              <div className="bg-neutral text-neutral-content w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold">
                <span>{getInitials(performer.name)}</span>
              </div>
            )}
          </div>
          <div>
            <div className="text-lg font-semibold">{label}</div>
            <div>⭐ Avg Rating: {performer.rating}</div>
            <div>{performer.clients} Clients</div>
          </div>
        </div>
        <button
          onClick={onClick}
          className={`btn btn-sm btn-outline text-white border-white hover:bg-white ${buttonColor}`}
        >
          See
        </button>
      </div>
    </div>
  );
}
