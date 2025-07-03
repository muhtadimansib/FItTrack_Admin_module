// import Image from "next/image";

// export default function Home() {
//   return (
//     <></>
//   );
// }


// 'use client';

// import { Activity, Target, TrendingUp, Users, Zap, Heart } from 'lucide-react';

// import React, { PropsWithChildren } from 'react';

// const Button = ({ children, className = '', ...props }: PropsWithChildren<{ className?: string }>) => (
//   <button
//     {...props}
//     className={`rounded-lg font-semibold transition-all duration-300 ${className}`}
//   >
//     {children}
//   </button>
// );

// const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`rounded-2xl border p-1 ${className}`}>{children}</div>
// );

// const CardContent = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       {/* Navigation */}
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800 animate-fade-in">
//         <div className="flex items-center space-x-2">
//           <Activity className="w-8 h-8 text-green-500 animate-pulse" />
//           <span className="text-2xl font-bold">FitTrack</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-white hover:text-green-500 hover:scale-105 transition-all">Home</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Services</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">About</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Contact</a>
//         </div>
//         <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
//           Get Started
//         </Button>
//       </nav>

//       {/* Hero Section */}
//       <section className="text-center py-20 px-6">
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in animation-delay-200">
//           Transform Your <span className="block text-green-500 animate-fade-in animation-delay-400">Fitness Journey</span>
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-600">
//           Track your progress, achieve your goals, and stay motivated with the ultimate fitness companion
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-800">
//           <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg hover:scale-105 hover:shadow-green-500/25">Start Your Journey</Button>
//           <Button className="border border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg hover:scale-105 hover:border-green-500">Watch Demo</Button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
//         <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">Everything You Need to <span className="text-green-500">Stay Fit</span></h2>
//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[{
//             Icon: Target,
//             title: 'Goal Setting',
//             text: 'Set personalized fitness goals and track your progress with precision'
//           }, {
//             Icon: TrendingUp,
//             title: 'Progress Analytics',
//             text: 'Detailed insights and analytics to monitor your fitness improvements'
//           }, {
//             Icon: Users,
//             title: 'Community',
//             text: 'Connect with like-minded individuals and share your fitness journey'
//           }].map(({ Icon, title, text }, i) => (
//             <Card key={title} className={`bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all group animate-fade-in animation-delay-${200 + i * 200} hover:scale-105`}>
//               <CardContent className="text-center">
//                 <Icon className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
//                 <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400">{title}</h3>
//                 <p className="text-gray-300 group-hover:text-gray-200">{text}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-fade-in">
//         <h2 className="text-3xl font-bold text-center mb-12">Join Thousands of Successful Users</h2>
//         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
//           {[
//             { number: '50K+', label: 'Active Users' },
//             { number: '1M+', label: 'Workouts Completed' },
//             { number: '98%', label: 'Success Rate' }
//           ].map(({ number, label }, i) => (
//             <div key={label} className={`animate-fade-in animation-delay-${400 + i * 200} hover:scale-105 transition-transform`}>
//               <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">{number}</div>
//               <div className="text-gray-300">{label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Motivation Section */}
//       <section className="py-20 px-6 animate-fade-in">
//         <div className="max-w-4xl mx-auto text-center">
//           <Zap className="w-16 h-16 text-green-500 mx-auto mb-6 animate-bounce" />
//           <h2 className="text-4xl font-bold mb-6">Stay Motivated!!</h2>
//           <p className="text-2xl text-gray-300 mb-8 italic hover:text-green-400 transition-colors">"Strength grows in the moments when you think you can't"</p>
//           <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors">
//             Every rep counts. Every step matters. Your journey to a stronger, healthier you starts today.
//           </p>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-gradient-to-t from-green-500/20 to-transparent animate-fade-in">
//         <div className="max-w-4xl mx-auto text-center">
//           <Heart className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse hover:scale-110 transition-transform" />
//           <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
//           <p className="text-xl text-gray-300 mb-8">Join our community today and start your journey towards a healthier, stronger you</p>
//           <Button className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-lg hover:scale-105 hover:shadow-green-500/25">Get Started Now</Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-6 py-12 border-t border-gray-800 bg-black/50 animate-fade-in">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Activity className="w-6 h-6 text-green-500 animate-pulse" />
//               <span className="text-xl font-bold">FitTrack</span>
//             </div>
//             <p className="text-gray-400">Your ultimate fitness companion for achieving your health and wellness goals.</p>
//           </div>
//           {[
//             {
//               title: 'Features',
//               items: ['Workout Tracking', 'Nutrition Plans', 'Progress Analytics', 'Goal Setting']
//             },
//             {
//               title: 'Company',
//               items: ['About Us', 'Careers', 'Contact', 'Blog']
//             },
//             {
//               title: 'Support',
//               items: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ']
//             }
//           ].map(({ title, items }, i) => (
//             <div key={title} className={`animate-fade-in animation-delay-${400 + i * 200}`}>
//               <h4 className="font-semibold mb-4 text-white">{title}</h4>
//               <ul className="space-y-2 text-gray-400">
//                 {items.map(item => (
//                   <li key={item} className="hover:text-green-500 transition-colors cursor-pointer">{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in animation-delay-1000">
//           &copy; 2024 FitTrack. All rights reserved.
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out forwards;
//         }

