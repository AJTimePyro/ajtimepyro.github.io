import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectProps {
    project: {
        title: string;
        image: string;
        description: string;
        technologies: string[];
        repo: string;
        live: string;
    };
}

export default function ProjectCard({ project }: ProjectProps) {
    return (
        <div className="group relative">
            <div className="aspect-video bg-zinc-900 rounded-sm overflow-hidden border border-red-900/50 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
                <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={1366}
                    height={768}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-50 group-hover:opacity-30 transition-opacity"
                />

                <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-900 font-serif">{project.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-red-900/50 text-red-100 rounded-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                        href={project.repo}
                        className="p-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition-colors"
                        target="_blank"
                    >
                        <Github size={18} />
                    </Link>
                    <Link
                        href={project.live}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-500 transition-colors"
                        target="_blank"
                    >
                        <ExternalLink size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}