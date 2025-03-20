import React from "react";
import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
    const projects = [
        {
            title: "Music X",
            image: "/assets/projects/music-x.png",
            description: "An Open Source Ads-free music website developed with ReactJS, TailwindCSS, ExpressJS. It retrieves music from YouTube Music by utilizing web scraping techniques to extract data from an unofficial API.",
            repo: "https://github.com/AJTimePyro/music-x",
            live: "https://music-x-gamma.vercel.app/"
        },
        {
            title: "Virtual Meet",
            image: "/assets/projects/virutal-meet.png",
            description: "Virtual Meet is an open-source web application that allows users to host virtual meetings, similar to platforms like Google Meet or Zoom to provide a seamless and feature-rich virtual meeting experience.",
            repo: "https://github.com/AJTimePyro/VirtualMeet",
            live: "https://virtual-meet-aj.vercel.app/"
        }
    ];

    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold inline-block">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                            Projects
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}
