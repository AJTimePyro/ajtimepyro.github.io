import Image from "next/image";
import React from "react";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-2/5 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative bg-gray-900 rounded-lg p-2 border border-gray-800">
                            <Image
                                src="/assets/developerImg.png"
                                alt="Abhijeet Gupta"
                                className="w-full h-auto rounded transform transition-transform duration-500 group-hover:scale-[1.02]"
                                width={365}
                                height={365}
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-3/5">
                        <h2 className="text-3xl font-bold mb-8 inline-block">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                About Me
                            </span>
                            <div className="h-1 w-1/3 bg-gradient-to-r from-blue-500 to-purple-500 rounded mt-2"></div>
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed">
                            I am a passionate full-stack web developer with expertise in front-end and back-end
                            development, specializing in frameworks like <span className="text-indigo-400 font-medium">React</span>, <span className="text-indigo-400 font-medium">Next.js</span>, and <span className="text-indigo-400 font-medium">Express.js</span>.
                            My technical skills include <span className="text-indigo-400 font-medium">TypeScript</span>, <span className="text-indigo-400 font-medium">JavaScript</span>, <span className="text-indigo-400 font-medium">Flask</span>, and databases such
                            as <span className="text-indigo-400 font-medium">MySQL</span> and <span className="text-indigo-400 font-medium">MongoDB</span>.
                        </p>

                        <p className="text-gray-300 text-lg leading-relaxed mt-4">
                            I have developed open-source projects like <span className="text-indigo-400 font-medium">Music X</span>, an ad-free music site utilizing
                            YouTube Music, and <span className="text-indigo-400 font-medium">Virtual Meet</span>, a platform for virtual meetings. Constantly
                            expanding my knowledge to stay at the cutting edge of web technologies, I am currently pursuing a
                            Bachelor of Technology in Computer Science and Engineering, eager to create impactful
                            digital solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
