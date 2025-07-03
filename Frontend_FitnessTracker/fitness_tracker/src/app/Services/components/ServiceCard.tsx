import { Star } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    price: string;
    features: string[];
    image: string;
    popular?: boolean;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;

  return (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
      {/* Image */}
      <img
        src={service.image}
        alt={service.title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />

      {/* Content */}
      <div className="flex flex-col flex-grow p-6">
        <div className="flex items-center mb-2">
          <Icon className="text-green-400 w-6 h-6 mr-2" />
          {service.popular && (
            <div className="flex items-center text-yellow-400 font-semibold text-sm ml-auto">
              <Star className="w-4 h-4 mr-1" /> Popular
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold mb-1">{service.title}</h3>
        <p className="text-gray-300 text-sm mb-4 flex-grow">{service.description}</p>

        <div className="mb-4 font-semibold text-green-400 text-lg">{service.price}</div>

        <ul className="text-gray-400 text-sm space-y-1 mb-6">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2" />
              {feature}
            </li>
          ))}
        </ul>

        <button
          className="mt-auto bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold transition"
          aria-label={`Select ${service.title}`}
        >
          Choose Plan
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
