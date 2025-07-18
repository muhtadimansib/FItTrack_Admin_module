"use client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { LoaderCircle } from "lucide-react";

// Define types
type ExperienceItem = {
  experienceRange: string;
  count: number;
};

type MergedExperienceItem = {
  experienceRange: string;
  trainerCount: number;
  nutritionistCount: number;
};

export default function ExperienceDistributionChart() {
  const [experienceData, setExperienceData] = useState<MergedExperienceItem[]>([]);
  const [expChartLoading, setExpChartLoading] = useState(true);

  useEffect(() => {
    async function fetchExperienceData() {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL;
        const [trainerRes, nutritionistRes] = await Promise.all([
          fetch(`${apiBase}/admin/performance/trainer/experience-distribution`),
          fetch(`${apiBase}/admin/performance/nutritionist/experience-distribution`),
        ]);

        const trainerData: ExperienceItem[] = await trainerRes.json();
        const nutritionistData: ExperienceItem[] = await nutritionistRes.json();

        const merged: MergedExperienceItem[] = trainerData.map((trainerItem) => {
          const match = nutritionistData.find(
            (n) => n.experienceRange === trainerItem.experienceRange
          );
          return {
            experienceRange: trainerItem.experienceRange,
            trainerCount: trainerItem.count,
            nutritionistCount: match ? match.count : 0,
          };
        });

        setExperienceData(merged);
      } catch (error) {
        console.error("Error fetching experience distribution:", error);
      } finally {
        setExpChartLoading(false);
      }
    }

    fetchExperienceData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Experience Distribution</h2>
      <div className="bg-base-200 rounded-xl p-4 shadow-md">
        {expChartLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoaderCircle className="animate-spin h-8 w-8 text-gray-500" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={experienceData}>
              <CartesianGrid stroke="none" />
              <XAxis dataKey="experienceRange" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trainerCount" fill="#4F46E5" name="Trainers" />
              <Bar dataKey="nutritionistCount" fill="#10B981" name="Nutritionists" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
