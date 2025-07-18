'use client';

import { useEffect, useState } from 'react';
import { Badge } from "../Badge";
import Image from "next/image";
import NutritionistStatsModal from '../NutritionistStatsModal';

interface Nutritionist {
  id: number;
  name: string;
  email?: string;
  averageRating: number | string;
  clientsCount: number | string;
  experience?: number | null;
  specialization?: string | null;
  image?: string | null;
}

function renderStars(rating: number | string) {
  if (typeof rating !== 'number') return <span className="text-gray-400">N/A</span>;

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

export default function NutritionistsTab() {
  const [allNutritionists, setAllNutritionists] = useState<Nutritionist[]>([]);
  const [nutritionists, setNutritionists] = useState<Nutritionist[]>([]);
  const [selectedNutritionistId, setSelectedNutritionistId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [exportingNutritionist, setExportingNutritionist] = useState<Set<number>>(new Set());
  const pageSize = 10;

  useEffect(() => {
    fetchNutritionistData();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    setNutritionists(allNutritionists.slice(start, end));
  }, [currentPage, allNutritionists]);

  const fetchNutritionistData = async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/admin/performance/AllNutritionists`);
      const data = await res.json();
      setAllNutritionists(data);
      setNutritionists(data.slice(0, pageSize));
    } catch (error) {
      console.error('Failed to fetch nutritionist stats:', error);
    }
  };

  const totalPages = Math.ceil(allNutritionists.length / pageSize);

  // Export PDF handler
  const handleExportPDF = async (nutritionistId: number) => {
    setExportingNutritionist(prev => new Set(prev).add(nutritionistId));
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/admin/performance/nutritionist/${nutritionistId}/pdf?path=exports`);
      if (!res.ok) throw new Error('Failed to generate report');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nutritionist-progress-${nutritionistId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export report');
    } finally {
      setExportingNutritionist(prev => {
        const updated = new Set(prev);
        updated.delete(nutritionistId);
        return updated;
      });
    }
  };

  return (
    <div className="overflow-x-auto slide-fade-in relative z-0">
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
          {nutritionists.map((n, idx) => (
            <tr key={n.id} className="hover row-fade-in" style={{ "--delay": `${idx * 0.1}s` } as React.CSSProperties}>
              <td className="flex items-center gap-2">
                {n.image ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <Image src={n.image.trim()} alt={n.name} width={40} height={40} />
                    </div>
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-base-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {(n.name ?? "N")
                        .split(" ")
                        .map((s: string) => s[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-semibold">{n.name}</div>
                  <div className="text-sm text-gray-500">{n.email}</div>
                </div>
              </td>
              <td className="text-center">{n.clientsCount ?? "NA"}</td>
              <td className="text-center">{n.experience ?? "NA"} yrs</td>
              <td className="text-center">
                <Badge className="bg-orange-600/20 text-orange-400">{n.specialization ?? "N/A"}</Badge>
              </td>
              <td className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-yellow-400 font-semibold">
                    {typeof n.averageRating === 'number' ? n.averageRating.toFixed(1) : ""}
                  </span>
                  <div className="flex">{renderStars(n.averageRating)}</div>
                </div>
              </td>
              <td className="text-center flex justify-center gap-2">
                {/* Action buttons here */}
                <button
                  className="btn btn-sm bg-blue-700 text-white"
                  onClick={() => setSelectedNutritionistId(n.id)}
                >
                  See Stats
                </button>
                <button
                  className={`btn btn-sm ${exportingNutritionist.has(n.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white'}`}
                  onClick={() => handleExportPDF(n.id)}
                  disabled={exportingNutritionist.has(n.id)}
                >
                  {exportingNutritionist.has(n.id) ? 'Exporting...' : 'Export Report'}
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


      {selectedNutritionistId !== null && (
  <NutritionistStatsModal
    key={selectedNutritionistId}
    nutritionistId={selectedNutritionistId}
    onClose={() => setSelectedNutritionistId(null)}
  />
)}

    </div>
  );
}


