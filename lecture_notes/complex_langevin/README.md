# 複素ランジュバン法 講義ノート

符号問題を回避する数値手法「複素ランジュバン法（Complex Langevin, CL）」について、
基礎（確率量子化）→ 正当化と判定条件 → ゲージ理論への拡張（SL(N,C)・ゲージ冷却・動的安定化）→ 有限密度 QCD への応用、
を arXiv の原論文に基づいてまとめた講義ノートと演習問題。

| ファイル | 内容 |
|---|---|
| [`lecture_notes.md`](lecture_notes.md) | 講義ノート（第0〜7講） |
| [`exercises.md`](exercises.md) | 演習問題（解析計算・数値実験・論文講読・発展課題） |
| [`solutions.md`](solutions.md) | 演習問題の解答 |
| [`references.md`](references.md) | 参考文献（arXiv 番号・掲載誌つき、推奨文献に★） |
| [`code/cl_toy_models.py`](code/cl_toy_models.py) | トイモデルの CL シミュレーション（numpy のみ） |
| [`review-note/`](review-note/) | 同じ内容をレビューノート用 HTML テンプレート v4（3カラムの講義ノート型）に組み直したもの。`review-note/index.html` をブラウザで開く |

## コードの実行

```bash
python3 code/cl_toy_models.py gauss     # 複素ガウス模型（約10秒）
python3 code/cl_toy_models.py quartic   # 0次元 φ^4 模型：成功例と失敗例（約2分）
python3 code/cl_toy_models.py u1        # 有限密度 U(1) one-link 模型：行列式の零点による誤った収束（約2分）
```

厳密値（数値積分・解析解）と CL の結果、ドリフトの大きさ |K| の分布の裾を表示する。
