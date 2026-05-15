import HeroSection from './components/ui/HeroSection';
import AvailableRooms from './components/ui/AvailableRooms';
import FeaturesSection from './components/ui/FeaturesSection';
import TestimonialsSection from './components/ui/TestimonialsSection';
import CTASection from './components/ui/CTAsection';


export default function HomePage() {

  return (
    <div className='min-h-screen'>

<HeroSection />
    <main className="bg-gray-800">
      
      <AvailableRooms />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
        </div>

  );
}

