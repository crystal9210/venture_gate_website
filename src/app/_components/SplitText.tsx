import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";

type EaseName =
    | "linear"
    | "ease"
    | "easeIn"
    | "easeOut"
    | "easeInOut"
    | "easeOutCubic";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    animationFrom?: CSSProperties;
    animationTo?: CSSProperties;
    easing?: EaseName;
    threshold?: number;
    rootMargin?: string;
    textAlign?: CSSProperties["textAlign"];
    loop?: boolean;
    loopDelay?: number;
    onLetterAnimationComplete?: () => void;
}

const easingMap: Record<EaseName, string> = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    easeOutCubic: "cubic-bezier(0.33, 1, 0.68, 1)",
};

export default function SplitText({
    text,
    className = "",
    delay = 100,
    animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
    animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
    easing = "easeOutCubic",
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    loop = false,
    loopDelay = 1000,
    onLetterAnimationComplete,
}: SplitTextProps): ReactNode {
    const words = text.split(" ").map((w) => [...w]);
    const letters = words.flat();

    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLParagraphElement>(null);

    /* IntersectionObserver → 一旦 inView true に */
    useEffect(() => {
        if (!ref.current) return;
        const io = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setInView(true),
            { threshold, rootMargin }
        );
        io.observe(ref.current);
        return () => io.disconnect();
    }, [threshold, rootMargin]);

    /* ループ再開処理 */
    const restart = () => {
        setTimeout(() => {
            setInView(false); // 一度初期状態へ戻す
            /* 次のイベントループで inView=true にし直すと transition が再発火 */
            setTimeout(() => setInView(true), 20);
        }, loopDelay);
    };

    /* 最後の文字の transition end */
    const handleLastEnd = () => {
        onLetterAnimationComplete?.();
        if (loop) restart();
    };

    return (
        <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{
                textAlign,
                overflow: "hidden",
                display: "inline",
                whiteSpace: "normal",
                wordWrap: "break-word",
            }}
        >
            {words.map((word, wIdx) => (
                <span
                    key={wIdx}
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                >
                    {word.map((letter, lIdx) => {
                        const index =
                            words
                                .slice(0, wIdx)
                                .reduce((acc, w) => acc + w.length, 0) + lIdx;

                        const transition = `opacity 600ms ${
                            easingMap[easing]
                        } ${index * delay}ms, transform 600ms ${
                            easingMap[easing]
                        } ${index * delay}ms`;

                        /* style が inView で切り替わるので毎ループ再アニメ */
                        const style: CSSProperties = {
                            display: "inline-block",
                            willChange: "transform, opacity",
                            transition,
                            ...(inView ? animationTo : animationFrom),
                        };

                        const isLast = index === letters.length - 1;
                        return (
                            <span
                                key={index}
                                style={style}
                                onTransitionEnd={
                                    isLast ? handleLastEnd : undefined
                                }
                            >
                                {letter}
                            </span>
                        );
                    })}
                    {/* 単語間スペース */}
                    <span style={{ display: "inline-block", width: "0.3em" }}>
                        &nbsp;
                    </span>
                </span>
            ))}
        </p>
    );
}
