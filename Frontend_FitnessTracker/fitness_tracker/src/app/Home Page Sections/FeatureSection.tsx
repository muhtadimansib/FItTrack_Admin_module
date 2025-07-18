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
          {features.map(({ Icon, title, text }) => (
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
