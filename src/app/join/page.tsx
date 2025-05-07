"use client";

import Link from "next/link";

export default function JoinPage() {
    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-white rounded-lg shadow-md">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#ea580c] animate-fadeInDown">
                入会を希望される方へ
            </h1>

            <section className="space-y-4 animate-fadeInUp">
                <h2 className="text-2xl font-bold text-[#f97316] border-l-4 border-[#ea580c] pl-4">
                    求める人物像
                </h2>
                <ul className="list-disc list-inside text-lg sm:text-xl text-gray-800 space-y-2">
                    <li>
                        起業、ビジネス、アントレプレナーシップのいずれかに興味がある方
                    </li>
                    <li>本サークルの活動の3本柱にご共感いただける方</li>
                    <li>
                        志高く、積極的に参加していただける方（積極性を身につけたい方も歓迎）
                    </li>
                    <li>学外の方でもご参加可能です</li>
                </ul>
            </section>

            <section className="space-y-4 animate-fadeInUp delay-200">
                <h2 className="text-2xl font-bold text-[#f97316] border-l-4 border-[#ea580c] pl-4">
                    入会方法
                </h2>
                <p className="text-lg sm:text-xl text-gray-800">
                    公式インスタグラムのDM、E-mail、Googleフォームのいずれかで、入会希望の旨と必要事項（大学名、学部、学年、氏名）をお送りください。
                </p>
                <ul className="list-disc list-inside text-lg sm:text-xl text-gray-800 space-y-2">
                    <li>
                        <strong>E-mailアドレス：</strong>
                        <a
                            href="mailto:saitama.univ.venturegate@gmail.com"
                            className="text-[#ea580c] underline"
                        >
                            saitama.univ.venturegate@gmail.com
                        </a>
                    </li>
                    <li>
                        <strong>Googleフォーム：</strong>
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLScBlhiVMQqCGGDOpZY6QrZXfCun2mOUB0xVo4n_HnINzIQ8ag/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#ea580c] underline"
                        >
                            フォームはこちら
                        </Link>
                    </li>
                </ul>
            </section>

            <div className="text-center mt-12">
                <Link
                    href="/"
                    className="inline-block bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                    トップページに戻る
                </Link>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes fadeInDown {
                    0% {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease forwards;
                }
                .animate-fadeInDown {
                    animation: fadeInDown 0.8s ease forwards;
                }
                .delay-200 {
                    animation-delay: 0.2s;
                }
            `}</style>
        </main>
    );
}
