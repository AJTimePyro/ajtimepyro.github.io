import React from "react";
import { Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

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
            <Card className="overflow-hidden hover:bg-gray-800/80 transition-all duration-300 h-full flex flex-col">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                <div className="p-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        {project.title}
                    </h3>
                </div>

                <div className="p-4 flex-grow">
                    <p className="text-gray-300">{project.description}</p>
                </div>

                <div className="flex gap-4 border-t border-gray-800 p-4">
                    <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-gray-300 rounded"
                    >
                        <Github size={18} />
                        Repository
                    </a>

                    <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded"
                    >
                        <ExternalLink size={18} />
                        Live Demo
                    </a>
                </div>
            </Card>
        </div>
    );
}