//         .animation-delay-200 {
//           animation-delay: 0.2s;
//           opacity: 0;
//         }

//         .animation-delay-400 {
//           animation-delay: 0.4s;
//           opacity: 0;
//         }

//         .animation-delay-600 {
//           animation-delay: 0.6s;
//           opacity: 0;
//         }

//         .animation-delay-800 {
//           animation-delay: 0.8s;
//           opacity: 0;
//         }

//         .animation-delay-1000 {
//           animation-delay: 1s;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Index;














































// 'use client';

// import { Activity, Target, TrendingUp, Users, Zap, Heart } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import React, { PropsWithChildren } from 'react';

// const Button = ({ children, className = '', ...props }: PropsWithChildren<{ className?: string }>) => (
//   <button
//     {...props}
//     className={`rounded-lg font-semibold transition-all duration-300 ${className}`}
//   >
//     {children}
//   </button>
// );

// const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`rounded-2xl border p-1 ${className}`}>{children}</div>
// );

// const CardContent = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );

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
//       setAnimationClass(quotes[activeQuote].exit); // start slide-out
//       setTimeout(() => {
//         const next = (activeQuote + 1) % quotes.length;
//         setActiveQuote(next);
//         setAnimationClass(quotes[next].enter); // new one slides in
//       }, 600); // match duration of exit animation
//     }, 6000); // total duration between switches
//     return () => clearInterval(interval);
//   }, [activeQuote]);

//   const { Icon, title, quote, subtext } = quotes[activeQuote];

//   return (
//     <section className="relative h-[300px] overflow-hidden py-20 px-6">
//       <div
//         key={activeQuote}
//         className={`absolute inset-0 text-center transition-all duration-700 ease-in-out ${animationClass}`}
//       >
//         <div className="max-w-4xl mx-auto">
//           <Icon className="w-16 h-16 text-green-500 mx-auto mb-6" />
//           <h2 className="text-4xl font-bold mb-6">{title}</h2>
//           {quote && (
//             <p className="text-2xl text-gray-300 mb-8 italic hover:text-green-400 transition-colors">
//               {quote}
//             </p>
//           )}
//           <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors">
//             {subtext}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };




// const CTASection = () => {
//   const [activeQuote, setActiveQuote] = useState(0);
//   const quotes = [
//     {
//       id: 1,
//       Icon: Zap,
//       title: 'Ready to Transform Your Life?',
//       quote: ``,
//       subtext:
//         'Join our community today and start your journey towards a healthier, stronger you',
//       enter: 'slide-in-right',
//       exit: 'slide-out-left',
//     },
//     {
//       id: 2,
//       Icon: Heart,
//       title: 'Stronger Together',
//       quote: 'The body achieves what the mind believes.',
//       subtext:
//         'Join a team that fuels your fire. Together, we rise and break barriers.',
//       enter: 'slide-in-left',
//       exit: 'slide-out-right',
//     },
//   ];


//   const [animationClass, setAnimationClass] = useState(quotes[0].enter);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setAnimationClass(quotes[activeQuote].exit); // start slide-out
//       setTimeout(() => {
//         const next = (activeQuote + 1) % quotes.length;
//         setActiveQuote(next);
//         setAnimationClass(quotes[next].enter); // new one slides in
//       }, 600); // match duration of exit animation
//     }, 6000); // total duration between switches
//     return () => clearInterval(interval);
//   }, [activeQuote]);

