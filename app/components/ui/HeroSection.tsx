 import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/estate.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

    
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-white">Modern Living,</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
            Simplified Management
          </span>
        </h1>

        <p className="text-gray-300 max-w-2xl mb-8">
          Titan Rental connects landlords and tenants through a secure digital
          platform. Streamline rent payments, maintenance requests, and
          communication, all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#rooms"
            className="inline-flex items-center justify-center gap-2 
                       bg-gradient-to-r from-blue-600 to-blue-700 
                       hover:from-blue-700 hover:to-blue-800 
                       text-white font-semibold py-3 px-8 rounded-lg 
                       transition-all duration-300"
          >
            View Available Rooms
            <ArrowRight className="w-5 h-5" />
          </a>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 
                       border-2 border-blue-500 
                       hover:bg-blue-500/10 
                       text-blue-300 hover:text-white 
                       font-semibold py-3 px-8 rounded-lg 
                       transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
