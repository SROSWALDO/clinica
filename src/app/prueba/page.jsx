"use client";
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const TestCalendar = () => {
  const events = [
    {
      title: 'Cita de prueba',
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hora después
    },
  ];

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        views={['month', 'week', 'day']}
      />
    </div>
  );
};

export default TestCalendar;
