
import React from 'react';
import { Calendar } from 'lucide-react';
import TaskItem, { TaskProps } from './TaskItem';

export type TimeBlockType = 'morning' | 'afternoon' | 'evening';

interface TimeBlockProps {
  type: TimeBlockType;
  tasks: TaskProps[];
  onCompleteTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ type, tasks, onCompleteTask, onDeleteTask }) => {
  const getTitle = () => {
    switch (type) {
      case 'morning':
        return 'Morning';
      case 'afternoon':
        return 'Afternoon';
      case 'evening':
        return 'Evening';
      default:
        return '';
    }
  };

  const getTimeRange = () => {
    switch (type) {
      case 'morning':
        return '6:00 AM - 12:00 PM';
      case 'afternoon':
        return '12:00 PM - 6:00 PM';
      case 'evening':
        return '6:00 PM - 10:00 PM';
      default:
        return '';
    }
  };

  const getGradientClass = () => {
    switch (type) {
      case 'morning':
        return 'from-amber-100 to-amber-50';
      case 'afternoon':
        return 'from-blue-100 to-blue-50';
      case 'evening':
        return 'from-indigo-100 to-indigo-50';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6">
      <div className={`bg-gradient-to-r ${getGradientClass()} p-3 rounded-lg mb-3`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-700">{getTitle()}</h3>
          </div>
          <span className="text-xs text-gray-500">{getTimeRange()}</span>
        </div>
      </div>

      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onComplete={onCompleteTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <p className="text-sm text-gray-400 italic text-center py-2">No tasks for this time block</p>
        )}
      </div>
    </div>
  );
};

export default TimeBlock;
