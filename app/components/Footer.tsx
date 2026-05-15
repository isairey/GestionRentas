'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Mail, Phone, MapPin, Shield, CreditCard, Wifi, Car, Droplets, Facebook, Twitter,Instagram,Linkedin,ChevronDown, ChevronUp, Clock
} from 'lucide-react';

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const features = [
    { icon: <CreditCard className="w-4 h-4" />, text: 'Digital Rent Payments' },
    { icon: <Shield className="w-4 h-4" />, text: 'Secure Room Login' },
    { icon: <Wifi className="w-4 h-4" />, text: 'Free WiFi Included' },
    { icon: <Car className="w-4 h-4" />, text: 'Parking Available' },
    { icon: <Droplets className="w-4 h-4" />, text: '24/7 Water Supply' },
    { icon: <Home className="w-4 h-4" />, text: 'Maintenance Requests' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/wotagwanyoh', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/ar_nold._/', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/arnold-wanza-b51654330/', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#060219] border-t border-gray-800">
    
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
         
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Titan Rental</h2>
              <p className="text-gray-400">Modern Living, Simplified Management</p>
            </div>
            
            <p className="text-gray-400 mb-6">
              Streamlining communication between landlords and tenants with our secure digital platform.
            </p>
            
  x             <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

   
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Available Rooms
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tenant Login
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-white mb-6">Features</h3>
            <ul className="space-y-3">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-blue-400">
                    {feature.icon}
                  </span>
                  <span className="text-gray-400">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Meru Around Nchiru</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">+254798445363</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">arnoldkk422@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400">Full time</span>
              </li>
            </ul>
          </div>

  
          <div className="lg:hidden space-y-4">
  
            <div className="border-b border-gray-800">
              <button
                onClick={() => toggleSection('links')}
                className="flex justify-between items-center w-full py-4 text-left"
              >
                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                {openSection === 'links' ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openSection === 'links' && (
                <div className="pb-4">
                  <ul className="space-y-3">
                    <li>
                      <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors block py-2">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/#rooms" className="text-gray-400 hover:text-blue-400 transition-colors block py-2">
                        Available Rooms
                      </Link>
                    </li>
                    <li>
                      <Link href="/apply" className="text-gray-400 hover:text-blue-400 transition-colors block py-2">
                        Apply Now
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors block py-2">
                        Tenant Login
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
 
            <div className="border-b border-gray-800">
              <button
                onClick={() => toggleSection('features')}
                className="flex justify-between items-center w-full py-4 text-left"
              >
                <h3 className="text-lg font-semibold text-white">Features</h3>
                {openSection === 'features' ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openSection === 'features' && (
                <div className="pb-4">
                  <div className="grid grid-cols-2 gap-3">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-blue-400">
                          {feature.icon}
                        </span>
                        <span className="text-gray-400 text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

     
            <div className="border-b border-gray-800">
              <button
                onClick={() => toggleSection('contact')}
                className="flex justify-between items-center w-full py-4 text-left"
              >
                <h3 className="text-lg font-semibold text-white">Contact Us</h3>
                {openSection === 'contact' ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {openSection === 'contact' && (
                <div className="pb-4">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-400">123 Apartment Street, Cityville</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">(555) 123-4567</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-400">info@titanrental.com</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

 
      
      </div>

 
      <div className="bg-black/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Titan Rental System. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                A digital platform connecting landlords and tenants.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Contact Support
              </Link>
            </div>
          </div>
 
          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-sm">
             Crafted by Arnold
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;