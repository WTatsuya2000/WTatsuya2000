# Research Note Template v4 — 物理・数式向け（講義ノート型）

`index.html` をブラウザで開けば使える。ビルド作業は不要。
参考にした作りは Quarto の book 形式（左に章立て・中央に本文・右にページ内目次）。

## ファイル

| ファイル | 役割 |
| --- | --- |
| `index.html` | 第1章「はじめに」＋ノート全体の構成・読解メモ |
| `main.html` | 本文ページのテンプレート |
| `ds.css` | 配色・タイポ・共通部品のトークン（design system。基本は編集しない） |
| `main.css` | ノート固有のスタイル。3カラム / mobile / print を含む |
| `app.js` | 章立て定義（`BOOK`）、KaTeX、自動採番、相互参照、著者年引用、ページ内目次、検索、導出ステップ、印刷準備 |

## 章立ては `BOOK` が唯一の定義

`app.js` 冒頭の `BOOK` を編集すると、左サイドバー・前後ナビ・検索対象・章番号が同時に更新される。

```js
const BOOK = {
  title: "レビューノート",
  parts: [
    { title: null,     items: [{ file: "index.html", num: "1", label: "はじめに" }] },
    { title: "本文",   items: [{ file: "main.html",  num: "2", label: "背景・主張・主要な導出" }] },
    { title: "付録",   items: [{ file: "A-notation.html", num: "A", label: "規約・記号表" }] }
  ]
};
```

## 本文ページを増やす

1. `main.html` を `03-numerics.html` などにコピーする。
2. `<body data-page="03-numerics.html">` をファイル名に合わせる（章番号は `BOOK` の `num` から入る）。
3. `BOOK` に 1 行足す。
4. `<h2>` / `<h3>` には番号を書かず見出し本文だけ書く。

`data-chapter="3"` を `<body>` に書けば `BOOK` より優先される。

## 自動採番と参照

| 書くもの | 表示 | 参照の書き方 |
| --- | --- | --- |
| `<h2>主要な導出</h2>` | `2.3　主要な導出` | `<a class="sec-ref" href="#主要な導出"></a>` → 2.3 節 |
| `<div class="equation" id="eq-x">` | 右端に `(2.2)` | `<a class="eq-ref" href="#eq-x"></a>` → 式 (2.2) |
| `<figure class="figure" id="fig-y">` | `図 2.1: …` | `<a class="fig-ref" href="#fig-y"></a>` → 図 2.1 |
| `<div class="def-box numbered-box" data-kind="definition" data-label="定義">` | `定義 2.1` | `<a class="box-ref" href="#def-x"></a>` → 定義 2.1 |
| `<li id="ref-wilson1974" data-cite="Wilson 1974">` | 文献リスト | `<a class="cite" href="#ref-wilson1974"></a>` → (Wilson 1974) |

参照リンクの中身は空にしておく。`app.js` が番号を入れる。
`class="cite cite-bare"` にすると括弧なし（`Wilson 1974 は…`）で入る。

- 式に番号を付けたくないときは `<div class="equation" data-unnumbered>`。
- 強調したい主結果は `<div class="equation boxed">`、枠の左上に載るラベルは `<span class="eq-tag">主結果</span>`。

## callout（情報の区別）

種類ごとに色（左罫・見出し帯の地・見出し前の印）を持ち、左罫の実線 / 破線 / 点線でも区別する。
色は明度をそろえた 4 色で、`main.css` 冒頭の `--c-paper`（墨）/ `--c-reading`（steel）/ `--c-caution`（琥珀）/ `--c-def`（青緑）/ `--c-result`（濃い steel）で変えられる。
UI（リンク・ボタン・目次）の accent は steel のまま。

```html
<div class="paper-box">
  <div class="callout-head">
    <span class="box-title">原論文に書かれていること</span>
    <span class="box-kicker">In the paper</span>
  </div>
  本文…
</div>
```

- `.paper-box` — 原論文に書かれている内容（墨・実線）
- `.interpretation-box` — 自分の解釈（steel・破線）
- `.caution-box` — 注意・限界（琥珀・見出しに「!」）
- `.def-box` — 定義（青緑） / `.thm-box` — 主結果・定理（濃い steel・太い左罫・薄い地）
- `.example-box` — 例・チェックリスト（墨・点線）
- `.remark-box` — 補足 / `.summary-box` — 節のまとめ
- `.derivation-box` — 補足導出（`<details>` として折りたたむ。`.callout-head` は不要で `<summary>` を使う）

自動採番したいときは `numbered-box` + `data-kind` + `data-label` を付け、
`<span class="box-title" data-title="名称"></span>` と空にしておく。

## 導出ステップ（何から何をするかを言語化する）

