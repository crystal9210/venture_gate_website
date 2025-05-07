import React, { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    colors?: string[];
    animationSpeed?: number; // 秒
    showBorder?: boolean;
    className?: string;
}

export default function GradientText({
    children,
    colors = ["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"],
    animationSpeed = 100,
    showBorder = false,
    className = "",
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div
            className={`relative inline-flex items-center justify-center rounded-xl font-medium cursor-pointer transition-shadow duration-500 ease-out overflow-hidden ${className}`}
        >
            {showBorder && (
                <div
                    className="absolute inset-0 animate-gradient bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa] bg-[length:300%_100%] rounded-xl pointer-events-none"
                    style={gradientStyle} // ←ここで使う
                />
            )}
            <span
                className="relative bg-clip-text text-transparent animate-gradient bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa] bg-[length:300%_100%]"
                style={gradientStyle} // ←ここでも使う
            >
                {children}
            </span>
            <style jsx>{`
                @keyframes gradient {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animate-gradient {
                    animation-name: gradient;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
