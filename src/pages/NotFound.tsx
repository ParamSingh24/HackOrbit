import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Home } from 'lucide-react'; // Import the Home icon

const NotFound = () => {
  const location = useLocation();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set visibility to true when section is in view
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [location.pathname]);

  return (
    <div ref={sectionRef} className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white py-12 px-4 overflow-hidden relative">
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }

        /* Glass Box Styles */
        .glass-box {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem; /* Consistent rounded-xl */
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
          transition: all 0.3s ease-in-out;
        }

        .glass-box:hover {
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4);
          transform: translateY(-2px);
        }

        /* Glassy Button Styles */
        .glassy-button {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
          color: white; /* Ensure text is white by default */
          border-radius: 0.5rem; /* Added border-radius for buttons */
        }

        .glassy-button:hover {
          background: #00FFFF; /* Blue fill-up */
          border-color: #00FFFF; /* Cyan border on hover */
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); /* Blue glow effect */
          color: white; /* Changed text color to white on hover */
          transform: translateY(-2px);
        }

        /* Floating Ghost/Element Animation */
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .floating-element {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
      <div className={`text-center p-8 rounded-xl ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
        <h1 className="text-6xl md:text-8xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#00CCCC]">
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-6">Oops! Page not found</p>
        <a href="/" className="glassy-button inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold">
          <Home className="w-5 h-5" />
          Return to Home
        </a>
      </div>

      {/* Creative Floating Element */}
      <div className="absolute top-1/4 left-1/4 text-cyan-500 opacity-20 text-3xl floating-element hidden md:block">
        HackOrbit
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-cyan-500 opacity-20 text-2xl floating-element" style={{ animationDelay: '1.5s' }}>
        MITS
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 opacity-10 text-[4rem] floating-element" style={{ animationDelay: '0.7s' }}>
        CareerBoost
      </div>
    </div>
  );
};

export default NotFound;