導出は式を並べるだけにしない。読者が「今どこにいて、この行で何をしたか」を式を読まずに追えるよう、次の 3 層で書く。

| 層 | 書くもの | 書き方 |
| --- | --- | --- |
| 宣言 `.derivation-goal` | **出発**（どの式・定義から）/ **目標**（どの式へ）/ **方針**（何を使ってどう進むか） | 出発と目標は式参照（`eq-ref`）で指す。方針は 1 文 |
| 操作 `.step-action` | この行でする変形 | 「〜を…する」の動詞で終える 1 行（例: 「作用を \(\eta\) の 2 次まで展開する」） |
| 理由 `.step-why` | その変形が許される根拠・仮定・近似 | 折りたたむ。仮定（正定値性、熱平衡など）はここで明示する |

- 操作と理由を混ぜない。「Gauss 積分を実行する」は操作、「\(M\) が正定値だから収束する」は理由
- 最後の行は目標の式と一致させる（目標の式が別の場所にあるなら、その式を参照して閉じる）
- `.derivation-box`（補足導出）の `<summary>` も「細部: X を Y にする」のように何を何にするかを書く

```html
<div class="derivation-head">
  <span class="box-kicker">Derivation — 鞍点展開</span>
  <button class="steps-toggle" type="button" data-controls="der-saddle">理由をすべて開く</button>
</div>
<dl class="derivation-goal">
  <div><dt>出発</dt><dd>分配関数 <a class="eq-ref" href="#eq-partition"></a></dd></div>
  <div><dt>目標</dt><dd>1 ループの自由エネルギー <a class="eq-ref" href="#eq-result"></a></dd></div>
  <div><dt>方針</dt><dd>鞍点のまわりで 2 次まで展開し、揺らぎを Gauss 積分する</dd></div>
</dl>

<ol class="derivation" id="der-saddle">
  <li>
    <div class="step-body">
      <p class="step-action">作用を揺らぎの 2 次まで展開する</p>
      <div class="equation" data-unnumbered>\[ ... \]</div>
      <details class="step-why"><summary>なぜ</summary><div>この変形の根拠</div></details>
    </div>
  </li>
</ol>
```

`01, 02, …` の行番号は自動。`data-controls` にリストの `id` を書くと一括開閉ボタンが効く。

## 図・グラフの差し込み枠

```html
<figure class="figure" id="fig-phase">
  <div class="figure-slot">
    <span class="slot-label">FIG — 相図</span>
    <span class="slot-hint">figs/phase.png</span>
  </div>
  <figcaption>キャプション本文（番号は自動）</figcaption>
</figure>
```

画像ができたら `<div class="figure-slot">…</div>` を `<img src="figs/phase.png" alt="">` に置き換える。
`.figure-grid` で囲むと横並びになる。

## 検索

上部バーの検索窓（`/` キーで focus）で、`BOOK` の章題・現在ページの節見出し・本文段落を横断検索する。
単一ページで完結するので追加のビルドや index ファイルは不要。他ページの本文まで引きたい場合は
そのページを開いてから検索する。

## 印刷

上部バーに PDF・印刷ボタンは置かない（2026-10-19 に廃止）。印刷するときはブラウザの ⌘P を使う（A4・余白 18mm・本文 10.5pt）。
折りたたみは印刷時に自動で全て展開され、印刷後に元へ戻る。
サイドバー・ページ内目次・操作ボタンは印刷されない。
式・図・表の行・callout はページ跨ぎを避け、外部リンクは URL が併記される。
特定の要素を印刷しないときは `class="print-hide"`、改ページを入れたいときは `class="page-break"`。

## 表示幅

「幅」ボタンで本文の測り幅を `狭 46rem → 標準 58rem → 広 72rem` に切替（行送りも連動、設定は保存）。
既定値は `main.css` の `:root[data-width="regular"]` の `--measure`。
サイドバー幅は `--nav-w`（15rem）、ページ内目次は `--toc-w`（16rem）、カラム間隔は `--gutter`。
基本の文字サイズは `html { font-size: 18px }`（600px 以下は 16px）。幅はすべて rem なので文字サイズに比例する。

上部バー左端の「☰ 目次」ボタン（または `[` キー）で左の章立てを開閉できる（設定は保存）。
閉じた状態は各ページの `<head>` の 1 行スクリプトが描画前に当てるので、ページ移動でちらつかない。
900px 以下では章立てが本文内の折りたたみ目次に切り替わるので、ボタンは出ない。
目次の番号列は番号の長さに合わせて伸びる（`4.10.1` や `B4.10` でも見出し文字に被らない）。

## フォントと太さ

