import Navigation from "../Services/components/Navigation";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-green-400" />,
      title: "Visit Us",
      details: ["123 Fitness Street", "Downtown District", "New York, NY 10001"]
    },
    {
      icon: <Phone className="h-6 w-6 text-green-400" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"]
    },
    {
      icon: <Mail className="h-6 w-6 text-green-400" />,
      title: "Email Us",
      details: ["hello@fittrack.com", "support@fittrack.com"]
    },
    {
      icon: <Clock className="h-6 w-6 text-green-400" />,
      title: "Hours",
      details: ["Mon-Fri: 5:00 AM - 11:00 PM", "Sat-Sun: 6:00 AM - 10:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Get In <span className="text-green-400">Touch</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready to start your fitness journey? We're here to help you every step of the way. 
            Reach out to us with any questions or to schedule your first session.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    placeholder="John"
                    className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    placeholder="Doe"
                    className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Phone</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Service Interest</label>
                <select className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring focus:ring-green-400">
                  <option value="">Select a service</option>
                  <option value="personal-training">Personal Training</option>
                  <option value="nutrition-coaching">Nutrition Coaching</option>
                  <option value="group-classes">Group Classes</option>
                  <option value="wellness-coaching">Wellness Coaching</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  placeholder="Tell us about your fitness goals and how we can help you..."
                  rows={4}
                  className="w-full px-4 py-2 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 text-gray-900 hover:bg-green-300 font-medium py-3 rounded-md transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{info.icon}</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-white">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-300 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Map Placeholder */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-green-400 mx-auto" />
                <p className="text-gray-300">Interactive Map</p>
                <p className="text-gray-400 text-sm">123 Fitness Street, New York</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 space-y-6">
          <h2 className="text-3xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied members who have transformed their lives with FitTrack. 
            Book your free consultation today and take the first step towards a healthier you.
          </p>
          <button
            className="bg-green-400 text-gray-900 hover:bg-green-300 px-8 py-3 text-lg font-medium rounded-md transition-all"
          >
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
