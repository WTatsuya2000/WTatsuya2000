# プロジェクト方針

このテンプレートの正本は iCloud の **Review template** フォルダに置く。
書き出し（zip）を受け取ったらそこへ展開し、以降の版もそのフォルダで管理する。

レビューノートは v4 の講義ノート型を**標準**とする。新規ページ・改修はすべてこの形に従う。

- 構成: 3カラム（左=章立てサイドバー / 本文 / 右=ページ内目次）。900px 以下では本文1カラム＋折りたたみ目次。
- 章立て・前後ナビ・検索対象・章番号は `app.js` 冒頭の `BOOK` だけで定義する。ページ側は `<body data-page="ファイル名">` を書く。
- ファイル構成は `index.html`（第1章「はじめに」＋全体の構成）、`main.html`（本文ページのテンプレート）、`ds.css`（トークン。編集しない）、`main.css`、`app.js`。
- 見た目は素朴な学術ノート寄り。方眼地・registration mark・ハッチングは使わない。罫線中心。UI の accent は steel 一色。callout だけは情報の種類ごとに色を持つ（`main.css` の `--c-*`、2026-10-19〜）。
- callout は `.callout-head`（`.box-title` + `.box-kicker`）付きの見出し帯 + 左罫。クラスは `.paper-box` / `.interpretation-box` / `.caution-box` / `.def-box` / `.thm-box` / `.example-box` / `.remark-box` / `.summary-box` / `.derivation-box`。
- 参照はすべて空リンクで書き、`app.js` に番号を入れさせる: `.sec-ref` / `.eq-ref` / `.fig-ref` / `.box-ref` / `.cite`（著者年、文献側は `<li id="ref-…" data-cite="Wilson 1974">`）。
- 標準で持つ機能: 全文検索（`/`）、幅切替（狭/標準/広）、左の章立ての開閉（`[`）、⌘P 用の印刷スタイル、導出ステップの折りたたみ、図の差し込み枠、permalink。
- 持たない機能: PDF・印刷ボタン（2026-10-19 廃止）、明暗切替、コードコピー、記号表、式番号対応表、フッタのソースコード / 問題を報告リンク。復活させたい場合のみ明示的に依頼する。
- 詳細な書き方は `README.md` を参照し、変更時は README も合わせて更新する。
