import Image from "next/image";

interface TechProps {
    tech: {
        name: string;
        image: string;
    };
}

export default function TechCard({ tech }: TechProps) {
    return (
        <div className="flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-700 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-black p-3 rounded-lg border border-red-900/30 h-full flex items-center justify-center group-hover:border-red-700">
                    <Image
                        src={tech.image}
                        alt={tech.name}
                        width={480}
                        height={480}
                        className="max-h-full max-w-full grayscale brightness-90 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-300"
                    />
                </div>
            </div>
            <p className="mt-2 text-gray-500 text-sm font-serif group-hover:text-red-500 transition-colors duration-300">{tech.name}</p>
        </div>
    );
}