// 'use client';

// import { useState, useEffect } from 'react';
// import { Zap, Heart } from 'lucide-react';
// import Lottie from 'lottie-react';
// import dumbleAnimation from '../dumble.json';
// import treadmillAnimation from '../treadmill.json'; // <-- Add this file

// const MotivationalSection = () => {
//   const [activeQuote, setActiveQuote] = useState(0);

//   const quotes = [
//     {
//       id: 1,
//       Icon: Zap,
//       title: 'Stay Motivated!!',
//       quote: `"Strength grows in the moments when you think you can't"`,
//       subtext:
//         'Every rep counts. Every step matters. Your journey to a stronger, healthier you starts today.',
//       enter: 'slide-in-left',
//       exit: 'slide-out-left',
//     },
//     {
//       id: 2,
//       Icon: Heart,
//       title: 'Push Your Limits!',
//       quote: 'The body achieves what the mind believes.',
//       subtext:
//         'Progress begins when you challenge your comfort zone. Keep going. Keep growing.',
//       enter: 'slide-in-right',
//       exit: 'slide-out-right',
//     },
//   ];

//   const [animationClass, setAnimationClass] = useState(quotes[0].enter);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimationClass(quotes[activeQuote].exit);
//       setTimeout(() => {
//         const next = (activeQuote + 1) % quotes.length;
//         setActiveQuote(next);
//         setAnimationClass(quotes[next].enter);
//       }, 600);
//     }, 6000);
//     return () => clearInterval(interval);
//   }, [activeQuote]);

//   const { Icon, title, quote, subtext } = quotes[activeQuote];

//   return (
//     <section className="relative h-[320px] overflow-hidden py-20 px-6">
//       <div
//         key={activeQuote}
//         className={`absolute inset-y-0 left-0 right-0 flex justify-between items-center transition-all duration-700 ease-in-out ${animationClass}`}
//         style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
//       >
//         {/* Left: Icon + Text */}
//         <div className="flex items-center">
//           <Icon className="w-16 h-16 text-green-500 mr-6" />
//           <div className="max-w-xl">
//             <h2 className="text-4xl font-bold mb-6 whitespace-nowrap overflow-hidden text-ellipsis">
//               {title}
//             </h2>
//             {quote && (
//               <p className="text-2xl text-gray-300 mb-8 italic hover:text-green-400 transition-colors">
//                 {quote}
//               </p>
//             )}
//             <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
//               {subtext}
//             </p>
//           </div>
//         </div>

//         {/* Right: Conditional Lottie */}
//         <div className="w-[300px] h-[300px]">
//           {activeQuote === 0 ? (
//             <Lottie
//               animationData={treadmillAnimation}
//               loop
//               autoplay
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 filter: 'brightness(1.2) sepia(1) hue-rotate(85deg) saturate(5)',
//               }}
//             />
//           ) : (
//             <Lottie
//               animationData={dumbleAnimation}
//               loop
//               autoplay
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 filter: 'brightness(1.2) sepia(1) hue-rotate(85deg) saturate(5)',
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MotivationalSection;




















































'use client';

import { useState, useEffect } from 'react';
import { Zap, Heart } from 'lucide-react';
import Lottie from 'lottie-react';
import dumbleAnimation from '@/lottie icons/dumble.json';
import treadmillAnimation from '@/lottie icons/Treadmill.json';

const MotivationalSection = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [quoteAnim, setQuoteAnim] = useState('enter-left');
  const [lottieAnim, setLottieAnim] = useState('enter-right');

  const quotes = [
    {
      id: 1,
      Icon: Zap,
      title: 'Stay Motivated!!',
      quote: `"Strength grows in the moments when you think you can't"`,
      subtext:
        'Every rep counts. Every step matters. Your journey to a stronger, healthier you starts today.',
    },
    {
      id: 2,
      Icon: Heart,
      title: 'Push Your Limits!',
      quote: 'The body achieves what the mind believes.',
      subtext:
        'Progress begins when you challenge your comfort zone. Keep going. Keep growing.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteAnim('exit-left');
      setLottieAnim('exit-right');

      setTimeout(() => {
        const next = (activeQuote + 1) % quotes.length;
        setActiveQuote(next);

        setQuoteAnim('enter-left');
        setLottieAnim('enter-right');
      }, 600);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeQuote]);

  const { Icon, title, quote, subtext } = quotes[activeQuote];
  const animationData = activeQuote === 0 ? treadmillAnimation : dumbleAnimation;

  return (
    <section className="relative h-[450px] overflow-hidden py-20 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full mx-auto h-full">
        {/* Text Block */}
        <div
          key={`quote-${activeQuote}`}
          className={`md:w-1/2 w-full px-6 text-center md:text-left flex items-center animate-${quoteAnim}`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
            <Icon className="w-14 h-14 text-green-500 mr-4 mb-4 md:mb-0" />
            <div>
              <h2 className="text-4xl font-bold mb-6">{title}</h2>
              <p className="text-2xl text-gray-300 mb-6 italic hover:text-green-400 transition-colors">
                {quote}
              </p>
              <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors">
                {subtext}
              </p>
            </div>
          </div>
        </div>

        {/* Lottie Block */}
        <div
          key={`lottie-${activeQuote}`}
          className={`md:w-1/2 w-full flex justify-center items-center animate-${lottieAnim}`}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{
              width: '320px',
              height: '320px',
              filter: 'brightness(1.2) sepia(1) hue-rotate(85deg) saturate(5)',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default MotivationalSection;