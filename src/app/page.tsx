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

export default function Home() {
    return (
        <>
            <FixedHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-24 py-8 sm:py-12 md:py-16 bg-white">
                {/* Hero */}
                <section
                    id="top"
                    className="relative text-white py-20 sm:py-24 md:py-32 rounded-lg overflow-hidden shadow-md"
                    style={{
                        background:
                            "linear-gradient(to right, #fde047, #fb923c, #f97316)",
                    }}
                >
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 space-y-6 animate-fadeInLeft text-center md:text-left">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold leading-tight">
                                Venture Gate
                                <br />
                                埼玉大学事業創造サークル
                            </h1>
                            <p className="text-xl sm:text-2xl md:text-xl font-light max-w-md mx-auto md:mx-0">
                                共に考え、共に動く
                                <br />
                                ここが挑戦の出発点
                            </p>
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
                <section id="activities" className="space-y-16">
                    <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold">
                        活動の3本柱
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                        {[
                            { id: 1, label: "アントレプレナーシップ" },
                            { id: 2, label: "ビジネス" },
                            { id: 3, label: "起業" },
                        ].map(({ id, label }) => (
                            <div
                                key={id}
                                className="flex flex-col items-center relative animate-fadeInUp"
                            >
                                {/* 縦バー */}
                                <div className="relative h-72 w-14 rounded-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-yellow-300 via-orange-400 to-orange-500" />
                                    {/* Gate ロゴ */}
                                    <span className="absolute top-4 inset-x-0 text-lg font-semibold text-white/50 text-center select-none">
                                        Gate
                                    </span>
                                    {/* 番号 */}
                                    <span className="absolute inset-x-0 bottom-10 text-6xl font-bold text-white/60 text-center select-none">
                                        {id}
                                    </span>
                                </div>

                                {/* ラベル */}
                                <p className="mt-6 text-xl sm:text-2xl font-medium text-black">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* 門ロゴ + 説明 */}
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* 説明文はそのまま */}
                        <div className="flex-1 space-y-4 text-lg sm:text-xl leading-relaxed">
                            <p>
                                私たちは、アントレプレナーシップ、ビジネス、起業の3つを軸に
                                幅広く活動していきたいと思っています。私たちと一緒に新しいことがしたい
                                と思っている方、ご参加お待ちしています。
                            </p>
                        </div>

                        {/* ── Gate ロゴ ─────────────────────────────── */}
                        <div className="flex-1 flex justify-center md:justify-center">
                            <div className="relative inline-block text-black leading-none select-none">
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
                <section id="contact" className="space-y-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4 flex items-center gap-2">
                        <FaEnvelope /> お問い合わせ
                    </h2>

                    {/* E-mail */}
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-[#ea580c] text-xl" />
                        <span className="text-gray-700 text-lg sm:text-xl">
                            E-mailアドレス
                        </span>
                    </div>
                    <a
                        href="mailto:saitama.univ.venturegate@gmail.com"
                        className="text-[#ea580c] underline text-lg sm:text-xl ml-7"
                    >
                        saitama.univ.venturegate@gmail.com
                    </a>

                    {/* Googleフォーム */}
                    <div className="flex items-center gap-2 mt-2">
                        {/* FaWpforms または MdAssignment どちらかお好みで */}
                        <FaWpforms className="text-[#ea580c] text-xl" />
                        {/* <MdAssignment className="text-[#ea580c] text-xl" /> */}
                        <span className="text-gray-700 text-lg sm:text-xl">
                            Googleフォーム
                        </span>
                    </div>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLScBlhiVMQqCGGDOpZY6QrZXfCun2mOUB0xVo4n_HnINzIQ8ag/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ea580c] underline text-lg sm:text-xl ml-7"
                    >
                        フォームはこちら
                    </a>

                    {/* Instagram */}
                    <div className="flex items-center gap-2 mt-2">
                        <FaInstagram className="text-[#ea580c] text-xl" />
                        <a
                            href="https://www.instagram.com/venture_gate/?igsh=MWg3OG9ycGJsM2xycw%3D%3D#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ea580c] underline text-lg sm:text-xl"
                        >
                            Instagramはこちら
                        </a>
                    </div>

                    <div className="mt-12 text-center">
                        <Link
                            href="#top"
                            className="text-sm text-gray-500 hover:text-[#ea580c]"
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
