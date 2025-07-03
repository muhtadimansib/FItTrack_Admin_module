// 'use client';

// import { Badge } from "../Badge";
// import { Card, CardContent, CardHeader, CardTitle } from "../Card";

// interface Trainer {
//   name: string;
//   averageRating: number;
//   clientsCount: number;
//   experience?: number | null;
//   specialization?: string | null;
// }

// const trainerData: Trainer[] = [
//   {
//     name: "Alex Morgan",
//     averageRating: 4.8,
//     clientsCount: 34,
//     experience: 6,
//     specialization: "Strength Training",
//   },
//   {
//     name: "Jamie Fox",
//     averageRating: 4.5,
//     clientsCount: 28,
//     experience: 1,
//     specialization: "Cardio Fitness",
//   },
//   {
//     name: "Riley Adams",
//     averageRating: 4.9,
//     clientsCount: 40,
//     experience: 4,
//     specialization: "Rehab & Mobility",
//   },
// ];

// function renderStars(rating: number) {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;
//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<span key={i} className="text-yellow-400">★</span>);
//   }
//   if (halfStar) {
//     stars.push(<span key="half" className="text-yellow-400">☆</span>);
//   }
//   while (stars.length < 5) {
//     stars.push(<span key={'empty-' + stars.length} className="text-gray-600">☆</span>);
//   }
//   return stars;
// }

// export default function TrainerContent() {
//   return (
//     <div className="space-y-6 mt-6">
//       <Card className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-md">
//         <CardHeader>
//           <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">
//             Trainer Performance
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
// <table className="w-full text-left text-sm border-collapse border border-gray-700">
//   <thead>
//     <tr className="border-b border-gray-700">
//       <th className="pb-3 px-4 align-middle text-gray-400 font-medium">Name</th>
//       <th className="pb-3 px-4 align-middle text-gray-400 font-medium">Avg Rating</th>
//       <th className="px-4 py-3 align-middle text-gray-400 font-medium">Clients</th>
//       <th className="pb-3 px-4 align-middle text-gray-400 font-medium">Experience</th>
//       <th className="pb-3 px-4 align-middle text-gray-400 font-medium">Specialty</th>
//     </tr>
//   </thead>
//   <tbody>
//     {trainerData.map((trainer, index) => (
// <tr key={index} className="border-b border-gray-700/50">
//   <td className="px-4 py-3 align-middle text-white font-medium">{trainer.name}</td>
//   <td className="px-4 py-3 align-middle">
//     <div className="flex items-center space-x-2">
//       <span className="text-yellow-400 font-semibold">{trainer.averageRating.toFixed(1)}</span>
//       <div className="flex">{renderStars(trainer.averageRating)}</div>
//     </div>
//   </td>
//   <td className="px-4 py-3 align-middle text-gray-300">{trainer.clientsCount}</td>
//   <td className="px-4 py-3 align-middle text-gray-300">{trainer.experience ?? 'N/A'}</td>
//   <td className="px-4 py-3 align-middle">
//     <Badge className="bg-orange-600/20 text-orange-400">{trainer.specialization ?? 'N/A'}</Badge>
//   </td>
// </tr>
//     ))}
//   </tbody>
// </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



// 'use client';

// import { Badge } from "../Badge";
// import Image from "next/image";
// import { useState } from "react";

// interface Trainer {
//   id: number;
//   name: string;
//   email?: string;
//   averageRating: number;
//   clientsCount: number;
//   experience?: number | null;
//   specialization?: string | null;
//   image?: string;
// }

// const trainerData: Trainer[] = [
//   {
//     id: 1,
//     name: "Alex Morgan",
//     averageRating: 4.8,
//     clientsCount: 34,
//     experience: 6,
//     specialization: "Strength Training",
//     image: "",
//   },
//   {
//     id: 2,
//     name: "Jamie Fox",
//     averageRating: 4.5,
//     clientsCount: 28,
//     experience: 1,
//     specialization: "Cardio Fitness",
//     image: "",
//   },
//   {
//     id: 3,
//     name: "Riley Adams",
//     averageRating: 4.9,
//     clientsCount: 40,
//     experience: 4,
//     specialization: "Rehab & Mobility",
//     image: "",
//   },
// ];

