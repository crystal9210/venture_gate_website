"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
    { label: "ホーム", href: "#top" },
    { label: "組織概要", href: "#about" },
    { label: "活動内容", href: "#activities" },
    { label: "イベント", href: "#events" },
    { label: "スポンサー", href: "#sponsors" },
    { label: "お問い合わせ", href: "#contact" },
];

// TODO メニューのレスポンシブ調整
export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* ロゴ */}
                        <div className="flex-shrink-0 text-4xl font-extrabold text-[#f97316] select-none">
                            Venture Gate
                        </div>

                        {/* PCメニュー */}
                        <ul className="hidden md:flex space-x-4">
                            {navItems.map(({ label, href }) => {
                                const isActive = pathname === href;
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`relative px-3 py-2 font-semibold transition-colors duration-300 ${
                                                isActive
                                                    ? "text-[#ea580c]"
                                                    : "text-gray-700 hover:text-[#f97316]"
                                            }`}
                                        >
                                            {label}
                                            {/* 下線アニメーション */}
                                            <span
                                                className={`absolute left-0 bottom-0 h-0.5 bg-[#ea580c] transition-all duration-300 ${
                                                    isActive
                                                        ? "w-full"
                                                        : "w-0 group-hover:w-full"
                                                }`}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* モバイルメニュー開閉ボタン */}
                        <button
                            className="md:hidden p-2 rounded-md text-[#f97316] hover:text-[#ea580c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316]"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {/* ハンバーガーアイコン */}
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {mobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>

                {/* モバイルメニュー */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white bg-opacity-90 backdrop-blur-sm shadow-lg">
                        <ul className="flex flex-col space-y-2 px-4 py-4">
                            {navItems.map(({ label, href }) => {
                                const isActive = pathname === href;
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                            className={`block px-3 py-2 rounded font-semibold transition-colors duration-300 ${
                                                isActive
                                                    ? "text-[#ea580c] bg-orange-100"
                                                    : "text-gray-700 hover:text-[#f97316] hover:bg-orange-50"
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </header>

            {/* ヘッダーの高さ分の余白 */}
            <div className="h-16 md:h-16" />
        </>
    );
}
