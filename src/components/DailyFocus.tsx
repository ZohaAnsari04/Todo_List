
import React, { useState } from 'react';

interface DailyFocusProps {
  dailyFocus: string;
  onUpdateFocus: (text: string) => void;
}

const DailyFocus: React.FC<DailyFocusProps> = ({ dailyFocus, onUpdateFocus }) => {
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState(dailyFocus);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFocus(text);
    setEditMode(false);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg p-6 mb-6 text-center relative">
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Set your daily intention or motivational quote..."
            className="w-full p-3 bg-white/80 backdrop-blur-sm rounded-md text-center text-gray-700 border border-indigo-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
            autoFocus
          />
          <div className="flex justify-center gap-2 mt-3">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-3 py-1 text-xs text-gray-600 bg-white/80 hover:bg-white rounded-md transition-colors"
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
        <>
          <h2 className="text-xl md:text-2xl font-bold text-mindful-primary mb-1">
            {dailyFocus || "Set Your Daily Intention"}
          </h2>
          <p className="text-sm text-gray-600">
            {dailyFocus ? "Your focus for today" : "Click to add your mindset or motivational quote for today"}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="absolute top-3 right-3 text-xs text-indigo-500 hover:text-indigo-700 underline"
          >
            {dailyFocus ? "Edit" : "Add"}
          </button>
        </>
      )}
    </div>
  );
};

export default DailyFocus;
