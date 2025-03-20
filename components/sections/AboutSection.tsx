import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 relative overflow-hidden bg-black/80">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 z-0">
                {Array.from({ length: 72 }).map((_, i) => (
                    <div key={i} className="border-red-900/5 border"></div>
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-2/5 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900 via-red-800 to-red-700 rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                        <div className="relative bg-black rounded-lg p-2 border border-red-900/30">
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
                        <h2 className="text-3xl font-bold mb-8 inline-block font-serif">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-red-900">
                                The Dark Creator
                            </span>
                            <div className="h-1 w-1/3 bg-gradient-to-r from-red-900 to-red-700 rounded mt-2"></div>
                        </h2>

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
                    </div>
                </div>
            </div>
        </section>
    );
}