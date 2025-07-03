
'use client';

import Navigation from '../Services/components/Navigation'; // Adjust path accordingly
import { Activity } from 'lucide-react';

export default function About() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#0F172A] text-white px-6 py-16 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <Activity className="mx-auto mb-4 w-12 h-12 text-green-400 animate-pulse" />
          <h1 className="text-5xl font-extrabold mb-4 text-green-400">About FitTrack</h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            Empowering your fitness journey with expert coaching, personalized plans, and a vibrant community.
          </p>
        </section>

        {/* Info Card */}
        <section className="bg-gray-900 bg-opacity-50 rounded-3xl p-10 shadow-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-green-400 pl-4">
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            FitTrack is your ultimate fitness companion, designed to help you achieve your health and wellness goals through personalized training plans, nutrition coaching, and progress tracking. Our mission is to empower every individual to transform their fitness journey with expert guidance and a supportive community.
          </p>

          <h2 className="text-3xl font-semibold mb-6 border-l-4 border-green-400 pl-4">
            Why Choose FitTrack?
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-3 text-lg">
            <li>Personalized fitness plans tailored for you</li>
            <li>Certified trainers and nutrition coaches</li>
            <li>Community support and motivation</li>
            <li>Progress tracking and goal setting</li>
            <li>Flexible scheduling to fit your lifestyle</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="mt-16 text-center">
          <p className="text-gray-300 text-xl mb-6 max-w-3xl mx-auto">
            Ready to transform your fitness journey? Join thousands of members achieving their goals with FitTrack.
          </p>
          <button
            onClick={() => window.location.href = '/Services'}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition transform hover:scale-105 shadow-lg"
          >
            Explore Our Services
          </button>
        </section>
      </main>
    </>
  );
}
