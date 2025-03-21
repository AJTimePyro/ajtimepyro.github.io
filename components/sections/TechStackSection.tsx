import TechCard from "@/components/ui/TechCard";

export default function TechStackSection() {
    const techStack = [
        { name: "Python", image: "/assets/tech_stack_logo/python.png" },
        { name: "JavaScript", image: "/assets/tech_stack_logo/javascript.png" },
        { name: "TypeScript", image: "/assets/tech_stack_logo/typescript.png" },
        { name: "ReactJS", image: "/assets/tech_stack_logo/reactJS.png" },
        { name: "NextJS", image: "/assets/tech_stack_logo/nextJS.png" },
        { name: "NodeJS", image: "/assets/tech_stack_logo/nodeJS.png" },
        { name: "ExpressJS", image: "/assets/tech_stack_logo/expressJS.png" },
        { name: "Flask", image: "/assets/tech_stack_logo/flask.png" },
        { name: "TailwindCSS", image: "/assets/tech_stack_logo/tailwindCSS.png" },
        { name: "MongoDB", image: "/assets/tech_stack_logo/mongoDB.png" },
        { name: "MySQL", image: "/assets/tech_stack_logo/mySQL.png" },
        { name: "Linux", image: "/assets/tech_stack_logo/linux.png" }
    ];

    return (
        <section id="tech-stack" className="py-24 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden z-20">
            <div className="absolute inset-0 bg-[url('/occult-pattern.svg')] opacity-70"></div>

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-demon mb-16 flex items-center gap-2">
                    <div className="h-0.5 w-6 bg-red-600"></div>
                    DARK POWERS
                    <div className="h-0.5 flex-grow bg-red-600"></div>
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {techStack.map(tech => (
                        <TechCard key={tech.name} tech={tech} />
                    ))}
                </div>
            </div>
        </section>
    );
}