import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Search, Brain, Mail, MessageSquare, TrendingUp } from 'lucide-react';

const FutureScope = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      id: 1,
      title: "Resume Optimization",
      description: "AI-powered resume analysis and optimization to help you stand out from the crowd",
      icon: FileText,
      route: "/1",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Application Tracking",
      description: "Track your job applications, interviews, and follow-ups in one organized dashboard",
      icon: Search,
      route: "/2",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Skill Gap Analysis",
      description: "Identify skill gaps and get personalized recommendations for career growth",
      icon: Brain,
      route: "/3",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      title: "Email Outreach",
      description: "Generate personalized outreach emails to connect with potential employers",
      icon: Mail,
      route: "/4",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "AI Career Coaching",
      description: "Get personalized career advice and guidance from our AI-powered chatbot",
      icon: MessageSquare,
      route: "/5",
      color: "from-indigo-500 to-blue-500"
    },
    {
      id: 6,
      title: "Job Trend Analysis",
      description: "Stay ahead with real-time job market trends and industry insights",
      icon: TrendingUp,
      route: "/2",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section id="future-scope" ref={sectionRef} className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .feature-card {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 1rem;
          box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }
        
        .feature-card:hover {
          background: rgba(0, 0, 0, 0.6);
          border-color: rgba(0, 251, 255, 0.3);
          box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.2);
          transform: translateY(-4px);
        }
        
        .icon-gradient {
          background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Scope</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive suite of AI-powered career tools designed to accelerate your professional journey
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`feature-card p-6 cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  '--gradient-start': feature.color.split(' ')[0].replace('from-', ''),
                  '--gradient-end': feature.color.split(' ')[1].replace('to-', '')
                } as React.CSSProperties}
                onClick={() => navigate(feature.route)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} bg-opacity-20`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-cyan-400 text-sm font-medium">
                  Explore Feature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FutureScope; 