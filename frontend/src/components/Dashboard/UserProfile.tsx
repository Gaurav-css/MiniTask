'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function UserProfile() {
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    if (!user) return null;

    const initials = user.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

    return (
        <div className="bg-[#FFFDF2] border-2 border-black p-4 text-center">
            <div className="w-12 h-12 mx-auto bg-black flex items-center justify-center mb-3 rounded-full border-2 border-black ring-2 ring-[#FFFDF2] ring-offset-1 ring-offset-black">
                <span className="text-lg font-bold text-[#FFFDF2] font-serif">
                    {initials}
                </span>
            </div>

            <p className="text-[10px] font-serif italic text-gray-500 mb-0.5">{greeting},</p>
            <h2 className="text-base font-bold text-black uppercase tracking-wider mb-0.5">{user.name}</h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-sans">{user.email}</p>
        </div>
    );
}
