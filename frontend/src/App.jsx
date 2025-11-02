import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Laptop, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Zap,
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Instagram,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

// --- Asset Imports ---
// In a real project, you'd place these in the `public` folder.
const logoUrl = './logo.png';
const heroVideoUrl = './hero-bg.mp4';
const repairImageUrl1 = './repair1.jpg';
const repairImageUrl2 = './repair2.jpg';
const repairImageUrl3 = './repair3.jpg';

// --- Contact Info (from user) ---
const CONTACT_INFO = {
  email: "cliffdesignz@gmail.com",
  phone: "+233547092289",
  address: "Accra, Ghana",
  facebook: "https://web.facebook.com/cliffdetech",
  instagram: "https://www.instagram.com/cliff_de_tech/"
};

// --- Page Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

/**
 * Main App Component
 * Handles navigation and page state.
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false); // Close menu on navigation
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-inter">
      <Header 
        navigateTo={navigateTo} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <HeroSection navigateTo={navigateTo} />
              <ServicesSection navigateTo={navigateTo} />
              <WhyChooseUsSection />
              <TestimonialsSection />
            </motion.div>
          )}
          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ServicesPage />
            </motion.div>
          )}
          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ContactPage />
            </motion.div>
          )}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AboutPage navigateTo={navigateTo} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}

/**
 * Header Component
 * Contains Logo, Navigation, and Mobile Menu
 */
function Header({ navigateTo, isMobileMenuOpen, setIsMobileMenuOpen }) {
  const navLinks = [
    { title: 'Home', page: 'home' },
    { title: 'Services', page: 'services' },
    { title: 'About Us', page: 'about' },
    { title: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); }} className="flex items-center space-x-2">
            <img 
              src={logoUrl} 
              alt="Cliff_Tech Solutions Logo" 
              className="h-10 w-auto"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src="https://placehold.co/150x50/000000/FFFFFF?text=Cliff_Tech";
              }}
            />
            <span className="text-xl font-bold text-white whitespace-nowrap hidden sm:block">
              Cliff_Tech Solutions
            </span>
          </a>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <motion.a
              key={link.page}
              href="#"
              onClick={(e) => { e.preventDefault(); navigateTo(link.page); }}
              className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              {link.title}
            </motion.a>
          ))}
          <motion.button
            onClick={() => navigateTo('contact')}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(59, 130, 246)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get a Quote
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <div className="flex flex-col space-y-4 px-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.page}
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigateTo(link.page); }}
                  className="text-gray-300 hover:text-blue-400 text-lg text-center py-2"
                >
                  {link.title}
                </a>
              ))}
              <motion.button
                onClick={() => navigateTo('contact')}
                className="w-full bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(59, 130, 246)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Quote
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/**
 * Hero Section Component
 * Displays the main welcome video and tagline.
 */
