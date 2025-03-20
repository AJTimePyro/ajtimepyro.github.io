import React from "react";

export default function Footer() {
    return (
        <footer className="py-8 border-t border-gray-800 relative">
            <div className="rgb-line absolute top-0 left-0 w-full h-0.5"></div>

            <div className="container mx-auto px-4 text-center">
                <p className="text-gray-400">
                    © {new Date().getFullYear()} Abhijeet Gupta (AJTimePyro). All rights reserved.
                </p>
            </div>
        </footer>
    );
}
