# 複素ランジュバン法 ― 符号問題・ゲージ理論・有限密度 QCD

> 講義ノート（全 7 講）。演習問題は [`exercises.md`](exercises.md)、解答は [`solutions.md`](solutions.md)、
> 参考文献（arXiv 番号つき）は [`references.md`](references.md) にまとめてある。
> 本文中の `[AS08]` などの記号は `references.md` の文献キーを指す。
> 数値実験用のコードは [`code/cl_toy_models.py`](code/cl_toy_models.py)（numpy のみで動作）。

**前提知識**: 経路積分、格子ゲージ理論の初歩（リンク変数・プラケット作用）、確率過程の初歩（ブラウン運動・伊藤積分の雰囲気）。

---

## 目次

0. [動機：符号問題](#第0講-動機符号問題)
1. [実ランジュバン方程式と確率量子化](#第1講-実ランジュバン方程式と確率量子化)
2. [複素ランジュバン方程式](#第2講-複素ランジュバン方程式)
3. [正当化の議論と収束の判定条件](#第3講-正当化の議論と収束の判定条件)
4. [トイモデルで見る成功と失敗](#第4講-トイモデルで見る成功と失敗)
5. [ゲージ理論への拡張：SL(N,C) とゲージ冷却](#第5講-ゲージ理論への拡張sln-c-とゲージ冷却)
6. [有限密度 QCD への応用](#第6講-有限密度-qcd-への応用)
7. [現状と未解決問題](#第7講-現状と未解決問題)

---

## 第0講 動機：符号問題

### 0.1 モンテカルロ法が使える条件

格子場の理論の期待値

$$
\langle O\rangle = \frac{1}{Z}\int D\phi\; O(\phi)\, e^{-S(\phi)},\qquad Z=\int D\phi\, e^{-S(\phi)}
$$

をマルコフ連鎖モンテカルロ（HMC など）で評価できるのは、$e^{-S}$ が**非負**で確率密度とみなせるからである。
作用 $S$ が複素数になると $e^{-S}$ は振動する複素重みとなり、重点サンプリングがそのままでは使えない。これが**符号問題**（sign problem / complex action problem）である。

### 0.2 有限密度 QCD

クォーク化学ポテンシャル $\mu$ をもつ QCD の分配関数は、グルーオン場で積分した形で

$$
Z(\mu)=\int DU\; e^{-S_g[U]}\,\bigl[\det M(U;\mu)\bigr]^{N_f}
$$

と書ける。Dirac 演算子の $\gamma_5$ エルミート性 $\gamma_5 M(\mu)\gamma_5 = M(-\mu^*)^\dagger$ から

$$
\bigl[\det M(\mu)\bigr]^* = \det M(-\mu^*)
$$

が従う（演習 0.1）。したがって $\mu=0$ や純虚数 $\mu$ では $\det M$ は実だが、**実の $\mu\neq 0$ では一般に複素数**になる。

### 0.3 再重み付け法の指数関数的困難

$\det M = |\det M|e^{i\varphi}$ と書き、位相を落とした「位相クエンチ」理論 $Z_{pq}=\int DU\,e^{-S_g}|\det M|^{N_f}$ で生成した配位を使って

$$
\langle O\rangle = \frac{\langle O e^{iN_f\varphi}\rangle_{pq}}{\langle e^{iN_f\varphi}\rangle_{pq}},\qquad
\langle e^{iN_f\varphi}\rangle_{pq}=\frac{Z}{Z_{pq}} = e^{-V(f-f_{pq})/T}
$$

とする（再重み付け）。平均位相因子は体積 $V$ について**指数関数的に小さく**なり、統計誤差を一定に保つのに必要なサンプル数は $e^{2V\Delta f/T}$ に比例して増える（演習 0.2）。
符号問題の詳細と各種アプローチ（テイラー展開、虚数化学ポテンシャル、双対変数、レフシェッツ・シンブル、テンソルネットワーク など）は [Aar15, BRL+19] のレビューを参照。

複素ランジュバン法（Complex Langevin, CL）は、**重み $e^{-S}$ を確率として解釈すること自体を諦め**、場を複素化した空間上の実の確率過程で期待値を計算する方法である。原理的に符号問題の影響を受けない（計算コストは $\mu=0$ とほぼ同程度）点が最大の魅力である。

---

## 第1講 実ランジュバン方程式と確率量子化

### 1.1 Parisi–Wu の確率量子化

実作用 $S(x)$（自由度 1 つで考える）に対し、仮想時間（ランジュバン時間）$\theta$ に沿った確率微分方程式

$$
\frac{dx}{d\theta} = -S'(x) + \eta(\theta),\qquad
\langle \eta(\theta)\rangle = 0,\quad \langle \eta(\theta)\eta(\theta')\rangle = 2\delta(\theta-\theta')
$$

を考える（Parisi–Wu 1981; レビュー Damgaard–Hüffel 1987）。ドリフト項 $K(x)\equiv -S'(x)$ は作用を下げる方向に、ノイズは揺らぎを与える。

### 1.2 Fokker–Planck 方程式と平衡分布

$x(\theta)$ の分布 $P(x;\theta)$ は Fokker–Planck 方程式

$$
\partial_\theta P = \partial_x\bigl(\partial_x + S'(x)\bigr)P \equiv L^{T} P
$$

に従う。右辺は $P\propto e^{-S}$ で 0 になるので、これが定常解である。さらに $P=\psi\, e^{-S/2}$ と置くと

$$
\partial_\theta \psi = -H_{FP}\psi,\qquad H_{FP}= Q^\dagger Q,\quad Q = \partial_x + \tfrac12 S'(x)
$$

と書け（演習 1.1）、$H_{FP}$ は非負エルミート演算子で、基底状態 $\psi_0\propto e^{-S/2}$（固有値 0）以外のモードは指数関数的に減衰する。こうして

$$
\lim_{\theta\to\infty}\langle O(x(\theta))\rangle_\eta = \frac{\int dx\, O(x)e^{-S(x)}}{\int dx\, e^{-S(x)}}
$$

が示される。**この証明は $S$ が実であることに本質的に依存している**点に注意。

### 1.3 離散化

刻み $\epsilon$ の Euler–Maruyama 離散化は

$$
x_{n+1} = x_n + \epsilon K(x_n) + \sqrt{2\epsilon}\,\xi_n,\qquad \xi_n\sim\mathcal N(0,1)
$$

で、$O(\epsilon)$ の系統誤差をもつ（$\epsilon\to 0$ 外挿、または高次スキームを使う）。

---

## 第2講 複素ランジュバン方程式

### 2.1 定義

作用が複素数なら $S'(x)$ も複素数で、ランジュバン方程式の右辺は実にならない。そこで Parisi (1983)・Klauder (1983) に従い、変数を**複素化** $x\to z = x+iy$ し、$S(z)$ を正則関数として解析接続する：

$$
\frac{dz}{d\theta} = -S'(z) + \eta,\qquad \eta\ \text{は実ノイズ}
$$

実部・虚部に分けると

$$
\frac{dx}{d\theta} = K_x \equiv -\mathrm{Re}\,S'(z) + \eta,\qquad
\frac{dy}{d\theta} = K_y \equiv -\mathrm{Im}\,S'(z)
$$

となる。より一般に虚部にもノイズを入れて $\langle\eta_R\eta_R\rangle = 2N_R\delta$、$\langle\eta_I\eta_I\rangle=2N_I\delta$、$N_R-N_I=1$ としてよいが、実用上は $N_I=0$ が最も安定である [ASS09]。

### 2.2 2 種類の「分布」

* **実の分布** $P(x,y;\theta)$：上の確率過程が実際に生成する $\mathbb{R}^2$（場の理論なら複素化された配位空間）上の非負の確率密度。Fokker–Planck 方程式

  $$
  \partial_\theta P = L^T P,\qquad L^T = \partial_x\bigl(N_R\partial_x - K_x\bigr) + \partial_y\bigl(N_I\partial_y - K_y\bigr)
  $$

  に従う。
* **複素の分布** $\rho(x;\theta)$：複素 Fokker–Planck 方程式 $\partial_\theta\rho = \partial_x(\partial_x+S'(x))\rho$ に従う実軸上の複素関数。定常解は $\rho\propto e^{-S}$。

CL が「正しい」とは、正則な観測量 $O$ について

$$
\langle O\rangle_{P(\theta)} \equiv \int dx\,dy\, P(x,y;\theta)\, O(x+iy)
\;\overset{?}{=}\;
\langle O\rangle_{\rho(\theta)} \equiv \int dx\, \rho(x;\theta)\, O(x)
$$

が成り立ち、$\theta\to\infty$ で後者が目的の期待値 $\int O e^{-S}/Z$ に収束することである。

### 2.3 例：複素ガウス模型

$S=\frac{\sigma}{2}z^2$、$\sigma=a+ib$（$a>0$）では、CL は線形方程式

$$
\dot x = -(ax - by) + \eta,\qquad \dot y = -(bx + ay)
$$

になる。定常分布はガウス分布で、その共分散を Lyapunov 方程式から求めると（演習 2.1）

$$
\langle x^2\rangle = \frac{2a^2+b^2}{2a|\sigma|^2},\quad
\langle y^2\rangle = \frac{b^2}{2a|\sigma|^2},\quad
\langle xy\rangle = -\frac{b}{2|\sigma|^2}
\;\Longrightarrow\;
\langle z^2\rangle = \frac{1}{\sigma}
$$

で、厳密値 $\int x^2 e^{-\sigma x^2/2}/\int e^{-\sigma x^2/2}=1/\sigma$ を再現する。$P(x,y)$ は虚軸方向にも広がるが、ガウス的に速く減衰しているのが成功の鍵である（第3講）。

### 2.4 「複素化」の幾何学的な意味

複素化された作用 $S(z)$ に対するドリフト $-\overline{S'(z)}$ ではなく $-S'(z)$ を使うことに注意。$\mathrm{Re}\,S$ を下げる勾配流ではなく、正則性（Cauchy–Riemann）を通じて期待値の積分路変形と結びついている。CL の定常分布とレフシェッツ・シンブル（$\mathrm{Im}\,S$ 一定の最急降下多様体）はどちらも「積分路を複素領域に変形する」発想に立つが、両者は一般に一致せず、その関係は現在も研究対象である。

---

## 第3講 正当化の議論と収束の判定条件

この講は [AS08, ASS09, AJSS11] の形式的議論と、その抜け穴を塞ぐ判定条件 [NNS16, SSSS18] を扱う。

### 3.1 形式的な証明

正則な $O(z)$ の時間発展を、ランジュバン演算子

$$
\tilde L = \bigl(\partial_z - S'(z)\bigr)\partial_z
$$

で $\partial_\tau O(z;\tau) = \tilde L\,O(z;\tau)$ と定める（正則関数に作用するときは $\partial_x=\partial_z$, $\partial_y = i\partial_z$ なので $N_R\partial_x^2+N_I\partial_y^2 = (N_R-N_I)\partial_z^2=\partial_z^2$ となり、$L$ と $\tilde L$ が一致する）。補間関数

$$
F(\theta,\tau) = \int dx\,dy\; P(x,y;\theta-\tau)\, O(x+iy;\tau),\qquad 0\le\tau\le\theta
$$

を考えると、$F(\theta,0)=\langle O\rangle_{P(\theta)}$、また初期条件 $P(x,y;0)=\delta(x-x_0)\delta(y)$、$\rho(x;0)=\delta(x-x_0)$ をとれば $F(\theta,\theta)=\langle O\rangle_{\rho(\theta)}$ である。そして

$$
\partial_\tau F = -\int (L^T P)\, O + \int P\, (L O) = \text{(部分積分の表面項)}
$$

なので、**部分積分の表面項（境界項）が消えれば** $F$ は $\tau$ によらず、$\langle O\rangle_P = \langle O\rangle_\rho$ が成り立つ。

### 3.2 抜け穴

証明が破れる典型的な状況は次の 2 つ：

1. **無限遠での裾**：$P(x,y)$ が $|y|\to\infty$ で十分速く減衰しないと、$O(z;\tau)$（多くの場合 $|y|$ について指数関数的に増える）との積の表面項が残る [AJSS11]。
2. **ドリフトの極（特異ドリフト）**：$S=-\ln\det M + \dots$ のように作用が対数を含むと、$\det M$ の零点で $S'$ が極をもつ。極のまわりで $P$ が十分速く 0 にならないと、そこから境界項が生じる [ASSS17, NNS16]。

さらに、複素 Fokker–Planck 演算子のスペクトルが（$e^{-S}$ 以外で）正の実部をもつ固有値をもたないこと、エルゴード性、なども暗に仮定されている [SSS23]。

### 3.3 実用的な判定条件

* **整合性条件** [AJSS11]：定常状態で $\langle \tilde L O\rangle_P = 0$ が任意の正則 $O$ で成り立つことが正しさの必要十分条件に近い（全ての $O$ をチェックするのは不可能なので、いくつかの $O$ で確かめる＝必要条件）。
* **境界項の直接計算** [SSSS18, SSSS19]：カットオフ $Y$ を入れて

  $$
  B_O(Y) = \bigl\langle \Theta(Y-|y|)\,\tilde L O\bigr\rangle_P
  $$

  を測り、$Y\to\infty$ で 0 に向かうかを見る。さらに 1 次の境界項から系統誤差の大きさを見積もることもできる。
* **ドリフトの分布** [NNS16]：ドリフトの大きさ $u=|K|$ の確率分布 $p(u)$ が**大きな $u$ で指数関数的（またはそれ以上に速く）減衰**していれば正しい結果が得られる。冪的な裾（$p(u)\sim u^{-\alpha}$）は危険信号。格子 QCD で実際に使われている最も手軽な診断である。

---

## 第4講 トイモデルで見る成功と失敗

`code/cl_toy_models.py` を実行すると以下の結果が得られる（$\epsilon=10^{-4}$ 程度、適応ステップ、2000 本の独立ウォーカー）。数値は乱数種に依存するので、統計誤差の範囲で再現されれば良い。

### 4.1 複素ガウス模型

| $\sigma$ | CL $\langle z^2\rangle$ | 厳密値 $1/\sigma$ |
|---|---|---|
| $1+i$ | $0.4997-0.5018i\ (\pm 0.004)$ | $0.5-0.5i$ |
| $1+3i$ | $0.1004-0.3022i\ (\pm 0.002)$ | $0.1-0.3i$ |

### 4.2 ゼロ次元 $\phi^4$ 模型 $S = \frac{\sigma}{2}z^2 + \frac{\lambda}{4}z^4$（$\lambda=1$）

| $\sigma$ | CL $\langle z^2\rangle$ | 厳密値 | $\max\lvert y\rvert$ | $\lvert K\rvert$ の 99.9% 分位点 |
|---|---|---|---|---|
| $1+i$ | $0.4298-0.1486i\ (\pm0.002)$ | $0.4281-0.1480i$ | 0.28 | 8.2 |
| $-1+4i$ | 発散的に揺らぐ（誤差 $\gtrsim 3$） | $-0.1261-0.3765i$ | 222 | $8\times 10^{5}$ |

$\sigma = 1+i$ では分布が細い帯 $|y|<0.3$ に閉じ込められ、ドリフト分布は速く減衰し、正しい答えを得る。$\sigma=-1+4i$ では虚方向への大きな逸脱が起き、$|K|$ の分布が冪的な長い裾をもち、結果は正しくない（ステップ幅を 1/10 にしても改善しない）。第 3 講の判定条件がそのまま使えていることがわかる。

### 4.3 有限密度 U(1) one-link 模型

$\det M$ の役割をする因子をもつ模型 [AS08, ASSS17]

$$
\rho(x) = e^{\beta\cos x}\,\bigl[1+\kappa\cos(x-i\mu)\bigr],\qquad x\in[-\pi,\pi]
$$

の厳密解は修正ベッセル関数で書ける（演習 4.2）：

$$
\langle e^{ix}\rangle = \frac{I_1(\beta) + \frac{\kappa}{2}\bigl[e^{-\mu}I_0(\beta) + e^{\mu}I_2(\beta)\bigr]}{I_0(\beta)+\kappa\cosh\mu\, I_1(\beta)} .
$$

ドリフト $K=-\beta\sin z - \kappa\sin(z-i\mu)/[1+\kappa\cos(z-i\mu)]$ は「行列式」$1+\kappa\cos(z-i\mu)$ の零点 $z=\pm\arccos(-1/\kappa)+i\mu$ で極をもつ。

| $(\beta,\kappa,\mu)$ | CL $\langle e^{ix}\rangle$ | 厳密値 | CL $\langle e^{-ix}\rangle$ | 厳密値 |
|---|---|---|---|---|
| $(1,\,0.25,\,1)$ | $0.456\ (\pm0.003)$ | $0.4511$ | $0.678\ (\pm 0.005)$ | $0.6749$ |
| $(0.3,\,2,\,1)$ | $0.255\ (\pm0.001)$ | $0.3748$ | $1.154\ (\pm 0.010)$ | $1.9692$ |

$\kappa=0.25$ では零点が分布から遠く（$\mathrm{Im}\,z = \mu\pm 2.06$ 付近）、結果は（$O(\epsilon)$ の離散化誤差の範囲で）正しい。$\kappa=2$ では零点 $z=\pm 2.094 + i$ が分布の中に入り込み、**統計的には非常に精度が良いのに間違った値に収束する**。これが CL の最も厄介な失敗パターン（「wrong convergence」）であり、ドリフト分布の冪的な裾（$|K|\sim 10^3$ にまで達する）が警告を発している。有限密度 QCD でも、低温・中間密度領域で Dirac 演算子の固有値が原点付近に来ると同じ問題が起こり得る [ASSS17]。

---

## 第5講 ゲージ理論への拡張：SL(N,C) とゲージ冷却

### 5.1 リンク変数のランジュバン方程式

SU($N$) リンク変数 $U_{x,\nu}$ に対し、生成子 $\lambda_a$（$\mathrm{tr}\,\lambda_a\lambda_b = 2\delta_{ab}$）と左微分

$$
D_a f(U) = \frac{\partial}{\partial\alpha} f\bigl(e^{i\alpha\lambda_a}U\bigr)\Big|_{\alpha=0}
$$

を用いて、離散化されたランジュバン更新は

$$
U_{x,\nu}(\theta+\epsilon) = \exp\Bigl[i\lambda_a\bigl(\epsilon K_{a,x\nu} + \sqrt{\epsilon}\,\eta_{a,x\nu}\bigr)\Bigr]\,U_{x,\nu}(\theta),\qquad K_{a,x\nu} = -D_{a,x\nu}S
$$

と書ける（$\langle\eta\eta\rangle=2\delta$）。$S$ が実なら $K_a$ も実で、$U$ は SU($N$) に留まる。

### 5.2 複素化：SU(N) → SL(N,C)

$S$ が複素数（有限 $\mu$ の $-\ln\det M$ を含む）だと $K_a\in\mathbb C$ となり、更新行列 $e^{i\lambda_a K_a}$ はユニタリでなくなる。生成子がトレースレスなので $\det U = 1$ は保たれ、リンクは複素化された群 **SL($N$,$\mathbb C$)** を動く。これは 1 変数の $x\to x+iy$ の自然な一般化である。SU($N$) からの「距離」の指標として**ユニタリティ・ノルム**

$$
d = \frac{1}{4\Omega}\sum_{x,\nu}\frac{1}{N}\mathrm{tr}\bigl(U_{x\nu}U_{x\nu}^\dagger - \mathbb 1\bigr)\ \ge 0
$$

（$\Omega$ は格子点数）を使う。$d=0 \iff$ 全リンクがユニタリ（演習 5.1）。他に $\mathrm{tr}[(UU^\dagger-1)^2]$ 型の定義も使われる。$d$ が大きく育つと、3 講の意味で $P$ の裾が重くなり結果が信頼できなくなる。

### 5.3 なぜゲージ理論で特に難しいか

ゲージ変換 $U_{x\nu}\to \Omega_x U_{x\nu}\Omega_{x+\hat\nu}^{-1}$ も複素化され、$\Omega_x\in$ SL($N$,$\mathbb C$) となる。SU($N$) のゲージ軌道はコンパクトだが、SL($N$,$\mathbb C$) のゲージ軌道は**非コンパクト**で、ゲージ不変な作用はその方向にドリフトを与えない。数値誤差や非可換性の効果でこの平坦な方向に配位が拡散すると、ユニタリティ・ノルムが際限なく増大する。実際、ゲージ冷却以前の CL による有限密度 QCD の試みは不安定だった。

### 5.4 ゲージ冷却（gauge cooling）[SSS13]

各ランジュバンステップの後に、物理量（ゲージ不変量）を変えずにユニタリティ・ノルムを下げる**SL($N$,$\mathbb C$) ゲージ変換**を施す。点 $x$ での変換 $\Omega_x = e^{\alpha\lambda_a}$（$\alpha$ 実、エルミート生成子なので非ユニタリ）に対する $\sum\mathrm{tr}\,UU^\dagger$ の勾配は

$$
G_{a,x} = 2\,\mathrm{tr}\Bigl[\lambda_a\sum_\nu\bigl(U_{x\nu}U_{x\nu}^\dagger - U_{x-\hat\nu,\nu}^\dagger U_{x-\hat\nu,\nu}\bigr)\Bigr]
$$

で与えられ（演習 5.2）、最急降下 $\Omega_x = \exp(-\epsilon\,\alpha_{gc}\, G_{a,x}\lambda_a)$ を何回か繰り返す。ゲージ冷却は、ランジュバン過程にゲージ方向の（配位依存の）変換を混ぜても正則な観測量の期待値に関する正当化の議論が損なわれないことが示されている [NNS15]。

ゲージ冷却により、重いクォーク極限の QCD（HDQCD）[SSS13]、そして軽いクォークを含む full QCD [Sex13] の有限密度シミュレーションが初めて安定に実行された。ただし冷却が有効なのは格子間隔が十分細かい（$\beta$ が大きい）場合で、粗い格子では効かなくなることも報告されている。

### 5.5 動的安定化（dynamic stabilisation）[AAJS16, AJ18]

ゲージ冷却を補うものとして、ランジュバンのドリフトに SU($N$) 上では消える小さな**非正則**の項

$$
K_{a,x\nu}\;\to\;K_{a,x\nu} + i\,\alpha_{DS}\,M_{a,x}
$$

を加え、配位を SU($N$) 方向に引き戻す方法が提案されている。$M_{a,x}$ は $b_{a,x} = \mathrm{tr}[\lambda_a\sum_\nu U_{x\nu}U_{x\nu}^\dagger]$ の高次のべきで構成され、SU($N$) から離れると急速に大きくなる（具体形は [AJ18] を参照）。正則性を破るので形式的正当化の外にあるが、$\alpha_{DS}$ 依存性が小さい領域で結果がよく安定することが数値的に示されている。

---

## 第6講 有限密度 QCD への応用

### 6.1 フェルミオンのドリフト

$S_{\rm eff} = S_g - N_f\ln\det M$ とすると（staggered フェルミオンでは $N_f/4$ 乗の扱いに注意）

$$
K_a = -D_a S_g + N_f\,\mathrm{tr}\bigl[M^{-1}D_a M\bigr]
$$

である。トレースはランダムノイズ $\chi$（$\langle\chi\chi^\dagger\rangle=1$）を使った不偏推定 $\mathrm{tr}[M^{-1}D_aM]\approx \chi^\dagger M^{-1}(D_aM)\chi$ で評価し、1 ステップあたり 1 回の共役勾配法（CG）で済む（演習 6.1）。$\mu$ は時間方向リンクに $e^{\pm\mu}$ をかけて導入されるだけなので、$\mu=0$ のコードをほぼそのまま使え、**コストは $\mu$ にほとんど依存しない**。ここが再重み付け法との決定的な違いである。

$S_{\rm eff}$ が $\ln\det M$ を含むため、$\det M=0$ の点でドリフトが特異になる。これは第 4.3 節の one-link 模型と同じ構造である [ASSS17]。

### 6.2 重いクォーク極限（HDQCD）

ホッピング・パラメータ展開で空間方向のホッピングを落とすと、Wilson フェルミオンの行列式は Polyakov ループ $\mathcal P_{\vec x}$ だけで書ける：

$$
\det M = \prod_{\vec x}\det\bigl(1+h\,e^{\mu/T}\mathcal P_{\vec x}\bigr)^{2}\,\det\bigl(1+h\,e^{-\mu/T}\mathcal P_{\vec x}^{-1}\bigr)^{2},\qquad h=(2\kappa)^{N_\tau}.
$$

SU(3) では $\det(1+c\,\mathcal P) = 1 + c\,\mathrm{tr}\,\mathcal P + c^2\,\mathrm{tr}\,\mathcal P^{-1} + c^3$（演習 6.2）であり、$e^{\mu/T}$ と $e^{-\mu/T}$ の非対称性が複素性の起源であることがよくわかる。[SSS13] はゲージ冷却を導入してこの模型の CL を安定化し、小さな $\mu$ での再重み付けと一致すること、および飽和密度まで計算できることを示した。その後 [AAJS16b] で重いクォーク QCD の相図が CL で調べられている。

### 6.3 Full QCD

* [Sex13]：staggered フェルミオン（$N_f=4$）による full QCD の初の CL シミュレーション。ゲージ冷却により十分細かい格子で安定、重いクォーク質量で HDQCD と一致、飽和までの高密度が計算可能。
* [AJ18]：動的安定化を用いた full QCD。低 $\mu$ 側でテイラー展開などと比較。
* [Sex19]：改良作用（Symanzik ゲージ作用＋SL(3,C) に拡張したスタウト・スメアリング）で、$16^3\times 8$ 格子上の高温・有限密度 QGP の状態方程式（圧力・エネルギー密度）を計算し、小さな $\mu$ ではテイラー展開と一致。
* [IMNNSTT20]：$\beta=5.7$、$N_f=4$ staggered、$ma=0.01$ で、$8^3\times16$ と $16^3\times32$ 格子上の低温・高密度領域（$\mu/T$ 最大 9.6）を計算。**ドリフト分布の判定条件 [NNS16] が満たされる**ことを確認したうえで、クォーク数が $\mu$ についてプラトー（高さ 24）を示すことを報告。密度状態法やテイラー展開が破綻する領域である。

### 6.4 何がまだ難しいか

* **低温・中間密度**（核物質の液相転移付近、$\mu\approx m_N/3$）：Dirac 演算子の小さな固有値が密集し、特異ドリフト問題が深刻になる。ここでの正しい収束は保証されていない。
* **粗い格子**：ゲージ冷却が効かず、ユニタリティ・ノルムが成長する。
* **連続極限・カイラル極限**への外挿はまだ限定的。

結果を信頼するためには、ユニタリティ・ノルムの時間変化、ドリフト分布の裾、境界項、$\mu=0$ や虚数 $\mu$ での既知結果との一致 などを**必ず併用して確認する**のが現在の標準的な作法である [AJZ20]。

---

## 第7講 現状と未解決問題

* **正しさの理論**：境界項・スペクトル・ドリフト分布の関係が整理されつつある [SSSS18, SSS23]。境界項から誤差を補正する試みもある。
* **カーネル付き CL**：$\dot z = -H(z)S'(z) + \sqrt{H}\eta$ のように正則なカーネル $H$ を入れても正当化の議論は保たれ、うまく選べば安定性が大幅に向上する。実時間（ミンコフスキー）ゲージ理論への応用で安定化カーネルが提案されている [BHM22]。
* **他手法との組み合わせ**：レフシェッツ・シンブル、変形（deformation）法、機械学習による最適化カーネルなど。
* **非相対論的多体系への応用**：冷却原子のフェルミ気体、質量不均衡系など [BRL+19]。

---

### 学習の進め方（推奨）

1. 第 0〜2 講 → 演習 0, 1, 2（解析計算）
2. 第 3〜4 講 → コードを走らせて演習 3, 4（数値実験）
3. 第 5〜6 講 → 演習 5, 6（ゲージ理論の計算）、[SSS13] と [Sex13] を通読
4. 発展：[AJSS11] で証明の細部、[NNS16] でドリフト判定条件、[AJZ20] で最新状況
