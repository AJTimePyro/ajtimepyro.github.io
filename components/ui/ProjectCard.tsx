import { Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
    project: {
        title: string;
        image: string;
        description: string;
        repo: string;
        live: string;
    };
}

export default function ProjectCard({ project }: ProjectProps) {
    return (
        <div className="group">
            <Card className="overflow-hidden bg-black hover:bg-gray-900/40 transition-all duration-300 h-full flex flex-col border border-red-900/20 group-hover:border-red-700/40">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-red-800/20 to-red-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Image
                        src={project.image}
                        alt={project.title}
                        width={1366}
                        height={768}
                        className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 contrast-125 brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-900 font-serif">
                        {project.title}
                    </h3>
                </div>

                <div className="p-4 flex-grow">
                    <p className="text-gray-400">{project.description}</p>
                </div>

                <div className="flex gap-4 border-t border-red-900/20 p-4">
                    <Link
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-black border border-red-900/30 hover:border-red-700 text-gray-400 rounded transition-colors duration-300"
                    >
                        <Github size={18} className="text-red-700" />
                        Repository
                    </Link>
                    <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-gray-300 rounded transition-all duration-300"
                    >
                        <ExternalLink size={18} />
                        Enter Site
                    </Link>
                </div>
            </Card>
        </div>
    );
}