//   const { Icon, title, quote, subtext } = quotes[activeQuote];

//   return (
//     <section className="relative h-[300px] overflow-hidden py-20 px-6">
//       <div
//         key={activeQuote}
//         className={`absolute inset-0 text-center transition-all duration-700 ease-in-out ${animationClass}`}
//       >
//         <div className="max-w-4xl mx-auto">
//           <Icon className="w-16 h-16 text-green-500 mx-auto mb-6" />
//           <h2 className="text-4xl font-bold mb-6">{title}</h2>
//           {quote && (
//             <p className="text-2xl text-gray-300 mb-8 italic hover:text-green-400 transition-colors">
//               {quote}
//             </p>
//           )}
//           <p className="text-lg text-gray-400 hover:text-gray-300 transition-colors">
//             {subtext}
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Index = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       {/* Navigation */}
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800 animate-fade-in">
//         <div className="flex items-center space-x-2">
//           <Activity className="w-8 h-8 text-green-500 animate-pulse" />
//           <span className="text-2xl font-bold">FitTrack</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-white hover:text-green-500 hover:scale-105 transition-all">Home</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Services</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">About</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Contact</a>
//         </div>
//         <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
//           Get Started
//         </Button>
//       </nav>

//       {/* Hero Section */}
//       <section className="text-center py-20 px-6">
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-fade-in animation-delay-200">
//           Transform Your <span className="block text-green-500 animate-fade-in animation-delay-400">Fitness Journey</span>
//         </h1>
//         <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-600">
//           Track your progress, achieve your goals, and stay motivated with the ultimate fitness companion
//         </p>
//         <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-800">
//           <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg hover:scale-105 hover:shadow-green-500/25">Start Your Journey</Button>
//           <Button className="border border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-lg hover:scale-105 hover:border-green-500">Watch Demo</Button>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
//         <h2 className="text-4xl font-bold text-center mb-16 animate-fade-in">Everything You Need to <span className="text-green-500">Stay Fit</span></h2>
//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {[{
//             Icon: Target,
//             title: 'Goal Setting',
//             text: 'Set personalized fitness goals and track your progress with precision'
//           }, {
//             Icon: TrendingUp,
//             title: 'Progress Analytics',
//             text: 'Detailed insights and analytics to monitor your fitness improvements'
//           }, {
//             Icon: Users,
//             title: 'Community',
//             text: 'Connect with like-minded individuals and share your fitness journey'
//           }].map(({ Icon, title, text }, i) => (
//             <Card key={title} className={`bg-gray-800/50 border border-gray-700 hover:border-green-500/50 transition-all group animate-fade-in animation-delay-${200 + i * 200} hover:scale-105`}>
//               <CardContent className="text-center">
//                 <Icon className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
//                 <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400">{title}</h3>
//                 <p className="text-gray-300 group-hover:text-gray-200">{text}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-20 px-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-fade-in">
//         <h2 className="text-3xl font-bold text-center mb-12">Join Thousands of Successful Users</h2>
//         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
//           {[
//             { number: '50K+', label: 'Active Users' },
//             { number: '1M+', label: 'Workouts Completed' },
//             { number: '98%', label: 'Success Rate' }
//           ].map(({ number, label }, i) => (
//             <div key={label} className={`animate-fade-in animation-delay-${400 + i * 200} hover:scale-105 transition-transform`}>
//               <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">{number}</div>
//               <div className="text-gray-300">{label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Motivation Section */}
//       <MotivationalSection />

