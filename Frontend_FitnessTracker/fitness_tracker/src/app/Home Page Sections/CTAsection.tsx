'use client';

import { useState, useEffect } from 'react';
import { Zap, Heart } from 'lucide-react';
import Lottie from 'lottie-react';
import joinTeamAnimation from '@/../public/lottie/Join team.json';
import communityAnimation from '@/../public/lottie/Community.json';

const CTASection = () => {
  const [activeQuote, setActiveQuote] = useState(0);
  const [quoteAnim, setQuoteAnim] = useState('enter-right');
  const [lottieAnim, setLottieAnim] = useState('enter-left');

  const quotes = [
    {
      id: 1,
      Icon: Zap,
      title: 'Ready to Transform Your Life?',
      quote: '',
      subtext:
        'Join our community today and start your journey towards a healthier, stronger you',
    },
    {
      id: 2,
      Icon: Heart,
      title: 'Stronger Together',
      quote: 'The body achieves what the mind believes.',
      subtext:
        'Join a team that fuels your fire. Together, we rise and break barriers.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteAnim('exit-right');
      setLottieAnim('exit-left');

      setTimeout(() => {
        const next = (activeQuote + 1) % quotes.length;
        setActiveQuote(next);

        setQuoteAnim('enter-right');
        setLottieAnim('enter-left');
      }, 600);
    }, 6000);

    return () => clearInterval(interval);
  }, [activeQuote]);

  const { Icon, title, quote, subtext } = quotes[activeQuote];
  const animationData = activeQuote === 0 ? communityAnimation : joinTeamAnimation;

  return (
    <section className="relative h-[450px] overflow-hidden py-20 px-6">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl w-full mx-auto h-full">
        {/* Lottie Block - LEFT */}
        <div
          key={`lottie-${activeQuote}`}
          className={`md:w-1/2 w-full flex justify-center items-center animate-${lottieAnim}`}
        >
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{
              width: activeQuote === 0 ? '150px' : '320px', // smaller for community
              height: activeQuote === 0 ? '240px' : '320px',
              filter: 'brightness(1.2) sepia(1) hue-rotate(85deg) saturate(5)',
            }}
          />
        </div>

        {/* Text Block - RIGHT */}
        <div
          key={`quote-${activeQuote}`}
          className={`md:w-1/2 w-full px-6 text-center md:text-left flex items-center animate-${quoteAnim}`}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center">
            <Icon className="w-14 h-14 text-green-500 mr-4 mb-4 md:mb-0" />
            <div>
              <h2 className="text-4xl font-bold mb-6">{title}</h2>
              {quote && (
                <p className="text-2xl text-gray-300 mb-6 italic hover:text-green-400 transition-colors">
                  {quote}
                </p>
              )}
              <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors">
                {subtext}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

