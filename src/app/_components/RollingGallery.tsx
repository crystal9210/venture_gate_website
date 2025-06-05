"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface GalleryItem {
    id: string | number;
    imageUrl: string; // 有効な画像URLを期待
    targetUrl?: string;
    altText: string;
}

interface RollingGalleryProps {
    items: GalleryItem[];
    autoplay?: boolean;
    pauseOnHover?: boolean;
    itemHeight?: number;
    itemWidth?: number;
    galleryHeight?: number;
}

const MIN_DISPLAY_ITEMS = 10; // カルセールを安定させるための最小アイテム数
const DRAG_FACTOR = 0.08; // ドラッグ感度を調整

const RollingGallery: React.FC<RollingGalleryProps> = ({
    items = [],
    autoplay = true,
    pauseOnHover = true,
    itemHeight = 100, // デフォルトのアイテム高さを調整
    itemWidth = 220, // デフォルトのアイテム幅を調整
    galleryHeight = 350, // デフォルトのギャラリー高さを調整
}) => {
    // --- React Hooks ---
    const [isClient, setIsClient] = useState(false);
    const [isScreenSizeSm, setIsScreenSizeSm] = useState<boolean>(false);
    const rotation = useMotionValue(0);
    const controls = useAnimation();
    const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
        null
    );

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;
        const updateScreenSize = () =>
            setIsScreenSizeSm(window.innerWidth <= 768); // mdブレークポイント目安
        updateScreenSize(); // 初期設定
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
    }, [isClient]);

    // --- アイテムデータの処理 ---
    // itemsが少ない場合は繰り返してMIN_DISPLAY_ITEMSまで増やす
    let displayedItems = [...items];
    if (isClient && items.length > 0 && items.length < MIN_DISPLAY_ITEMS) {
        const repeatCount = Math.ceil(MIN_DISPLAY_ITEMS / items.length);
        displayedItems = Array(repeatCount)
            .fill(null)
            .reduce((acc) => acc.concat(items), [])
            .slice(0, MIN_DISPLAY_ITEMS);
    }

    // --- 3Dジオメトリ計算 ---
    const cylinderWidth: number = isScreenSizeSm
        ? itemWidth * 3.5
        : itemWidth * 5; // 表示されるアイテム数と幅に基づいて調整
    const faceCount: number = displayedItems.length;
    const radius: number = faceCount > 0 ? cylinderWidth / (2 * Math.PI) : 0;

    // --- Framer Motion Transforms and Animations ---
    const transform = useTransform(rotation, (value) => `rotateY(${value}deg)`);

    const animateToTargetRotation = (
        targetRotation: number,
        withSpring?: boolean
    ) => {
        if (withSpring) {
            controls.start({
                rotateY: targetRotation,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 0.5,
                },
            });
        } else {
            controls.start({
                rotateY: targetRotation,
                transition: { duration: 1, ease: "easeOut" }, // 少し長めのduration
            });
        }
        rotation.set(targetRotation); // MotionValueも即時更新
    };

    const startAutoplay = () => {
        if (!autoplay || faceCount === 0) return;
        if (autoplayIntervalRef.current)
            clearInterval(autoplayIntervalRef.current);
        autoplayIntervalRef.current = setInterval(() => {
            const currentRotation = rotation.get();
            const nextRotation = currentRotation - 360 / faceCount;
            animateToTargetRotation(nextRotation, false);
        }, 3000); // アイテム切り替え間隔 (ミリ秒)
    };

    const stopAutoplay = () => {
        if (autoplayIntervalRef.current) {
            clearInterval(autoplayIntervalRef.current);
            autoplayIntervalRef.current = null;
        }
        controls.stop();
    };

    useEffect(() => {
        if (isClient && displayedItems.length > 0) {
            if (autoplay) {
                startAutoplay();
            } else {
                stopAutoplay();
            }
        }
        return () => stopAutoplay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoplay, isClient, displayedItems.length, faceCount]); // rotationは含めない

    // --- イベントハンドラ ---
    const handleDrag = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        stopAutoplay(); // ドラッグ開始時に自動再生を停止
        rotation.set(rotation.get() + info.offset.x * DRAG_FACTOR);
    };

    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        // スプリングアニメーションで滑らかに停止
        const currentRotation = rotation.get();
        const projectedRotation =
            currentRotation + info.velocity.x * DRAG_FACTOR * 0.1; // 慣性を少し加味
        animateToTargetRotation(projectedRotation, true);

        if (pauseOnHover && autoplay) {
            // ドラッグ終了後、マウスが離れていれば自動再生を再開するロジックはhandleMouseLeaveに任せる
        } else if (autoplay) {
            startAutoplay(); // pauseOnHoverがfalseなら即再開
        }
    };

    const handleMouseEnter = (): void => {
        if (pauseOnHover) {
            stopAutoplay();
        }
    };

    const handleMouseLeave = (): void => {
        if (pauseOnHover && autoplay && displayedItems.length > 0) {
            startAutoplay();
        }
    };

    // --- レンダリングロジック ---
    if (!isClient) {
        return (
            <div
                style={{ height: `${galleryHeight}px` }}
                className="w-full animate-pulse bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
            >
                ギャラリーを読み込み中...
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div
                style={{ height: `${galleryHeight}px` }}
                className="w-full flex items-center justify-center text-gray-500"
            >
                表示できる実績データがありません。
            </div>
        );
    }

    return (
        <div
            className="relative w-full cursor-grab overflow-hidden" // コンテナにoverflow-hidden
            style={{ height: `${galleryHeight}px` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Left Gradient Fade */}
            <div className="absolute left-0 top-0 bottom-0 z-10 w-1/6 pointer-events-none bg-gradient-to-r from-white via-white/80 to-transparent" />
            {/* Right Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 z-10 w-1/6 pointer-events-none bg-gradient-to-l from-white via-white/80 to-transparent" />

            <motion.div // ドラッグ可能なコンテナ
                className="absolute inset-0 flex items-center justify-center" // 中央揃え
                style={{
                    perspective: "1200px", // 親要素にperspective
                }}
                drag="x"
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                dragConstraints={{ left: 0, right: 0 }} // 必要に応じて調整
                dragElastic={0.1}
            >
                <motion.div // 回転するトラック
                    className="relative flex items-center justify-center"
                    style={{
                        width: cylinderWidth,
                        height: itemHeight, // トラックの高さはアイテムの高さに合わせる
                        transformStyle: "preserve-3d",
                        transform: transform, // useTransform からの値
                        rotateY: rotation, // useMotionValue からの値
                    }}
                    animate={controls}
                >
                    {displayedItems.map((item, i) => {
                        const angle = (360 / faceCount) * i;
                        return (
                            <motion.div
                                key={`${item.id}-${i}`}
                                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                                style={{
                                    width: `${itemWidth}px`,
                                    height: `${itemHeight}px`,
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    backfaceVisibility: "hidden", // 裏面を非表示
                                }}
                            >
                                <Link
                                    href={item.targetUrl || "#"}
                                    target={item.targetUrl ? "_blank" : "_self"}
                                    rel={
                                        item.targetUrl
                                            ? "noopener noreferrer"
                                            : ""
                                    }
                                    className="relative block w-full h-full rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    onClick={(e) => {
                                        if (!item.targetUrl) e.preventDefault();
                                    }}
                                    aria-label={item.altText}
                                >
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.altText}
                                        fill // fill を使う場合は親要素に position: relative と明確な W/H が必要
                                        sizes={`${itemWidth}px`} // sizes属性を適切に設定
                                        className="object-contain p-2" // パディングで見切れ調整
                                        priority={i < 5} // 最初の数枚を優先読み込み
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default RollingGallery;
