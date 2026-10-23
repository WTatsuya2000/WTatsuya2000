# 演習問題 ― 複素ランジュバン法

講義ノート [`lecture_notes.md`](lecture_notes.md) の各講に対応する。難易度: ☆ 基本 / ☆☆ 標準 / ☆☆☆ 発展。
解答は [`solutions.md`](solutions.md)。💻 印はコード [`code/cl_toy_models.py`](code/cl_toy_models.py) を使う問題。

---

## 第0講 符号問題

**0.1** ☆ Euclid Dirac 演算子 $M(\mu)$ が $\gamma_5 M(\mu)\gamma_5 = M(-\mu^*)^\dagger$ を満たすとき、$[\det M(\mu)]^* = \det M(-\mu^*)$ を示せ。これから、$\mu$ が純虚数のときは $\det M$ が実であること、実の $\mu\ne0$ では一般に複素数であることを説明せよ。

**0.2** ☆ 位相クエンチ理論との自由エネルギー密度の差を $\Delta f$ とすると $\langle e^{i\varphi}\rangle_{pq} = e^{-V\Delta f/T}$ である。
(a) $N$ 個の独立な配位から $\langle e^{i\varphi}\rangle_{pq}$ を推定するとき、相対誤差はおよそいくらか。
(b) 相対誤差を 10% に保つための $N$ を $V\Delta f/T$ の関数として求め、$V\Delta f/T = 5, 10, 20$ のときの値を見積もれ。
(c) CL のコストが $\mu$ にほとんど依存しないのはなぜか、一言で述べよ。

---

## 第1講 実ランジュバン方程式

