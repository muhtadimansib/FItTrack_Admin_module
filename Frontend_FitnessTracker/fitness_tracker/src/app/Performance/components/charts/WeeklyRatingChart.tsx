"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

type WeeklyRating = {
  week: string;
  avgRating: number;
};

type MergedRating = {
  week: string;
  trainer: number;
  nutritionist: number;
};

type Props = {
  darkMode: boolean;
};

export default function WeeklyRatingChart({ darkMode }: Props) {
  const [trainerRatings, setTrainerRatings] = useState<WeeklyRating[]>([]);
  const [nutritionistRatings, setNutritionistRatings] = useState<WeeklyRating[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const [trainerRes, nutritionistRes] = await Promise.all([
          fetch("http://localhost:3000/admin/performance/trainer-weekly-ratings"),
          fetch("http://localhost:3000/admin/performance/nutritionist-weekly-ratings"),
        ]);

        const trainerData = await trainerRes.json();
        const nutritionistData = await nutritionistRes.json();

        setTrainerRatings(trainerData);
        setNutritionistRatings(nutritionistData);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRatings();
  }, []);

  // Merge trainer & nutritionist data
  const allWeeks = Array.from(
    new Set([...trainerRatings.map(r => r.week), ...nutritionistRatings.map(r => r.week)])
  ).sort();

  const mergedData: MergedRating[] = allWeeks.map(week => ({
    week,
    trainer: trainerRatings.find(r => r.week === week)?.avgRating ?? 0,
    nutritionist: nutritionistRatings.find(r => r.week === week)?.avgRating ?? 0,
  }));

  if (loading) {
    return (
      <div className="text-center p-10 text-lg font-medium text-gray-500">Loading graphs...</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className={`p-4 rounded-xl shadow-md ${darkMode ? "bg-zinc-900" : "bg-base-200"}`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Monthly Average Client Ratings
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mergedData}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey="week" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis domain={[0, 5]} stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip />
            <Legend />
            <Bar dataKey="trainer" fill="#F97316" name="Trainer" />
            <Bar dataKey="nutritionist" fill="#34D399" name="Nutritionist" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className={`p-4 rounded-xl shadow-md ${darkMode ? "bg-zinc-900" : "bg-base-200"}`}>
        <h2 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-zinc-900"}`}>
          Monthly Average Client Ratings (Line Chart)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mergedData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#555" : "#ccc"} />
            <XAxis dataKey="week" stroke={darkMode ? "#fff" : "#000"} />
            <YAxis domain={[0, 5]} stroke={darkMode ? "#fff" : "#000"} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trainer" stroke="#F97316" name="Trainer" />
            <Line type="monotone" dataKey="nutritionist" stroke="#34D399" name="Nutritionist" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
