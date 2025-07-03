// 'use client';

// import Image from "next/image";
// import { Play } from "lucide-react";

// const ServiceHero = () => {
//   return (
//     <section className="relative min-h-screen bg-[#0F172A] text-white px-6 py-10 lg:py-0 flex items-center z-10 overflow-hidden">
// {/* Decorative Background Image */}
// {/* Decorative Background Image */}
// <div className="absolute inset-0 z-0 pointer-events-none">
//   <div
//     className="w-full h-full relative"
//     style={{
//       backgroundImage: `
//         radial-gradient(at bottom left, rgba(34, 197, 94, 0.15), transparent 70%),
//         radial-gradient(at top right, rgba(239, 68, 68, 0.12), transparent 70%),
//         linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))
//       `,
//     }}
//   >
//     <div
//       className="w-full h-full"
//       style={{
//         WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
//         maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
//         opacity: 0.4,
//       }}
//     >
//       <Image
//         src="/images/Service_Hero_Section.jpg"
//         alt="Background"
//         fill
//         className="object-cover object-center"
//       />
//     </div>
//   </div>
// </div>





//       <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
//         {/* LEFT CONTENT */}
//         <div className="max-w-xl w-full">
//           <p className="text-base text-green-400 font-semibold mb-5 tracking-wide">
//             ★ PREMIUM SERVICES
//           </p>
//           <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
//             Transform Your <br />
//             <span className="text-green-400">Fitness Journey</span>
//           </h1>
//           <p className="text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed">
//             Discover our comprehensive range of fitness services
//             designed to help you achieve your goals faster and more
//             efficiently than ever before.
//           </p>

//           <div className="flex gap-4 flex-wrap">
//             <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-4 text-base lg:text-lg rounded-full transition-all">
//               Explore Services
//             </button>
//             <button className="flex items-center border border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-7 py-4 text-base lg:text-lg rounded-full transition-all">
//               <Play className="w-5 h-5 mr-2" />
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* RIGHT IMAGE SECTION */}
// <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-lg h-[550px] lg:h-[700px] min-h-[500px] float-animation">
//   {/* Top badge */}
//   <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20">
//     50K+ <span className="font-normal">Active Users</span>
//   </div>

//   {/* Main image */}
//   <Image
//     src="/images/Personal_Training.jpg"
//     alt="Fitness Coaching"
//     fill
//     className="object-cover rounded-2xl"
//     priority
//   />

//   {/* Bottom badge */}
//   <div className="absolute bottom-4 right-4 bg-slate-900/90 text-green-400 text-sm font-bold px-4 py-1 rounded-full shadow-md z-20">
//     98% <span className="text-white font-normal ml-1">Success Rate</span>
//   </div>
// </div>

//       </div>
//     </section>
//   );
// };

// export default ServiceHero;












































'use client';

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ServiceHero = () => {
  const [startFloat, setStartFloat] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStartFloat(true);
    }, 1200); // Delay float until entrance animation finishes
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#0F172A] text-white px-6 py-10 lg:py-0 flex items-center z-10 overflow-hidden">
      {/* Decorative Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full relative"
          style={{
            backgroundImage: `
              radial-gradient(at bottom left, rgba(34, 197, 94, 0.15), transparent 70%),
              radial-gradient(at top right, rgba(239, 68, 68, 0.12), transparent 70%),
              linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))
            `,
          }}
        >
          <div
            className="w-full h-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0))',
              opacity: 0.15,
            }}
          >
            <Image
              src="/images/Service_Hero_Section.jpg"
              alt="Background"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 w-full">

        {/* LEFT TEXT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-xl w-full"
        >
          <p className="text-base text-green-400 font-semibold mb-5 tracking-wide">
            ★ PREMIUM SERVICES
          </p>
          <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
            Transform Your <br />
            <span className="text-green-400">Fitness Journey</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-10 leading-relaxed">
            Discover our comprehensive range of fitness services
            designed to help you achieve your goals faster and more
            efficiently than ever before.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-7 py-4 text-base lg:text-lg rounded-full transition-all">
              Explore Services
            </button>
            <button className="flex items-center border border-green-500 text-green-400 hover:bg-green-600 hover:text-white px-7 py-4 text-base lg:text-lg rounded-full transition-all">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className={`relative rounded-2xl overflow-hidden shadow-lg w-full max-w-lg h-[550px] lg:h-[700px] min-h-[500px] ${startFloat ? 'float-animation' : ''}`}
        >
          {/* Top badge */}
          <div className="absolute top-4 left-4 bg-green-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-md z-20">
            50K+ <span className="font-normal">Active Users</span>
          </div>

          {/* Main image */}
          <Image
            src="/images/Personal_Training.jpg"
            alt="Fitness Coaching"
            fill
            className="object-cover rounded-2xl"
            priority
          />

          {/* Bottom badge */}
          <div className="absolute bottom-4 right-4 bg-slate-900/90 text-green-400 text-sm font-bold px-4 py-1 rounded-full shadow-md z-20">
            98% <span className="text-white font-normal ml-1">Success Rate</span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-35px);
          }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ServiceHero;

