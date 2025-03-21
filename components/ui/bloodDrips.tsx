function BloodDrip() {
    // More varied and realistic properties
    const width = Math.random() * 3 + 1; // Width between 1-4px
    const opacity = Math.random() * 0.4 + 0.6; // More varied opacity
    const startPosition = Math.random() * 100;

    // More realistic blood colors (darker, varied reds)
    const bloodColors = [
        "rgb(128, 0, 0)",      // Dark red
        "rgb(139, 0, 0)",      // Dark red 2
        "rgb(120, 10, 10)",    // Deep red
        "rgb(100, 0, 10)",     // Dark burgundy
        "rgb(80, 0, 0)"        // Very dark red
    ];
    const color = bloodColors[Math.floor(Math.random() * bloodColors.length)];

    // Create drip trails with varied speeds
    const duration = Math.random() * 15 + 20; // Animation duration

    return (
        <div
            className="absolute"
            style={
                {
                    width: `${width}px`,
                    height: `${Math.random() * 30 + 20}vh`,
                    left: `${startPosition}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${duration}s`,
                    "--delay": `${Math.random() * 5}s`,
                    animation: "drip cubic-bezier(0.7, 0, 0.3, 1) var(--animation-duration, 20s) var(--delay) infinite",
                    borderRadius: "40% 40% 45% 45% / 0 0 60% 60%",
                    boxShadow: "0 0 8px rgba(0, 0, 0, 0.5)",
                    background: `linear-gradient(to bottom, ${color} 90%, rgba(0, 0, 0, 0.7))`,
                    opacity: opacity,
                    overflow: "visible",
                    // Create appearance of thickness with a pseudo-3D effect
                    filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))",
                    transform: "translateZ(0)"
                } as React.CSSProperties
            }
        >
            {/* Add a droplet at the bottom of each drip */}
            <div
                style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: `${width * 3}px`,
                    height: `${width * 3}px`,
                    borderRadius: "50%",
                    background: color,
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                    filter: "blur(1px)"
                }}
            />
        </div>
    )
}

export default function BloodDrips() {
    // Create more drips for a spookier effect
    const dripCount = 15;

    // Add CSS for the drip animation with more realistic physics
    const styles = `
      @keyframes drip {
        0% { 
          transform: translateY(-100%) scaleY(0.8); 
          opacity: 0.9;
        }
        2% { 
          transform: translateY(-90%) scaleY(1.1); 
          opacity: var(--opacity, 0.7);
        }
        5% { 
          transform: translateY(-85%) scaleY(0.9); 
          opacity: var(--opacity, 0.7);
        }
        10% { 
          transform: translateY(-70%) scaleY(1); 
        }
        100% { 
          transform: translateY(120vh) scaleY(1.1);
          opacity: var(--opacity, 0.7);
        }
      }
    `;

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
            <style>{styles}</style>
            {Array.from({ length: dripCount }).map((_, i) => (
                <BloodDrip key={i} />
            ))}
        </div>
    )
}