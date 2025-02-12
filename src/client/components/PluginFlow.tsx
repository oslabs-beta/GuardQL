import React from 'react';
import { ArrowRight, UserPlus, LayoutDashboard, Package, Code2, Play, BarChart3 } from 'lucide-react';

const PluginFlow = () => {
  const steps = [
    {
      icon: <UserPlus size={32} />,
      title: "1. Create Account",
      description: "Create an account to access the GuardQL dashboard. You'll receive an API key upon signup for plugin configuration."
    },
    {
      icon: <LayoutDashboard size={32} />,
      title: "2. Create Project",
      description: "Once logged in, create a new project via the projects dropdown. Select your project to view GraphQL request insights."
    },
    {
      icon: <Package size={32} />,
      title: "3. Install Package",
      description: "Install the GuardQL NPM package in your application."
    },
    {
      icon: <Code2 size={32} />,
      title: "4. Configure Plugin",
      description: "Add GuardQL plugin to Apollo Server with your project name, API key, and query threshold settings."
    },
    {
      icon: <Play size={32} />,
      title: "5. Run Application",
      description: "Run your app and start making GraphQL requests."
    },
    {
      icon: <BarChart3 size={32} />,
      title: "6. Monitor Metrics",
      description: "View your performance metrics in real-time on your GuardQL dashboard!"
    }
  ];

  return (
    <div className="flow-container">
      <style>
        {`
          .flow-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
          }

          .flow-steps {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
            gap: 24px;
          }

          .step-wrapper {
            display: flex;
            align-items: center;
            width: 420px; /* Fixed width to include card and arrow */
          }

          .step-card {
            width: 350px;
            flex-shrink: 0;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgb(250, 190, 240);
            transition: box-shadow 0.3s ease;
            padding: 24px;
          }

          .step-card:hover {
            box-shadow: 0 4px 8px rgb(241, 109, 219);
          }

          .step-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .step-icon {
            color: #e623c6;
          }

          .step-title {
            font-size: 18px;
            font-weight: 600;
          }

          .step-description {
            font-size: 14px;
            color: #4b5563;
            margin-top: 8px;
          }

          .arrow-wrapper {
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-shrink: 0;
            color: #9ca3af;
          }

          @media (max-width: 768px) {
            .step-card {
              width: 280px;
            }
            .arrow-wrapper {
              width: 30px;
            }
          }

          @keyframes moveArrow {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(10px); }
          }

          .arrow-animate {
            animation: moveArrow 1.5s infinite;
          }
        `}
      </style>
      <div className="flow-steps">
        {steps.map((step, index) => (
          <div key={index} className="step-wrapper">
            <div className="step-card">
              <div className="step-content">
                <div className="step-icon">
                  {step.icon}
                </div>
                <div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div className="arrow-wrapper">
                <div className="arrow-animate">
                  <ArrowRight />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PluginFlow;
