// 'use client';

// import { Target, TrendingUp, Users } from 'lucide-react';
// import React, { PropsWithChildren } from 'react';

// const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`rounded-2xl border p-1 ${className}`}>{children}</div>
// );

// const CardContent = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );

// const FeatureSection = () => {
//   return (
//     <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
//       <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">
//         Everything You Need to <span className="text-green-500">Stay Fit</span>
//       </h2>
//       <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//         {[{
//           Icon: Target,
//           title: 'Goal Setting',
//           text: 'Set personalized fitness goals and track your progress with precision'
//         }, {
//           Icon: TrendingUp,
//           title: 'Progress Analytics',
//           text: 'Detailed insights and analytics to monitor your fitness improvements'
//         }, {
//           Icon: Users,
//           title: 'Community',
//           text: 'Connect with like-minded individuals and share your fitness journey'
//         }].map(({ Icon, title, text }, i) => (
//           <Card
//             key={title}
//             className={`bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all group animate-fade-in animation-delay-${200 + i * 200} hover:scale-105`}
//           >
//             <CardContent className="text-center">
//               <Icon className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
//               <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400">{title}</h3>
//               <p className="text-gray-300 group-hover:text-gray-200">{text}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default FeatureSection;





















'use client';

import { Target, TrendingUp, Users, Heart, Dumbbell, MessageCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const features = [
  {
    Icon: Target,
    title: 'Goal Setting',
    text: 'Set personalized fitness goals and track your progress with precision',
  },
  {
    Icon: TrendingUp,
    title: 'Progress Analytics',
    text: 'Detailed insights and analytics to monitor your fitness improvements',
  },
  {
    Icon: Users,
    title: 'Community',
    text: 'Connect with like-minded individuals and share your fitness journey',
  },
  {
    Icon: Heart,
    title: 'Nutrition Plans',
    text: 'Receive tailored meal plans to fuel your workouts and achieve optimal health',
  },
  {
    Icon: Dumbbell,
    title: 'Trainer Support',
    text: 'Access certified trainers for expert guidance and motivation',
  },
  {
    Icon: MessageCircle,
    title: 'Encrypted Messaging',
    text: 'Stay connected securely with your trainer and nutritionist through our private chat',
  },
];

const FeatureSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % features.length);
    }, 4000); // change slide every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Get 3 features to show, cycling through array circularly
  const getVisibleFeatures = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(features[(startIndex + i) % features.length]);
    }
    return visible;
  };

  const visibleFeatures = getVisibleFeatures();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50 overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 text-white">
        Everything You Need to <span className="text-green-500">Stay Fit</span>
      </h2>

      <div className="relative max-w-6xl mx-auto h-[280px] flex items-center overflow-hidden">
        <div
          className="flex gap-x-6 transition-transform duration-700 ease-in-out"
          style={{
            width: `calc(${features.length} * (33.333% + 1.5rem))`, // 1.5rem = 24px gap for example
            transform: `translateX(-${startIndex * (33.333 + 6)}%)`, // Add gap % approx here
          }}
        >
          {features.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              className="flex-shrink-0"
              style={{ flex: '0 0 calc(33.333% - 1rem)' }} // subtract half gap on each side (approx)
            >
              <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-6 text-center
          transition-opacity duration-700">
                <Icon className="mx-auto mb-4 h-12 w-12 text-green-500 transition-transform group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
                <p className="text-gray-300">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default FeatureSection;