// function renderStars(rating: number) {
//   const stars = [];
//   const fullStars = Math.floor(rating);
//   const halfStar = rating % 1 >= 0.5;

//   for (let i = 0; i < fullStars; i++) {
//     stars.push(<span key={i} className="text-yellow-400">★</span>);
//   }

//   if (halfStar) {
//     stars.push(<span key="half" className="text-yellow-400">☆</span>);
//   }

//   while (stars.length < 5) {
//     stars.push(<span key={'empty-' + stars.length} className="text-gray-500">☆</span>);
//   }

//   return stars;
// }

// export default function TrainerContent() {
//   const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);
//   const [exportingTrainer, setExportingTrainer] = useState<Set<number>>(new Set());

//   const handleExportPDF = async (trainerId: number) => {
//     setExportingTrainer(prev => new Set(prev).add(trainerId));
//     try {
//       const res = await fetch(`http://localhost:3000/trainer-progress/${trainerId}/pdf?path=exports`);
//       if (!res.ok) throw new Error('Failed to generate report');
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `trainer-progress-${trainerId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Failed to export report');
//     } finally {
//       setExportingTrainer(prev => {
//         const updated = new Set(prev);
//         updated.delete(trainerId);
//         return updated;
//       });
//     }
//   };

//   return (
//     <div className="overflow-x-auto slide-fade-in relative z-0" style={{ animationDelay: "0.2s" }}>
//       <table className="table w-full text-base">
//         <thead>
//           <tr className="border-b-2 border-green-500">
//             <th>Profile</th>
//             <th className="text-center">Clients</th>
//             <th className="text-center">Experience</th>
//             <th className="text-center">Specialty</th>
//             <th className="text-center">Avg Rating</th>
//             <th className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trainerData.map((trainer, idx) => (
//             <tr key={trainer.id} className="hover cursor-pointer row-fade-in" style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}>
//               <td className="flex items-center gap-2">
//                 {trainer.image ? (
//                   <div className="avatar">
//                     <div className="w-10 rounded-full">
//                       <Image src={trainer.image.trim()} alt={trainer.name} width={40} height={40} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
//                     <span className="text-sm">
//                       {(trainer.name ?? "T")
//                         .split(" ")
//                         .map((n: string) => n[0])
//                         .join("")
//                         .toUpperCase()
//                         .slice(0, 2)}
//                     </span>
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold">{trainer.name}</div>
//                   <div className="text-sm text-gray-500">
//                     {trainer.specialization?.toLowerCase().replace(/\s/g, "-")}
//                   </div>
//                 </div>
//               </td>
//               <td className="text-center">{trainer.clientsCount}</td>
//               <td className="text-center">{trainer.experience ?? "N/A"} yrs</td>
//               <td className="text-center">
//                 <Badge className="bg-orange-600/20 text-orange-400">
//                   {trainer.specialization ?? "N/A"}
//                 </Badge>
//               </td>
//               <td className="text-center">
//                 <div className="flex items-center justify-center space-x-2">
//                   <span className="text-yellow-400 font-semibold">{trainer.averageRating.toFixed(1)}</span>
//                   <div className="flex">{renderStars(trainer.averageRating)}</div>
//                 </div>
//               </td>
//               <td className="flex gap-2 justify-center">
//                 <button
//                   className="btn btn-sm bg-blue-700 text-white"
//                   onClick={() => setSelectedTrainerId(trainer.id)}
//                 >
//                   See Stats
//                 </button>
//                 <button
//                   onClick={() => handleExportPDF(trainer.id)}
//                   disabled={exportingTrainer.has(trainer.id)}
//                   className={`btn btn-sm ${exportingTrainer.has(trainer.id)
//                     ? 'bg-gray-400 cursor-not-allowed'
//                     : 'bg-green-600 text-white'
//                   }`}
//                 >
//                   {exportingTrainer.has(trainer.id) ? 'Exporting...' : 'Export Report'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }











'use client';

import { useEffect, useState } from 'react';
import { Badge } from "../Badge";
import Image from "next/image";
import TrainerStatsModal from '../TrainerStatsModal';

interface Trainer {
  id: number;
  name: string;
  email?: string;
  averageRating: number;
  clientsCount: number;
  experience?: number | null;
  specialization?: string | null;
  image?: string | null;
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i} className="text-yellow-400">★</span>);
  }

  if (halfStar) {
    stars.push(<span key="half" className="text-yellow-400">☆</span>);
  }

  while (stars.length < 5) {
    stars.push(<span key={'empty-' + stars.length} className="text-gray-500">☆</span>);
  }

  return stars;
}

