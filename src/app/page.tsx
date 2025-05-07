"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaArrowRight,
    FaEnvelope,
    FaHandshake,
    FaInstagram,
    FaWpforms,
} from "react-icons/fa";
import FixedHeader from "./_components/FixedHeader";
import GradientText from "./_components/GradientText";
import SplashCursor from "./_components/SplashCursor";
import { useEffect, useRef, useState } from "react";

export default function Home() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [showCursor, setShowCursor] = useState(false);

    useEffect(() => {
        const currentSection = sectionRef.current;
        if (!currentSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowCursor(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        observer.observe(currentSection);

        return () => {
            if (currentSection) observer.unobserve(currentSection);
        };
    }, []);

    return (
        <>
            <FixedHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-24 py-8 sm:py-12 md:py-16 bg-white">
                {/* Hero */}
                <section
                    id="top"
                    className="relative text-white py-20 sm:py-24 md:py-32 rounded-lg overflow-hidden shadow-md sm:px-6"
                    style={{
                        background:
                            "linear-gradient(to right, #fde047, #fb923c, #f97316)",
                    }}
                >
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-6 animate-fadeInLeft text-center md:text-left">
                            <GradientText
                                colors={[
                                    "#40ffaa",
                                    "#4079ff",
                                    "#40ffaa",
                                    "#4079ff",
                                    "#40ffaa",
                                ]}
                                animationSpeed={10}
                                showBorder={false}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-tight block max-w-max"
                            >
                                Venture Gate
                                <br />
                                埼玉大学事業創造サークル
                            </GradientText>
                            <GradientText
                                colors={[
                                    "#ff512f",
                                    "#ff9966",
                                    "#ffb347",
                                    "#ff512f",
                                    "#ff9966",
                                ]}
                                animationSpeed={5}
                                showBorder={false}
                                className="text-2xl sm:text-4xl md:text-5xl font-extrabold max-w-md mx-auto md:mx-0 block"
                            >
                                共に考え、
                                <br />
                                共に動く
                                <br />
                                ここが挑戦の出発点
                            </GradientText>
                            <Link
                                href="#contact"
                                role="link"
                                className="inline-flex items-center gap-2 bg-white text-[#ea580c] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-50 transition text-lg sm:text-xl"
                            >
                                今すぐ参加 <FaArrowRight />
                            </Link>
                        </div>

                        <div className="flex-1 flex items-center justify-center animate-fadeInRight">
                            <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] relative rounded-lg overflow-hidden">
                                <Image
                                    src="/images/VentureGate.png"
                                    alt="Venture Gate"
                                    fill
                                    className="object-contain p-4"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ---------- 活動の3本柱 ---------- */}
                <section
                    id="activities"
                    ref={sectionRef}
                    className="relative space-y-16"
                >
                    {/* SplashCursor を絶対配置・限定的にここでだけ */}
                    {showCursor && (
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <SplashCursor
                                DENSITY_DISSIPATION={1.5} // 色の退色を抑える（小さめ）
                                VELOCITY_DISSIPATION={1.0} // 動きの減衰を抑える
                                COLOR_UPDATE_SPEED={15} // 色の変化速度を少し速め
                                BACK_COLOR={{ r: 0.8, g: 0.3, b: 0.1 }} // 暖色系の背景色（赤橙寄り）
                                SPLAT_FORCE={7000} // 色の広がり強め
                                SPLAT_RADIUS={0.25} // 色の広がり半径少し大きめ
                                // 他パラメータはデフォルトのまま
                            />
                        </div>
                    )}

                    <h2 className="text-center text-3xl text-gray-700 sm:text-4xl md:text-5xl font-extrabold">
                        活動の3本柱
                    </h2>

                    {/* ---------- 3 本柱 ---------- */}
                    <div
                        /* スマホでも 3 列 ＋ 余白を逃がすため横スクロール許可 */
                        className="grid grid-cols-3 gap-12 mb-64 overflow-x-auto px-2 sm:px-0 scroll-smooth scroll-px-4 snap-x snap-mandatory"
                    >
                        {[
                            { id: 1, label: "アントレプレナーシップ" },
                            { id: 2, label: "ビジネス" },
                            { id: 3, label: "起業" },
                        ].map(({ id, label }) => (
                            <div
                                key={id}
                                /* スクロール時に 1 カードずつスナップ */
                                className="flex flex-col items-center relative animate-fadeInUp min-w-[7rem] snap-center"
                            >
                                {/* 縦バー */}
                                <div className="relative h-72 w-14 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-500" />
                                    <span className="absolute top-4 inset-x-0 text-lg font-semibold text-white/50 text-center select-none">
                                        Gate
                                    </span>
                                    <span className="absolute inset-x-0 bottom-10 text-6xl font-bold text-white/60 text-center select-none">
                                        {id}
                                    </span>
                                </div>

                                {/* ラベル */}
                                <p className="mt-6 text-center text-base sm:text-xl font-medium text-black px-1">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* 門ロゴ + 説明 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* ── 説明文 ───────────────────────── */}
                        <div className="flex-1">
                            <p className="space-y-6  text-orange-700 text-lg sm:text-xl md:text-2xl leading-relaxed font-noto font-medium bg-gradient-to-r from-orangeLight via-orangeDark to-orangeAccent bg-clip-text drop-shadow-2xl inline-block">
                                私たちは、
                                <br />
                                <span className="font-bold">
                                    アントレプレナーシップ
                                </span>
                                、<span className="font-bold">ビジネス</span>、
                                <span className="font-bold">起業</span>の{" "}
                                <span className="underline decoration-orangeAccent">
                                    3&nbsp;つ
                                </span>{" "}
                                を軸に幅広く活動しています。
                                <br className="hidden sm:inline" />
                                <span className="tracking-wide">
                                    新しいことにチャレンジしたい&nbsp;あなたの参加をお待ちしています！
                                </span>
                            </p>
                        </div>

                        {/* ── Gate ロゴ ─────────────────────────────── */}
                        {/* ───────── Gate ロゴ ───────── */}
                        <div className="flex-1 flex justify-center md:justify-center">
                            {/* ここに transform + scale を追加 */}
                            <div
                                className="relative inline-block text-black leading-none select-none transform-gpu origin-center scale-110   /* モバイル +10% */ sm:scale-125 md:scale-140 lg:scale-150" /* 画面幅に応じてさらに拡大 */
                            >
                                {/* 上部 Gate */}
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-3xl font-semibold">
                                    Gate
                                </span>

                                {/* 本体「門」 */}
                                <span className="text-[10rem] font-bold">
                                    門
                                </span>

                                {/* ▼―― 内部スタック ――▼ */}
                                <div className="absolute inset-x-0 bottom-6 flex flex-col items-center text-center">
                                    <span className="text-3xl font-semibold">
                                        起業
                                    </span>
                                    <span className="text-xl">Venture</span>
                                </div>
                                {/* ▲――――――――――――▲ */}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 組織概要 */}
                <section id="about" className="space-y-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4">
                        組織概要
                    </h2>
                    <div className="max-w-3xl text-gray-700 space-y-2 text-lg sm:text-xl">
                        <p>
                            <strong>組織名：</strong>埼玉大学事業創造サークル
                            Venture Gate
                        </p>
                        <p>
                            <strong>設立：</strong>2025年
                        </p>
                        <p>
                            <strong>代表：</strong>木村　遼
                        </p>
                        <p>
                            <strong>副代表：</strong>上谷　竜
                        </p>
                        <p>
                            <strong>会員数：</strong>5名
                        </p>
                    </div>
                </section>

                {/* 活動内容 */}
                <section className="bg-[#fff7ed] rounded-lg p-4 sm:p-8 shadow-md space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4">
                        活動内容
                    </h2>
                    <div className="max-w-4xl text-gray-800 space-y-4 text-base sm:text-lg">
                        <p>Venture Gateの活動は次の二つに分けられます。</p>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#c2410c]">
                            通常活動
                        </h3>
                        <p>
                            ビジネス案を持ち寄って議論したり、ビジネスコンクールに向けた準備をしたり、企業研究をしたり、定期的に主催するイベントを企画したりします。
                            また、新しい活動について話合ったりしますので、ここで自分がやりたい活動を提案したり出来ます。
                        </p>
                        <h3 className="text-lg sm:text-xl font-semibold text-[#c2410c]">
                            特別活動
                        </h3>
                        <p>
                            ビジネスコンテストに参加したり、イベントを開催したり、経営者の方々をお呼びして交流の場を設けたり、埼玉大学と連携してアントレプレナーシップの周知に努めるなど多岐にわたります。
                            ※特別活動は構想段階のため、内容は変更される可能性があります。
                        </p>
                        <p className="text-[#ea580c] font-semibold">
                            現在会員大募集中！&nbsp;
                            <Link
                                href="/join"
                                className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold px-4 py-2 rounded transition"
                            >
                                入会はこちら
                            </Link>
                        </p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>新しいことにチャレンジしたい方</li>
                            <li>
                                アントレプレナーシップ、ビジネス、起業に興味がある方
                            </li>
                            <li>どなたでも大歓迎です！</li>
                        </ul>
                    </div>
                </section>

                {/* イベント情報 */}
                <section id="events" className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4">
                        イベント情報
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl">
                        イベント詳細、エントリーはこちらから
                    </p>
                    <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLScBlhiVMQqCGGDOpZY6QrZXfCun2mOUB0xVo4n_HnINzIQ8ag/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#f97316] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#ea580c] transition text-lg sm:text-xl"
                    >
                        エントリーフォームへ
                    </Link>
                </section>

                {/* スポンサー */}
                <section
                    id="sponsors"
                    className="bg-[#fff7ed] rounded-lg p-4 sm:p-8 shadow-md space-y-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4 flex items-center gap-2">
                        <FaHandshake /> スポンサー
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl">
                        現在スポンサー募集中です。スポンサーになっていただいた個人・団体の方は下記のようにご紹介させていただきます。
                    </p>
                    <div className="flex flex-wrap gap-4 sm:gap-8 items-center">
                        <div className="w-32 h-16 sm:w-40 sm:h-20 relative shadow rounded-lg overflow-hidden bg-white flex items-center justify-center">
                            <Image
                                src="/images/sponsor-logo.png"
                                alt="スポンサー名"
                                fill
                                className="object-contain p-2 sm:p-4"
                                sizes="(max-width: 640px) 8rem, 10rem"
                            />
                        </div>
                        {/* 追加スポンサーはここに */}
                    </div>
                </section>

                {/* お問い合わせ */}
                <section id="contact" className="space-y-8 max-w-3xl px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4 flex items-center gap-3">
                        <FaEnvelope aria-hidden="true" /> お問い合わせ
                    </h2>

                    {/* E-mail */}
                    <Link
                        href="mailto:saitama.univ.venturegate@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="メールアドレスへ送信"
                        className="flex items-center gap-3 text-[#ea580c] underline text-lg sm:text-xl hover:text-[#f97316] transition-colors"
                    >
                        <FaEnvelope className="text-[#ea580c] text-2xl" />
                        <span>saitama.univ.venturegate@gmail.com</span>
                    </Link>

                    {/* Googleフォーム */}
                    <Link
                        href="https://docs.google.com/forms/d/e/1FAIpQLScBlhiVMQqCGGDOpZY6QrZXfCun2mOUB0xVo4n_HnINzIQ8ag/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Googleフォームへ移動"
                        className="flex items-center gap-3 text-[#ea580c] underline text-lg sm:text-xl hover:text-[#f97316] transition-colors"
                    >
                        <FaWpforms className="text-[#ea580c] text-2xl" />
                        <span>フォームはこちら</span>
                    </Link>

                    {/* Instagram */}
                    <Link
                        href="https://www.instagram.com/venture_gate/?igsh=MWg3OG9ycGJsM2xycw%3D%3D#"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagramへ移動"
                        className="flex items-center gap-3 text-[#ea580c] underline text-lg sm:text-xl hover:text-[#f97316] transition-colors"
                    >
                        <FaInstagram className="text-[#ea580c] text-2xl" />
                        <span>Instagramはこちら</span>
                    </Link>

                    <div className="mt-12 text-center">
                        <Link
                            href="#top"
                            className="text-sm text-gray-500 hover:text-[#ea580c] transition-colors"
                        >
                            TOPに戻る
                        </Link>
                    </div>
                </section>

                {/* アニメーション用スタイル */}
                <style jsx>{`
                    @keyframes fadeInLeft {
                        0% {
                            opacity: 0;
                            transform: translateX(-20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    @keyframes fadeInRight {
                        0% {
                            opacity: 0;
                            transform: translateX(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                    .animate-fadeInLeft {
                        animation: fadeInLeft 1s ease forwards;
                    }
                    .animate-fadeInRight {
                        animation: fadeInRight 1s ease forwards;
                    }
                `}</style>
            </main>
        </>
    );
}