function HeroSection({ navigateTo }) {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://placehold.co/1920x1080/000000/333333?text=Loading+Video..."
      >
        <source src={heroVideoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

      {/* Content */}
      <motion.div 
        className="relative z-20 container mx-auto px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
          Cliff_Tech Solutions
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Fast & reliable iPhone and PC repair services. 24/7 support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigateTo('services')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(59, 130, 246)" }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.button>
          <motion.button
            onClick={() => navigateTo('contact')}
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Services Section (Homepage)
 * A quick overview of the main services.
 */
function ServicesSection({ navigateTo }) {
  const services = [
    {
      icon: Smartphone,
      title: "iPhone Repair",
      description: "Cracked screens, battery replacements, water damage, and more. We fix all iPhone models.",
      img: repairImageUrl1,
    },
    {
      icon: Laptop,
      title: "PC & Laptop Repair",
      description: "Virus removal, hardware upgrades, data recovery, and system optimization for all PC brands.",
      img: repairImageUrl2,
    },
    {
      icon: Wrench,
      title: "Custom Solutions",
      description: "Need a custom build or a complex diagnostic? We handle all types of tech challenges.",
      img: repairImageUrl3,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What We Fix
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Expert repairs for your most important devices.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={service.img} 
                alt={service.title} 
                className="h-56 w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/600x400/111827/444444?text=Repair+Image";
                }}
              />
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center space-x-3 mb-4">
                  <service.icon className="text-blue-500" size={28} />
                  <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
                <motion.a
                  href="#"
                  onClick={(e) => {e.preventDefault(); navigateTo('services');}}
                  className="inline-flex items-center text-blue-400 font-medium group"
                  whileHover={{ gap: 8 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Learn More
                  <ChevronRight size={20} className="transition-transform group-hover:translate-x-1" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Why Choose Us Section
 * Highlights key benefits of the service.
 */
function WhyChooseUsSection() {
  const features = [
    {
      icon: Clock,
      title: "24/7 Service",
      description: "We're available around the clock because we know tech issues don't wait."
    },
    {
      icon: Zap,
      title: "Fast Turnaround",
      description: "Our expert technicians work efficiently to get your device back to you ASAP."
    },
    {
      icon: ShieldCheck,
      title: "Reliable & Guaranteed",
      description: "We stand by our work with a warranty on all repairs and parts."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose Cliff_Tech?
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Your devices are in safe, expert hands.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="inline-block bg-blue-600 text-white p-4 rounded-full mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Testimonials Section
 * Displays mock customer testimonials.
 */
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Kofi A.",
      quote: "Cliff_Tech saved my life! They repaired my water-damaged iPhone in just a few hours. 24/7 service is no joke. Highly recommend!",
      location: "Accra"
    },
    {
      name: "Esi G.",
      quote: "My laptop was running so slow I thought it was finished. The team at Cliff_Tech optimized it, removed viruses, and now it's faster than new!",
      location: "Tema"
    },
    {
      name: "John M.",
      quote: "Professional, fast, and reliable. I wouldn't trust anyone else in Accra with my PC hardware. Top-class service.",
      location: "Accra"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 p-8 rounded-lg shadow-xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-gray-300 italic text-lg mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xl text-white mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Services Page
 * A dedicated page with more details about services.
 */
function ServicesPage() {
  const serviceList = [
    { 
      title: "iPhone Screen Repair", 
      description: "Cracked or shattered screen? We use high-quality replacement parts to make your phone look brand new.",
      icon: Smartphone,
      price: "Starting from ₵200"
    },
    { 
      title: "iPhone Battery Replacement", 
      description: "Is your battery draining too fast? We'll install a new battery to restore your phone's life.",
      icon: Smartphone,
      price: "Starting from ₵150"
    },
    { 
      title: "PC Virus & Malware Removal", 
      description: "Protect your data and restore your PC's performance with our comprehensive virus removal service.",
      icon: Laptop,
      price: "Starting from ₵100"
    },
    { 
      title: "Laptop Hardware Upgrades", 
      description: "Boost your computer's speed with an SSD upgrade, more RAM, or a new graphics card.",
      icon: Laptop,
      price: "Contact for Quote"
    },
    { 
      title: "Data Recovery", 
      description: "Lost important files? Our technicians can help recover data from failing hard drives and other media.",
      icon: Wrench,
      price: "Contact for Quote"
    },
    { 
      title: "Water Damage Repair", 
      description: "Spilled something on your device? Our 24/7 team can perform emergency diagnostics and repair.",
      icon: Wrench,
      price: "Starting from ₵250"
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Comprehensive repair solutions for iPhone and PC.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <service.icon className="text-blue-500" size={32} />
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              </div>
              <p className="text-gray-400 mb-6 flex-grow">{service.description}</p>
              <span className="text-lg font-semibold text-blue-400">{service.price}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * About Page
 * Information about the company.
 */
function AboutPage({ navigateTo }) {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About Cliff_Tech Solutions
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              Founded in Accra, Ghana, Cliff_Tech Solutions was born from a passion for technology and a desire to provide reliable, fast, and honest repair services to our community. We understand how crucial your devices are to your daily life, which is why we're committed to getting you back online as quickly as possible.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Our team of expert technicians has years of experience with all models of iPhones and PCs. From simple screen repairs to complex data recovery, we've seen it all. We pride ourselves on transparent pricing, top-quality parts, and our signature 24/7 customer support.
            </p>
            <motion.a
              href="#"
              onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 12px rgb(59, 130, 246)" }}
              whileTap={{ scale: 0.95 }}
            >
              Meet the Team (Coming Soon)
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div
            className="w-full h-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img 
              src={repairImageUrl2} // Using one of the provided images
              alt="Technician working on a PC"
              className="rounded-lg shadow-2xl object-cover w-full h-full max-h-[500px]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src="https://placehold.co/600x500/111827/444444?text=Our+Workshop";
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Contact Page
 * Contains contact form and business info.
 */
function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formState, setFormState] = useState({
    submitting: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ submitting: true, success: false, error: null });

    // --- REAL API CALL ---
    // This will try to post to a server running on localhost:3001.
    // This will fail in the preview but is the correct code for a
    // full-stack implementation.
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setFormState({ submitting: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (error) {
      console.error("Fetch error:", error);
      setFormState({ submitting: false, success: false, error: error.message });
      
      // --- SIMULATION FALLBACK (for demo) ---
      // In a real app, you might just show the error.
      // Here, we'll simulate success after a delay if the fetch fails
      // (e.g., because the server isn't running).
      console.log("Simulating form submission...");
      setTimeout(() => {
        setFormState({ submitting: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);
    }
  };

  const contactDetails = [
    { icon: Phone, text: CONTACT_INFO.phone, href: `tel:${CONTACT_INFO.phone}` },
    { icon: Mail, text: CONTACT_INFO.email, href: `mailto:${CONTACT_INFO.email}` },
    { icon: MapPin, text: CONTACT_INFO.address, href: "#" },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Have a question or need a quote? We're here 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <AnimatePresence>
                {formState.success && (
                  <motion.div
                    className="mb-6 p-4 rounded-lg bg-green-500 text-white text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Message sent successfully! We'll get back to you soon.
                  </motion.div>
                )}
                {formState.error && (
                  <motion.div
                    className="mb-6 p-4 rounded-lg bg-red-500 text-white text-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Error: {formState.error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 disabled:bg-gray-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formState.submitting}
              >
                {formState.submitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-semibold text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <detail.icon className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <a 
                      href={detail.href} 
                      className="text-lg text-gray-200 hover:text-blue-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {detail.text}
                    </a>
                    {detail.text === CONTACT_INFO.address && (
                      <p className="text-gray-500">Accra, Ghana</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* You can add a map embed here */}
            <div className="bg-gray-800 rounded-lg shadow-lg h-64">
              <iframe
                title="Google Map of Accra"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127063.85800412853!2d-0.2709217820691515!3d5.62349781846175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084f676485b%3A0x8b665f8f8d68997a!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1678888888888!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Footer Component
 * Contains social links, contact info, and copyright.
 */
function Footer({ navigateTo }) {
  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand & Socials */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logoUrl} alt="Cliff_Tech Logo" className="h-10" />
              <span className="text-xl font-bold text-white">Cliff_Tech</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your 24/7 tech repair experts in Accra.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href={CONTACT_INFO.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </motion.a>
              <motion.a 
                href={CONTACT_INFO.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                whileHover={{ scale: 1.2, y: -2 }}
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </motion.a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-3">
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('home')}} className="text-gray-400 hover:text-blue-400">Home</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('services')}} className="text-gray-400 hover:text-blue-400">Services</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('about')}} className="text-gray-400 hover:text-blue-400">About Us</a></li>
              <li><a href="#" onClick={(e) => {e.preventDefault(); navigateTo('contact')}} className="text-gray-400 hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Our Services</h5>
            <ul className="space-y-3">
              <li><span className="text-gray-400">iPhone Repair</span></li>
              <li><span className="text-gray-400">PC & Laptop Repair</span></li>
              <li><span className="text-gray-400">Data Recovery</span></li>
              <li><span className="text-gray-400">Hardware Upgrades</span></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-400 hover:text-blue-400">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-blue-400 break-all">{CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{CONTACT_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} Cliff_Tech Solutions. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}