//       {/* CTA Section */}
//       <section className="py-20 px-6 bg-gradient-to-t from-green-500/20 to-transparent animate-fade-in">
//         <div className="max-w-4xl mx-auto text-center">
//           {/* <Heart className="w-16 h-16 text-green-500 mx-auto mb-6 animate-pulse hover:scale-110 transition-transform" />
//           <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Life?</h2>
//           <p className="text-xl text-gray-300 mb-8">Join our community today and start your journey towards a healthier, stronger you</p> */}
//           <CTASection />
//           <Button className="bg-green-500 hover:bg-green-600 text-white px-12 py-4 text-lg hover:scale-105 hover:shadow-green-500/25">Get Started Now</Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-6 py-12 border-t border-gray-800 bg-black/50 animate-fade-in">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Activity className="w-6 h-6 text-green-500 animate-pulse" />
//               <span className="text-xl font-bold">FitTrack</span>
//             </div>
//             <p className="text-gray-400">Your ultimate fitness companion for achieving your health and wellness goals.</p>
//           </div>
//           {[
//             {
//               title: 'Features',
//               items: ['Workout Tracking', 'Nutrition Plans', 'Progress Analytics', 'Goal Setting']
//             },
//             {
//               title: 'Company',
//               items: ['About Us', 'Careers', 'Contact', 'Blog']
//             },
//             {
//               title: 'Support',
//               items: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ']
//             }
//           ].map(({ title, items }, i) => (
//             <div key={title} className={`animate-fade-in animation-delay-${400 + i * 200}`}>
//               <h4 className="font-semibold mb-4 text-white">{title}</h4>
//               <ul className="space-y-2 text-gray-400">
//                 {items.map(item => (
//                   <li key={item} className="hover:text-green-500 transition-colors cursor-pointer">{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in animation-delay-1000">
//           &copy; 2024 FitTrack. All rights reserved.
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out forwards;
//         }

//         .animation-delay-200 {
//           animation-delay: 0.2s;
//           opacity: 0;
//         }

//         .animation-delay-400 {
//           animation-delay: 0.4s;
//           opacity: 0;
//         }

//         .animation-delay-600 {
//           animation-delay: 0.6s;
//           opacity: 0;
//         }

//         .animation-delay-800 {
//           animation-delay: 0.8s;
//           opacity: 0;
//         }

//         .animation-delay-1000 {
//           animation-delay: 1s;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Index;





































// 'use client';

// import { Activity, Target, TrendingUp, Users, Zap, Heart } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import React, { PropsWithChildren } from 'react';
// import HeroSection from '../app/Home Page Sections/HeroSection';
// import MotivationalSection from './Home Page Sections/MotivationSection';
// import CTASection from '../app/Home Page Sections/CTAsection';
// import FeatureSection from './Home Page Sections/FeatureSection';
// import { useRouter } from 'next/navigation';

// type ButtonProps = PropsWithChildren<
//   React.ButtonHTMLAttributes<HTMLButtonElement> & {
//     className?: string;
//   }
// >;

// const Button = ({ children, className = '', ...props }: ButtonProps) => (
//   <button {...props} className={`rounded-lg font-semibold transition-all duration-300 ${className}`}>
//     {children}
//   </button>
// );

// const Card = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`rounded-2xl border p-1 ${className}`}>{children}</div>
// );

// const CardContent = ({ children, className = '' }: PropsWithChildren<{ className?: string }>) => (
//   <div className={`p-6 ${className}`}>{children}</div>
// );



// const StatsSection = () => {
//   const [activeUsers, setActiveUsers] = useState(0);
//   const [successRate, setSuccessRate] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const wrapperRef = useRef<HTMLDivElement | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !hasAnimated) {
//           setHasAnimated(true);

//           let userCount = 1;
//           const userInterval = setInterval(() => {
//             setActiveUsers((prev) => {
//               if (userCount >= 50) {
//                 clearInterval(userInterval);
//                 return 50;
//               }
//               return userCount++;
//             });
//           }, 30);

//           let rateCount = 1;
//           const rateInterval = setInterval(() => {
//             setSuccessRate((prev) => {
//               if (rateCount >= 98) {
//                 clearInterval(rateInterval);
//                 return 98;
//               }
//               return rateCount++;
//             });
//           }, 25);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (wrapperRef.current) {
//       observer.observe(wrapperRef.current);
//     }

//     return () => {
//       if (wrapperRef.current) {
//         observer.unobserve(wrapperRef.current);
//       }
//     };
//   }, [hasAnimated]);

