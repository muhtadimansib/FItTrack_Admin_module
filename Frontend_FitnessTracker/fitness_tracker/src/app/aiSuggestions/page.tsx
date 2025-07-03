// import CommonLayout from "../layouts/commonLayout";

// export default function SettingsPage() {
//   return (
//     <CommonLayout activePage="Settings">
//       <div className="text-2xl font-semibold">Settings Page Content Here</div>
//     </CommonLayout>
//   );
// }


// 'use client'
// import CommonLayout from "../layouts/commonLayout";


// export default function SettingsPage() {

//   return (
//     <CommonLayout activePage="Settings">
//       {({ darkMode }) => (
//         <>
//           <div><h1>Settings Content here</h1></div>
//         </>
//       )}
//     </CommonLayout>
//   );
// }







// 'use client';
// import { useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState('');
//   const [recommendations, setRecommendations] = useState<string[]>([]);
//   const [error, setError] = useState('');

//   const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData();
//     const fileInput = (event.currentTarget.elements.namedItem('file') as HTMLInputElement);
//     const file = fileInput?.files?.[0];

//     if (!file) return;

//     formData.append('file', file);
//     setLoading(true);
//     setError('');
//     setSummary('');
//     setRecommendations([]);

//     try {
//       const response = await fetch('http://localhost:3000/ai-suggestions/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const text = await response.text();
//       const parsed = JSON.parse(text);

//       setSummary(parsed.summary || 'No summary found.');
//       setRecommendations(parsed.recommendations || []);
//     } catch (err) {
//       console.error(err);
//       setError('Error analyzing report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CommonLayout activePage="Settings">
//       {({ darkMode }) => (
//         <div className="p-6 space-y-6 text-white">
//           <h2 className="text-2xl font-bold text-orange-400">AI Fitness Report Insights</h2>

//           <div className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
//             <form onSubmit={handleUpload} className="space-y-4">
//               <label className="block">
//                 <span className="text-gray-300">Upload Client Report (PDF)</span>
//                 <input
//                   type="file"
//                   name="file"
//                   accept="application/pdf"
//                   className="mt-2 block w-full text-sm text-gray-100 file:bg-orange-500 file:text-white file:rounded-lg file:border-0 file:py-2 file:px-4 hover:file:bg-orange-600"
//                 />
//               </label>
//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
//               >
//                 Analyze Report
//               </button>
//             </form>

//             {loading && (
//               <div className="text-center text-orange-300">Analyzing report, please wait...</div>
//             )}

//             {error && (
//               <div className="text-center text-red-400 font-semibold">{error}</div>
//             )}

//             {!loading && summary && (
//               <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
//                 <div>
//                   <h3 className="text-xl font-semibold text-green-400 mb-2">Summary</h3>
//                   <p className="text-gray-300">{summary}</p>
//                 </div>

//                 <div>
//                   <h3 className="text-xl font-semibold text-green-400 mb-2">Recommendations</h3>
//                   <ul className="list-disc list-inside text-gray-300 space-y-1">
//                     {recommendations.length > 0 ? (
//                       recommendations.map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))
//                     ) : (
//                       <li>No recommendations provided.</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }






// 'use client';
// import { useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState('');
//   const [recommendations, setRecommendations] = useState<string[]>([]);
//   const [error, setError] = useState('');

//   const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData();
//     const fileInput = (event.currentTarget.elements.namedItem('file') as HTMLInputElement);
//     const file = fileInput?.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     setError('');
//     setSummary('');
//     setRecommendations([]);
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:3000/ai-suggestions/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const text = await response.text();
//       const parsed = JSON.parse(text);

//       setSummary(parsed.summary || 'No summary found.');
//       setRecommendations(parsed.recommendations || []);
//     } catch (err) {
//       console.error(err);
//       setError('Error analyzing report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CommonLayout activePage="AI Suggestions">
//       {({ darkMode }) => (
//         <div className={`p-6 space-y-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//           <h2 className={`text-3xl font-bold ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
//             AI Fitness Report Insights
//           </h2>

