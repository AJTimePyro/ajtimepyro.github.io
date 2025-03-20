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
        <section id="tech-stack" className="py-20 bg-gradient-to-b from-black to-red-900/50 relative">
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(185,28,28,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(185,28,28,0.1)_1px,transparent_1px)]" style={{ backgroundSize: "30px 30px" }}></div>

            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold inline-block font-serif">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-red-900">
                            Tools of Darkness
                        </span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-red-900 to-red-700 rounded mt-2 mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {techStack.map(tech => (
                        <TechCard key={tech.name} tech={tech} />
                    ))}
                </div>
            </div>
        </section>
    );
}