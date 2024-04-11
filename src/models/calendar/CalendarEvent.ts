interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  isResizable?: boolean;
  isDraggable?: boolean;
}

export default CalendarEvent;
