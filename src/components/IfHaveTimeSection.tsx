
import React from 'react';
import { ArrowRight } from 'lucide-react';
import TaskItem, { TaskProps } from './TaskItem';

interface IfHaveTimeSectionProps {
  tasks: TaskProps[];
  onCompleteTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

const IfHaveTimeSection: React.FC<IfHaveTimeSectionProps> = ({ 
  tasks, 
  onCompleteTask, 
  onDeleteTask 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <ArrowRight size={18} className="text-mindful-primary" />
        <h3 className="font-semibold text-gray-700">If I Have Time</h3>
      </div>

      <div className="bg-gray-50/50 border border-dashed border-gray-200 rounded-lg p-4">
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
            <p className="text-sm text-gray-400 italic text-center py-2">No bonus tasks added yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IfHaveTimeSection;
