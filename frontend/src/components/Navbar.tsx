'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        setMounted(true);
        // Format: 12/01/26 - Mon
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
        setTodayDate(`${day}/${month}/${year} - ${weekday}`);
    }, []);

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#FFFDF2] border-b-2 border-black h-16 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Toggle */}
                        {user && (
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 text-black hover:bg-gray-100 rounded focus:outline-none"
                            >
                                {isMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        )}

                        <Link
                            href="/dashboard"
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-black flex items-center justify-center">
                                <span className="text-[#FFFDF2] font-serif font-bold text-xl">T</span>
                            </div>
                            <span className="hidden md:block text-xl font-bold text-black uppercase tracking-widest font-serif">
                                MiniTask
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Mobile Date Display */}
                        <span className="md:hidden text-xs font-bold text-black uppercase tracking-widest whitespace-nowrap">
                            {todayDate}
                        </span>

                        {user ? (
                            <div className="flex items-center space-x-6">
                                {/* Desktop Links */}
                                <Link href="/history" className="hidden md:block text-black uppercase text-xs font-bold tracking-widest hover:underline">
                                    History
                                </Link>
                                <span className="hidden md:block text-black text-xs font-bold uppercase tracking-wider">
                                    {user.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="hidden md:block bg-transparent text-black border-2 border-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-[#FFFDF2] transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link href="/login" className="text-black uppercase text-xs font-bold tracking-wider hover:underline">
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-black text-[#FFFDF2] border-2 border-black px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-[#FFFDF2] hover:text-black transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar (Drawer) */}
            {isMenuOpen && user && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 top-16 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Drawer Content */}
                    <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-[#FFFDF2] border-r-2 border-black p-6 shadow-xl z-50 md:hidden flex flex-col animate-slide-in-left">
                        <div className="flex flex-col space-y-6">
                            <div className="pb-4 border-b-2 border-gray-100">
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Signed in as</p>
                                <p className="font-bold text-sm truncate font-serif">{user.email}</p>
                            </div>

                            <Link
                                href="/history"
                                className="text-black uppercase text-sm font-bold tracking-widest hover:text-gray-600 flex items-center gap-3 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <span>History</span>
                            </Link>

                            <button
                                onClick={logout}
                                className="bg-black text-[#FFFDF2] w-full py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mt-8 border-2 border-transparent"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
}
