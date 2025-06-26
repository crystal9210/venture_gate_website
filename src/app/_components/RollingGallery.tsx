"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import {
    motion,
    useMotionValue,
    useAnimation,
    useTransform,
    PanInfo,
} from "framer-motion";
import Image from "next/image";
import { FaTrophy, FaImage, FaExternalLinkAlt } from "react-icons/fa";
import type { Achievement } from "../_seeds/achievements";
import ConfirmModal from "./ConfirmModal";

interface RollingGalleryProps {
    items: Achievement[];
    autoplay?: boolean;
    pauseOnHover?: boolean;
    galleryHeight?: number;
}

const MIN_DISPLAY_ITEMS = 8;

const RollingGallery: React.FC<RollingGalleryProps> = ({
    items,
    autoplay = true,
    pauseOnHover = true,
    galleryHeight = 400,
}) => {
    // --- モーダル、ドラッグ状態の管理 ---
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Achievement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // --- 無限ループと表示アイテムの処理 ---
    const displayItems = useMemo(() => {
        if (!items || items.length === 0) return [];
        if (items.length >= MIN_DISPLAY_ITEMS) return items;
        const repeatedItems: Achievement[] = [];
        for (let i = 0; i < MIN_DISPLAY_ITEMS; i++) {
            repeatedItems.push(items[i % items.length]);
        }
        return repeatedItems;
    }, [items]);

    // --- レスポンシブ ---
    const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- カードサイズ・円柱配置 ---
    const faceCount: number = displayItems.length;
    const faceWidth = isScreenSizeSm ? 140 : 240;
    const faceHeight = isScreenSizeSm ? 260 : 200;

    // カードが隙間なく並ぶ半径
    // 3D円柱の正面に中央カードが来るように調整
    const radius = faceWidth / 1.6 / Math.tan(Math.PI / faceCount);

    // 真ん中のカードが正面を向く初期角度
    const initialRotation = -(360 / faceCount) * Math.floor(faceCount / 2);
    const rotation = useMotionValue(initialRotation);
    const controls = useAnimation();
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const dragFactor = 0.05;

    // --- ドラッグ処理 ---
    const handleDrag = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        controls.stop();
        rotation.set(rotation.get() + info.offset.x * dragFactor);
        if (!isDragging) setIsDragging(true);
    };

    const handleDragEnd = (
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
    ): void => {
        controls.start({
            rotateY: rotation.get() + info.velocity.x * dragFactor,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 20,
                mass: 0.1,
            },
        });
        setTimeout(() => setIsDragging(false), 100);
    };

    // --- オートプレイ ---
    const resumeAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        autoplayRef.current = setInterval(() => {
            const currentRotation = rotation.get();
            controls.start({
                rotateY: currentRotation - 360 / faceCount,
                transition: { duration: 2, ease: "linear" },
            });
            rotation.set(currentRotation - 360 / faceCount);
        }, 3000);
    }, [controls, faceCount, rotation]);

    const handleMouseEnter = (): void => {
        if (autoplay && pauseOnHover && autoplayRef.current) {
            clearInterval(autoplayRef.current);
            controls.stop();
        }
    };

    const handleMouseLeave = (): void => {
        if (autoplay && pauseOnHover) {
            resumeAutoplay();
        }
    };

    useEffect(() => {
        if (autoplay && !modalOpen) {
            resumeAutoplay();
        } else {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        }
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [autoplay, modalOpen, displayItems, resumeAutoplay]);

    // --- カードクリック、モーダル関連 ---
    const handleCardClick = (item: Achievement): void => {
        if (isDragging || !item.linkUrl) return;
        setSelectedItem(item);
        setModalOpen(true);
    };

    const handleConfirm = (): void => {
        if (selectedItem?.linkUrl) {
            window.open(selectedItem.linkUrl, "_blank", "noopener,noreferrer");
        }
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleCloseModal = (): void => {
        setModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <>
            <div
                className="relative w-full overflow-visible"
                style={{ height: `${galleryHeight}px` }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="relative w-full h-full"
                    style={{ perspective: "1000px" }}
                >
                    <motion.div
                        drag="x"
                        onDragStart={() => setIsDragging(true)}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{
                            width: "100%",
                            height: "100%",
                            transformStyle: "preserve-3d",
                            transform: useTransform(
                                rotation,
                                (val) => `rotateY(${val}deg)`
                            ),
                        }}
                        className="flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                        {displayItems.map((item, i) => (
                            <div
                                key={`${item.id}-${i}`}
                                className="group absolute flex items-center justify-center [backface-visibility:hidden]"
                                style={{
                                    width: `${faceWidth}px`,
                                    height: `${faceHeight}px`,
                                    transform: `rotateY(${
                                        (360 / faceCount) * i
                                    }deg) translateZ(${radius}px)`,
                                }}
                            >
                                <div
                                    onClick={() => handleCardClick(item)}
                                    className={`relative w-full h-full bg-white rounded-2xl shadow-md border border-gray-200/80 transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:scale-105 flex flex-col justify-between overflow-hidden ${
                                        item.linkUrl && !isDragging
                                            ? "cursor-pointer"
                                            : "cursor-default"
                                    }`}
                                >
                                    <div className="relative w-full flex-1 flex items-center justify-center bg-gradient-to-b from-orange-50 via-white to-orange-50">
                                        {item.imageUrl ? (
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-3 pointer-events-none"
                                                sizes={`${faceWidth}px`}
                                                style={{
                                                    maxHeight: "100%",
                                                    maxWidth: "100%",
                                                }}
                                            />
                                        ) : (
                                            <div className="text-gray-300 flex flex-col items-center gap-2">
                                                <FaImage size={48} />
                                                <p className="font-semibold text-sm">
                                                    NO IMAGE
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-full h-2/5 p-4 bg-white flex flex-col justify-center">
                                        <h4
                                            className="font-bold text-base text-gray-800 whitespace-normal break-words"
                                            title={item.title}
                                        >
                                            {item.title}
                                        </h4>
                                        {item.award && (
                                            <p className="text-sm text-orange-600 font-semibold flex items-center gap-1.5 mt-1.5">
                                                <FaTrophy />
                                                {item.award}
                                            </p>
                                        )}
                                    </div>
                                    {item.linkUrl && (
                                        <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm text-orange-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                            <FaExternalLinkAlt size={12} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
            <ConfirmModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                title={selectedItem?.title || ""}
                linkUrl={selectedItem?.linkUrl || ""}
            />
        </>
    );
};

export default RollingGallery;