//   return (
//     <div ref={wrapperRef}>
//       <section className="py-20 px-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 animate-fade-in">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Join Thousands of Successful Users
//         </h2>
//         <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
//           <div className="animate-fade-in hover:scale-105 transition-transform">
//             <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">
//               {activeUsers}K+
//             </div>
//             <div className="text-gray-300">Active Users</div>
//           </div>
//           <div className="animate-fade-in hover:scale-105 transition-transform">
//             <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">1M+</div>
//             <div className="text-gray-300">Workouts Completed</div>
//           </div>
//           <div className="animate-fade-in hover:scale-105 transition-transform">
//             <div className="text-4xl font-bold text-green-500 mb-2 hover:animate-pulse">
//               {successRate}%
//             </div>
//             <div className="text-gray-300">Success Rate</div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };


// const Index = () => {
//   const router = useRouter();
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       {/* Navigation */}
//       <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-800 animate-fade-in">
//         <div className="flex items-center space-x-2">
//           <Activity className="w-8 h-8 text-green-500 animate-pulse" />
//           <span className="text-2xl font-bold">FitTrack</span>
//         </div>
//         <div className="hidden md:flex items-center space-x-8">
//           <a href="#" className="text-white hover:text-green-500 hover:scale-105 transition-all">Home</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Services</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">About</a>
//           <a href="#" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">Contact</a>
//         </div>
// <Button
//   onClick={() => router.push('/login')}
//   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
// >
//   Login
// </Button>
//       </nav>

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Features Section */}
//       <FeatureSection />

//       {/* Stats Section */}
//       <StatsSection />

//       {/* Motivation Section */}
//       <MotivationalSection />

//       {/* CTA Section */}
//       <CTASection />

//       {/* Footer */}
//       <footer className="px-6 py-12 border-t border-gray-800 bg-black/50 animate-fade-in">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Activity className="w-6 h-6 text-green-500 animate-pulse" />
//               <span className="text-xl font-bold">FitTrack</span>
//             </div>
//             <p className="text-gray-400">Your ultimate fitness companion for achieving your health and wellness goals.</p>
//           </div>
//           {[
//             {
//               title: 'Features',
//               items: ['Workout Tracking', 'Nutrition Plans', 'Progress Analytics', 'Goal Setting']
//             },
//             {
//               title: 'Company',
//               items: ['About Us', 'Careers', 'Contact', 'Blog']
//             },
//             {
//               title: 'Support',
//               items: ['Help Center', 'Privacy Policy', 'Terms of Service', 'FAQ']
//             }
//           ].map(({ title, items }, i) => (
//             <div key={title} className={`animate-fade-in animation-delay-${400 + i * 200}`}>
//               <h4 className="font-semibold mb-4 text-white">{title}</h4>
//               <ul className="space-y-2 text-gray-400">
//                 {items.map(item => (
//                   <li key={item} className="hover:text-green-500 transition-colors cursor-pointer">{item}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in animation-delay-1000">
//           &copy; 2024 FitTrack. All rights reserved.
//         </div>
//       </footer>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in {
//           animation: fade-in 0.6s ease-out forwards;
//         }

//         .animation-delay-200 {
//           animation-delay: 0.2s;
//           opacity: 0;
//         }

//         .animation-delay-400 {
//           animation-delay: 0.4s;
//           opacity: 0;
//         }

//         .animation-delay-600 {
//           animation-delay: 0.6s;
//           opacity: 0;
//         }

//         .animation-delay-800 {
//           animation-delay: 0.8s;
//           opacity: 0;
//         }

//         .animation-delay-1000 {
//           animation-delay: 1s;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Index;






























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
      <nav className="relative w-full px-6 md:px-10 py-4 flex items-center justify-between border-b border-gray-800 bg-black/70 backdrop-blur-md">
        {/* Left Logo */}
        <div className="flex items-center space-x-2 z-10">
          <Activity className="w-8 h-8 text-green-500 animate-pulse" />
          <span className="text-2xl font-bold">FitTrack</span>
        </div>

        {/* Center Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white hover:text-green-500 hover:scale-105 transition-all">
            Home
          </Link>
          <Link href="/Services" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">
            Services
          </Link>
          <Link href="/About" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">
            About
          </Link>
          <Link href="/Contact" className="text-gray-300 hover:text-green-500 hover:scale-105 transition-all">
            Contact
          </Link>
        </div>

        {/* Right Login Button */}
        <div className="z-10">
          <button
            onClick={() => router.push('/login')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 transition-all"
          >
            Login
          </button>
        </div>
      </nav>


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