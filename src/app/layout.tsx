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

// メインキーワード
const mainKeywords = [
    "埼玉大学 サークル",
    "埼大 サークル",
    "埼玉大学 起業",
    "埼大 起業",
    "埼玉大学 ビジコン",
    "埼大 ビジコン",
    "埼玉大学 アントレプレナーシップ",
    "埼大 アントレプレナーシップ",
    "埼玉大学 就活",
    "埼大 就活",
];

// サブキーワード
const subKeywords = [
    "事業創造サークル",
    "Venture Gate",
    "ベンチャーゲート",
    "学生サークル",
    "学生 起業",
    "学生 挑戦",
    "学生 起業支援",
    "ビジネス",
    "ビジネスコンテスト",
    "大学サークル",
    "イベント",
    "サークル 新歓",
    "起業支援",
    "起業イベント",
    "ベンチャー",
    "学生団体",
    "サークル 募集",
    "サークル 一覧",
    "ビジコン 参加",
    "アントレプレナー教育",
    "キャリア形成",
    "キャリア支援",
    "インターン",
    "就職活動",
    "埼玉大学 経営",
    "埼玉大学 企業",
    "埼玉大学 企業連携",
];

const keywords = [...mainKeywords, ...subKeywords];

export const metadata: Metadata = {
    title: "埼玉大学事業創造サークル Venture Gate | アントレプレナーシップ・ビジネス・起業",
    description:
        "埼玉大学公認の事業創造サークル『Venture Gate』は、アントレプレナーシップ・ビジネス・起業を軸に活動中。新しいことに挑戦したい学生を募集しています。ビジネス案の議論、イベント企画、ビジネスコンテスト参加など多彩な活動を実施中！",
    verification: {
        google: "SS83tSeBIbFOTQd-Pd184ZBk1WJZs1HKP4LlzmcreS0",
    },
    keywords: keywords,
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
        <html lang="ja">
            <head>
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/VentureGateIconGoogleSearch.png"
                    sizes="48x48"
                />
                {/* 必要なら.icoも */}
                {/* <link rel="icon" type="image/x-icon" href="/favicon.ico" /> */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
