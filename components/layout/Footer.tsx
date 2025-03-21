import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="py-8 px-6 border-t border-red-900/50 bg-black relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center gap-2 mb-4 md:mb-0">
                    <div className="relative h-8 w-8">
                        <div className="absolute inset-0 text-red-600">
                            <svg viewBox="0 0 100 100" className="h-full w-full">
                                <path
                                    d="M50 5 L61 40 L97 40 L68 61 L79 95 L50 75 L21 95 L32 61 L3 40 L39 40 Z"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                />
                            </svg>
                        </div>
                    </div>
                    <span className="text-sm font-demon tracking-widest">AJTIMEPYRO</span>
                </div>

                <div className="text-zinc-500">
                    <span className="font-serif">© {new Date().getFullYear()}</span> | Crafted with the blood of sacrificed frameworks
                </div>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <Link
                        href="https://github.com/AJTimePyro"
                        target="_blank"
                        className="text-zinc-500 hover:text-red-500 transition-colors"
                        rel="noreferrer"
                    >
                        <Github size={18} />
                    </Link>
                    <Link
                        href="https://linkedin.com/in/ajtimepyro"
                        target="_blank"
                        className="text-zinc-500 hover:text-red-500 transition-colors"
                        rel="noreferrer"
                    >
                        <Linkedin size={18} />
                    </Link>
                </div>
            </div>
        </footer>
    );
}