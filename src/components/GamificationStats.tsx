
import React from 'react';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GamificationStatsProps {
  completedTasks: number;
  totalPoints: number;
  goalPoints: number;
  onUpdateGoal: (points: number) => void;
}

const GamificationStats: React.FC<GamificationStatsProps> = ({
  completedTasks,
  totalPoints,
  goalPoints,
  onUpdateGoal
}) => {
  const progress = Math.min((totalPoints / goalPoints) * 100, 100);
  const [isEditingGoal, setIsEditingGoal] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState(goalPoints.toString());

  const handleSubmitGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedGoal = parseInt(newGoal);
    if (!isNaN(parsedGoal) && parsedGoal > 0) {
      onUpdateGoal(parsedGoal);
    }
    setIsEditingGoal(false);
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-700">Today's Progress</h3>
        <div className="flex items-center gap-1">
          <Gift size={18} className="text-mindful-primary" />
          <span className="text-sm font-medium text-gray-700">
            {totalPoints} pts
          </span>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-mindful-primary to-indigo-500 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
        <span>{completedTasks} tasks completed</span>
        <span>
          {totalPoints}/{goalPoints} pts
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {progress >= 100 && (
            <div className="flex items-center gap-1">
              <Gift className="h-4 w-4 text-amber-500 animate-bounce-gentle" />
              <span className="text-sm font-medium text-amber-600">
                Goal achieved! Reward yourself!
              </span>
            </div>
          )}
        </div>
        
        {isEditingGoal ? (
          <form onSubmit={handleSubmitGoal} className="flex gap-2 items-center">
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              className="w-16 p-1 text-xs bg-gray-50 rounded-md border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none text-center"
              min="1"
              max="1000"
            />
            <div className="flex gap-1">
              <button 
                type="submit" 
                className="px-2 py-1 text-xs text-white bg-mindful-primary hover:bg-mindful-secondary rounded-md transition-colors"
              >
                Save
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditingGoal(false)}
                className="px-2 py-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsEditingGoal(true)}
            className="text-xs text-mindful-primary hover:text-mindful-secondary transition-colors"
          >
            Set Goal
          </button>
        )}
      </div>
    </div>
  );
};

export default GamificationStats;
