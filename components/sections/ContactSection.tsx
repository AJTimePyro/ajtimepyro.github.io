import { Github, Linkedin, Mail } from "lucide-react";
import { DemonicButton } from "../ui/demonic-button";
import Link from "next/link";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24 bg-black relative z-20">
            <div className="absolute inset-0 bg-[url('/summoning-circle.svg')] bg-center bg-no-repeat opacity-10"></div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-demon mb-16 flex items-center gap-2">
                    <div className="h-0.5 w-6 bg-red-600"></div>
                    SUMMON ME
                    <div className="h-0.5 flex-grow bg-red-600"></div>
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl text-white mb-6">Ready to bring your digital nightmares to life?</h3>
                        <p className="text-zinc-300 mb-8">
                            Complete the ritual below to establish contact. I respond to summons within 48 hours, provided the
                            proper incantations are used.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="text-red-500" />
                                <Link href="mailto:ajtimepyro@gmail.com" className="text-red-300 hover:text-red-400 transition-colors">
                                    ajtimepyro@gmail.com
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Github className="text-red-500" />
                                <Link
                                    href="https://github.com/AJTimePyro"
                                    target="_blank"
                                    className="text-red-300 hover:text-red-400 transition-colors"
                                    rel="noreferrer"
                                >
                                    github.com/AJTimePyro
                                </Link>
                            </div>

                            <div className="flex items-center gap-3">
                                <Linkedin className="text-red-500" />
                                <Link
                                    href="https://linkedin.com/in/ajtimepyro"
                                    target="_blank"
                                    className="text-red-300 hover:text-red-400 transition-colors"
                                    rel="noreferrer"
                                >
                                    linkedin.com/in/ajtimepyro
                                </Link>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-red-300 text-sm">
                                YOUR NAME
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-zinc-900 border border-red-900/50 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-red-300 text-sm">
                                YOUR EMAIL
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-zinc-900 border border-red-900/50 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-red-300 text-sm">
                                YOUR MESSAGE
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full bg-zinc-900 border border-red-900/50 rounded-sm px-4 py-3 text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
                                placeholder="Describe your project or inquiry..."
                            ></textarea>
                        </div>

                        <DemonicButton
                            type="submit"
                            className="w-full px-6 py-3 bg-red-700 hover:bg-red-600 text-white rounded-sm transition-colors font-medium"
                        >
                            SEND SUMMONING
                        </DemonicButton>
                    </form>
                </div>
            </div>
        </section>
    )
}