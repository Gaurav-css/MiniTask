'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TourStep {
    targetId: string;
    title: string;
    content: string;
    position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface TourProps {
    steps: TourStep[];
    isOpen: boolean;
    onClose: () => void;
}

export default function Tour({ steps, isOpen, onClose }: TourProps) {
    // ... (state and logic mostly same, checking below for adjustments)
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [style, setStyle] = useState<React.CSSProperties>({});
    const [lineCoords, setLineCoords] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // ... (rest of logic)

    useEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            if (!step) return;

            const element = document.getElementById(step.targetId);

            if (element) {
                const rect = element.getBoundingClientRect();
                const scrollTop = window.scrollY;
                const isMobile = window.innerWidth < 1024;

                // Basic positioning logic
                let top = 0;
                let left = 0;
                let startX = 0, startY = 0, endX = 0, endY = 0;
                const buffer = 40;
                const boxWidth = Math.min(320, window.innerWidth - 32);
                const boxHeight = 180;

                let activePosition = step.position;
                if (isMobile) {
                    if (step.position === 'left' || step.position === 'right') {
                        activePosition = rect.top > window.innerHeight / 2 ? 'top' : 'bottom';
                    }
                }

                switch (activePosition) {
                    case 'bottom':
                        top = rect.bottom + scrollTop + buffer;
                        left = Math.max(10, Math.min(window.innerWidth - boxWidth - 10, rect.left + (rect.width / 2) - (boxWidth / 2)));
                        startX = left + (boxWidth / 2);
                        startY = top;
                        endX = rect.left + (rect.width / 2);
                        endY = rect.bottom + scrollTop;
                        break;
                    case 'top':
                        top = rect.top + scrollTop - buffer - boxHeight;
                        left = Math.max(10, Math.min(window.innerWidth - boxWidth - 10, rect.left + (rect.width / 2) - (boxWidth / 2)));
                        startX = left + (boxWidth / 2);
                        startY = top + boxHeight;
                        endX = rect.left + (rect.width / 2);
                        endY = rect.top + scrollTop;
                        break;
                    case 'left':
                        top = rect.top + scrollTop;
                        left = rect.left - boxWidth - buffer;
                        startX = left + boxWidth;
                        startY = top + 50;
                        endX = rect.left;
                        endY = rect.top + scrollTop + (rect.height / 2);
                        break;
                    case 'right':
                        top = rect.top + scrollTop;
                        left = rect.right + buffer;
                        startX = left;
                        startY = top + 50;
                        endX = rect.right;
                        endY = rect.top + scrollTop + (rect.height / 2);
                        break;
                    case 'center':
                        break;
                }

                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setStyle({
                    top: activePosition === 'center' ? '50%' : `${top}px`,
                    left: activePosition === 'center' ? '50%' : `${left}px`,
                    transform: activePosition === 'center' ? 'translate(-50%, -50%)' : 'none',
                    position: activePosition === 'center' ? 'fixed' : 'absolute',
                    zIndex: 9999, // High Z-Index
                    width: activePosition === 'center' ? 'min(90vw, 320px)' : `${boxWidth}px`
                });

                if (activePosition !== 'center') {
                    setLineCoords({ x1: startX, y1: startY, x2: endX, y2: endY });
                } else {
                    setLineCoords(null);
                }
            } else {
                // Fallback to center if element not found
                setStyle({
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    position: 'fixed',
                    zIndex: 9999,
                    width: 'min(90vw, 320px)'
                });
                setLineCoords(null);
            }
        };

        const timer = setTimeout(updatePosition, 300);
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        }
    }, [currentStepIndex, isOpen, steps]);

    if (!isOpen || !mounted) return null;

    // ... handler helpers same ...
    const step = steps[currentStepIndex];
    if (!step) return null;
    const isLast = currentStepIndex === steps.length - 1;

    const handleNext = () => {
        if (isLast) onClose(); else setCurrentStepIndex(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStepIndex > 0) setCurrentStepIndex(prev => prev - 1);
    };

    return createPortal(
        <div className="absolute inset-0 z-[9999] pointer-events-none h-full w-full">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/20 pointer-events-auto" onClick={onClose} />

            {/* Thread Line */}
            {lineCoords && (
                <svg
                    className="absolute top-0 left-0 w-full pointer-events-none overflow-visible"
                    style={{ height: `${Math.max(document.body.scrollHeight, window.innerHeight)}px` }}
                >
                    <path
                        d={`M${lineCoords.x1} ${lineCoords.y1} Q ${(lineCoords.x1 + lineCoords.x2) / 2} ${(lineCoords.y1 + lineCoords.y2) / 2 + 20} ${lineCoords.x2} ${lineCoords.y2}`}
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 2"
                    />
                    <circle cx={lineCoords.x2} cy={lineCoords.y2} r="4" fill="black" />
                    <circle cx={lineCoords.x1} cy={lineCoords.y1} r="3" fill="black" />
                </svg>
            )}

            <div
                className="pointer-events-auto bg-[#FFFDF2] border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                style={style}
            >
                <div className="flex justify-between items-start mb-4 border-b border-black pb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        Tip {currentStepIndex + 1} / {steps.length}
                    </span>
                    <button onClick={onClose} className="text-black hover:bg-black hover:text-[#FFFDF2] px-1">✕</button>
                </div>

                <h3 className="text-lg font-bold text-black uppercase mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 font-sans mb-6 leading-relaxed">
                    {step.content}
                </p>

                <div className="flex justify-between mt-auto">
                    <button
                        onClick={handleBack}
                        disabled={currentStepIndex === 0}
                        className={`text-xs font-bold uppercase px-4 py-2 border transition-colors ${currentStepIndex === 0 ? 'text-gray-300 border-gray-300 cursor-not-allowed' : 'text-black border-black hover:bg-black hover:text-[#FFFDF2]'}`}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className="text-xs font-bold uppercase px-4 py-2 bg-black text-[#FFFDF2] border border-black hover:opacity-80 transition-opacity shadow-[2px_2px_0px_0px_#999]"
                    >
                        {isLast ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
