## 1. UI/UX 全体の課題と解決策 - 2025/6/26 (実績セクション実装 NOTE)

### 課題 A：3D カルーセルの「端の余白」「カード配置」問題

-   **問題**
    3D 配置のため、左右端にカードが来ず、中央だけにカードが寄る。画面端の余白が大きくなりやすい。
-   **解決策**
    -   `radius`の調整でカード間隔を制御（ただし限界あり）
    -   どうしても端まで寄せたい場合は 2D スライダーやグリッドに切り替え
    -   ラッパーの`width`や`overflow`を調整し、見切れを最小化[1]

### 課題 B：レスポンシブ設計の甘さ

-   **問題**
    PC では綺麗でも、スマホ幅でカードやテキストがはみ出す・潰れる・読めなくなる
-   **解決策**
    -   `faceWidth`/`faceHeight`を画面幅で切り替え
    -   テキストに`break-words`や`whitespace-normal`を指定し折り返し
    -   カードやラッパーの`min-width`/`min-height`を設定
    -   画像枠やテキスト枠の`overflow`を`visible`や`auto`に[1]

### 課題 C：画像の比率・余白・背景

-   **問題**
    画像の縦横比がバラバラでカード内で不自然な余白や切れが発生
-   **解決策**
    -   `object-contain`で画像を中央に収める
    -   画像枠にグラデーションやブランドカラー背景を敷く
    -   画像が小さい場合も背景で自然に埋める

### 課題 D：テキストの省略・折り返し・高さ

-   **問題**
    `truncate`や`overflow-hidden`でタイトルや説明が途中で切れる
-   **解決策**
    -   `truncate`を外し`whitespace-normal break-words`で折り返し
    -   テキストエリアの`h-auto`や`min-h`で高さを確保
    -   必要なら PC とスマホで`truncate`/`wrap`を切り替え

### 課題 E：アニメーション・ドラッグ・オートプレイの競合

-   **問題**
    ドラッグ中やモーダル表示時にオートプレイが止まらない／再開しない
-   **解決策**
    -   `autoplayRef`の管理を厳密にし、`useCallback`でメモ化
    -   `useEffect`の依存配列を正確に指定
    -   ドラッグ中は`isDragging`でクリックイベントをブロック

### 課題 F：コードの可読性・保守性

-   **問題**
    変数名やロジックが分かりづらく、拡張やデバッグが困難
-   **解決策**
    -   変数・関数名を明確に（例：`faceWidth`, `radius`, `resumeAutoplay`）
    -   計算式やレスポンシブ分岐にコメントを付与
    -   Magic Number（1.6 など）は調整用定数としてまとめる

### 課題 G：アクセシビリティ・ユーザビリティ

-   **問題**
    キーボード操作やスクリーンリーダー未対応、画像 alt 属性未設定
-   **解決策**
    -   画像の`alt`属性を必ず設定
    -   モーダルやカードに`tabIndex`や`aria-`属性を追加
    -   フォーカス制御やキーボードイベントも検討

### 課題 H：パフォーマンス・最適化

-   **問題**
    画像の遅延読み込みや最適化がされていない
-   **解決策**
    -   Next.js の`Image`で`loading="lazy"`を使う
    -   画像サイズや品質を適切に設定

## 2. 問題セット管理・UI トラブルシューティングの観点[2][1]

-   **UI レイアウトの問題は「位置・幅・高さ・余白・折り返し」の 5 点セットで常にチェック**
-   **問題が再発しやすい箇所（レスポンシブ、画像、テキスト）は都度テストケースを作成**
-   **UI 改善は「ユーザー体験」を最優先に、見た目＋操作性＋アクセシビリティをバランスよく考慮**

## 3. まとめ：今後の実装フロー

1. **要件を整理**：「どんな画面幅・データ量でも崩れないか？」
2. **レスポンシブ設計**：画面幅ごとにカード・画像・テキストサイズを調整
3. **見切れ・折り返し対策**：`break-words`や`object-contain`、`overflow`の見直し
4. **余白・間隔調整**：`radius`や`padding`、`margin`で微調整
5. **アクセシビリティ・最適化**：alt 属性、遅延ロード、キーボード対応
6. **UI/UX テスト**：PC/スマホ両方で実際に触ってみて、問題がないか確認
7. **コードの保守性確保**：分かりやすい変数名・コメント・Magic Number の整理

**今回のやりとりで出てきた課題・解決策は、今後の UI 設計・実装時にも必ず役立ちます。
「どこが崩れるか」「なぜそうなるか」「どう直すか」を常に意識して、柔軟に調整してください。**

[1] projects.ui_troubleshooting
[2] projects.problem_set_management

## ADDITIONAL (DETAIL WITH CODEBASE)

**「どこを」「どんな数値で」「なぜ」修正したか**を**“手順書”として具体的に**まとめます。
あなたや他の開発者が「なぜこの値？」「なぜこの書き方？」と迷わないよう、**理由と数値の根拠もセットで**記載します。

