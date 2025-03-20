import React from "react";

export default function Footer() {
    return (
        <footer className="py-8 border-t border-red-900/30 bg-black/90 relative">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-900 via-red-700 to-red-900"></div>
            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-500 font-serif">
                    © {new Date().getFullYear()} Abhijeet Gupta (AJTimePyro). All rights reserved.
                </p>
            </div>
        </footer>
    );
}