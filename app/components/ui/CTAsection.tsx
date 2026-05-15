 import { ArrowRight, Calendar, Phone } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-900 border border-gray-700 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Find Your</span>
              <span className="block text-transparent bg-clip-text bg-blue-700">
                New Home?
              </span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join dozens of satisfied tenants who enjoy streamlined rent payments, 
              instant communication, and premium apartment living.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="text-left">
                <h4 className="text-xl font-bold text-white mb-4">Quick Application Process</h4>
                <div className="space-y-4">
                  {[
                    'Submit online application',
                    'Receive response within 24 hours',
                    'Virtual or in-person tour',
                    'Digital lease signing',
                    'Move-in coordination'
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <span className="text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-blue-700/30 rounded-2xl p-8">
                <h4 className="text-xl font-bold text-white mb-6">Get In Touch</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Call us</div>
                      <div className="text-white font-semibold">+254798445363</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Business Hours</div>
                      <div className="text-white font-semibold">full time</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
 
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/bookings"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300  "
              >
                 View Rooms
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link 
                href="/auth/login"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-blue-500 hover:bg-blue-500/10 text-blue-300 hover:text-white font-semibold py-4 px-10 rounded-xl text-lg transition-all duration-300"
              >
                <span className="text-xl">Login as Tenant</span>
              </Link>
            </div>

            <p className="text-gray-500 text-sm mt-8">
              No credit check required for application. Security deposit required upon approval.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;