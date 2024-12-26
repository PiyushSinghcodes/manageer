import { Task } from '@/lib/types';
import { getTaskStatus } from '@/lib/taskUtils';
import { Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { Calendar, Clock } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: () => void;
}

const TaskCard = ({ task, index, onClick }: TaskCardProps) => {
  const status = getTaskStatus(task);
  
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'dueToday':
        return 'bg-blue-100 border-blue-500 text-blue-700';
      case 'overdue':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 mb-2 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${getStatusColor()}`}
          onClick={onClick}
        >
          <h3 className="font-semibold mb-2">{task.title}</h3>
          <p className="text-sm mb-2 line-clamp-2">{task.description}</p>
          <div className="flex items-center text-sm gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;