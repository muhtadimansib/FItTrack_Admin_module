'use client';

import { useEffect, useState } from 'react';
import StepCountChart from '../components/charts/StepCountChart';
import SleepHoursChart from '../components/charts/SleepHoursChart';
import SleepEfficiencyChart from '../components/charts/SleepEfficiencyChart';
import BubbleChart from './charts/BubbleChart';

interface Props {
  clientId: number;
  onClose: () => void;
}

export default function ClientStatsModal({ clientId, onClose }: Props) {
  const [currentChartIndex, setCurrentChartIndex] = useState(0);
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false); // For animation

  const charts = ['Scatter Plot (Burned Calories vs Step Counts) ', 'Sleep Hours Over time', 'Scatter Plot (Burned Calories vs Sleep Effieciency)', 'Bubble Chart of Steps vs calories burned'];

  // Detect theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setDarkMode(savedTheme === 'dark');

    const onStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setDarkMode(e.newValue === 'dark');
      }
    };

    window.addEventListener('storage', onStorageChange);
    return () => window.removeEventListener('storage', onStorageChange);
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const [step, sleep, efficiency, bubble] = await Promise.all([
          fetch(`${apiBase}/client-progress/chart/step-count/${clientId}`).then((r) => r.json()),
          fetch(`${apiBase}/client-progress/chart/sleep-hours/${clientId}`).then((r) => r.json()),
          fetch(`${apiBase}/client-progress/chart/sleep-efficiency/${clientId}`).then((r) => r.json()),
          fetch(`${apiBase}/client-progress/chart/bubble/${clientId}`).then((r) => r.json()),
        ]);

        setChartData({ step, sleep, efficiency, bubble });
      } catch (error) {
        console.error('Chart data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    setTimeout(() => setShowModal(true), 10); // Trigger animation after mount
  }, [clientId]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => onClose(), 300); // Delay close until animation ends
  };

  const renderChart = () => {
    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (!chartData.step || !chartData.sleep || !chartData.efficiency || !chartData.bubble) {
      return <p className="text-center text-red-500">Chart data not available.</p>;
    }

    switch (currentChartIndex) {
      case 0:
        return  <StepCountChart {...chartData.step} darkMode={darkMode} />;
      case 1:
        return <SleepHoursChart {...chartData.sleep} darkMode={darkMode} />;
      case 2:
        return <SleepEfficiencyChart {...chartData.efficiency} darkMode={darkMode} />;
      case 3:
        return <BubbleChart {...chartData.bubble} darkMode={darkMode} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex items-center justify-center z-50">
      <div
        style={{ fontFamily: '"Segoe UI", sans-serif' }}
        className={`w-11/12 max-w-4xl p-6 rounded-2xl shadow-xl transform transition-all duration-300 ${
          darkMode ? 'bg-zinc-800 text-white' : 'bg-white text-black'
        } ${showModal ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            {charts[currentChartIndex]}
          </h2>
          <button
            onClick={handleClose}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            ✕ 
          </button>
        </div>

        {/* Chart Content */}
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
            disabled={currentChartIndex === charts.length - 1}
            onClick={() => setCurrentChartIndex((i) => i + 1)}
            className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

