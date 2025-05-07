import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 必須項目の簡単なバリデーション例
        const { name, email, message } = body;
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "name, email, message は必須です。" },
                { status: 400 }
            );
        }

        // ここでメール送信やDB保存処理を実装可能
        // 今回はダミー応答として受け取った内容を返す
        console.log("お問い合わせ内容:", body);

        return NextResponse.json(
            { message: "お問い合わせありがとうございます。" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "リクエストの処理中にエラーが発生しました。" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // GETは許可しない例
    return NextResponse.json(
        { error: "GETメソッドはサポートされていません。" },
        { status: 405 }
    );
}
