import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

{
    /* <meta
    name="google-site-verification"
    content="SS83tSeBIbFOTQd-Pd184ZBk1WJZs1HKP4LlzmcreS0"
/>; */
}
// verification: {
//   google: "SS83tSeBIbFOTQd-Pd184ZBk1WJZs1HKP4LlzmcreS0", // ここにSearch Consoleで発行されたコードを入力
// },
export const metadata: Metadata = {
    title: "埼玉大学事業創造サークル Venture Gate | アントレプレナーシップ・ビジネス・起業",
    description:
        "埼玉大学公認の事業創造サークル『Venture Gate』は、アントレプレナーシップ・ビジネス・起業を軸に活動中。新しいことに挑戦したい学生を募集しています。ビジネス案の議論、イベント企画、ビジネスコンテスト参加など多彩な活動を実施中！",
    verification: {
        google: "SS83tSeBIbFOTQd-Pd184ZBk1WJZs1HKP4LlzmcreS0",
    },
    keywords: [
        "埼玉大学",
        "事業創造サークル",
        "Venture Gate",
        "venture gate",
        "venturegate",
        "Venturegate",
        "ventureGate",
        "VentureGate",
        "アントレプレナーシップ",
        "ビジネス",
        "起業",
        "学生サークル",
        "ビジネスコンテスト",
        "ビジコン",
        "イベント",
        "大学サークル",
        "SU",
        "埼玉 国立大学",
        "埼玉 大学",
        "学生 起業",
        "学生 挑戦",
        "ベンチャーゲート",
        "埼大 サークル",
        "学生 起業支援",
        "SU サークル",
        "大学 ビジコン",
        "埼玉 ビジコン",
        "ビジコン",
        "SU ビジコン",
        "SU 経営",
        "埼玉大学 経営",
        "埼玉大学 企業",
        "埼玉大学 企業連携",
        "SU 埼玉大学",
        "su 埼玉大学",
        "SU 埼大",
        "su 埼大",
        "su ビジコン",
        "su 経営",
        "su サークル",
        "su",
        "埼玉大学 新歓",
    ],
    openGraph: {
        title: "埼玉大学事業創造サークル Venture Gate",
        description:
            "アントレプレナーシップ・ビジネス・起業に興味のある学生を募集！埼玉大学公認サークル『Venture Gate』の公式サイトです。",
        url: "https://venturegatewebsite.vercel.app/",
        siteName: "埼玉大学事業創造サークル Venture Gate",
        images: [
            {
                url: "https://venturegatewebsite.vercel.app/images/VentureGate.png", // OGP画像
                width: 1200,
                height: 630,
                alt: "埼玉大学事業創造サークル Venture Gate",
            },
        ],
        locale: "ja_JP",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "埼玉大学事業創造サークル Venture Gate",
        description:
            "アントレプレナーシップ・ビジネス・起業に興味のある学生を募集中！",
        images: [
            "https://venturegatewebsite.vercel.app/images/VentureGate.png",
        ],
    },
    alternates: {
        canonical: "https://venturegatewebsite.vercel.app/",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
