'use client'
import { motion } from 'framer-motion';
import { ArrowRight, Dumbbell, Users, Apple, Heart, Target, Clock } from 'lucide-react';
import Navigation from '../Services/components/Navigation';
import ServiceHero from './components/ServiceHero';
import ServiceStats from './components/ServiceStats';
import ServiceCard from './components/ServiceCard';

const services = [
  {
    id: 1,
    title: "Personal Training",
    description: "One-on-one sessions with certified trainers tailored to your specific goals and fitness level.",
    icon: Dumbbell,
    price: "$89/session",
    features: ["Customized workout plans", "Progress tracking", "Nutrition guidance", "24/7 support"],
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&crop=center",
    popular: true
  },
  {
    id: 2,
    title: "Nutrition Coaching",
    description: "Expert nutrition guidance to fuel your workouts and optimize your health journey.",
    icon: Apple,
    price: "$59/month",
    features: ["Meal planning", "Macro tracking", "Recipe suggestions", "Weekly check-ins"],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Group Classes",
    description: "High-energy group workouts that build community while you build strength.",
    icon: Users,
    price: "$29/class",
    features: ["HIIT workouts", "Strength training", "Cardio sessions", "Flexible scheduling"],
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Wellness Coaching",
    description: "Holistic approach to health focusing on mind-body connection and lifestyle optimization.",
    icon: Heart,
    price: "$79/month",
    features: ["Stress management", "Sleep optimization", "Mindfulness training", "Lifestyle coaching"],
    image: "https://i.postimg.cc/9Qxp9K3X/istockphoto-1129866093-612x612.jpg"
  },
  {
    id: 5,
    title: "Goal Setting & Tracking",
    description: "Advanced analytics and personalized goal-setting to maximize your fitness results.",
    icon: Target,
    price: "$39/month",
    features: ["Performance analytics", "Goal tracking", "Progress reports", "Achievement rewards"],
    image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=600&h=400&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Flexible Scheduling",
    description: "Book sessions that fit your lifestyle with our flexible scheduling system.",
    icon: Clock,
    price: "Included",
    features: ["24/7 booking", "Easy rescheduling", "Mobile app access", "Reminder notifications"],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&crop=center"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

const Services = () => {
  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        backgroundImage: `
      radial-gradient(at bottom left, rgba(34, 197, 94, 0.12), transparent 70%),
      radial-gradient(at top right, rgba(239, 68, 68, 0.12), transparent 70%),
      linear-gradient(to right, rgba(17, 24, 39, 0.98), rgba(31, 41, 55, 0.98))
    `,
        backgroundColor: '#0F172A'
      }}
    >
      <Navigation />
      <ServiceHero />

      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <motion.div
          className="mb-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold mb-4">
            Our <span className="text-green-600">Services</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive fitness solutions designed to help you achieve your goals and transform your lifestyle.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map(service => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }} // ← this is important
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

      </section>

      <ServiceStats />

      <section className="bg-black-600 text-white py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your <span className="underline decoration-yellow-300">Journey</span>?
          </h2>
          <p className="mb-8 text-lg md:text-xl max-w-xl mx-auto">
            Join thousands of members who have transformed their lives with FitTrack. Your fitness journey starts with a single step.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition"
          >
            Get Started Today <ArrowRight size={20} className="ml-2" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
