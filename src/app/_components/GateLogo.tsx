"use client";

import { useState } from "react";
import SplitText from "./SplitText"; // ← パスは環境に合わせて
import clsx from "clsx"; // 任意（条件付きクラスに便利）

export default function GateLogo() {
    /** 現在アニメーション中のグループ (0‑3) */
    const [step, setStep] = useState(0);

    /** アニメを全部終えたら何かしたい場合 */
    const handleAllDone = () => {
        console.log("Gate logo animation finished!");
    };

    /** 4 グループの定義 */
    const groups = [
        {
            text: "Gate",
            className:
                "text-gray-700 absolute -top-9 left-1/2 -translate-x-1/2 text-4xl font-enGate text-orangeAccent drop-shadow-gate",
            wrapperClass: "",
        },
        {
            text: "門",
            className:
                "text-gray-700 text-[11rem] font-jpGate text-orangeAccent drop-shadow-gate",
            wrapperClass: "relative inline-block",
        },
        {
            text: "起業",
            className:
                "text-gray-700 text-4xl font-jpGate text-orangeAccent drop-shadow-gate",
            wrapperClass:
                "absolute inset-x-0 bottom-12 flex flex-col items-center text-center",
        },
        {
            text: "Venture",
            className:
                "text-gray-700 text-2xl font-enGate text-orangeAccent drop-shadow-gate",
            wrapperClass:
                "absolute inset-x-0 bottom-7 flex flex-col items-center text-center",
        },
    ];

    /* 各単語アニメ終了 → 1 s 待って次へ */
    const handleLetterComplete = () => {
        setTimeout(() => {
            setStep((prev) => {
                const next = prev + 1;
                if (next >= groups.length) {
                    handleAllDone();
                    return prev; // ループしない場合は prev に固定
                }
                return next;
            });
        }, 1000); // ← 1 秒ウェイト
    };

    return (
        <div className="flex-1 flex justify-center md:justify-center">
            <div
                className="relative inline-block leading-none select-none
                      transform-gpu origin-center scale-110 sm:scale-125 md:scale-140 lg:scale-150"
            >
                {groups.map((g, idx) => (
                    <div
                        key={g.text}
                        className={clsx(
                            g.wrapperClass,
                            idx === 2 || idx === 3 ? "" : undefined // 3,4 番目は同じ absolute 親
                        )}
                    >
                        {/**
                         * step と idx が一致したものだけ SplitText を表示。
                         * それ以外は hidden にしておく。
                         */}
                        {step === idx ? (
                            <SplitText
                                text={g.text}
                                className={g.className}
                                delay={80} // 1 文字あたりの遅延
                                animationFrom={{
                                    opacity: 0,
                                    transform: "translate3d(0,40px,0)",
                                }}
                                animationTo={{
                                    opacity: 1,
                                    transform: "translate3d(0,0,0)",
                                }}
                                easing="easeOutCubic"
                                threshold={0.2}
                                rootMargin="-50px"
                                /** 各グループが終わったら次へ */
                                onLetterAnimationComplete={handleLetterComplete}
                                // loop={true}
                                loopDelay={2000}
                            />
                        ) : (
                            /**
                             * すでに再生し終えたグループはただの <span> として常時表示
                             * （SplitText を残すと 2 回目アニメが走るので注意）
                             */
                            idx < step && (
                                <span className={g.className}>{g.text}</span>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
