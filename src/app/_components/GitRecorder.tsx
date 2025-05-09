"use client";

// NOTE: コメントアウト部分を解除、依存関係を全て追加すればgifとして動作するようになっている
import { useRef } from "react";
// import html2canvas from "html2canvas";
// import gifshot from "gifshot";
import { AnimatedLogo } from "./AnimatedLogo";

// type RecordState = "idle" | "recording" | "done" | "error";

export default function GifRecorder() {
    const logoRef = useRef<HTMLDivElement>(null);
    // const [gifUrl, setGifUrl] = useState<string | null>(null);
    // const [state, setState] = useState<RecordState>("idle");

    // const record = async () => {
    //     if (!logoRef.current) return;
    //     setState("recording");

    //     const durationMs = 3000; // 3 s
    //     const fps = 10;
    //     const totalFrames = Math.floor((durationMs / 1000) * fps);
    //     const delay = 1000 / fps;

    //     const frames: string[] = [];
    //     for (let i = 0; i < totalFrames; i++) {
    //         const canvas = await html2canvas(logoRef.current);
    //         frames.push(canvas.toDataURL("image/png"));

    //         await new Promise((res) => setTimeout(res, delay));
    //     }

    //     gifshot.createGIF(
    //         {
    //             images: frames,
    //             interval: 1 / fps,
    //             gifWidth: 256,
    //             gifHeight: 256,
    //         },
    //         (obj) => {
    //             if (obj.error) {
    //                 setState("error");
    //             } else {
    //                 setGifUrl(obj.image as string);
    //                 setState("done");
    //             }
    //         }
    //     );
    // };

    return (
        <div className="flex flex-col items-center max-[414px]:mt-0 max-[414px]:mb-0">
            <AnimatedLogo ref={logoRef} />
            {/* <button
                onClick={record}
                disabled={state === "recording"}
                className="px-4 py-2 rounded bg-orange-500 text-white shadow disabled:opacity-50"
            >
                {state === "recording" ? "Recording…" : "Record 3s GIF"}
            </button> */}
            {/*
            {gifUrl && (
                <a
                    href={gifUrl}
                    download="VentureGate.gif"
                    className="mt-4 underline text-sm text-blue-600"
                >
                    Download GIF
                </a>
            )}
            {state === "error" && (
                <p className="text-red-500 text-sm">GIF 生成に失敗しました。</p>
            )} */}
        </div>
    );
}
