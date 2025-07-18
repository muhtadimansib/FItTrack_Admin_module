"use client";

import Navigation from "../Services/components/Navigation";
import { Card, CardContent } from "./Card";
import { Users, Target, Award, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import resultAnimation from "@/../public/lottie/success.json";
import communityAnimation from "@/../public/lottie/Community.json";
import wellnessAnimation from "@/../public/lottie/Mission.json";
import { useEffect, useState } from "react";

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8 text-green-400" />, value: "50K+", label: "Active Users" },
    { icon: <Target className="h-8 w-8 text-green-400" />, value: "98%", label: "Success Rate" },
    { icon: <Award className="h-8 w-8 text-green-400" />, value: "500+", label: "Certified Trainers" },
    { icon: <Heart className="h-8 w-8 text-green-400" />, value: "10+", label: "Years Experience" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & Head Trainer",
      bio: "Certified fitness expert with 15+ years of experience in transforming lives through fitness.",
      image: "/images/Founder.jpg"
    },
    {
      name: "Mike Chen",
      role: "Nutrition Specialist",
      bio: "Licensed nutritionist helping clients optimize their diet for peak performance.",
      image: "/placeholder.svg"
    },
    {
      name: "Emma Davis",
      role: "Wellness Coach",
      bio: "Holistic wellness expert focusing on mind-body connection and sustainable habits.",
      image: "/placeholder.svg"
    }
  ];

  const values = [
    {
      animation: resultAnimation,
      title: "Results-Driven",
      description: "We're committed to helping you achieve measurable results through science-based fitness approaches."
    },
    {
      animation: communityAnimation,
      title: "Community First",
      description: "Building a supportive community where everyone feels welcomed and motivated to succeed."
    },
    {
      animation: wellnessAnimation,
      title: "Holistic Wellness",
      description: "We believe fitness goes beyond physical - it's about mental health, nutrition, and lifestyle."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % values.length);
    }, 6000); // Change value every 6 seconds
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `
          radial-gradient(at bottom left, rgba(220, 38, 38, 0.12), transparent 70%),
          radial-gradient(at top right, rgba(34, 197, 94, 0.12), transparent 70%),
          linear-gradient(to right, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))
        `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Navigation />

      {/*MISSION SECTION */}
      <div className="container mx-auto px-6 py-20 space-y-32">
        
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              To democratize fitness by making professional-grade training and wellness 
              guidance accessible to everyone, regardless of their starting point or fitness level.
            </p>
            <p className="text-gray-300">
              We believe that everyone deserves to feel strong, confident, and healthy. 
              Our platform combines the expertise of certified professionals with innovative 
              technology to create personalized fitness journeys that actually work.
            </p>
          </div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="/images/Mission.jpg"
              alt="Fitness training"
              className="w-full h-80 object-cover rounded-lg"
            />
          </motion.div>
        </motion.div>

        {/*HERO SECTION (About FitTrack) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            About <span className="text-green-400">FitTrack</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Founded in 2014, FitTrack has been at the forefront of fitness innovation, 
            helping thousands of people transform their lives through personalized fitness solutions 
            and cutting-edge technology.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardContent className="p-6 space-y-3">
                  <div className="flex justify-center">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

{/* Values + Team Section (Combined) */}
{/* Values + Team Section (Compact) */}
<section className="relative z-10 flex flex-col gap-20 px-6 py-16">
  {/* Values Slide Section */}
  <AnimatePresence mode="wait">
    <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl w-full mx-auto"
    >
      {/* LEFT TEXT */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl w-full text-center lg:text-left"
      >
        <p className="text-green-400 text-base font-semibold mb-2 tracking-wide">
          ★ Core Value
        </p>
        <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
          {values[currentIndex].title}
        </h2>
        <p className="text-base lg:text-lg text-slate-300 leading-relaxed">
          {values[currentIndex].description}
        </p>
      </motion.div>

      {/* RIGHT LOTTIE */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-sm flex items-center justify-center"
      >
        <div className="bg-slate-800/40 rounded-xl border border-green-400 p-4 shadow-lg">
          <Lottie
            animationData={values[currentIndex].animation}
            loop
            className="w-64 h-64"
          />
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>

  {/* Team Section */}
  <div className="space-y-12 max-w-7xl mx-auto w-full">
    <h2 className="text-3xl font-bold text-white text-center">Meet Our Team</h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="grid md:grid-cols-3 gap-8"
    >
      {team.map((member, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 hover:border-green-400/50 transition-all duration-300">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-24 h-24 bg-slate-700 rounded-full mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-green-400 font-medium">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      </div>
    </div>
  );
};

export default About;
