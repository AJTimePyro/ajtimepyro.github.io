import ProjectCard from "@/components/ui/ProjectCard";

export default function ProjectsSection() {
    const projects = [
        {
            title: "Music X",
            image: "/assets/projects/music-x.png",
            description:
                "An Open Source Ads-free music website developed with ReactJS, TailwindCSS, ExpressJS. It retrieves music from YouTube Music by utilizing web scraping techniques to extract data from an unofficial API.",
            technologies: ["React", "TailwindCSS", "Express.js", "Web Scraping"],
            repo: "https://github.com/AJTimePyro/music-x",
            live: "https://music-x-gamma.vercel.app/",
        },
        {
            title: "Virtual Meet",
            image: "/assets/projects/virutal-meet.png",
            description:
                "Virtual Meet is an open-source web application that allows users to host virtual meetings, similar to platforms like Google Meet or Zoom to provide a seamless and feature-rich virtual meeting experience.",
            technologies: ["Next.js", "WebRTC", "Socket.io", "Tailwind"],
            repo: "https://github.com/AJTimePyro/VirtualMeet",
            live: "https://virtual-meet-aj.vercel.app/",
        },
    ]

    return (
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-900 relative z-20">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,rgba(139,0,0,0.1)_1px,transparent_1px),linear-gradient(135deg,rgba(139,0,0,0.1)_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-demon mb-16 flex items-center gap-2">
                        <div className="h-0.5 w-6 bg-red-600"></div>
                        CURSED CREATIONS
                        <div className="h-0.5 flex-grow bg-red-600"></div>
                    </h2>
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