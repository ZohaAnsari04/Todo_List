
import React from 'react';
import { Book, Briefcase, Leaf, Mail, Trash } from 'lucide-react';
import TaskItem, { TaskProps } from './TaskItem';

export type CategoryType = 'study' | 'project' | 'personal' | 'follow-ups' | 'chores';

interface CategorySectionProps {
  type: CategoryType;
  tasks: TaskProps[];
  onCompleteTask: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ type, tasks, onCompleteTask, onDeleteTask }) => {
  const getIcon = () => {
    switch (type) {
      case 'study':
        return <Book size={18} />;
      case 'project':
        return <Briefcase size={18} />;
      case 'personal':
        return <Leaf size={18} />;
      case 'follow-ups':
        return <Mail size={18} />;
      case 'chores':
        return <Trash size={18} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'study':
        return 'Study';
      case 'project':
        return 'Project Work';
      case 'personal':
        return 'Personal Growth';
      case 'follow-ups':
        return 'Follow-Ups';
      case 'chores':
        return 'Chores';
      default:
        return '';
    }
  };

  const getBgClass = () => {
    switch (type) {
      case 'study':
        return 'bg-blue-50 text-blue-600';
      case 'project':
        return 'bg-purple-50 text-purple-600';
      case 'personal':
        return 'bg-green-50 text-green-600';
      case 'follow-ups':
        return 'bg-amber-50 text-amber-600';
      case 'chores':
        return 'bg-gray-50 text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className={`${getBgClass()} p-2 rounded-md`}>
          {getIcon()}
        </div>
        <h3 className="font-semibold text-gray-700">{getTitle()}</h3>
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
          <p className="text-sm text-gray-400 italic text-center py-2">No tasks in this category</p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
