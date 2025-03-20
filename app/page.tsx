'use client'

import { useState, useEffect } from 'react';
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Skull, Code, GitFork, ExternalLink, Menu, X } from "lucide-react";
import './styles.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Random pentagram background animation
    const createPentagram = () => {
      const pentagram = document.createElement('div');
      pentagram.classList.add('absolute', 'opacity-10', 'z-0');
      pentagram.innerHTML = `<svg viewBox="0 0 100 100" class="w-32 h-32 text-red-800">
        <path d="M50 5 L60 40 L95 40 L65 60 L75 95 L50 75 L25 95 L35 60 L5 40 L40 40 Z" fill="currentColor" />
      </svg>`;

      // Random position
      pentagram.style.left = `${Math.random() * 100}vw`;
      pentagram.style.top = `${Math.random() * 100}vh`;

      document.getElementById('pentagram-container')?.appendChild(pentagram);

      // Remove after animation completes
      setTimeout(() => {
        pentagram.remove();
      }, 20000);
    };

    const interval = setInterval(createPentagram, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-950 text-gray-300 font-['Cinzel_Decorative',serif] relative overflow-hidden">
      {/* Animated background elements */}
      <div id="pentagram-container" className="fixed inset-0 overflow-hidden pointer-events-none"></div>
      <div className="fixed inset-0 bg-red-900/5 mix-blend-overlay pointer-events-none"></div>

      {/* Subtle blood drip effect at the top */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-red-900 z-50 overflow-hidden">
        <div className="absolute w-full flex justify-around">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="blood-drip h-32 w-1 bg-gradient-to-b from-red-900 to-transparent"
              style={{
                animationDelay: `${i * 1.5}s`,
                left: `${i * 5}%`
              }}
            />
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 backdrop-blur-sm bg-black/70 border-b border-red-900/30">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Skull className="w-8 h-8 text-red-600" />
            <span className="text-xl font-bold tracking-wider text-red-500">AJTimePyro</span>
          </div>

          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="lg:hidden text-red-500 hover:text-red-400 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden lg:block">
            <NavigationMenuList className="flex space-x-8">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#home"
                  className="group flex items-center px-3 py-2 text-red-400 hover:text-red-200 transition-colors"
                >
                  <span className="relative">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full"></span>
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#about"
                  className="group flex items-center px-3 py-2 text-red-400 hover:text-red-200 transition-colors"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full"></span>
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#tech-stack"
                  className="group flex items-center px-3 py-2 text-red-400 hover:text-red-200 transition-colors"
                >
                  <span className="relative">
                    Tech Stack
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full"></span>
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#projects"
                  className="group flex items-center px-3 py-2 text-red-400 hover:text-red-200 transition-colors"
                >
                  <span className="relative">
                    Projects
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all group-hover:w-full"></span>
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </nav>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute w-full bg-black/95 border-b border-red-900/30 py-4 shadow-lg animate-in fade-in slide-in-from-top-5">
            <nav className="container mx-auto px-4">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#home"
                    onClick={toggleMenu}
                    className="block py-2 text-center text-red-400 hover:text-red-200 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={toggleMenu}
                    className="block py-2 text-center text-red-400 hover:text-red-200 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#tech-stack"
                    onClick={toggleMenu}
                    className="block py-2 text-center text-red-400 hover:text-red-200 transition-colors"
                  >
                    Tech Stack
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={toggleMenu}
                    className="block py-2 text-center text-red-400 hover:text-red-200 transition-colors"
                  >
                    Projects
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center py-20 relative">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-3/4 h-3/4 text-red-900 animate-slow-spin">
                <path d="M100 10 L120 80 L190 80 L135 125 L155 195 L100 155 L45 195 L65 125 L10 80 L80 80 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

          <div className="container px-4 mx-auto relative z-10">
            <div className="lg:max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-2 opacity-0 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-forwards">
                <h2 className="text-xl sm:text-2xl text-red-400 font-light">Hi, My Name is</h2>
                <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-red-200">
                  Abhijeet Gupta
                  <span className="block text-2xl sm:text-3xl text-red-400 mt-2">a.k.a AJTimePyro</span>
                </h1>
              </div>

              <p className="text-xl sm:text-2xl text-red-300/80 mt-6 font-light opacity-0 animate-in fade-in slide-in-from-bottom-10 delay-300 duration-1000 fill-mode-forwards">
                <span className="inline-block relative">
                  Fullstack Developer
                  <Flame className="inline-block ml-2 w-5 h-5 text-red-500" />
                </span>
                <span className="mx-3">|</span>
                <span className="inline-block">Python Developer</span>
                <span className="mx-3">|</span>
                <span className="inline-block">Digital Soul Forger</span>
              </p>

              <div className="pt-8 opacity-0 animate-in fade-in slide-in-from-bottom-10 delay-500 duration-1000 fill-mode-forwards">
                <Button variant="outline" className="bg-transparent border border-red-700 text-red-400 hover:bg-red-950/50 hover:text-red-200 rounded-none px-8 py-6 text-lg">
                  Enter if you dare
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="max-w-xl mx-auto lg:mx-0 space-y-8">
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-red-300 flex items-center gap-3 after:content-[''] after:h-px after:flex-grow after:bg-gradient-to-r after:from-red-700 after:to-transparent">
                    About Me
                  </h2>

                  <div className="prose prose-invert prose-red max-w-none text-gray-300 text-lg leading-relaxed">
                    <p>
                      I am a passionate full-stack web developer with expertise in front-end and back-end development,
                      specializing in frameworks like <span className="text-red-400 font-semibold">React, Next.js</span>, and
                      <span className="text-red-400 font-semibold"> Express.js</span>.
                    </p>
                    <p>
                      My technical skills include <span className="text-red-400 font-semibold">TypeScript, JavaScript, Flask</span>,
                      and databases such as <span className="text-red-400 font-semibold">MySQL</span> and
                      <span className="text-red-400 font-semibold"> MongoDB</span>.
                    </p>
                    <p>
                      I have developed open-source projects like <span className="text-red-400 font-semibold">Music X</span>,
                      an ad-free music site utilizing YouTube Music, and <span className="text-red-400 font-semibold">Virtual Meet</span>,
                      a platform for virtual meetings.
                    </p>
                    <p>
                      Constantly expanding my knowledge to stay at the cutting edge of web technologies, I am currently
                      pursuing a Bachelor of Technology in Computer Science and Engineering, eager to create impactful
                      digital solutions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 order-1 lg:order-2">
                <div className="relative max-w-md mx-auto">
                  {/* Demonic frame effect around the image */}
                  <div className="absolute inset-0 -m-6 border-4 border-red-900/50 z-0"></div>
                  <div className="absolute inset-0 -m-3 border border-red-700/30 z-0"></div>

                  <div className="relative z-10 overflow-hidden bg-red-950/20 backdrop-blur-sm">
                    <img
                      src="assets/developerImg.png"
                      alt="Abhijeet Gupta"
                      className="w-full h-auto mix-blend-luminosity brightness-75 contrast-125 grayscale-[50%] hover:filter-none transition-all duration-700"
                    />

                    {/* Overlay with demonic symbols */}
                    <div className="absolute inset-0 opacity-40 mix-blend-color-burn pointer-events-none flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 text-red-900 opacity-40">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-red-600"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-red-600"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-red-600"></div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-red-600"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20 relative">
          <div className="absolute inset-0 bg-black/30 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-red-300 inline-flex items-center gap-3">
                <Code className="w-8 h-8 text-red-500" />
                My Tech Stack
                <Code className="w-8 h-8 text-red-500" />
              </h2>
              <div className="mt-2 h-px w-40 bg-gradient-to-r from-transparent via-red-700 to-transparent mx-auto"></div>
            </div>

            <div className="relative overflow-hidden py-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-black before:to-transparent before:z-10 after:absolute after:inset-0 after:bg-gradient-to-l after:from-black after:to-transparent after:z-10">
              <div className="flex gap-16 animate-scroll whitespace-nowrap">
                {[
                  "python", "javascript", "nodeJS", "reactJS", "expressJS", "flask",
                  "tailwindCSS", "mongoDB", "mySQL", "typescript", "nextJS", "linux"
                ].map((tech) => (
                  <div key={tech} className="flex flex-col items-center gap-4 group">
                    <div className="w-20 h-20 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 rounded-lg border border-red-900/20 group-hover:border-red-500/50 transition-all duration-300">
                      <img
                        src={`assets/tech_stack_logo/${tech}.png`}
                        alt={tech}
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <span className="text-sm uppercase tracking-wider text-red-400/70 group-hover:text-red-300">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-red-400/80 italic text-lg">
                "The demons of technology are not in the machine, but in the minds of those who create them."
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-red-300">
                Dark Creations
              </h2>
              <div className="mt-2 h-px w-40 bg-gradient-to-r from-transparent via-red-700 to-transparent mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Project 1 */}
              <div className="project-card">
                <Card className="bg-black/40 border-red-900/30 overflow-hidden transition-all duration-500 hover:border-red-600/60 h-full">
                  <div className="relative">
                    <CardHeader className="p-0">
                      <div className="overflow-hidden">
                        <img
                          src="assets/projects/music-x.png"
                          alt="Music X"
                          className="w-full h-auto transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 w-full p-4">
                        <CardTitle className="text-2xl font-bold text-red-300">Music X</CardTitle>
                      </div>
                    </CardHeader>
                  </div>

                  <CardContent className="p-6 pt-4">
                    <p className="text-gray-400 leading-relaxed">
                      An Open Source Ads-free music website developed with ReactJS, TailwindCSS,
                      ExpressJS. It retrieves music from YouTube Music by utilizing web scraping
                      techniques to extract data from an unofficial API.
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between">
                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/40" asChild>
                      <a href="https://github.com/AJTimePyro/music-x" target="_blank" rel="noopener noreferrer">
                        <GitFork className="mr-2 h-4 w-4" />
                        Repo
                      </a>
                    </Button>

                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/40" asChild>
                      <a href="https://music-x-gamma.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Web URL
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              {/* Project 2 */}
              <div className="project-card">
                <Card className="bg-black/40 border-red-900/30 overflow-hidden transition-all duration-500 hover:border-red-600/60 h-full">
                  <div className="relative">
                    <CardHeader className="p-0">
                      <div className="overflow-hidden">
                        <img
                          src="assets/projects/virutal-meet.png"
                          alt="Virtual Meet"
                          className="w-full h-auto transition-transform duration-700 hover:scale-110 grayscale hover:grayscale-0"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 w-full p-4">
                        <CardTitle className="text-2xl font-bold text-red-300">Virtual Meet</CardTitle>
                      </div>
                    </CardHeader>
                  </div>

                  <CardContent className="p-6 pt-4">
                    <p className="text-gray-400 leading-relaxed">
                      Virtual Meet is an open-source web application that allows users to host virtual
                      meetings, similar to platforms like Google Meet or Zoom to provide a seamless
                      and feature-rich virtual meeting experience.
                    </p>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between">
                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/40" asChild>
                      <a href="https://github.com/AJTimePyro/VirtualMeet" target="_blank" rel="noopener noreferrer">
                        <GitFork className="mr-2 h-4 w-4" />
                        Repo
                      </a>
                    </Button>

                    <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/40" asChild>
                      <a href="https://virtual-meet-aj.vercel.app/" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Web URL
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative py-12 bg-black border-t border-red-900/30">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <Skull className="w-12 h-12 text-red-600 mx-auto" />
          </div>

          <p className="text-gray-400 mb-8">
            Forged in the digital inferno by <span className="text-red-400">Abhijeet Gupta</span>
          </p>

          <div className="h-px w-24 bg-red-900/50 mx-auto mb-8"></div>

          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} | All souls reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;