//           {/* AI Model Info */}
//           <div className={`p-4 rounded-xl shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
//             <h3 className="text-lg font-semibold mb-1">🔍 Model Used</h3>
//             <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
//               <strong>Mixtral-8x7B-Instruct-v0.1</strong> via <a href="https://api.together.xyz" target="_blank" className="underline text-blue-400">Together.ai</a>
//               <br />
//               Prompt-tuned for fitness suggestions from uploaded PDF reports.
//             </p>
//           </div>

//           {/* Upload Form */}
//           <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-6 rounded-2xl shadow space-y-6`}>
//             <form onSubmit={handleUpload} className="space-y-4">
//               <label className="block">
//                 <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Upload Client Report (PDF)</span>
//                 <input
//                   type="file"
//                   name="file"
//                   accept="application/pdf"
//                   className={`mt-2 block w-full text-sm ${darkMode ? 'text-gray-100' : 'text-gray-900'} 
//                     file:bg-orange-500 file:text-white file:rounded-lg file:border-0 
//                     file:py-2 file:px-4 hover:file:bg-orange-600`}
//                 />
//               </label>
//               <button
//                 type="submit"
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition"
//               >
//                 Analyze Report
//               </button>
//             </form>

//             {loading && (
//               <div className="text-center text-orange-300">🔄 Analyzing report, please wait...</div>
//             )}
//             {error && (
//               <div className="text-center text-red-500 font-semibold">{error}</div>
//             )}

//             {!loading && summary && (
//               <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} space-y-4`}>
//                 <div>
//                   <h3 className={`text-xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>📝 Summary</h3>
//                   <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{summary}</p>
//                 </div>

//                 <div>
//                   <h3 className={`text-xl font-semibold ${darkMode ? 'text-green-400' : 'text-green-700'}`}>💡 Recommendations</h3>
//                   <ul className={`list-disc list-inside space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
//                     {recommendations.length > 0 ? (
//                       recommendations.map((rec, idx) => <li key={idx}>{rec}</li>)
//                     ) : (
//                       <li>No suggestions provided.</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </CommonLayout>
//   );
// }















// 'use client';
// import { useState } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import { CloudUpload, LoaderCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState('');
//   const [recommendations, setRecommendations] = useState<string[]>([]);
//   const [error, setError] = useState('');

//   const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData();
//     const fileInput = (event.currentTarget.elements.namedItem('file') as HTMLInputElement);
//     const file = fileInput?.files?.[0];
//     if (!file) return;

//     setLoading(true);
//     setError('');
//     setSummary('');
//     setRecommendations([]);
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:3000/ai-suggestions/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const text = await response.text();
//       const parsed = JSON.parse(text);

//       setSummary(parsed.summary || 'No summary found.');
//       setRecommendations(parsed.recommendations || []);
//     } catch (err) {
//       console.error(err);
//       setError('Error analyzing report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <CommonLayout activePage="AI Suggestions">
//       {({ darkMode }) => {
//         const baseFont = 'font-[Segoe_UI]';
//         const cardBg = darkMode ? 'bg-[#1f1f1f] border border-[#2e2e2e]' : 'bg-white border border-gray-300';
//         const headingColor = darkMode ? 'text-white' : 'text-gray-900';
//         const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';
//         const bodyTextColor = darkMode ? 'text-gray-200' : 'text-gray-800';

//         return (
//           <div className={`p-8 space-y-10 ${baseFont}`}>
//             {/* Header */}
//             <div>
//               <h1 className={`text-3xl font-semibold ${headingColor}`}>AI Fitness Report insights</h1>
//               <p className={`text-sm ${subTextColor}`}>
//                 Personalized recommendations based on uploaded fitness reports.
//               </p>
//             </div>

//             {/* Model Info */}
//             <div className={`p-5 rounded-xl ${cardBg} shadow-md`}>
//               <div className="flex items-center gap-2 text-[#62a0ea] font-semibold">
//                 <Sparkles size={18} />
//                 Model Information
//               </div>
//               <p className={`${subTextColor} mt-1`}>
//                 Using <span className="font-semibold text-white">Mixtral-8x7B-Instruct-v0.1</span> via{' '}
//                 <a href="https://together.ai" className="underline text-blue-400" target="_blank">
//                   Together.ai
//                 </a>
//                 , trained to provide tailored suggestions from uploaded progress PDFs.
//               </p>
//             </div>

