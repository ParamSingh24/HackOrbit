import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, Trophy, Clock, ExternalLink, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Course = {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  link: string;
  skills: string[];
};

type LearningPathsProps = {
  courses: Course[];
};

const LearningPaths = ({ courses }: LearningPathsProps) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false); // State to control animation

  useEffect(() => {
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
  }, []);

  const getLevelColor = (level: Course['level']) => {
    switch (level) {
      case 'Beginner': return 'border-green-400 text-green-400 bg-green-900 bg-opacity-20';
      case 'Intermediate': return 'border-[#00FFFF] text-[#00FFFF] bg-cyan-900 bg-opacity-20';
      case 'Advanced': return 'border-purple-400 text-purple-400 bg-purple-900 bg-opacity-20';
      default: return 'border-gray-500 text-gray-400 bg-gray-800 bg-opacity-20';
    }
  };

  return (
    <div ref={sectionRef} className="space-y-12 py-10 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
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
          color: black; /* Changed text color to black on hover */
          transform: translateY(-2px);
        }

        /* Gradient Text */
        .gradient-text {
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(to right, #00FFFF, #00CCCC);
        }

        /* Card Hover Effect */
        .card-hover {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 251, 255, 0.3);
        }
      `}</style>
      <div className="container mx-auto px-4 rounded-xl">
        <div className={`text-center mb-8 ${isVisible ? 'animate-slide-up' : 'opacity-0'} rounded-xl`}>
          <h2 className="text-3xl font-bold mb-3 gradient-text">Recommended Learning Paths</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
        Personalized courses and resources to help you acquire the necessary skills
        and bridge the gap between your current abilities and your career goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
        <Card key={course.id} className={`h-full flex flex-col glass-box card-hover ${isVisible ? 'animate-slide-up' : 'opacity-0'} rounded-xl`} style={{ animationDelay: `${0.1 * index}s` }}>
          <CardHeader className="pb-4 rounded-t-xl">
            <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-white">{course.title}</CardTitle>
          <Badge variant="outline" className={getLevelColor(course.level) + " rounded-md"}>
            {course.level}
          </Badge>
            </div>
            <CardDescription className="flex items-center gap-1 text-gray-400">
          <Tag size={14} className="text-[#00FFFF]" />
          {course.provider}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pb-4">
            <p className="text-sm text-gray-300 mb-4">{course.description}</p>
            
            <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-400">
            <Clock className="mr-2 h-4 w-4 text-[#00FFFF]" />
            <span>{course.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-white font-medium">
            <Trophy className="mr-2 h-4 w-4 text-[#00FFFF]" />
            <span>Skills you'll gain</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mt-1">
            {course.skills.map((skill, skillIndex) => (
              <Badge key={skillIndex} variant="secondary" className="text-xs bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 rounded-md">
            {skill}
              </Badge>
            ))}
          </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0 rounded-b-xl">
            <Button asChild className="w-full glassy-button rounded-lg">
          <a href={course.link} target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2 h-4 w-4" />
            Explore Course
            <ExternalLink className="ml-2 h-3 w-3" />
          </a>
            </Button>
          </CardFooter>
        </Card>
          ))}
        </div>
        
        <div className={`text-center mt-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'} rounded-xl`} style={{ animationDelay: `${0.1 * courses.length}s` }}>
          <p className="text-sm text-gray-400 mb-4 mt-40 pt-50">
        Looking for more learning resources? We have more recommendations tailored for you.
          </p>
          <Button variant="outline" className="glassy-button border-[#00FFFF] hover:bg-cyan-900 hover:bg-opacity-20 text-[#00FFFF] rounded-lg">
        View All Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;