export default function TrainerContent() {
  const [allTrainers, setAllTrainers] = useState<Trainer[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [exportingTrainer, setExportingTrainer] = useState<Set<number>>(new Set());
  const pageSize = 10;
  const [selectedTrainerId, setSelectedTrainerId] = useState<number | null>(null);

  useEffect(() => {
    fetchTrainerData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setTrainers(allTrainers.slice(start, end));
  }, [currentPage, allTrainers]);

  const fetchTrainerData = async () => {
    try {
      const res = await fetch('http://localhost:3000/admin/performance/AllTrainers');
      const data = await res.json();
      setAllTrainers(data);
      setTrainers(data.slice(0, pageSize));
    } catch (error) {
      console.error('Failed to fetch trainer stats:', error);
    }
  };

  const totalPages = Math.ceil(allTrainers.length / pageSize);

const handleExportPDF = async (trainerId: number) => {
  setExportingTrainer(prev => new Set(prev).add(trainerId));
  try {
    // Use the correct URL pattern for your API:
    const res = await fetch(`http://localhost:3000/admin/performance/${trainerId}/pdf?path=exports`);
    if (!res.ok) throw new Error('Failed to generate report');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trainer-progress-${trainerId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Export failed:', error);
    alert('Failed to export report');
  } finally {
    setExportingTrainer(prev => {
      const updated = new Set(prev);
      updated.delete(trainerId);
      return updated;
    });
  }
};


  return (
    <div className="overflow-x-auto slide-fade-in relative z-0" style={{ animationDelay: "0.2s" }}>
      <table className="table w-full text-base">
        <thead>
          <tr className="border-b-2 border-green-500">
            <th>Profile</th>
            <th className="text-center">Clients</th>
            <th className="text-center">Experience</th>
            <th className="text-center">Specialty</th>
            <th className="text-center">Avg Rating</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map((trainer, idx) => (
            <tr key={trainer.id} className="hover cursor-pointer row-fade-in" style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}>
              <td className="flex items-center gap-2">
                {trainer.image ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image src={trainer.image.trim()} alt={trainer.name} width={40} height={40} />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                    <span className="text-sm">
                      {(trainer.name ?? "T")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold">{trainer.name}</div>
                  <div className="text-sm text-gray-500">
                    {trainer.specialization?.toLowerCase().replace(/\s/g, "-")}
                  </div>
                </div>
              </td>
              <td className="text-center">{trainer.clientsCount}</td>
              <td className="text-center">{trainer.experience ?? "N/A"} yrs</td>
              <td className="text-center">
                <Badge className="bg-orange-600/20 text-orange-400">
                  {trainer.specialization ?? "N/A"}
                </Badge>
              </td>
              <td className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-yellow-400 font-semibold">{typeof trainer.averageRating === 'number' ? trainer.averageRating.toFixed(1) : "N/A"}</span>
                  <div className="flex">{renderStars(Number(trainer.averageRating ?? "N/A"))}</div>
                </div>
              </td>
              <td className="flex gap-2 justify-center">
                <button
                  className="btn btn-sm bg-blue-700 text-white"
                  onClick={() => setSelectedTrainerId(trainer.id)}
                >
                  See Stats
                </button>
                <button
                  onClick={() => handleExportPDF(trainer.id)}
                  disabled={exportingTrainer.has(trainer.id)}
                  className={`btn btn-sm ${
                    exportingTrainer.has(trainer.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {exportingTrainer.has(trainer.id) ? 'Exporting...' : 'Export Report'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center space-x-2">
        <button
          className="btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="bg-black-100 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>


        {selectedTrainerId !== null && (
        <TrainerStatsModal
          key={selectedTrainerId}
          trainerId={selectedTrainerId}
          onClose={() => setSelectedTrainerId(null)}
        />
      )}


    </div>
  );
}

