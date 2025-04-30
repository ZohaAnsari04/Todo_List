
import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const BrainDump: React.FC = () => {
  const [notes, setNotes] = useState<string>('');

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Brain size={20} className="text-mindful-primary" />
        <h3 className="font-semibold text-gray-700">Brain Dump</h3>
      </div>
      
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Quickly jot down random thoughts, ideas, or distractions here..."
        className="w-full h-28 p-3 bg-gray-50 rounded-md text-sm text-gray-700 border-gray-100 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none transition-all duration-200"
      />
    </div>
  );
};

export default BrainDump;
