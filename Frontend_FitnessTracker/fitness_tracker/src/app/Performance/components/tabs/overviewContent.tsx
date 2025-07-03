'use client';
import WeeklyRatingChart from "../charts/WeeklyRatingChart";
import ExperienceDistributionChart from "../charts/ExperienceDistributionChart";

export default function OverviewContent({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="space-y-6 mt-6">
      {/* Weekly Rating Chart */}
      <WeeklyRatingChart darkMode={darkMode} />

      {/* Experience Distribution */}
      <ExperienceDistributionChart />
    </div>
  );
}
