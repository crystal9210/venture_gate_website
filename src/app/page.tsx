"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaHandshake } from "react-icons/fa";

export default function Home() {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 space-y-24 py-8 sm:py-12 md:py-16 bg-white">
            {/* Hero */}
            <section
                className="relative text-white py-12 sm:py-16 md:py-20 rounded-lg overflow-hidden shadow-md"
                style={{
                    background: "linear-gradient(to right, #fb923c, #f97316)",
                }}
            >
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="flex-1 space-y-5 animate-fadeInLeft text-center md:text-left">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            Venture Gate
                            <br />
                            埼玉大学事業創造サークル
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-xl font-light max-w-md mx-auto md:mx-0">
                            共に考え、共に動く
                            <br />
                            ここが挑戦の出発点
                        </p>
                        <button className="inline-flex items-center gap-2 bg-white text-[#ea580c] font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-orange-50 transition text-lg sm:text-xl">
                            今すぐ参加 <FaArrowRight />
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center w-full">
                        <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[36rem] lg:h-[36rem] relative rounded-lg overflow-hidden animate-fadeInRight flex items-center justify-center bg-transparent shadow-none">
                            <Image
                                src="/images/VentureGate.png"
                                alt="Venture Gate"
                                fill
                                className="object-contain p-4"
                                sizes="(max-width: 640px) 18rem, (max-width: 768px) 24rem, (max-width: 1024px) 28rem, (max-width: 1280px) 36rem, 36rem"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 門デザイン */}
            <section className="py-16 flex flex-col items-center space-y-6">
                <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#ea580c]">
                    Gate
                </div>
                <div className="relative flex flex-col items-center border-4 border-[#f97316] rounded-lg px-12 py-8 w-48 sm:w-64 md:w-80">
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#c2410c] mb-4">
                        起業
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#ea580c]">
                        Venture
                    </div>
                </div>
            </section>

            {/* 組織概要 */}
            <section className="space-y-8">
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
            <section className="space-y-6">
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
            <section className="bg-[#fff7ed] rounded-lg p-4 sm:p-8 shadow-md space-y-6">
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
            <section className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#ea580c] border-l-4 border-[#f97316] pl-4 flex items-center gap-2">
                    <FaEnvelope /> お問い合わせ
                </h2>
                <p className="text-gray-700 text-lg sm:text-xl">
                    E-mailアドレス
                </p>
                <a
                    href="mailto:saitama.univ.venturegate@gmail.com"
                    className="text-[#ea580c] underline text-lg sm:text-xl"
                >
                    saitama.univ.venturegate@gmail.com
                </a>
                <p className="text-gray-700 text-lg sm:text-xl">
                    Googleフォーム
                </p>
                <Link
                    href="https://docs.google.com/forms/d/e/1FAIpQLScBlhiVMQqCGGDOpZY6QrZXfCun2mOUB0xVo4n_HnINzIQ8ag/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ea580c] underline text-lg sm:text-xl"
                >
                    フォームはこちら
                </Link>
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
    );
}
