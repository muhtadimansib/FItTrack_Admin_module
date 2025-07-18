'use client';
import { useState, useRef } from 'react';
import CommonLayout from '../layouts/commonLayout';
import { CloudUpload, LoaderCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setError('');
    } else {
      setSelectedFileName('');
    }
  };

  const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        return;
      }
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        setSelectedFileName(file.name);
        setError('');
      }
    }
  };

const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData();
  const fileInput = (event.currentTarget.elements.namedItem('file') as HTMLInputElement);
  const file = fileInput?.files?.[0];
  if (!file) return;

  setLoading(true);
  setError('');
  setSummary('');
  setRecommendations([]);
  formData.append('file', file);

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiBase}/ai-suggestions/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const rawText = await response.text();

    // Fix: Remove unescaped newlines and invalid control characters
    const cleanedText = rawText.replace(/[\u0000-\u001F]+/g, ' '); // replaces bad control characters with space

    const parsed = JSON.parse(cleanedText);

    setSummary(parsed.summary || 'No summary found.');
    setRecommendations(parsed.recommendations || []);
  } catch (err) {
    console.error(err);
    setError('Error analyzing report. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <CommonLayout activePage="AI Suggestions">
      {({ darkMode }) => {
        const baseFont = 'font-[Segoe_UI]';
        const cardBg = darkMode ? 'bg-[#1f1f1f] border border-[#2e2e2e]' : 'bg-white border border-gray-300';
        const headingColor = darkMode ? 'text-white' : 'text-gray-900';
        const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';
        const bodyTextColor = darkMode ? 'text-gray-200' : 'text-gray-800';

        return (
          <div className={`p-8 space-y-10 ${baseFont}`}>
            {/* Header */}
            <div className="space-y-2">
              <h1 className={`text-3xl font-semibold ${headingColor}`}>AI Fitness Report Insights</h1>
              <p className={`text-sm ${subTextColor}`}>
                Personalized recommendations based on uploaded fitness reports.
              </p>
            </div>

            {/* Model Info block - Microsoft-like textual UI */}
            <div
              className={`mt-2 p-5 rounded-xl ${cardBg} shadow-md text-sm leading-relaxed space-y-2`}
              style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
            >
              <h2 className={`text-lg font-semibold ${headingColor}`}>
                <span className="inline-flex items-center gap-2">
                  <Sparkles size={18} className="text-[#62a0ea]" />
                  Model Information
                </span>
              </h2>
              <p className={subTextColor}>
                Powered by <strong className="text-white">Mixtral-8x7B-Instruct-v0.1</strong> via{' '}
                <a href="https://together.ai" className="underline text-blue-400" target="_blank" rel="noopener noreferrer">
                  Together.ai
                </a>, this AI model is trained to understand fitness progress reports and generate expert-level suggestions.
              </p>
              <p className={subTextColor}>
                It provides a concise <i>summary</i> and detailed <i>recommendations</i> for clients, trainers, and nutritionists to
                guide better decisions. Please download reports from <b>Performance</b> and then upload here. 
              </p>
            </div>

            {/* Upload and Output Section */}
            <div className="space-y-6">
              {/* Upload Box */}
              <div className={`p-6 rounded-2xl ${cardBg} shadow space-y-6`}>
                <form onSubmit={handleUpload} className="space-y-6">
                  <label
                    htmlFor="file"
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    className="w-full border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition select-none flex flex-col items-center justify-center gap-2"
                  >
                    <CloudUpload className="w-10 h-10 text-blue-400" />
                    {!selectedFileName ? (
                      <span className="text-white font-semibold text-sm">
                        Drag and drop a PDF file here, or click to upload
                      </span>
                    ) : (
                      <span className="text-green-400 font-semibold truncate max-w-full">{selectedFileName}</span>
                    )}
                    <input
                      id="file"
                      name="file"
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={onFileChange}
                      ref={fileInputRef}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={loading || !selectedFileName}
                    className={`bg-[#0078d4] hover:bg-[#005a9e] text-white font-semibold px-6 py-2 rounded-lg transition w-full ${
                      !selectedFileName ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    title={!selectedFileName ? 'Please select a PDF to analyze' : ''}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2 justify-center">
                        <LoaderCircle className="animate-spin h-5 w-5" />
                        Analyzing...
                      </span>
                    ) : (
                      'Analyze Report'
                    )}
                  </button>

                  {error && <p className="text-red-400 font-semibold text-center">{error}</p>}
                </form>
              </div>

              {/* Output */}
              {!loading && summary && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
                    <div className="flex items-center gap-2 text-teal-400 font-semibold text-lg">
                      <FileText size={18} />
                      Summary
                    </div>
                    <p className={bodyTextColor} style={{ whiteSpace: 'pre-wrap' }}>
                      {summary}
                    </p>
                  </div>

                  {/* Recommendations */}
                  <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
                    <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
                      <CheckCircle2 size={18} />
                      Recommendations
                    </div>
                    <ul className={`list-disc ml-6 space-y-1 ${bodyTextColor}`}>
                      {recommendations.length > 0 ? (
                        recommendations.map((item, idx) => <li key={idx}>{item}</li>)
                      ) : (
                        <li>No suggestions found.</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </CommonLayout>
  );
}
