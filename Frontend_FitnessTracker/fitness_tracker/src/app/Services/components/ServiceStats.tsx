'use client';
import { motion } from 'framer-motion';
import { Users, Star, Heart } from 'lucide-react';

const stats = [
  { id: 1, icon: Users, label: "Active Members", value: "12K+" },
  { id: 2, icon: Star, label: "5-Star Reviews", value: "3.5K+" },
  { id: 3, icon: Heart, label: "Success Stories", value: "8.2K+" },
];

const ServiceStats = () => {
  return (
    <section
      className="py-16 px-6 text-white"
      style={{
        backgroundImage: `
          radial-gradient(at top left, rgba(34, 197, 94, 0.25), transparent 60%),
          radial-gradient(at bottom right, rgba(239, 68, 68, 0.2), transparent 60%),
          linear-gradient(to right, #0f172a, #1f2937)
        `,
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {stats.map(({ id, icon: Icon, label, value }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <Icon className="text-green-400 w-10 h-10 mb-2" />
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-gray-300">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ServiceStats;
