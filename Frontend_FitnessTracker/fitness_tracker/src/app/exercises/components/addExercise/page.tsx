"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Upload, Play, ArrowLeft, Dumbbell } from "lucide-react";
import CommonLayout from "@/app/layouts/commonLayout";
import successLottie from "@/../public/lottie/success.json";
import Lottie from "lottie-react";

const categories = ["Strength", "Cardio", "Flexibility", "Core", "HIIT", "Yoga", "Pilates", "Sports"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];
const muscleGroupOptions = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Glutes", "Core", "Full Body"];
const equipmentOptions = ["None (Bodyweight)", "Dumbbells", "Barbell", "Resistance Bands", "Kettlebell", "Pull-up Bar", "Bench", "Machine"];

export default function AddExercisePage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    duration: "",
    calories: "",
    level: "",
    muscleGroup: "",
    equipment: "",
    videoUrl: "",
  });


  return (
    <CommonLayout activePage="Exercises">
      {({ darkMode }) => {
        const inputClass = `w-full rounded-md px-3 py-2 border text-sm placeholder-gray-400 
          ${darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-gray-300 text-black"}`;

        const sectionClass = `p-6 rounded-xl border shadow-sm 
          ${darkMode ? "bg-zinc-900 border-zinc-700" : "bg-gray-100 border-gray-300"}`;

        const labelClass = `block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`;

        const handleChange = (field: string, value: string) => {
          setFormData((prev) => ({ ...prev, [field]: value }));
        };

        const handleReset = () => {
          setFormData({
            name: "",
            description: "",
            type: "",
            duration: "",
            calories: "",
            level: "",
            muscleGroup: "",
            equipment: "",
            videoUrl: "",
          });
        };

        const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          const { name, type, description, level } = formData;

          if (!name || !type || !description || !level) {
            alert("Please fill in required fields: Name, Category, Description, Difficulty");
            return;
          }

          try {
            //Check for duplicate by name (case-insensitive)
            const apiBase = process.env.NEXT_PUBLIC_API_URL;
            const checkRes = await fetch(`${apiBase}/exercises/name/${encodeURIComponent(name)}`);
            if (checkRes.ok) {
              const existing = await checkRes.json();
              if (existing && existing.name?.toLowerCase() === name.toLowerCase()) {
                alert("An exercise with this name already exists!");
                return;
              }
            }

            //Proceed to create new exercise
            const createRes = await fetch(`${apiBase}/exercises/create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });

            if (createRes.ok) {
              setShowSuccess(true);
              setTimeout(() => {
                router.push("/exercises");
              }, 1800);
            } else {
              const errMsg = await createRes.text();
              alert("Failed to add exercise: Same name already Exists");
            }
          } catch (error) {
            console.error("Error submitting:", error);
            alert("Something went wrong. Please try again.");
          }
        };



        return (
          <main className="w-full">
            {/* Header */}
            <div className="relative flex items-center mb-6">
              {/* Back button on the left */}
              <button
                onClick={() => router.push("/exercises")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${darkMode ? "text-gray-300 hover:bg-zinc-800" : "text-gray-700 hover:bg-gray-200"}`}
              >
                <ArrowLeft size={16} />
                Back to Exercises
              </button>

              {/* Centered heading */}
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-emerald-500">
                Add New Exercise
              </h1>
            </div>


            <form onSubmit={handleSubmit} className="space-y-10 w-full mx-auto px-1">
              {/* Container for side-by-side sections */}
              <div className="flex flex-col md:flex-row gap-y-8 gap-x-12">
                {/* Basic Information */}
                <section className={`${sectionClass} md:w-6/12`}>
                  <h2 className="text-emerald-400 font-semibold text-lg mb-6">Basic Information</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>Exercise Name *</label>
                      <input
                        id="name"
                        value={formData.name}
                        onChange={e => handleChange("name", e.target.value)}
                        placeholder="e.g., Push Up"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className={labelClass}>Category *</label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={e => handleChange("type", e.target.value)}
                        className={inputClass}
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="description" className={labelClass}>Description *</label>
                      <textarea
                        id="description"
                        rows={4}
                        placeholder="Describe the exercise..."
                        value={formData.description}
                        onChange={e => handleChange("description", e.target.value)}
                        className={`${inputClass} resize-none`}
                        required
                      />
                    </div>
                  </div>
                </section>

                {/* Exercise Details */}
                <section className={`${sectionClass} md:w-6/12`}>
                  <h2 className="text-emerald-400 font-semibold text-lg mb-6">Exercise Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Duration (minutes)</label>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={e => handleChange("duration", e.target.value)}
                        placeholder="15"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Calories Burned</label>
                      <input
                        type="number"
                        value={formData.calories}
                        onChange={e => handleChange("calories", e.target.value)}
                        placeholder="100"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Difficulty *</label>
                      <select
                        value={formData.level}
                        onChange={e => handleChange("level", e.target.value)}
                        className={inputClass}
                        required
                      >
                        <option value="">Select Level</option>
                        {difficulties.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Muscle Group</label>
                      <select
                        value={formData.muscleGroup}
                        onChange={e => handleChange("muscleGroup", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        {muscleGroupOptions.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Equipment</label>
                      <select
                        value={formData.equipment}
                        onChange={e => handleChange("equipment", e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select</option>
                        {equipmentOptions.map(eq => (
                          <option key={eq} value={eq}>{eq}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
              </div>

              {/* Video & Media */}
              <section className={sectionClass}>
                <h2 className="text-emerald-400 font-semibold text-lg mb-6">Video & Media</h2>

                {/* URL Input and Preview Button */}
                <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={e => handleChange("videoUrl", e.target.value)}
                    placeholder="https://youtube.com/watch?v=..."
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-emerald-400 hover:underline"
                    onClick={() => window.open(formData.videoUrl, "_blank")}
                    disabled={!formData.videoUrl}
                  >
                    <Play size={16} />
                    Preview
                  </button>
                </div>

                {/* File Upload Area */}
                <div
                  className={`mt-2 p-6 border-2 border-dashed rounded-lg text-center ${darkMode ? "border-zinc-600 text-zinc-400" : "border-gray-300 text-gray-500"}`}
                >
                  <Upload className="mx-auto mb-2 w-8 h-8" />
                  <p className="mb-2">Upload a tutorial video (MP4, WebM, etc.)</p>

                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    id="videoUpload"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const videoUrl = URL.createObjectURL(file);
                        setFormData(prev => ({ ...prev, videoUrl }));
                      }
                    }}
                  />
                  <label
                    htmlFor="videoUpload"
                    className={`mt-2 inline-block px-4 py-2 border rounded text-sm font-medium cursor-pointer ${darkMode
                        ? "border-zinc-500 text-zinc-300 hover:bg-zinc-800"
                        : "border-gray-300 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    Choose Video
                  </label>

                  {/* Optional video preview below the upload */}
                  {formData.videoUrl && (
                    <video
                      controls
                      src={formData.videoUrl}
                      className="mt-4 w-full max-w-xl mx-auto rounded shadow"
                    />
                  )}
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <button type="button" onClick={handleReset} className="px-4 py-2 border rounded text-sm hover:opacity-80">
                  <X size={16} className="inline mr-1" />
                  Reset
                </button>
                <button type="button" onClick={() => router.push("/exercises")} className="px-4 py-2 border rounded text-sm hover:opacity-80">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 text-sm font-semibold">
                  <Save size={16} className="inline mr-1" />
                  Add Exercise
                </button>
              </div>
            </form>
            {showSuccess && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                <div className={`bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg flex flex-col items-center`}>
                  <Lottie animationData={successLottie} className="w-40 h-40" loop={false} />
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400 mt-2">Exercise Added Successfully!</p>
                </div>
              </div>
            )}

          </main>
        );
      }}
    </CommonLayout>
  );
}






