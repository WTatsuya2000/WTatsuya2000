# グラディエントフロー入門（講義ノート・演習問題）

グラディエントフロー（Yang–Mills gradient flow / Wilson flow）の定義と、ゲージ理論・格子QCDへの応用を
arXiv の原論文・レビューをもとにまとめた教材です。

| ファイル | 内容 |
|---|---|
| [lecture_notes.md](lecture_notes.md) | 講義ノート（定義、摂動論、繰り込み性、$t_0$/$w_0$、GF結合定数、トポロジー、小フロー時間展開とEMT、熱力学、クォークのフロー、繰り込み群、参考文献27本） |
| [exercises.md](exercises.md) | 演習問題 14 問と解答例（解析計算 13 問 + 数値演習 1 問） |
| [code/wilson_flow_u1_2d.py](code/wilson_flow_u1_2d.py) | 演習 13 の解答例：2次元 U(1) 格子ゲージ理論の Wilson フローとトポロジカルチャージ（numpy のみ） |

HTML 版（MathJax で数式表示）：[lecture_notes.html](lecture_notes.html), [exercises.html](exercises.html)

```sh
python3 code/wilson_flow_u1_2d.py --L 16 --beta 2.0 --nconf 20
```

HTML の再生成：
`pandoc -f markdown+gfm_auto_identifiers lecture_notes.md -s --mathjax --css style.css -M lang=ja -M pagetitle="..." -o lecture_notes.html`
（`.md` へのリンクを `.html` に置換する Lua フィルタを併用）
