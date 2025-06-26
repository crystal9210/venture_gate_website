/**
 * 実績アイテムのデータ構造を定義するインターフェース
 */
export interface Achievement {
    /** ユニークなID */
    id: number;
    /** 実績のタイトル (例: Tongaliビジネスプランコンテスト2025) */
    title: string;
    /** 受賞内容 (例: 準決勝進出) */
    award: string;
    /**
     * 表示する画像のURL
     * publicフォルダからの絶対パスを推奨 (例: /images/achievements/tongali.png)
     * nullの場合は「NO IMAGE」プレースホルダーが表示されます
     */
    imageUrl?: string | null;
    /**
     * クリック時に遷移する外部リンク
     * nullの場合はクリックしても何も起きません
     */
    linkUrl: string | null;
}

/**
 * ホームページに表示する実績データのリスト
 * この配列を編集するだけで、実績セクションの内容を更新できます。
 */
export const achievementsData: Achievement[] = [
    {
        id: 1,
        title: "Tongaliビジネスプランコンテスト2025",
        award: "準決勝進出",
        // imageUrl: "/images/achievements/tongali-logo.svg", // 仮のパス: publicフォルダに画像を配置してください
        linkUrl: "https://tongali.net/", // 遷移させたい実績の公式URLなどを指定
    },
    {
        id: 2,
        title: "第一回ミニROOKIES",
        award: "第１位",
        imageUrl: "/images/achievements/miniRookies.png", // 仮のパス
        linkUrl: "https://machikado-career.com/2025/05/24/minirookies/", // 仮のURL
    },
    // {
    //     id: 3,
    //     title: "埼玉大学 ビジネスコンテスト",
    //     award: "アイデア賞",
    //     imageUrl: "/images/achievements/saidai-contest.jpg", // 仮のパス
    //     linkUrl: "https://example.com/saidai-contest", // 仮のURL
    // },
    // {
    //     id: 4,
    //     title: "未来の挑戦",
    //     award: "Coming Soon",
    //     imageUrl: null, // 画像がない場合の例
    //     linkUrl: null, // リンクがない場合の例
    // },
    // {
    //     id: 5,
    //     title: "Venture Gate 主催ハッカソン",
    //     award: "最優秀賞",
    //     imageUrl: "/images/VentureGate.png", // サークルのロゴを使用する例
    //     linkUrl: "https://venturegatewebsite.vercel.app/events", // サイト内ページへのリンクも可能
    // },
];
