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
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiBase}/admin/performance/AllTrainers`);
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
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiBase}/admin/performance/${trainerId}/pdf?path=exports`);
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

