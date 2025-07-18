'use client';
import { useState } from "react";
import CommonLayout from "../layouts/commonLayout";
import TopPerformerCard from "./components/TopPerformer/TopPerformerCard";
import TopPerformerModal from "./components/TopPerformer/TopPerformerModal";
import OverviewContent from "../Performance/components/tabs/overviewContent";
import TrainerContent from "../Performance/components/tabs/TrainerContent";
import NutritionistContent from "../Performance/components/tabs/NutritionistContent";
import ClientContent from "../Performance/components/tabs/ClientContent";
import { ModalData } from "../Performance/components/TopPerformer/types";

const tabOptions = ["Overview", "Trainers", "Nutritionists", "Clients"];

export default function PerformancePage() {
  const [modalData, setModalData] = useState<ModalData>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const [topTrainer, setTopTrainer] = useState<any>(null);
  const [topNutritionist, setTopNutritionist] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CommonLayout activePage="Performance">
      {({ darkMode }) => (
        <div className="space-y-6">
          {/* Top Performers Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* <TopPerformerCard
              type="trainer"
               onClick={() => topTrainer && setModalData(topTrainer)}
              setData={setTopTrainer}
            />
            <TopPerformerCard
              type="nutritionist"
              delay={0.2}
             onClick={() => topNutritionist && setModalData(topNutritionist)}
              setData={setTopNutritionist}
            /> */}

            <TopPerformerCard
              type="trainer"
              delay={0.1}  // <-- add a small delay to enable animation
              onClick={() => topTrainer && setModalData(topTrainer)}
              setData={setTopTrainer}
            />
            <TopPerformerCard
              type="nutritionist"
              delay={0.3}  // slightly longer delay for staggered animation
              onClick={() => topNutritionist && setModalData(topNutritionist)}
              setData={setTopNutritionist}
            />

          </div>

          <TopPerformerModal modalData={modalData} onClose={() => setModalData(null)} darkMode={darkMode} />

          {/* Tabs */}
          <div className={`tabs tabs-boxed w-fit ${darkMode ? "bg-zinc-900" : "bg-white"} rounded-xl shadow-md`}>
            {tabOptions.map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "tab-active bg-orange-500 text-white" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Content */}
          {activeTab === "Overview" && <OverviewContent darkMode={darkMode} />}
          {activeTab === "Trainers" && <TrainerContent />}
          {activeTab === "Nutritionists" && <NutritionistContent />}
          {activeTab === "Clients" && <ClientContent />}
        </div>
      )}
    </CommonLayout>
  );
}

