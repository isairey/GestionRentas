'use client';
export const dynamic = 'force-dynamic';  

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SimpleBookPage() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('room');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    //  validation
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

  
    setTimeout(() => {
      console.log('Booking submitted:', {
        roomId,
        ...formData
      });
      
      setSubmitting(false);
      setSubmitted(true);
      
  
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#060219] flex items-center justify-center p-4">
        <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl">✓</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            Booking Request Sent!
          </h2>
          
          <p className="text-gray-300 mb-6">
            We have received your booking request for Room {roomId || 'the selected room'}. 
            We will contact you within 24-48 hours.
          </p>
          
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060219]">
  
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-gray-300 hover:text-white text-sm"
          >
            ← Back
          </Link>
        </div>

        <div className="max-w-md mx-auto">
           <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">
              Book Room {roomId || ''}
            </h1>
            <p className="text-gray-400">
              Fill in your details to request a booking
            </p>
          </div>

    
          <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
         
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Arnold"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

            
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="arnold@example.com"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

          
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+254 712 345 678"
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

               
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  Tell us about yourself, your preferences, or any special requirements...
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="I'm looking for a quiet room..."
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

 
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 px-4 cursor-pointer rounded-lg font-medium ${
                  submitting
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {submitting ? 'Submitting...' : 'Request Booking'}
              </button>

              <p className="text-gray-400 text-xs text-center">
                We will contact you to schedule a viewing.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}