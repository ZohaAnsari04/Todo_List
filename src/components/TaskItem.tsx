
import React from 'react';
import { CircleCheck, CircleX, Flame, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TaskPriority = 'normal' | 'important' | 'urgent';

export interface TaskProps {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  points: number;
  priority: TaskPriority;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskProps> = ({
  id,
  text,
  category,
  completed,
  points,
  priority,
  onComplete,
  onDelete,
}) => {
  const getPriorityIcon = () => {
    switch (priority) {
      case 'urgent':
        return <Flame size={16} className="text-mindful-danger" />;
      case 'important':
        return <Star size={16} className="text-mindful-warning" />;
      default:
        return null;
    }
  };

  const priorityClass = `priority-${priority}`;

  return (
    <div 
      className={cn(
        "task-card mb-2 flex items-center justify-between group",
        priorityClass,
        completed && "task-completed"
      )}
    >
      <div className="flex items-center gap-3 flex-1">
        <button 
          onClick={() => onComplete(id, !completed)} 
          className={cn(
            "transition-colors duration-200 flex items-center justify-center",
            completed ? "text-mindful-success" : "text-gray-300 hover:text-mindful-primary"
          )}
        >
          <CircleCheck size={20} />
        </button>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", completed && "text-gray-400")}>
              {text}
            </span>
            {getPriorityIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{category}</span>
            <span className="text-xs bg-mindful-accent/20 text-mindful-primary px-2 py-0.5 rounded-full">
              {points} pts
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(id)}
        className="text-gray-300 hover:text-mindful-danger transition-colors duration-200 opacity-0 group-hover:opacity-100"
      >
        <CircleX size={18} />
      </button>
    </div>
  );
};

export default TaskItem;
