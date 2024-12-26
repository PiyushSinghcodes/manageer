import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Task } from '@/lib/types';
import { getTaskStatus } from '@/lib/taskUtils';

interface CalendarViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const CalendarView = ({ tasks, onTaskClick }: CalendarViewProps) => {
  const events = tasks.map((task) => {
    const status = getTaskStatus(task);
    let backgroundColor = '#3b82f6'; // blue for due today
    
    if (status === 'completed') {
      backgroundColor = '#22c55e'; // green
    } else if (status === 'overdue') {
      backgroundColor = '#ef4444'; // red
    }

    return {
      id: task.id,
      title: task.title,
      date: task.dueDate,
      backgroundColor,
      borderColor: backgroundColor,
    };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          const task = tasks.find((t) => t.id === info.event.id);
          if (task) onTaskClick(task);
        }}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek',
        }}
      />
    </div>
  );
};

export default CalendarView;