
import React, { useState } from 'react';
import { Award } from 'lucide-react';

const DailyWin: React.FC = () => {
  const [dailyWin, setDailyWin] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-br from-mindful-accent/30 to-white rounded-lg p-4 shadow-sm border border-mindful-accent/30 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-mindful-primary" />
          <h3 className="font-semibold text-gray-700">Today's Win or Gratitude</h3>
        </div>
        
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-mindful-primary hover:text-mindful-secondary transition-colors"
        >
          {dailyWin ? 'Edit' : 'Add'}
        </button>
      </div>
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-3">
          <textarea
            value={dailyWin}
            onChange={(e) => setDailyWin(e.target.value)}
            placeholder="What went well today or what are you grateful for?"
            className="w-full h-20 p-3 bg-white rounded-md text-sm text-gray-700 border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
          />
          <div className="flex gap-2 justify-end mt-2">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-3 py-1 text-xs text-white bg-mindful-primary hover:bg-mindful-secondary rounded-md transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-2">
          {dailyWin ? (
            <p className="text-sm text-gray-700 py-1 italic">
              "{dailyWin}"
            </p>
          ) : (
            <p className="text-sm text-gray-400 italic text-center py-1">
              Reflect on something positive from your day
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyWin;