**1.1** ☆☆ Fokker–Planck 方程式 $\partial_\theta P = \partial_x(\partial_x + S')P$ に $P=\psi\,e^{-S/2}$ を代入し、$\partial_\theta\psi = -H_{FP}\psi$、$H_{FP}=Q^\dagger Q$、$Q=\partial_x+\frac12 S'$ となることを示せ。また $H_{FP}=-\partial_x^2+\frac14 S'^2-\frac12 S''$ と書けることを確かめ、$H_{FP}$ の固有値が非負であること、固有値 0 の固有関数が $e^{-S/2}$ であることを示せ。

**1.2** ☆ $S=\frac12 m x^2$（$m>0$）のランジュバン方程式（Ornstein–Uhlenbeck 過程）を $x(0)=x_0$ で解き、$\langle x(\theta)\rangle$、$\langle x(\theta)^2\rangle - \langle x(\theta)\rangle^2$ を求めよ。$\theta\to\infty$ で正しい期待値 $1/m$ に収束すること、および緩和時間が $1/m$ であることを確かめよ。

**1.3** ☆☆ Euler–Maruyama 離散化 $x_{n+1}=x_n-\epsilon m x_n+\sqrt{2\epsilon}\xi_n$ の定常分散を厳密に求め、$1/m$ からのずれが $O(\epsilon)$ であることを示せ。$\epsilon m>2$ では何が起こるか。

---

## 第2講 複素ランジュバン方程式

**2.1** ☆☆ $S=\frac{\sigma}{2}z^2$、$\sigma=a+ib$、$a>0$ で、実ノイズのみ（$N_I=0$）の CL を考える。
(a) $(x,y)$ の線形確率微分方程式を書け。
(b) 定常共分散行列 $C$ が Lyapunov 方程式 $AC+CA^T=B$（$A$ はドリフト行列、$B=\mathrm{diag}(2,0)$）を満たすことを用いて $\langle x^2\rangle,\langle y^2\rangle,\langle xy\rangle$ を求めよ。
(c) $\langle z^2\rangle = 1/\sigma$ を確かめよ。
(d) $a<0$ では何が起こるか。もとの積分 $\int e^{-\sigma x^2/2}dx$ との関係も述べよ。

**2.2** ☆☆ 上の模型で虚部にもノイズを入れる（$N_R=1+N_I$, $N_I>0$）。$\langle z^2\rangle$ は $N_I$ によらず $1/\sigma$ のままであるが、$\langle y^2\rangle$ は $N_I$ とともに増えることを示せ。実用上 $N_I=0$ が好まれる理由を考察せよ。

**2.3** 💻 ☆ `python3 code/cl_toy_models.py gauss` を実行し、講義ノートの表 4.1 と比べよ。`<z^4>` の厳密値 $3/\sigma^2$ との一致も確かめよ。わずかなずれがあればその原因として何が考えられるか。

---

## 第3講 正当化と判定条件

**3.1** ☆ 正則関数 $f(z)$ に対して $\partial_x f = f'$, $\partial_y f = i f'$ を用い、$N_R\partial_x^2+N_I\partial_y^2$ が $N_R-N_I=1$ のとき $\partial_z^2$ に一致することを示せ。これにより、正則な観測量に作用する限り実 Fokker–Planck 演算子の随伴 $L$ が $\tilde L=(\partial_z-S'(z))\partial_z$ と一致することを確かめよ。

**3.2** ☆☆ 整合性条件 $\langle\tilde L O\rangle=0$ は、厳密な期待値についての Schwinger–Dyson 方程式 $\langle O''-S'O'\rangle=0$ と同じものであることを、$\int dx\,\partial_x\bigl(O'e^{-S}\bigr)=0$ から示せ。
(a) 複素ガウス模型で $O=z^n$ とおき、$\langle z^{n}\rangle$ の漸化式を導いて $\langle z^4\rangle = 3/\sigma^2$ を示せ。
(b) $\phi^4$ 模型 $S=\frac{\sigma}{2}z^2+\frac{\lambda}{4}z^4$ で $O=z^2$ とおき、$\sigma\langle z^2\rangle+\lambda\langle z^4\rangle = 1$ を導け。

**3.3** 💻 ☆☆ `python3 code/cl_toy_models.py quartic` を実行し、
(a) $\sigma=1+i$ と $\sigma=-1+4i$ のそれぞれで、CL の結果が 3.2(b) の恒等式を満たすか確かめよ。
(b) ドリフトの大きさ $|K|$ の分布の裾を比較し、[NNS16] の判定条件と結びつけて論ぜよ。

**3.4** ☆☆☆ 補間関数 $F(\theta,\tau)=\int P(x,y;\theta-\tau)\,O(x+iy;\tau)$ について、$\partial_\tau F$ を部分積分で計算し、表面項として残る量を具体的に書け（$y$ 方向の積分の端 $\pm Y$ での寄与）。$O(z;\tau)$ が $|y|$ について $e^{c|y|}$ 程度で増えるとき、$P$ にどのような減衰が要求されるか。

---

## 第4講 トイモデル

**4.1** ☆ $\phi^4$ 模型で、$\lambda>0$, $\mathrm{Re}\,\sigma>0$ のとき CL の古典的な固定点（$S'(z)=0$ の解）をすべて求め、どれが安定（ノイズなしの流れで引き込む）かを調べよ。$\sigma = 1+i$ の場合に具体的に計算せよ。

**4.2** ☆☆ U(1) one-link 模型 $\rho(x)=e^{\beta\cos x}[1+\kappa\cos(x-i\mu)]$ について、修正ベッセル関数 $I_n(\beta)=\frac{1}{2\pi}\int_{-\pi}^{\pi}e^{\beta\cos x}\cos nx\,dx$ を用いて
$$
Z=2\pi\bigl[I_0+\kappa\cosh\mu\,I_1\bigr],\qquad
\langle e^{ix}\rangle=\frac{I_1+\frac{\kappa}{2}\left(e^{-\mu}I_0+e^{\mu}I_2\right)}{I_0+\kappa\cosh\mu\,I_1}
$$
を導け。$\langle e^{-ix}\rangle$ はどうなるか。$\beta=0$ の場合の結果を書け。

**4.3** ☆☆ 同じ模型で
(a) 「行列式」$1+\kappa\cos(z-i\mu)$ の零点をすべて求めよ。
(b) $\mu=0$、$0<\kappa<1$ では符号問題がないことを確かめよ。
(c) $\kappa<1$ と $\kappa>1$ で零点の位置（とくに虚部）がどう違うか述べ、CL の分布 $P(x,y)$ との関係から、どちらで失敗しやすいかを予想せよ。

**4.4** 💻 ☆☆ `python3 code/cl_toy_models.py u1` を実行し、4.2 の厳密値と比較せよ。$(\beta,\kappa)=(0.3,2)$ で統計誤差は小さいのに結果が誤っていることを確かめ、ドリフト分布の裾を $(\beta,\kappa)=(1,0.25)$ と比べよ。さらに $\kappa$ を $0.5,1.0,1.5$ と変えて、どこから結果が崩れ始めるかを調べよ（`model_u1` 内のパラメータを書き換える）。

---

## 第5講 ゲージ理論

**5.1** ☆☆ $U\in\mathrm{SL}(N,\mathbb C)$ に対し $\frac1N\mathrm{tr}(UU^\dagger)\ge1$ であり、等号は $U\in\mathrm{SU}(N)$ のときに限ることを示せ（ヒント：$UU^\dagger$ は正定値エルミートで行列式 1。相加相乗平均）。

**5.2** ☆☆ 点 $x$ だけでのゲージ変換 $U_{x\nu}\to\Omega U_{x\nu}$, $U_{x-\hat\nu,\nu}\to U_{x-\hat\nu,\nu}\Omega^{-1}$ を $\Omega = e^{\alpha\lambda_a}$（$\alpha\in\mathbb R$、$\lambda_a$ はエルミート）とする。
(a) $\Omega$ はユニタリでないが $\det\Omega=1$ であることを確かめよ。
(b) $\mathcal N=\sum_\nu\bigl[\mathrm{tr}(U_{x\nu}U_{x\nu}^\dagger)+\mathrm{tr}(U_{x-\hat\nu,\nu}U_{x-\hat\nu,\nu}^\dagger)\bigr]$ の $\alpha=0$ での微分が
$$
\frac{d\mathcal N}{d\alpha}\Big|_{0}=2\,\mathrm{tr}\Bigl[\lambda_a\sum_\nu\bigl(U_{x\nu}U_{x\nu}^\dagger-U_{x-\hat\nu,\nu}^\dagger U_{x-\hat\nu,\nu}\bigr)\Bigr]
$$
となることを示せ。これがゲージ冷却の勾配である。
(c) $\Omega\in\mathrm{SU}(N)$ のゲージ変換ではユニタリティ・ノルムが不変であることを示し、冷却に非ユニタリ変換が必要な理由を述べよ。

**5.3** ☆☆ ウィルソンのプラケット作用 $S_g=\beta\sum_P\left[1-\frac{1}{2N}\mathrm{tr}(U_P+U_P^{\dagger})\right]$ を SL($N$,$\mathbb C$) に解析接続するとき、$U^\dagger$ ではなく $U^{-1}$ を使わなければならない理由を説明せよ。$U\in\mathrm{SU}(N)$ では両者が一致することに注意。

**5.4** ☆ 複素ドリフト $K_a\in\mathbb C$ に対して $\det\exp(i\lambda_aK_a)=1$ を示し、更新後も $U\in\mathrm{SL}(N,\mathbb C)$ に留まることを確かめよ。

---

## 第6講 有限密度 QCD

**6.1** ☆☆ ノイズ $\chi$ の成分が独立で $\langle\chi_i\chi_j^*\rangle=\delta_{ij}$ を満たすとき、任意の行列 $A$ に対し $\langle\chi^\dagger A\chi\rangle=\mathrm{tr}A$ を示せ。$A=M^{-1}D_aM$ のとき、全ての $a$ と全てのリンクについてのドリフトを 1 回の線形方程式求解で得る方法を述べよ。

**6.2** ☆☆ $\mathcal P\in\mathrm{SL}(3,\mathbb C)$ に対して
$$
\det(1+c\,\mathcal P)=1+c\,\mathrm{tr}\,\mathcal P+c^2\,\mathrm{tr}\,\mathcal P^{-1}+c^3
$$
を示せ。これを使い、HDQCD の行列式 $\det(1+he^{\mu/T}\mathcal P)\det(1+he^{-\mu/T}\mathcal P^{-1})$ が $\mathcal P\in\mathrm{SU}(3)$、$\mu=0$ で非負実数になること、$\mu\ne0$ では一般に複素数になることを示せ。

**6.3** ☆☆ HDQCD でクォーク数密度（1 格子点あたり）$n=\frac{1}{N_s^3}\frac{\partial\ln Z}{\partial(\mu/T)}$ を考える。$he^{\mu/T}\to\infty$ の極限で $n\to 2N_c=6$（飽和密度）となることを示せ。この「飽和」は物理的なものか、格子の人工物か。

**6.4** ☆☆☆ （論文講読）[SSS13] と [Sex13] を読み、
(a) ゲージ冷却なしで何が起こったか（どの量がどう振る舞ったか）、
(b) 冷却が有効な格子結合 $\beta$ の範囲について何が述べられているか、
(c) 結果の正しさをどのような比較で確認したか、
をそれぞれまとめよ。

---

## 発展課題（プロジェクト）

**P.1** ☆☆☆ 💻 SU(3) one-link 模型 [AS08]
$$
S=-\frac{\beta}{6}\left[\mathrm{tr}\,U+\mathrm{tr}\,U^{-1}\right]-\ln\det\left(1+\kappa e^{\mu}U\right)-\ln\det\left(1+\kappa e^{-\mu}U^{-1}\right)
$$
の CL を実装せよ（行列指数関数は 3×3 なので固有値分解や Padé 近似で十分）。$\langle\mathrm{tr}\,U\rangle$, $\langle\mathrm{tr}\,U^{-1}\rangle$ を、固有値の Haar 測度上の 2 重積分による厳密値と比較し、ユニタリティ・ノルムの時間変化をプロットせよ。

**P.2** ☆☆☆ 💻 1 次元の U(1) または SU(2) の「Polyakov チェーン」（$N_\tau$ 本のリンクの積で作用が決まる模型）で、ランジュバン更新の合間にゲージ冷却を入れる/入れないでユニタリティ・ノルムがどう変わるかを比較せよ。数値誤差（丸め誤差や大きな $\epsilon$）がゲージ方向への拡散を引き起こす様子を観察せよ。
