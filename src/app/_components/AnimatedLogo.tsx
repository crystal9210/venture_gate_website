"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { forwardRef } from "react";

// 過去コメントアウトはgifの方でループさせる場合の引数
// interface AnimatedLogoProps {
//     isPlaying?: boolean;
// }

export const AnimatedLogo = forwardRef<HTMLDivElement>((props, ref) => (
    /* 親に透視距離を持たせると translateZ が効く */
    <div
        className="w-124 h-32 flex flex-start items-center justify-center max-[414px]:w-[60vw] max-[414px]:h-auto"
        style={{ perspective: 800 }}
    >
        <motion.div
            ref={ref}
            style={{ transformOrigin: "50% 50%" }}
            initial={{ scaleX: 0, scaleY: 0 }}
            animate={{
                /*            0     0.10   0.25   0.45   0.65   0.75   1    */
                scaleX: [0, 0.03, 0.025, 1.03, 1.03, 1, 1, 1],
                scaleY: [0, 0.03, 0.25, 0.98, 0.98, 1, 1, 1],
            }}
            transition={{
                duration: 1.6,
                ease: "easeInOut",
                times: [0, 0.1, 0.25, 0.45, 0.65, 0.75, 1],
                repeat: 0,
                repeatDelay: 1.3,
            }}
        >
            <Image
                src="/images/VentureGate.png"
                alt="Venture Gate Logo"
                width={400}
                height={360}
                priority
                draggable={false}
                // className="m-0 p-0"
            />
        </motion.div>
    </div>
));
AnimatedLogo.displayName = "AnimatedLogo";
