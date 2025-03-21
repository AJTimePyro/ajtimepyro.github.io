"use client"

import { useEffect } from 'react';

export function CursorFollower() {
    useEffect(() => {
        const cursor = document.getElementById('cursor-follower');
        if (!cursor) return;

        const handleMouseMove = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        };

        const handleClick = () => {
            cursor.classList.add('scale-[3]', 'opacity-30');
            setTimeout(() => {
                cursor.classList.remove('scale-[3]', 'opacity-30');
            }, 300);
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);

        // Interactive elements effect
        const interactiveElements = document.querySelectorAll('a, button');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('scale-[2]', 'bg-red-700');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('scale-[2]', 'bg-red-700');
            });
        });

        // Demonic elements effect
        const demonicElements = document.querySelectorAll('.font-demon, svg path');
        const intervalId = setInterval(() => {
            demonicElements.forEach((el) => {
                if (Math.random() > 0.7) {
                    el.classList.add('translate-x-[1px]');
                    setTimeout(() => {
                        el.classList.remove('translate-x-[1px]');
                    }, 100);
                }
            });
        }, 3000);

        // Page transition
        const handleBeforeUnload = () => {
            document.body.classList.add('opacity-0');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Initialize with fade-in
        document.body.classList.add('transition-opacity', 'duration-500');
        document.body.classList.remove('opacity-0');

        // Cleanup function
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick);
            interactiveElements.forEach((el) => {
                el.removeEventListener('mouseenter', () => { });
                el.removeEventListener('mouseleave', () => { });
            });
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // Empty dependency array means this runs once after mount

    return null; // This component doesn't render anything
}