# RollingGallery デザイン修正の完全手順書

## 1. カードの幅・高さのレスポンシブ調整

### **どこを修正？**

```tsx
const faceWidth = isScreenSizeSm ? 140 : 240;
const faceHeight = isScreenSizeSm ? 260 : 200;
```

### **なぜ？**

-   **スマホ時（640px 以下）でカードが大きすぎてテキストや画像がはみ出す問題**があった。
-   **PC では見やすいサイズ**（幅 240px/高さ 200px）、**スマホでは幅 140px/高さ 260px**にすることで、**画像とテキストがバランスよく収まる**ようにした。

### **数値根拠**

-   スマホ時は PC の約 60%の幅（240→140）、高さはあえて 260px にして**縦長比率**でテキストも折り返しやすくした。

## 2. カード間の余白（radius）の調整

### **どこを修正？**

```tsx
const radius = faceWidth / 1.6 / Math.tan(Math.PI / faceCount);
```

### **なぜ？**

-   **radius**が大きすぎるとカードが画面外に飛び出し、小さすぎるとカード同士が重なる。
-   `/1.6`で**デフォルトより 20〜40%ほど radius を小さく**し、**カード同士の間隔を適度に開けつつ、画面内に収める**ようにした。

### **数値根拠**

-   1.0 だと間隔が狭すぎ、2.0 だと広すぎたため**1.6 でバランスを取った**（実際に見て微調整）。

## 3. 画像の表示方法・背景グラデーション

### **どこを修正？**

```tsx
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
            <p className="font-semibold text-sm">NO IMAGE</p>
        </div>
    )}
</div>
```

### **なぜ？**

-   画像が小さい・縦長・横長でも**中央に綺麗に収まる**よう`object-contain`を指定。
-   画像の周囲に余白ができても**グラデーション背景で自然に埋める**ため`bg-gradient-to-b`を使用。
-   `p-3`で画像の上下左右に**適度なパディング**を確保。

### **数値根拠**

-   `p-3`は 12px 相当で、画像とカード枠の間に**十分な余白**を作る。
-   グラデーションはブランドカラー（オレンジ系）＋白を使い、**違和感のない自然な背景**に。

## 4. テキストの折り返し・高さ調整

### **どこを修正？**

```tsx
<h4
    className="font-bold text-base text-gray-800 whitespace-normal break-words"
    title={item.title}
>
    {item.title}
</h4>
```

```tsx
<div className="w-full h-2/5 p-4 bg-white flex flex-col justify-center">
```

### **なぜ？**

-   `truncate`だとタイトルが途中で切れてしまうため、**折り返し表示**に変更。
-   `whitespace-normal break-words`で**複数行の折り返し**を許可。
-   `p-4`でテキストの上下左右に**余白（16px）**を確保し、**読みやすさと見た目のバランス**を両立。

### **数値根拠**

-   `p-4`は 16px で、テキストが詰まりすぎず、カード内でバランス良く配置される。

## 5. ラッパーの幅・中央寄せ・overflow

### **どこを修正？**

```tsx
<div
  className="relative w-full overflow-visible"
  style={{ height: `${galleryHeight}px` }}
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
```

### **なぜ？**

-   `w-full`で**画面幅いっぱい**にカルーセルを広げることで、カードが左右に偏らないように。
-   `overflow-visible`で**カードが円周上に配置されても見切れない**ように。
-   `galleryHeight`はデフォルト 400px だが、必要に応じて親から渡して調整可能。

### **数値根拠**

-   `galleryHeight = 400`は、カード（faceHeight=200）＋余白を考慮した標準値。

## 6. スマホ時のラッパー幅調整（追加でやるなら）

```tsx
<div
  className="relative overflow-visible"
  style={{
    width: isScreenSizeSm ? "100vw" : "75%",
    height: `${galleryHeight}px`,
    margin: "0 auto",
  }}
>
```

-   **PC は 75%、スマホは 100vw**で幅を自動調整

## 7. その他の注意点

-   **`dragFactor = 0.05`**
    → ドラッグ時の回転量を調整。0.05 は「指の動きに対して適度な回転量」になる経験的な値。

-   **`MIN_DISPLAY_ITEMS = 8`**
    → カードが少ない場合も円周が寂しくならないよう、8 枚まで複製。

-   **`initialRotation`**
    → カルーセルの中央に来るカードが正面を向くように計算。

# まとめ

-   **すべての数値やクラス指定には「なぜそうしたか」の理由がある**
-   **画面幅・カード数・画像比率・テキスト量に応じて「見た目」と「体験」を両立させるための調整**
-   **「実際に見て・触って」ベストな値を選ぶのが大事（Magic Number は経験値の証！）**

**この手順と理由をドキュメント化しておけば、
今後のリファクタやデザイン変更時も迷わず対応できます！**
