import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'month',
    features: [
      'Basic AI resume analysis',
      'Limited suggestions',
      'Access to job trends',
      'Community support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Pro',
    price: 19,
    period: 'month',
    features: [
      'Advanced AI resume optimization',
      'Personalized job tracking',
      'Priority support',
      'Automated job applications',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Elite',
    price: 99,
    period: 'year',
    features: [
      'All Pro features',
      '1-on-1 career coaching',
      'Exclusive webinars',
      'Early access to new features',
    ],
    cta: 'Go Elite',
    highlight: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="hero-section-bg py-20 md:py-32 border-t border-cyan-900">
    <style jsx>{`
      .glass-box {
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 0.75rem;
        box-shadow: 0 8px 32px 0 rgba(0, 251, 255, 0.2);
        transition: all 0.3s ease-in-out;
      }
      .glass-box:hover {
        background: rgba(0, 0, 0, 0.4);
        box-shadow: 0 12px 48px 0 rgba(0, 251, 255, 0.4);
        transform: translateY(-2px);
      }
      .highlight {
        border: 2px solid #00fbff;
        box-shadow: 0 0 24px 0 rgba(0,251,255,0.3);
      }
    `}</style>
    <div className="container mx-auto px-4 md:px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 mb-4">Pricing Plans</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Choose the plan that fits your career goals. All plans come with our signature glassmorphism design and AI-powered features.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`glass-box p-8 flex flex-col items-center ${plan.highlight ? 'highlight' : ''}`}
          >
            <h3 className="text-xl font-bold text-cyan-300 mb-2">{plan.name}</h3>
            <div className="flex items-end mb-6">
              <span className="text-4xl font-extrabold text-white">{plan.price === 0 ? 'Free' : `$${plan.price}`}</span>
              {plan.price !== 0 && (
                <span className="text-base text-gray-400 ml-2">/ {plan.period}</span>
              )}
            </div>
            <ul className="mb-8 space-y-3 w-full">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-200">
                  <CheckCircle2 className="text-cyan-400 mr-2 h-5 w-5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              className={`w-full ${plan.highlight ? 'bg-cyan-400 text-black hover:bg-cyan-300' : 'bg-black text-white hover:bg-gray-800'} transition-all duration-300`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing; 