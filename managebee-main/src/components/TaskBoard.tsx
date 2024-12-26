import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BoardData, Task } from '@/lib/types';
import TaskCard from './TaskCard';

interface TaskBoardProps {
  data: BoardData;
  onDragEnd: (result: any) => void;
  onTaskClick: (task: Task) => void;
}

const TaskBoard = ({ data, onDragEnd, onTaskClick }: TaskBoardProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

          return (
            <div key={column.id} className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-4 text-gray-700">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[200px]"
                  >
                    {tasks.map((task, index) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        index={index}
                        onClick={() => onTaskClick(task)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;