'use client';

import { useEffect, useState } from 'react';

const HeroSection = () => {
  const textParts = ['Transform Your', 'Fitness Journey'];
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const fullText = textParts.join('\n');

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText.charAt(index));
        setIndex(prev => prev + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  // Split the displayed text into two parts based on line break
  const [firstLine, secondLine] = displayedText.split('\n');

  return (
    <section className="text-center pt-60 pb-12 px-6">
      <h1 className="text-5xl md:text-7xl font-bold text-white min-h-[8rem] whitespace-pre-line">
        <span>{firstLine || ''}</span>
        <br />
        <span className="text-green-500">{secondLine || ''}</span>
        <span className="animate-blink text-green-500">|</span>
      </h1>
      <div className="flex justify-center">
        <p className="text-lg md:text-xl text-gray-300 mt-6 max-w-xl animate-float-up" style={{ animationDelay: '2.5s', animationFillMode: 'both' }}>
          Track your progress, achieve your goals, and stay motivated with the ultimate fitness companion.
        </p>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

          @keyframes floatUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-float-up {
    animation: floatUp 1s ease-out forwards;
  }
      `}</style>
    </section>
  );
};

export default HeroSection;
