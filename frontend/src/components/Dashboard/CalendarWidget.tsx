'use client';

import { useState } from 'react';

export default function CalendarWidget() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const daysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const firstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const generateCalendar = () => {
        const totalDays = daysInMonth(currentDate);
        const startingDay = firstDayOfMonth(currentDate);
        const calendar = [];

        // Empty cells for days before the 1st
        for (let i = 0; i < startingDay; i++) {
            calendar.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
        }

        // Days of the month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

        for (let day = 1; day <= totalDays; day++) {
            const isToday = isCurrentMonth && day === today.getDate();
            calendar.push(
                <div
                    key={day}
                    className={`h-8 w-8 flex items-center justify-center text-sm font-bold rounded-full
                        ${isToday ? 'bg-black text-[#FFFDF2]' : 'text-gray-700 hover:bg-gray-200'}
                    `}
                >
                    {day}
                </div>
            );
        }

        return calendar;
    };

    return (
        <div className="bg-[#FFFDF2] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b border-black pb-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-black">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex gap-2">
                    <button onClick={prevMonth} className="p-1 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button onClick={nextMonth} className="p-1 hover:bg-gray-200 rounded">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Desktop Grid View */}
            <div>
                <div className="grid grid-cols-7 mb-2 text-center">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={i} className="text-xs font-bold text-gray-400">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1 text-center justify-items-center">
                    {generateCalendar()}
                </div>
            </div>
        </div>
    );
}
