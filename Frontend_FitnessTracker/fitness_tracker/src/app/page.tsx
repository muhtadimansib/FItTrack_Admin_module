'use client';

import { Activity, Target, TrendingUp, Users, Zap, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import React, { PropsWithChildren } from 'react';
import HeroSection from '../app/Home Page Sections/HeroSection';
import MotivationalSection from './Home Page Sections/MotivationSection';
import CTASection from '../app/Home Page Sections/CTAsection';
import FeatureSection from './Home Page Sections/FeatureSection';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from './Services/components/Navigation';

type ButtonProps = PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    className?: string;
  }
>;

const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button {...props} className={`rounded-lg font-semibold transition-all duration-300 ${className}`}>
    {children}
  </button>
);

const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <div className={`rounded-2xl border p-1 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
  <div className={`p-6 ${className}`}>{children}</div>
);



const StatsSection = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let userCount = 1;
          const userInterval = setInterval(() => {
            setActiveUsers((prev) => {
              if (userCount >= 50) {
                clearInterval(userInterval);
                return 50;
              }
              return userCount++;
            });
          }, 30);

          let rateCount = 1;
          const rateInterval = setInterval(() => {
            setSuccessRate((prev) => {
              if (rateCount >= 98) {
                clearInterval(rateInterval);
                return 98;
              }
              return rateCount++;
            });
          }, 25);
        }
      },
      { threshold: 0.3 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      if (wrapperRef.current) {
        observer.unobserve(wrapperRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div ref={wrapperRef}>
      <section
        className="py-20 px-6 animate-fade-in"
        style={{
          backgroundImage: `
      radial-gradient(at bottom left, rgba(34, 197, 94, 0.15), transparent 70%),
      radial-gradient(at top right, rgba(239, 68, 68, 0.12), transparent 70%),
      linear-gradient(to right, rgba(17, 24, 39, 0.95), rgba(31, 41, 55, 0.95))
    `,
          backgroundColor: '#111827'
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Join Thousands of Successful Users
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">
              {activeUsers}K+
            </div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div className="animate-fade-in hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">1M+</div>
            <div className="text-gray-300">Workouts Completed</div>
          </div>
          <div className="animate-fade-in hover:scale-105 transition-transform">
            <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">
              {successRate}%
            </div>
            <div className="text-gray-300">Success Rate</div>
          </div>
        </div>
      </section>
    </div>
  );
};


const Index = () => {
  const router = useRouter();
  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `
        radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
        radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%)`,
      }}
    >

      {/* Navigation */}
      <Navigation />


      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeatureSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Motivation Section */}
      <MotivationalSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800 bg-black/50 animate-fade-in">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="w-6 h-6 text-green-500 animate-pulse" />
              <span className="text-xl font-bold">FitTrack</span>
            </div>
            <p className="text-gray-400">Your ultimate fitness companion for achieving your health and wellness goals.</p>
          </div>
          {[
            {
              title: 'Features',
              items: ['Workout Tracking', 'Nutrition Plans', 'Progress Analytics', 'Goal Setting']
            },
            {
              title: 'Company',
              items: ['About Us', 'Careers', 'Contact', 'Blog']
            },
            {
              title: 'Support',
              items: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ']
            }
          ].map(({ title, items }, i) => (
            <div key={title} className={`animate-fade-in animation-delay-${400 + i * 200}`}>
              <h4 className="font-semibold mb-4 text-white">{title}</h4>
              <ul className="space-y-2 text-gray-400">
                {items.map(item => (
                  <li key={item} className="hover:text-green-500 transition-colors cursor-pointer">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in animation-delay-1000">
          &copy; 2024 FitTrack. All rights reserved.
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Index;