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
        <section id="projects" className="py-20 relative bg-black/80">
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,rgba(139,0,0,0.1)_1px,transparent_1px),linear-gradient(135deg,rgba(139,0,0,0.1)_1px,transparent_1px)]" style={{ backgroundSize: "40px 40px" }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold inline-block font-serif">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-900">
                            Cursed Creations
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-red-900 to-red-700 rounded mt-2 mx-auto"></div>
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