// 'use client';
// export default function ClientsTab() {
//   return (
//     <div className="mt-6">
//       <h2 className="text-lg font-bold mb-4">Clients Overview</h2>
//       <p className="text-gray-500">Client engagement stats coming soon...</p>
//     </div>
//   );
// }





// 'use client';

// import Image from 'next/image';

// interface Client {
//   name: string;
//   email: string;
//   age?: number | string;
//   gender?: string;
//   image?: string;
//   goalsCompleted: number;
//   bmi: number;
//   sleepHours: number;
// }

// const clientData: Client[] = [
//   {
//     name: "Sophia Martinez",
//     email: "sophia.martinez@example.com",
//     age: 28,
//     gender: "Female",
//     goalsCompleted: 5,
//     bmi: 22.1,
//     sleepHours: 7.5,
//     image: "",
//   },
//   {
//     name: "David Wilson",
//     email: "david.wilson@example.com",
//     age: 35,
//     gender: "Male",
//     goalsCompleted: 3,
//     bmi: 28.3,
//     sleepHours: 6.2,
//     image: "",
//   },
//   {
//     name: "Emma Green",
//     email: "emma.green0@example.com",
//     age: 26,
//     gender: "Female",
//     goalsCompleted: 7,
//     bmi: 24.8,
//     sleepHours: 8,
//     image: "",
//   },
// ];

// export default function ClientsTab() {
//   return (
//     <div className="overflow-x-auto slide-fade-in relative z-0" style={{ animationDelay: "0.2s" }}>
//       <table className="table w-full text-base">
//         <thead>
//           <tr className="border-b-2 border-green-500 z-0">
//             <th>Profile</th>
//             <th className="text-center">Age</th>
//             <th className="text-center">Gender</th>
//             <th className="text-center">Goals Completed</th>
//             <th className="text-center">BMI</th>
//             <th className="text-center">Sleep Hours</th>
//             <th className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clientData.map((client, idx) => (
//             <tr
//               key={idx}
//               className="hover cursor-pointer row-fade-in"
//               style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}
//             >
//               <td className="flex items-center gap-1 py-2">
//                 {client.image ? (
//                   <div className="avatar">
//                     <div className="w-15 rounded-full">
//                       <Image src={client.image.trim()} alt={client.name} width={40} height={40} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="avatar avatar-placeholder">
//                     <div className="bg-base-300 text-base-content w-15 rounded-full flex items-center justify-center">
//                       <span className="text-sm font-semibold">
//                         {(client.name ?? "C")
//                           .split(" ")
//                           .map((n: string) => n[0])
//                           .join("")
//                           .toUpperCase()
//                           .slice(0, 2)}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold">{client.name}</div>
//                   <div className="text-sm text-gray-500">{client.email}</div>
//                 </div>
//               </td>
//               <td className="text-center align-middle">{client.age ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.gender ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.goalsCompleted}</td>
//               <td className="text-center align-middle">{client.bmi}</td>
//               <td className="text-center align-middle">{client.sleepHours} hrs</td>
//               <td className="flex gap-2 justify-center align-middle">
//                 <button className="btn btn-sm bg-blue-700 text-white hover:bg-blue-800">
//                   See Stats
//                 </button>
//                 <button className="px-3 py-1 text-sm font-medium rounded bg-green-600 text-white hover:bg-green-700">
//                   Export PDF
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }




// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import ClientStatsModal from '../ClientStatsModal';

// interface Client {
//   id: number;
//   name: string;
//   email: string;
//   age: number | string;
//   gender: string;
//   goalsCompleted: number | string;
//   bmi: number | string;
//   averageSleepHours: number | string;
//   profileImageUrl?: string;
// }

