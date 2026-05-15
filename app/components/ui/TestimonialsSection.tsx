 'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/app/lib/data';

const TestimonialCard = ({ 
  name, 
  role, 
  content, 
  rating 
}: { 
  name: string; 
  role: string; 
  content: string; 
  rating: number; 
}) => {
  return (
    <div className="  border border-gray-700 rounded-2xl p-8">
    
      
       
      <p className="text-gray-300 text-lg italic mb-8 leading-relaxed">{content}</p>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600  rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
        </div>
        <div>
          <h4 className="text-white font-semibold">{name}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20  ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">What Our </span>
            <span className="text-transparent bg-clip-text bg-blue-700">
              Tenants Say
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from residents who enjoy the convenience of our digital platform
          </p>
        </div>

         <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={prevSlide}
            className="cursor-pointer w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-300" />
          </button>
          <button
            onClick={nextSlide}
            className="cursor-pointer w-12 h-12 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>
        </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
              }`}
            >
              <TestimonialCard {...testimonial} />
            </div>
          ))}
        </div>

         <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'w-8 bg-blue-500' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;