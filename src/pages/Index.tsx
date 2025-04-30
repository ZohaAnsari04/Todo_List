
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import DailyFocus from '@/components/DailyFocus';
import TimeBlock from '@/components/TimeBlock';
import CategorySection from '@/components/CategorySection';
import BrainDump from '@/components/BrainDump';
import MusicLink from '@/components/MusicLink';
import IfHaveTimeSection from '@/components/IfHaveTimeSection';
import DailyWin from '@/components/DailyWin';
import TaskForm from '@/components/TaskForm';
import GamificationStats from '@/components/GamificationStats';
import { TaskProps } from '@/components/TaskItem';

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

const Index = () => {
  const { toast } = useToast();
  const [dailyFocus, setDailyFocus] = useState('');
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [goalPoints, setGoalPoints] = useState(50);
  const [view, setView] = useState<'time' | 'category'>('time');

  // Calculate statistics whenever tasks change
  useEffect(() => {
    const completed = tasks.filter(task => task.completed);
    setCompletedCount(completed.length);
    
    const points = completed.reduce((sum, task) => sum + task.points, 0);
    setTotalPoints(points);
  }, [tasks]);

  const handleAddTask = (taskData: {
    text: string;
    category: string;
    timeBlock: string;
    priority: any;
    points: number;
    ifHaveTime: boolean;
  }) => {
    const newTask: TaskProps = {
      id: generateId(),
      text: taskData.text,
      category: taskData.category,
      timeBlock: taskData.timeBlock,
      priority: taskData.priority,
      points: taskData.points,
      completed: false,
      ifHaveTime: taskData.ifHaveTime,
      onComplete: handleCompleteTask,
      onDelete: handleDeleteTask
    };

    setTasks([...tasks, newTask]);
    toast({
      title: "Task added",
      description: `"${taskData.text}" added to your list.`,
    });
  };

  const handleCompleteTask = (id: string, completed: boolean) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (completed && !task.completed) {
          toast({
            title: `+${task.points} points!`,
            description: "Keep up the good work!",
          });
        }
        return { ...task, completed };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter(task => task.id !== id));
    
    if (taskToDelete) {
      toast({
        title: "Task deleted",
        description: `"${taskToDelete.text}" removed from your list.`,
      });
    }
  };

  const updateDailyFocus = (text: string) => {
    setDailyFocus(text);
    toast({
      title: "Daily focus updated",
      description: "Your intention for today has been set.",
    });
  };

  const morningTasks = tasks.filter(task => task.timeBlock === 'morning' && !task.ifHaveTime);
  const afternoonTasks = tasks.filter(task => task.timeBlock === 'afternoon' && !task.ifHaveTime);
  const eveningTasks = tasks.filter(task => task.timeBlock === 'evening' && !task.ifHaveTime);
  
  const studyTasks = tasks.filter(task => task.category === 'study' && !task.ifHaveTime);
  const projectTasks = tasks.filter(task => task.category === 'project' && !task.ifHaveTime);
  const personalTasks = tasks.filter(task => task.category === 'personal' && !task.ifHaveTime);
  const followUpTasks = tasks.filter(task => task.category === 'follow-ups' && !task.ifHaveTime);
  const choreTasks = tasks.filter(task => task.category === 'chores' && !task.ifHaveTime);
  
  const ifHaveTimeTasks = tasks.filter(task => task.ifHaveTime);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-3xl px-4 sm:px-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-mindful-primary text-center mb-2">
            Mindful Todo Adventures
          </h1>
          <p className="text-center text-gray-500">
            Plan your day with intention and purpose
          </p>
        </header>
        
        {/* Daily Focus */}
        <DailyFocus 
          dailyFocus={dailyFocus} 
          onUpdateFocus={updateDailyFocus} 
        />
        
        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />
        
        {/* Gamification Stats */}
        <GamificationStats 
          completedTasks={completedCount}
          totalPoints={totalPoints}
          goalPoints={goalPoints}
          onUpdateGoal={setGoalPoints}
        />
        
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setView('time')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                view === 'time'
                  ? 'bg-mindful-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 transition-colors`}
            >
              Time Blocks
            </button>
            <button
              type="button"
              onClick={() => setView('category')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                view === 'category'
                  ? 'bg-mindful-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 transition-colors`}
            >
              Categories
            </button>
          </div>
        </div>
        
        {/* Main Task Lists */}
        {view === 'time' ? (
          <div>
            <TimeBlock 
              type="morning"
              tasks={morningTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <TimeBlock 
              type="afternoon"
              tasks={afternoonTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <TimeBlock 
              type="evening"
              tasks={eveningTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        ) : (
          <div>
            <CategorySection 
              type="study"
              tasks={studyTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <CategorySection 
              type="project"
              tasks={projectTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <CategorySection 
              type="personal"
              tasks={personalTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <CategorySection 
              type="follow-ups"
              tasks={followUpTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
            <CategorySection 
              type="chores"
              tasks={choreTasks}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
            />
          </div>
        )}
        
        {/* "If I Have Time" Section */}
        <IfHaveTimeSection
          tasks={ifHaveTimeTasks}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brain Dump */}
          <BrainDump />
          
          {/* Music Link */}
          <MusicLink />
        </div>
        
        {/* Daily Win */}
        <DailyWin />
        
        <footer className="text-center text-xs text-gray-500 mt-8 mb-4">
          Mindful Todo Adventures - Design your day with purpose
        </footer>
      </div>
    </div>
  );
};

export default Index;
