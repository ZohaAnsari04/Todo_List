
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CategoryType } from './CategorySection';
import type { TimeBlockType } from './TimeBlock';
import type { TaskPriority } from './TaskItem';

interface TaskFormProps {
  onAddTask: (task: {
    text: string;
    category: CategoryType;
    timeBlock: TimeBlockType;
    priority: TaskPriority;
    points: number;
    ifHaveTime: boolean;
  }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState<CategoryType>('project');
  const [timeBlock, setTimeBlock] = useState<TimeBlockType>('morning');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [points, setPoints] = useState(1);
  const [ifHaveTime, setIfHaveTime] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    onAddTask({
      text,
      category,
      timeBlock,
      priority,
      points,
      ifHaveTime
    });
    
    setText('');
    setIsFormOpen(false);
  };

  return (
    <div className="mb-6">
      {!isFormOpen ? (
        <button
          onClick={() => setIsFormOpen(true)}
          className="w-full bg-white hover:bg-gray-50 text-mindful-primary border border-dashed border-mindful-primary/30 rounded-lg p-3 flex items-center justify-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span>Add New Task</span>
        </button>
      ) : (
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <h3 className="font-semibold text-gray-700 mb-3">Add New Task</h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full p-3 bg-gray-50 rounded-md text-sm text-gray-700 border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
                autoFocus
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full p-2 text-sm bg-gray-50 rounded-md border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
                >
                  <option value="study">Study</option>
                  <option value="project">Project Work</option>
                  <option value="personal">Personal Growth</option>
                  <option value="follow-ups">Follow-Ups</option>
                  <option value="chores">Chores</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Block</label>
                <select
                  value={timeBlock}
                  onChange={(e) => setTimeBlock(e.target.value as TimeBlockType)}
                  className="w-full p-2 text-sm bg-gray-50 rounded-md border border-gray-200 focus:border-mindful-primary focus:ring-1 focus:ring-mindful-primary outline-none"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPriority('normal')}
                    className={cn(
                      "flex-1 py-2 text-xs rounded-md border transition-colors",
                      priority === 'normal' 
                        ? "bg-mindful-accent/20 border-mindful-accent text-mindful-primary" 
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('important')}
                    className={cn(
                      "flex-1 py-2 text-xs rounded-md border transition-colors",
                      priority === 'important' 
                        ? "bg-amber-100 border-amber-200 text-amber-700" 
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Important ★
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriority('urgent')}
                    className={cn(
                      "flex-1 py-2 text-xs rounded-md border transition-colors",
                      priority === 'urgent' 
                        ? "bg-red-100 border-red-200 text-red-700" 
                        : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    Urgent 🔥
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Points (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1</span>
                  <span>{points}</span>
                  <span>10</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="ifHaveTime"
                checked={ifHaveTime}
                onChange={(e) => setIfHaveTime(e.target.checked)}
                className="rounded border-gray-300 text-mindful-primary focus:ring-mindful-primary"
              />
              <label htmlFor="ifHaveTime" className="ml-2 text-sm text-gray-700">
                Add to "If I Have Time" section
              </label>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-mindful-primary hover:bg-mindful-secondary rounded-md transition-colors"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TaskForm;
