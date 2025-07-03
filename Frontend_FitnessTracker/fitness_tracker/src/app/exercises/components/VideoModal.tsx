// 'use client';

// import { useEffect } from 'react';
// import { X } from 'lucide-react';

// type VideoModalProps = {
//   videoUrl: string | null;
//   onClose: () => void;
//   darkMode: boolean;
// };

// export default function VideoModal({ videoUrl, onClose, darkMode }: VideoModalProps) {
//   if (!videoUrl) return null;

//   // Extract Vimeo video ID and build embed URL
//   const videoId = videoUrl.split('/').pop();
//   const embedUrl = `https://player.vimeo.com/video/${videoId}`;

//   // Disable scroll when modal open
//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, []);

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         onClick={onClose}
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000]"
//       />

//       {/* Modal container */}
//       <div
//         className={`fixed top-1/2 left-1/2 max-w-3xl w-full max-h-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-lg z-[1001] flex flex-col ${
//           darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
//         }`}
//       >
//         {/* Header */}
//         <div className="flex justify-end p-2">
//           <button
//             onClick={onClose}
//             className={`hover:bg-gray-300 rounded-full p-1 ${
//               darkMode ? 'hover:bg-gray-700' : ''
//             }`}
//             aria-label="Close video modal"
//           >
//             <X size={24} className={darkMode ? 'text-white' : 'text-gray-900'} />
//           </button>
//         </div>

//         {/* Vimeo iframe */}
//         <div className="flex-grow px-4 pb-4">
//           <iframe
//             src={embedUrl}
//             width="100%"
//             height="360"
//             allow="autoplay; fullscreen"
//             allowFullScreen
//             title="Exercise tutorial video"
//             className="rounded-lg"
//           />
//         </div>
//       </div>
//     </>
//   );
// }









import React from 'react';

type VideoModalProps = {
  videoUrl: string | null;
  onClose: () => void;
  darkMode: boolean;
  name: string;
  description: string;
  duration: number | null;
  calories: number | null;
  type: string | null;
};

export default function VideoModal({
  videoUrl,
  onClose,
  darkMode,
  name,
  description,
  duration,
  calories,
  type,
}: VideoModalProps) {
  // ✅ Return nothing if no videoUrl is provided
  if (!videoUrl) return null;

  const videoId = videoUrl.split('/').pop();
  const embedUrl = `https://player.vimeo.com/video/${videoId}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 animate-slide-in"
      onClick={onClose}
    >
      <div
        className={`rounded-xl p-6 max-w-3xl w-full shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-2xl font-bold float-right"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="mb-2">{description}</p>
        <div className="text-sm text-gray-400 mb-4 space-x-4">
          {duration && <span>🕒 {duration} min</span>}
          {calories && <span>🔥 {calories} kcal</span>}
          {type && <span>🏷 {type}</span>}
        </div>
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title="Exercise Tutorial"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