//             {/* Upload PDF */}
//             <div className={`p-6 rounded-2xl ${cardBg} shadow space-y-6`}>
//               <form onSubmit={handleUpload} className="space-y-6">
//                 <div className="w-full border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-400 transition cursor-pointer">
//                   <CloudUpload className="w-8 h-8 mx-auto text-blue-400 mb-2" />
//                   <label htmlFor="file" className="text-white text-sm font-semibold">
//                     Drag and drop a PDF file here, or click to upload
//                   </label>
//                   <input
//                     id="file"
//                     name="file"
//                     type="file"
//                     accept="application/pdf"
//                     className="hidden"
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-[#0078d4] hover:bg-[#005a9e] text-white font-semibold px-6 py-2 rounded-lg transition"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2">
//                       <LoaderCircle className="animate-spin h-4 w-4" />
//                       Analyzing...
//                     </span>
//                   ) : (
//                     'Analyze Report'
//                   )}
//                 </button>

//                 {error && <p className="text-red-400 font-semibold">{error}</p>}
//               </form>
//             </div>

//             {/* Output */}
//             {!loading && summary && (
//               <div className="space-y-6">
//                 {/* Summary */}
//                 <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
//                   <div className="flex items-center gap-2 text-teal-400 font-semibold text-lg">
//                     <FileText size={18} />
//                     Summary
//                   </div>
//                   <p className={bodyTextColor}>{summary}</p>
//                 </div>

//                 {/* Recommendations */}
//                 <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
//                   <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
//                     <CheckCircle2 size={18} />
//                     Recommendations
//                   </div>
//                   <ul className={`list-disc ml-6 space-y-1 ${bodyTextColor}`}>
//                     {recommendations.length > 0 ? (
//                       recommendations.map((item, idx) => <li key={idx}>{item}</li>)
//                     ) : (
//                       <li>No suggestions found.</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       }}
//     </CommonLayout>
//   );
// }














// 'use client';
// import { useState, useRef } from 'react';
// import CommonLayout from '../layouts/commonLayout';
// import { CloudUpload, LoaderCircle, FileText, Sparkles, CheckCircle2 } from 'lucide-react';

// export default function SettingsPage() {
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState('');
//   const [recommendations, setRecommendations] = useState<string[]>([]);
//   const [error, setError] = useState('');
//   const [selectedFileName, setSelectedFileName] = useState('');
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle file selection (both drag/drop and manual)
//   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFileName(file.name);
//       setError('');
//     } else {
//       setSelectedFileName('');
//     }
//   };

//   const onDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//   };

//   const onDrop = (event: React.DragEvent<HTMLLabelElement>) => {
//     event.preventDefault();
//     const files = event.dataTransfer.files;
//     if (files && files.length > 0) {
//       const file = files[0];
//       if (file.type !== 'application/pdf') {
//         setError('Only PDF files are allowed.');
//         return;
//       }
//       if (fileInputRef.current) {
//         const dataTransfer = new DataTransfer();
//         dataTransfer.items.add(file);
//         fileInputRef.current.files = dataTransfer.files;
//         setSelectedFileName(file.name);
//         setError('');
//       }
//     }
//   };

// const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   const formData = new FormData();
//   const fileInput = (event.currentTarget.elements.namedItem('file') as HTMLInputElement);
//   const file = fileInput?.files?.[0];
//   if (!file) return;

//   setLoading(true);
//   setError('');
//   setSummary('');
//   setRecommendations([]);
//   formData.append('file', file);

//   try {
//     const response = await fetch('http://localhost:3000/ai-suggestions/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Upload failed');
//     }

//     // Use response.json() instead of response.text()
//     const parsed = await response.json();

//     setSummary(parsed.summary || 'No summary found.');
//     setRecommendations(parsed.recommendations || []);
//   } catch (err) {
//     console.error(err);
//     setError('Error analyzing report. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <CommonLayout activePage="AI Suggestions">
//       {({ darkMode }) => {
//         const baseFont = 'font-[Segoe_UI]';
//         const cardBg = darkMode ? 'bg-[#1f1f1f] border border-[#2e2e2e]' : 'bg-white border border-gray-300';
//         const headingColor = darkMode ? 'text-white' : 'text-gray-900';
//         const subTextColor = darkMode ? 'text-gray-400' : 'text-gray-600';
//         const bodyTextColor = darkMode ? 'text-gray-200' : 'text-gray-800';

//         return (
//           <div className={`p-8 space-y-10 ${baseFont}`}>
//             {/* Header */}
//             <div>
//               <h1 className={`text-3xl font-semibold ${headingColor}`}>AI Fitness Report Insights</h1>
//               <p className={`text-sm ${subTextColor}`}>
//                 Personalized recommendations based on uploaded fitness reports.
//               </p>
//             </div>

//             {/* Model Info */}
//             <div className={`p-5 rounded-xl ${cardBg} shadow-md`}>
//               <div className="flex items-center gap-2 text-[#62a0ea] font-semibold">
//                 <Sparkles size={18} />
//                 Model Information
//               </div>
//               <p className={`${subTextColor} mt-1`}>
//                 Using <span className="font-semibold text-white">Mixtral-8x7B-Instruct-v0.1</span> via{' '}
//                 <a href="https://together.ai" className="underline text-blue-400" target="_blank" rel="noopener noreferrer">
//                   Together.ai
//                 </a>
//                 , trained to provide tailored suggestions from uploaded progress PDFs.
//               </p>
//             </div>

//             {/* Upload PDF */}
//             <div className={`p-6 rounded-2xl ${cardBg} shadow space-y-6`}>
//               <form onSubmit={handleUpload} className="space-y-6">
//                 <label
//                   htmlFor="file"
//                   onDragOver={onDragOver}
//                   onDrop={onDrop}
//                   className="w-full border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition select-none flex flex-col items-center justify-center gap-2"
//                 >
//                   <CloudUpload className="w-10 h-10 text-blue-400" />
//                   {!selectedFileName ? (
//                     <>
//                       <span className="text-white font-semibold text-sm">Drag and drop a PDF file here, or click to upload</span>
//                     </>
//                   ) : (
//                     <span className="text-green-400 font-semibold truncate max-w-full">{selectedFileName}</span>
//                   )}

//                   <input
//                     id="file"
//                     name="file"
//                     type="file"
//                     accept="application/pdf"
//                     className="hidden"
//                     onChange={onFileChange}
//                     ref={fileInputRef}
//                   />
//                 </label>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-[#0078d4] hover:bg-[#005a9e] disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-lg transition w-full"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2 justify-center">
//                       <LoaderCircle className="animate-spin h-5 w-5" />
//                       Analyzing...
//                     </span>
//                   ) : (
//                     'Analyze Report'
//                   )}
//                 </button>

//                 {error && <p className="text-red-400 font-semibold text-center">{error}</p>}
//               </form>
//             </div>

//             {/* Output */}
//             {!loading && summary && (
//               <div className="space-y-6">
//                 {/* Summary */}
//                 <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
//                   <div className="flex items-center gap-2 text-teal-400 font-semibold text-lg">
//                     <FileText size={18} />
//                     Summary
//                   </div>
//                   <p className={bodyTextColor} style={{ whiteSpace: 'pre-wrap' }}>
//                     {summary}
//                   </p>
//                 </div>

//                 {/* Recommendations */}
//                 <div className={`p-6 rounded-xl ${cardBg} space-y-2`}>
//                   <div className="flex items-center gap-2 text-green-400 font-semibold text-lg">
//                     <CheckCircle2 size={18} />
//                     Recommendations
//                   </div>
//                   <ul className={`list-disc ml-6 space-y-1 ${bodyTextColor}`}>
//                     {recommendations.length > 0 ? (
//                       recommendations.map((item, idx) => <li key={idx}>{item}</li>)
//                     ) : (
//                       <li>No suggestions found.</li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       }}
//     </CommonLayout>
//   );
// }












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
    const response = await fetch('http://localhost:3000/ai-suggestions/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const rawText = await response.text();

    // 🔧 Fix: Remove unescaped newlines and invalid control characters
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
                guide better decisions.
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
