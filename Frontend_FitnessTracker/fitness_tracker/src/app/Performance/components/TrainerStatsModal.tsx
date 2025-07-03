// 'use client';

// import { useEffect, useState } from 'react';
// import TrainerRatingChart from '../components/charts/TrainerRatingTrendChart';
// import TrainerGoalCompletionChart from '../components/charts/GoalCompletionChart';

// interface Props {
//   trainerId: number;
//   onClose: () => void;
// }

// export default function TrainerStatsModal({ trainerId, onClose }: Props) {
//   const [currentChartIndex, setCurrentChartIndex] = useState(0);
//   const [chartData, setChartData] = useState<any>({});
//   const [loading, setLoading] = useState(true);
//   const [darkMode, setDarkMode] = useState(false);
//   const [showModal, setShowModal] = useState(false);

//   const chartTitles = ['Rating Trend (Over Time)', 'Goal Completion Rate'];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     setDarkMode(savedTheme === 'dark');

//     const onStorageChange = (e: StorageEvent) => {
//       if (e.key === 'theme') setDarkMode(e.newValue === 'dark');
//     };

//     window.addEventListener('storage', onStorageChange);
//     return () => window.removeEventListener('storage', onStorageChange);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [rating, goal] = await Promise.all([
//           fetch(`http://localhost:3000/admin/performance/trainer/${trainerId}/weekly-rating-chart-jsondata`).then(r => r.json()),
//           fetch(`http://localhost:3000/admin/performance/trainer/${trainerId}/goal-completion-jsondata`).then(r => r.json()),
//         ]);

//         setChartData({ rating, goal });
//       } catch (err) {
//         console.error('Failed to fetch trainer stats charts:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     setTimeout(() => setShowModal(true), 10);
//   }, [trainerId]);

//   const handleClose = () => {
//     setShowModal(false);
//     setTimeout(() => onClose(), 300);
//   };

//   const renderChart = () => {
//     if (loading) return <p className="text-center p-4">Loading...</p>;
//     if (!chartData.rating || !chartData.goal) {
//       return <p className="text-center text-red-500">Chart data not available.</p>;
//     }

//     switch (currentChartIndex) {
//       case 0:
//         return <TrainerRatingChart data={chartData.rating} darkMode={darkMode} />;
//       case 1:
//         return <TrainerGoalCompletionChart data={chartData.goal} darkMode={darkMode} />;
//       default:
//         return null;
//     }
//   };

//   return (
// <div className="fixed inset-0 backdrop-blur-lg bg-white/40 dark:bg-black/40 flex items-center justify-center z-50">
//   <div
//     className={`w-11/12 max-w-4xl p-6 rounded-2xl shadow-xl transform transition-all duration-300 ${
//       darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
//     } ${showModal ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
//   >
//         {/* Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-bold">{chartTitles[currentChartIndex]}</h2>
//           <button onClick={handleClose} className="text-red-600 hover:text-red-800 font-semibold">
//             ✕
//           </button>
//         </div>

//         {/* Chart Display */}
//         {renderChart()}

//         {/* Footer Navigation */}
//         <div className="flex justify-between mt-4">
//           <button
//             disabled={currentChartIndex === 0}
//             onClick={() => setCurrentChartIndex((i) => i - 1)}
//             className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             ◀ Previous
//           </button>
//           <button
//             disabled={currentChartIndex === chartTitles.length - 1}
//             onClick={() => setCurrentChartIndex((i) => i + 1)}
//             className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//           >
//             Next ▶
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











'use client';

import { useEffect, useState } from 'react';
import TrainerRatingChart from '../components/charts/TrainerRatingTrendChart';
import TrainerGoalCompletionChart from '../components/charts/GoalCompletionChart';
import { createPortal } from 'react-dom';

interface Props {
  trainerId: number;
  onClose: () => void;
}

export default function TrainerStatsModal({ trainerId, onClose }: Props) {
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const chartTitles = ['Rating Trend (Over Time)', 'Goal Completion Rate'];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');

    const onStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') setDarkMode(e.newValue === 'dark');
    };

    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [rating, goal] = await Promise.all([
          fetch(`http://localhost:3000/admin/performance/trainer/${trainerId}/weekly-rating-chart-jsondata`).then(r => r.json()),
          fetch(`http://localhost:3000/admin/performance/trainer/${trainerId}/goal-completion-jsondata`).then(r => r.json()),
        ]);
        setChartData({ rating, goal });
      } catch (err) {
        console.error('Failed to fetch trainer stats charts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setTimeout(() => setShowModal(true), 10);
  }, [trainerId]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300);
  };

  const renderChart = () => {
    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (!chartData.rating || !chartData.goal) {
      return <p className="text-center text-red-500">Chart data not available.</p>;
    }

    switch (currentChartIndex) {
      case 0:
        return <TrainerRatingChart data={chartData.rating} darkMode={darkMode} />;
      case 1:
        return <TrainerGoalCompletionChart data={chartData.goal} darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return createPortal(
  <div
    className={`
      fixed inset-0 z-50 flex items-center justify-center
      backdrop-blur-sm bg-white/30 dark:bg-black/30
    `}
  >
    <div
      style={{ fontFamily: '"Segoe UI", sans-serif' }}
      className={`
        w-11/12 max-w-4xl p-6 rounded-2xl shadow-xl
        transform transition-all duration-300
        ${darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'}
        ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
      `}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{chartTitles[currentChartIndex]}</h2>
        <button
          onClick={handleClose}
          className="text-red-600 hover:text-red-800 font-semibold text-xl"
        >
          ✕
        </button>
      </div>

      {/* Chart Display */}
      {renderChart()}

      {/* Footer Navigation */}
      <div className="flex justify-between mt-4">
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
    </div>
  </div>,
  document.body
);
}
