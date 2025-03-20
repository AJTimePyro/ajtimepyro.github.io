import React from "react";

interface TechProps {
    tech: {
        name: string;
        image: string;
    };
}

export default function TechCard({ tech }: TechProps) {
    return (
        <div className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gray-900 p-3 rounded-lg border border-gray-800 h-full flex items-center justify-center">
                    <img src={tech.image} alt={tech.name} className="max-h-full max-w-full" />
                </div>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{tech.name}</p>
        </div>
    );
}
