import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 md:px-12 lg:px-24 bg-zinc-900 relative z-20">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-demon mb-16 flex items-center gap-2">
                    <div className="h-0.5 w-6 bg-red-600"></div>
                    ABOUT THE DAEMON
                    <div className="h-0.5 flex-grow bg-red-600"></div>
                </h2>

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-2/5 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-800 via-red-600 to-red-900 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-gray-900 rounded-lg p-2 border border-red-900/50">
                            <Image
                                src="/assets/developerImg.png"
                                alt="Abhijeet Gupta"
                                className="w-full h-auto rounded grayscale brightness-75 contrast-125 transform transition-transform duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
                                width={365}
                                height={365}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-3/5">
                        <div className="prose prose-invert prose-red max-w-none">
                            <p className="text-gray-400 text-lg leading-relaxed">
                                I am a sinister architect of digital realms, crafting nightmares with front-end and back-end
                                sorcery, wielding frameworks like <span className="text-red-500 font-medium">React</span>, <span className="text-red-500 font-medium">Next.js</span>, and <span className="text-red-500 font-medium">Express.js</span>.
                                My arcane knowledge includes <span className="text-red-500 font-medium">TypeScript</span>, <span className="text-red-500 font-medium">JavaScript</span>, <span className="text-red-500 font-medium">Flask</span>, and forbidden repositories
                                such as <span className="text-red-500 font-medium">MySQL</span> and <span className="text-red-500 font-medium">MongoDB</span>.
                            </p>

                            <p className="text-gray-400 text-lg leading-relaxed mt-4">
                                I have unleashed open-source creations like <span className="text-red-500 font-medium">Music X</span>, a haunting music portal channeling
                                the essence of YouTube Music, and <span className="text-red-500 font-medium">Virtual Meet</span>, a gateway for spectral gatherings. Endlessly
                                absorbing knowledge from the digital abyss, I pursue mastery in Computer Science and Engineering,
                                driven to forge ever more powerful and unsettling digital experiences.
                            </p>

                            <p className="text-red-500 font-medium italic mt-6">
                                &quot;The best code is written at the witching hour, when logic and madness become one.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}