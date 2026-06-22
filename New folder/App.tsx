
import React, { useState } from 'react';
import Header from './components/Header';
import PromptContainer from './components/PromptContainer';
import TechStack from './components/TechStack';
import Editor from './components/Editor';
import GoalPlannerModal from './components/GoalPlannerModal';
import MainContent from './components/MainContent';

const App: React.FC = () => {
  const [isBuilding, setIsBuilding] = useState(false);
  const [goalModalOpen, setGoalModalOpen] = useState(true);
  const [goal, setGoal] = useState<string | null>(null);
  const [plan, setPlan] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleStartBuilding = () => {
    setIsBuilding(true);
  };

  const handlePlanConfirmed = (g: string, p: string[], s: string[]) => {
    setGoal(g);
    setPlan(p);
    setSuggestions(s);
    setGoalModalOpen(false);
  };

  if (goalModalOpen) {
    return <GoalPlannerModal open={goalModalOpen} onClose={() => setGoalModalOpen(false)} onPlanConfirmed={handlePlanConfirmed} />;
  }

  if (isBuilding) {
    return <MainContent files={[]} status={'done'} goal={goal} plan={plan} suggestions={suggestions} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0d0d0f] text-gray-300 font-sans flex flex-col items-center overflow-x-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] md:w-[100%] h-[500px] bg-[radial-gradient(circle_at_top_center,_rgba(29,78,216,0.15),_transparent_40%)] -z-0" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <Header />
        <main className="flex flex-col items-center text-center mt-12 sm:mt-20 pb-20">
          <PromptContainer onStart={handleStartBuilding} />
          <TechStack />
          {/* عرض الهدف والخطة */}
          {goal && (
            <div className="mt-8 bg-[#23232a] rounded-lg p-6 text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-2">هدف المشروع:</h3>
              <p className="text-gray-200 mb-4">{goal}</p>
              <h4 className="text-lg font-semibold text-white mb-2">الخطة:</h4>
              <ul className="list-disc pl-6 text-gray-300 mb-4">
                {plan.map((step, i) => <li key={i}>{step}</li>)}
              </ul>
              {suggestions.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">اقتراحات مفعلة:</h4>
                  <ul className="list-disc pl-6 text-blue-300">
                    {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
