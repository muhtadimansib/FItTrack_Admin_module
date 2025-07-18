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
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiBase}/client-progress/stats`);
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
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/client-progress/${clientId}/pdf?path=exports`);
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