// export default function ClientsTab() {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
//   const pageSize = 10;

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   const fetchData = async (page: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/client-progress/stats`);
//       const data = await res.json();
//       const start = (page - 1) * pageSize;
//       const end = start + pageSize;
//       setClients(data.slice(start, end));
//     } catch (error) {
//       console.error('Failed to fetch client stats:', error);
//     }
//   };

//   const totalPages = Math.ceil(clients.length < pageSize ? pageSize : 50 / pageSize); // Adjust for real count


//   const [exportingClients, setExportingClients] = useState<Set<number>>(new Set());
// const handleExportPDF = async (clientId: number) => {
//   setExportingClients(prev => new Set(prev).add(clientId));

//   try {
//     const res = await fetch(`http://localhost:3000/client-progress/${clientId}/pdf?path=exports`);
//     if (!res.ok) throw new Error('Failed to generate report');

//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `client-progress-${clientId}.pdf`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error('Export failed:', error);
//     alert('Failed to export report');
//   } finally {
//     setExportingClients(prev => {
//       const updated = new Set(prev);
//       updated.delete(clientId);
//       return updated;
//     });
//   }
// };


//   return (
//     <div className="overflow-x-auto slide-fade-in relative z-0" style={{ animationDelay: "0.2s" }}>
//       <table className="table w-full text-base">
//         <thead>
//           <tr className="border-b-2 border-green-500 z-0">
//             <th>Profile</th>
//             <th className="text-center align-middle">Age</th>
//             <th className="text-center align-middle">Gender</th>
//             <th className="text-center align-middle">Goals Completed</th>
//             <th className="text-center align-middle">BMI</th>
//             <th className="text-center align-middle">Sleep Hours (hrs)</th>
//             <th className="text-center align-middle">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, idx) => (
//             <tr
//               key={client.id}
//               className="row-fade-in"
//               style={{ "--delay": `${idx * 0.05}s` } as React.CSSProperties}
//             >
//               <td className="flex items-center gap-1 py-2">
//                 {client.profileImageUrl ? (
//                   <div className="avatar">
//                     <div className="w-15 rounded-full">
//                       <Image src={client.profileImageUrl.trim()} alt={client.name} width={40} height={40} />
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="avatar avatar-placeholder">
//                     <div className="bg-base-300 text-base-content w-15 rounded-full flex items-center justify-center">
//                       <span className="text-sm font-semibold">
//                         {(client.name ?? "C")
//                           .split(" ")
//                           .map((n: string) => n[0])
//                           .join("")
//                           .toUpperCase()
//                           .slice(0, 2)}
//                       </span>
//                     </div>
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold">{client.name}</div>
//                   <div className="text-sm text-gray-500">{client.email}</div>
//                 </div>
//               </td>
//               <td className="text-center align-middle">{client.age ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.gender ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.goalsCompleted ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.bmi ?? "N/A"}</td>
//               <td className="text-center align-middle">{client.averageSleepHours ?? "N/A"}</td>
//               <td className="flex gap-2 justify-center align-middle">
//                 <button className="btn btn-sm bg-blue-700 text-white hover:bg-blue-800" onClick={() => setSelectedClientId(client.id)}>
//                   See Stats
//                 </button>
//                 <button
//                   onClick={() => handleExportPDF(client.id)}
//                   disabled={exportingClients.has(client.id)}
//                   className={`btn btn-sm ${
//                     exportingClients.has(client.id)
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-green-600 hover:bg-green-700 text-white'
//                   }`}
//                 >
//                   {exportingClients.has(client.id) ? 'Exporting...' : 'Export Report'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="mt-4 flex justify-center space-x-2">
//         <button
//           className="btn btn-sm bg-orange-300 text-black hover:bg-orange-500"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//         >
//           Prev
//         </button>
//         <span className="px-3 py-1 rounded bg-gray-100 text-black font-semibold">
//           Page {currentPage}
//         </span>
//         <button
//           className="btn btn-sm bg-orange-300 text-black hover:bg-orange-500"
//           disabled={currentPage >= totalPages}
//           onClick={() => setCurrentPage(prev => prev + 1)}
//         >
//           Next
//         </button>
//       </div>

// {selectedClientId !== null && (
//   <ClientStatsModal
//     clientId={selectedClientId}
//     onClose={() => setSelectedClientId(null)}
//   />
// )}
      

//     </div>
//   );
// }



















// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import ClientStatsModal from '../ClientStatsModal';

// interface Client {
//   id: number;
//   name: string;
//   email: string;
//   age: number | string;
//   gender: string;
//   goalsCompleted: number | string;
//   bmi: number | string;
//   averageSleepHours: number | string;
//   profileImageUrl?: string;
// }

// export default function ClientsTab() {
//   const [clients, setClients] = useState<Client[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalClients, setTotalClients] = useState(0);
//   const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const pageSize = 10;

//   useEffect(() => {
//     fetchData(currentPage);
//   }, [currentPage]);

//   const fetchData = async (page: number) => {
//     try {
//       const res = await fetch(`http://localhost:3000/client-progress/stats`);
//       const data = await res.json();
//       const start = (page - 1) * pageSize;
//       const end = start + pageSize;
//       setTotalClients(clients.length);
//       setClients(data.slice(start, end));
//     } catch (error) {
//       console.error('Failed to fetch client stats:', error);
//     }
//   };

//   const totalPages = Math.ceil(clients.length < pageSize ? pageSize : 50 / pageSize)-1;

//   const [exportingClients, setExportingClients] = useState<Set<number>>(new Set());
//   const handleExportPDF = async (clientId: number) => {
//     setExportingClients(prev => new Set(prev).add(clientId));
//     try {
//       const res = await fetch(`http://localhost:3000/client-progress/${clientId}/pdf?path=exports`);
//       if (!res.ok) throw new Error('Failed to generate report');
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `client-progress-${clientId}.pdf`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error('Export failed:', error);
//       alert('Failed to export report');
//     } finally {
//       setExportingClients(prev => {
//         const updated = new Set(prev);
//         updated.delete(clientId);
//         return updated;
//       });
//     }
//   };

//   return (
//     <div className="overflow-x-auto relative z-0">
//       <table className="table w-full text-base">
//         <thead>
//           <tr className="border-b-2 border-green-500">
//             <th>Profile</th>
//             <th className="text-center">Age</th>
//             <th className="text-center">Gender</th>
//             <th className="text-center">Goals Completed</th>
//             <th className="text-center">BMI</th>
//             <th className="text-center">Sleep Hours</th>
//             <th className="text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client,index) => (
//                <tr
//       key={client.id}
//       className="hover cursor-pointer row-fade-in"
//       style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
//     >
//               <td className="flex items-center gap-2">
//                 {client.profileImageUrl ? (
//                   <Image src={client.profileImageUrl} alt={client.name} width={40} height={40} className="rounded-full" />
//                 ) : (
//                   <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//                     <span className="text-sm font-semibold">
//                       {(client.name ?? "C")
//                         .split(" ")
//                         .map((n: string) => n[0])
//                         .join("")
//                         .toUpperCase()
//                         .slice(0, 2)}
//                     </span>
//                   </div>
//                 )}
//                 <div>
//                   <div className="font-semibold">{client.name}</div>
//                   <div className="text-sm text-gray-500">{client.email}</div>
//                 </div>
//               </td>
//               <td className="text-center">{client.age}</td>
//               <td className="text-center">{client.gender}</td>
//               <td className="text-center">{client.goalsCompleted}</td>
//               <td className="text-center">{client.bmi}</td>
//               <td className="text-center">{client.averageSleepHours}</td>
//               <td className="flex gap-2 justify-center">
//                 <button
//                   className="btn btn-sm bg-blue-700 text-white"
//                   onClick={() => setSelectedClientId(client.id)}
//                 >
//                   See Stats
//                 </button>
//                 <button
//                   onClick={() => handleExportPDF(client.id)}
//                   disabled={exportingClients.has(client.id)}
//                   className={`btn btn-sm ${
//                     exportingClients.has(client.id)
//                       ? 'bg-gray-400 cursor-not-allowed'
//                       : 'bg-green-600 text-white'
//                   }`}
//                 >
//                   {exportingClients.has(client.id) ? 'Exporting...' : 'Export Report'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-4 flex justify-center space-x-2">
//         <button
//           className="btn btn-sm"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//         >
//           Prev
//         </button>
//         <span className="bg-black-100 font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className="btn btn-sm"
//           disabled={currentPage >= totalPages}
//           onClick={() => setCurrentPage(prev => prev + 1)}
//         >
//           Next
//         </button>
//       </div>

//       {selectedClientId !== null && (
//         <ClientStatsModal
//           key={selectedClientId}
//           clientId={selectedClientId}
//           onClose={() => setSelectedClientId(null)}
//         />
//       )}
//     </div>
//   );
// }
























'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ClientStatsModal from '../ClientStatsModal';

interface Client {
  id: number;
  name: string;
  email: string;
  age: number | string;
  gender: string;
  goalsCompleted: number | string;
  bmi: number | string;
  averageSleepHours: number | string;
  profileImageUrl?: string;
}

export default function ClientsTab() {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const pageSize = 10;

useEffect(() => {
  fetchData();
}, []);
useEffect(() => {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  setClients(allClients.slice(start, end));
}, [currentPage, allClients]);

const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:3000/client-progress/stats`);
    const data = await res.json();

    setAllClients(data); // store full data
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setClients(data.slice(start, end));
  } catch (error) {
    console.error('Failed to fetch client stats:', error);
  }
};

const totalPages = Math.ceil(allClients.length / pageSize);

  const [exportingClients, setExportingClients] = useState<Set<number>>(new Set());
  const handleExportPDF = async (clientId: number) => {
    setExportingClients(prev => new Set(prev).add(clientId));
    try {
      const res = await fetch(`http://localhost:3000/client-progress/${clientId}/pdf?path=exports`);
      if (!res.ok) throw new Error('Failed to generate report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `client-progress-${clientId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report');
    } finally {
      setExportingClients(prev => {
        const updated = new Set(prev);
        updated.delete(clientId);
        return updated;
      });
    }
  };

  return (
    <div className="overflow-x-auto relative z-0">
      <table className="table w-full text-base">
        <thead>
          <tr className="border-b-2 border-green-500">
            <th>Profile</th>
            <th className="text-center">Age</th>
            <th className="text-center">Gender</th>
            <th className="text-center">Goals Completed</th>
            <th className="text-center">BMI</th>
            <th className="text-center">Sleep Hours</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client,index) => (
               <tr
      key={client.id}
      className="hover cursor-pointer row-fade-in"
      style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
    >
              <td className="flex items-center gap-2">
                {client.profileImageUrl ? (
                  <Image src={client.profileImageUrl} alt={client.name} width={40} height={40} className="rounded-full" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {(client.name ?? "C")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold">{client.name}</div>
                  <div className="text-sm text-gray-500">{client.email}</div>
                </div>
              </td>
              <td className="text-center">{client.age}</td>
              <td className="text-center">{client.gender}</td>
              <td className="text-center">{client.goalsCompleted}</td>
              <td className="text-center">{client.bmi}</td>
              <td className="text-center">{client.averageSleepHours}</td>
              <td className="flex gap-2 justify-center">
                <button
                  className="btn btn-sm bg-blue-700 text-white"
                  onClick={() => setSelectedClientId(client.id)}
                >
                  See Stats
                </button>
                <button
                  onClick={() => handleExportPDF(client.id)}
                  disabled={exportingClients.has(client.id)}
                  className={`btn btn-sm ${
                    exportingClients.has(client.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {exportingClients.has(client.id) ? 'Exporting...' : 'Export Report'}
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

      {selectedClientId !== null && (
        <ClientStatsModal
          key={selectedClientId}
          clientId={selectedClientId}
          onClose={() => setSelectedClientId(null)}
        />
      )}
    </div>
  );
}