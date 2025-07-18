"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { ModalData } from "./types";
import TrainerRatingChart from "../charts/TrainerRatingTrendChart";
import TrainerGoalCompletionChart from "../charts/GoalCompletionChart";

interface TrainerChartData {
  rating: Array<{ date: string; averageRating: number }>;
  goal: Array<{ name: string; rate: number }>;
}

function getInitials(name: string) {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";
}

type Props = {
  modalData: ModalData;
  onClose: () => void;
  darkMode: boolean;
};

export default function TopPerformerModal({ modalData, onClose, darkMode }: Props) {
  const [showModal, setShowModal] = useState(false); // controls fade-in/out
  const [chartData, setChartData] = useState<TrainerChartData>({
    rating: [],
    goal: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const chartTitles = ["Rating Trend (Over Time)", "Goal Completion Rate"];

  useEffect(() => {
    // Fade in after mount
    setTimeout(() => setShowModal(true), 10);

    const fetchData = async () => {
      if (modalData?.type !== "trainer") return; // only fetch if trainer
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const [rating, goal] = await Promise.all([
          fetch(
            `${apiBase}/admin/performance/trainer/${modalData.data.id}/weekly-rating-chart-jsondata`
          ).then((r) => r.json()),
          fetch(
            `${apiBase}/admin/performance/trainer/${modalData.data.id}/goal-completion-jsondata`
          ).then((r) => r.json()),
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

  if (!modalData || !modalData.data) return null;

  const { name, image, rating, clients, specialization, certification, bio } = modalData.data;

  const bgClass = darkMode ? "bg-zinc-800 text-white" : "bg-white text-black";
  const subTextClass = darkMode ? "text-zinc-400" : "text-zinc-600";

  const handleClose = () => {
    // Fade out before calling parent onClose
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300); // match transition duration
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center 
        backdrop-blur-sm 
        transition-opacity duration-300
        ${showModal ? "opacity-100" : "opacity-0"}
        bg-white/30 dark:bg-black/30`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: '"Segoe UI", sans-serif' }}
        className={`relative w-11/12 max-w-4xl min-h-[300px] p-6 rounded-2xl shadow-xl 
          transform transition-all duration-300
          ${showModal ? "scale-100 opacity-100" : "scale-95 opacity-0"}
          ${bgClass} z-[9999]`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
        >
          ✕
        </button>

        {/* Profile Header */}
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

        {/* Details */}
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

        {/* Charts */}
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
                    onClick={() => setCurrentChartIndex((i) => i - 1)}
                    className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    ◀ Previous
                  </button>
                  <button
                    disabled={currentChartIndex === chartTitles.length - 1}
                    onClick={() => setCurrentChartIndex((i) => i + 1)}
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
