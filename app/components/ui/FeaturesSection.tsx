 import { Shield, MessageSquare, CreditCard, Wrench, Bell, FileText } from 'lucide-react';
import { features } from '@/app/lib/data';
 
const FeaturesSection = () => {
  return (
    <section className="py-20  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Why Choose </span>
            <span className="text-transparent bg-clip-text bg-blue-700">
              Titan Rental?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our digital platform enhances your living experience with modern solutions 
            designed for convenience and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gray-900/50 border border-gray-700 rounded-2xl p-8 hover:border-blue-500   hover:shadow-xl"
            >
        
              
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
             
            </div>
          ))}
        </div>

         <div className="mt-20 bg-gray-900 border border-gray-700/30 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400">Tenant Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-400">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1-2</div>
              <div className="text-gray-400">Days Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-gray-400">Secure Payments</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;