| 役割 | フォント | 太さ |
| --- | --- | --- |
| 本文 | Noto Sans JP → Barlow | 400 (`--w-body`) / 強調 700 (`--w-bold`) |
| 見出し・UI | Noto Sans JP | 700 (`--w-head`) |
| 数値・ラベル・コード | IBM Plex Mono | 400 / ラベル 500 (`--w-label`) |

`font-synthesis: none` を指定しているので、存在しないウェイトが偽ボールドで描かれることはない。
変更するときは `main.css` 冒頭の変数と `@import` の `wght` を合わせて直す。

## 数式マクロ

KaTeX を CDN から読み込む。`app.js` の `MACROS` に追記できる。

- 共通 — `\dd \ii \ee \eps \abs{} \norm{} \set{} \Order{} \unit{}` `\Re \Im \sgn \diag`
- 微積分 — `\pd{f}{x} \pdd{f}{x} \dv{f}{x} \grad \lap`
- ベクトル・テンソル — `\vb{} \uv{} \tens{}`
- 量子力学 — `\ket{} \bra{} \braket{}{} \melem{}{}{} \op{} \dag \com{}{} \acom{}{} \expval{} \hc`
- 場の量子論 — `\tr \Tr \Lag \Ham \Dmu \Fmunu \gam{} \pslash \Dslash \dslashint`
- 統計力学・物性 — `\kB \Zpart \Free \avg{} \BZ`
- 数値・データ — `\Exp \Var \argmin \argmax`

## v4 の改訂（2026-10-19）— 見やすさ

- callout に種類ごとの色を付けた（原論文=墨 / 解釈=steel / 注意=琥珀 / 定義=青緑 / 主結果=濃い steel）。罫の線種は残す。
- 地を灰色 #f2f2f3 から紙色 #fafaf9 に。補助文字の濃さを 62/38% → 74/63% に上げ、節番号・目次番号・ラベルも WCAG AA（4.5:1）を満たすようにした。
- 行内数式を 1.21em → 1.08em に（和文の中で浮かないように）。別行立ての式は 1.18em。
- 節番号を steel に、h3 を 1.13 → 1.2rem に。本文中のリンク・相互参照に薄い下線、「なぜ」を steel に。
- 枠付き主結果のラベル（`.eq-tag`）を枠の左上に移した。
- PDF・印刷ボタンと `BOOK.pdf` を廃止（⌘P 用の印刷スタイルは残す）。
- 導出に「出発 / 目標 / 方針」の宣言（`.derivation-goal`）と各行の操作（`.step-action`）を追加。
- 改訂前の版は `../Backupv4-2026-10-19/`。既存ノートは `main.css` だけを差し替え、各ページ上部バーの PDF・印刷の 2 行を消せば反映される（`app.js` は各ノートの `BOOK` を持つので差し替えない。旧 `app.js` のままでもボタンが無ければ問題なく動く）。

## v4 の改訂（2026-10-07）

- 本文幅を拡大（標準 44→58rem）、基本の文字サイズを 16→18px に、ページ内目次の列を 13→16rem に。
- 左の章立てを開閉できるようにした（「☰ 目次」ボタン・`[` キー）。
- 目次の番号列を固定幅から可変幅に（長い番号が見出し文字に被る不具合の修正）。
- 改訂前の版は `../Backupv4-2026-10-07/`。

## v3 から変わった点

- 3カラム（左=章立て / 本文 / 右=ページ内目次）になった。章立ては `BOOK` から生成。
- 見た目を素朴な学術ノート寄りに（方眼地・registration mark・ハッチングを廃止、callout は見出し帯に）。
- 著者年形式の引用（`.cite`）と参考文献リンク、節参照（`.sec-ref`）を追加。
- 全文検索、前後ナビを追加（PDF リンクは 2026-10-19 に廃止）。
- 明暗切替・コードコピー・記号表・式番号対応表は廃止。必要なら v3 の `app.js` から戻せる。

## このノートでの使い方（複素ランジュバン法）

- 章立ては `app.js` の `BOOK`（1 はじめに / 2–6 基礎 / 7–9 ゲージ理論と QCD / A 演習・B 解答・C コード）。
- `app.js` の `MACROS` に `\Ltil`、`\SLNC`、`\SUN` を追加。
- 図は `figs/`（`drift-tail.svg`、`u1-zeros.svg`）。元データは `../code/cl_toy_models.py` の実行結果。
- `main.css` の変更点（2026-10-23）:
  - `.table-wrap` に `position: relative` — KaTeX の不可視 MathML が横スクロール枠の外へはみ出し、スマホ幅でページが横に揺れるのを防ぐ。
  - `table.table th .katex { text-transform: none }` — `ds.css` の見出し大文字化で表見出しの \(\sigma\) が \(\Sigma\) になるのを防ぐ。
