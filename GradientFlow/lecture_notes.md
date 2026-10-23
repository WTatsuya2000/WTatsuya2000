# グラディエントフロー入門 ― ゲージ理論と格子QCDへの応用

> 本ノートは arXiv 上の原論文・レビュー（末尾の参考文献 [1]–[27]）をもとに、
> グラディエントフロー（gradient flow, Wilson flow）の基礎と、ゲージ理論・QCDにおける
> 代表的な応用をまとめた講義ノートです。演習問題は [`exercises.md`](exercises.md) にあります。
>
> **前提知識**: 場の量子論（経路積分・繰り込み）、非可換ゲージ理論の基礎、格子ゲージ理論の初歩。

---

## 目次

0. [導入：なぜグラディエントフローか](#0-導入なぜグラディエントフローか)
1. [グラディエントフローの定義](#1-グラディエントフローの定義)
2. [摂動論と熱核](#2-摂動論と熱核)
3. [繰り込み性：フローした場は有限である](#3-繰り込み性フローした場は有限である)
4. [エネルギー密度と基準スケール $t_0$, $w_0$](#4-エネルギー密度と基準スケール-t_0-w_0)
5. [格子上のフロー](#5-格子上のフロー)
6. [グラディエントフロー結合定数とステップスケーリング](#6-グラディエントフロー結合定数とステップスケーリング)
7. [トポロジカルチャージ](#7-トポロジカルチャージ)
8. [小フロー時間展開とエネルギー運動量テンソル](#8-小フロー時間展開とエネルギー運動量テンソル)
9. [クォーク場のフローとQCDへの拡張](#9-クォーク場のフローとqcdへの拡張)
10. [繰り込み群としてのフロー・その他の話題](#10-繰り込み群としてのフローその他の話題)
11. [まとめ](#11-まとめ)
12. [参考文献（arXiv）](#12-参考文献arxiv)

---

## 記法

Euclid 時空 $D=4$（次元正則化では $D=4-2\epsilon$）で考える。ゲージ群は $SU(N)$。
Lüscher [2,4] に従い、ゲージ場を **反エルミート** 行列で表す：

$$
A_\mu(x) = A_\mu^a(x)\,T^a,\qquad T^{a\dagger}=-T^a,\qquad
\operatorname{tr}(T^aT^b) = -\tfrac12\delta^{ab},\qquad [T^a,T^b]=f^{abc}T^c .
$$

場の強さと共変微分：

$$
F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu+[A_\mu,A_\nu],\qquad
D_\mu X = \partial_\mu X + [A_\mu, X].
$$

Yang–Mills 作用（結合定数 $g_0$ は場の外に出す規格化）：

$$
S_{\rm YM}[A] = -\frac{1}{2g_0^2}\int d^Dx\,\operatorname{tr}\bigl(F_{\mu\nu}F_{\mu\nu}\bigr)
=\frac{1}{4g_0^2}\int d^Dx\,F^a_{\mu\nu}F^a_{\mu\nu}.
$$

---

## 0. 導入：なぜグラディエントフローか

格子QCDや連続理論で次のような量を扱うとき、しばしば困難に出会う。

| 困難 | 例 |
|---|---|
| 合成演算子の繰り込みと演算子混合 | エネルギー運動量テンソル $T_{\mu\nu}$、トポロジカル電荷密度 $q(x)$ |
| 格子正則化による対称性の破れ | 並進対称性の破れ → $T_{\mu\nu}$ が保存しない |
| 紫外の揺らぎによるノイズ | トポロジカルチャージが整数にならない |
| 物理スケールの精密な決定 | 格子間隔 $a$ を fm 単位で決める（scale setting） |

**グラディエントフロー** は、ゲージ場を「仮想的な 5 番目の時間」$t$（フロー時間, 次元 $[\text{長さ}]^2$）に沿って
作用を減少させる方向に滑らかに発展させる手法である。

- Narayanan–Neuberger [1] が大 $N$ ゲージ理論の Wilson ループの研究で導入し、
- Lüscher [2,3] が格子QCDにおける性質と用途（スケール設定・トポロジー・自明化写像）を体系化し、
- Lüscher–Weisz [4] が **「フローした場の相関関数は追加の繰り込みなしで有限」** であることを全次数で示した。

これにより、フロー時間 $t>0$ の場は「半径 $\sqrt{8t}$ で平滑化された、繰り込まれた場」とみなせ、
上の困難のほとんどに統一的な処方箋を与える。

---

## 1. グラディエントフローの定義

### 1.1 一般論：作用の最急降下

場 $\phi$ と作用 $S[\phi]$ に対し、グラディエントフローは

$$
\partial_t \phi(t,x) = -\frac{\delta S[\phi_t]}{\delta \phi(t,x)},\qquad \phi(0,x)=\phi(x)
$$

で定義される。$t$ は物理的な時間ではなく、作用の「最急降下」のパラメータである。

**例（自由スカラー場）**: $S=\frac12\int(\partial\phi)^2$ なら $\partial_t\phi=\partial^2\phi$、すなわち **熱方程式** である。解は

$$
\phi(t,x)=\int d^Dy\, K_t(x-y)\,\phi(y),\qquad
K_t(x)=\frac{e^{-x^2/4t}}{(4\pi t)^{D/2}},\qquad
\tilde K_t(p)=e^{-tp^2}.
$$

熱核 $K_t$ は幅 $\langle x^2\rangle_{K_t}=2Dt$ のガウス関数なので、$D=4$ では
**平滑化半径 $\sqrt{8t}$** で場がぼかされる（演習 1）。運動量空間では $e^{-tp^2}$ により
$p\gtrsim 1/\sqrt{t}$ のモードが指数関数的に抑制される。これが「フローした場は紫外有限」の直観的理由である。

### 1.2 Yang–Mills グラディエントフロー

Lüscher [2] に従い、フローしたゲージ場 $B_\mu(t,x)$ を

$$
\boxed{\;
\partial_t B_\mu = D_\nu G_{\nu\mu} + \alpha_0\, D_\mu \partial_\nu B_\nu ,\qquad
B_\mu(0,x)=A_\mu(x)
\;}
$$

で定義する。ここで

$$
G_{\mu\nu}=\partial_\mu B_\nu-\partial_\nu B_\mu+[B_\mu,B_\nu],\qquad D_\mu = \partial_\mu + [B_\mu,\,\cdot\,].
$$

- 右辺第1項は $D_\nu G_{\nu\mu} = -g_0^2\,\delta S_{\rm YM}[B]/\delta B_\mu$（行列としての意味で）であり、作用の最急降下そのもの。
- 第2項（パラメータ $\alpha_0$）は **フロー時間に依存するゲージ変換** を生成するだけの項で、
  ゲージ不変量には影響しない（演習 3, 5）。摂動論では $\alpha_0=1$ とすると線形部分が単純な熱方程式になり便利。

**性質**

1. **ゲージ共変性**（$\alpha_0=0$）：$A\to A^\Lambda=\Lambda A\Lambda^{-1}+\Lambda\partial\Lambda^{-1}$ なら $B_t\to B_t^\Lambda$（同じ $t$ 非依存の $\Lambda$）。
2. **作用の単調減少**（$\alpha_0=0$）：
   $$
   \frac{d}{dt}S_{\rm YM}[B_t] = -g_0^2\int d^Dx\,\Bigl(\frac{\delta S_{\rm YM}}{\delta B^a_\mu}\Bigr)^2\le 0 .
   $$
   よって $t\to\infty$ でフローは古典解（作用の極小、例えばインスタントン近傍や純ゲージ）に向かう（演習 4）。
3. **局所性**：フロー方程式は $t$ について1階、$x$ について2階の偏微分方程式（非線形熱方程式）なので、
   $B_\mu(t,x)$ は主に $|y-x|\lesssim\sqrt{8t}$ の $A_\mu(y)$ で決まる。

---

## 2. 摂動論と熱核

$\alpha_0=1$ とすると、フロー方程式は

$$
\partial_t B_\mu = \partial_\nu\partial_\nu B_\mu + R_\mu,\qquad
R_\mu = 2[B_\nu,\partial_\nu B_\mu]-[B_\nu,\partial_\mu B_\nu]+[B_\nu,[B_\nu,B_\mu]]
$$

と書ける（$R_\mu$ は $B$ について2次以上。$\alpha_0=1$ では $[B_\mu,\partial_\nu B_\nu]$ 型の項が相殺する）。積分形

$$
B_\mu(t,x)=\int d^Dy\,\Bigl\{K_t(x-y)A_\mu(y)+\int_0^t ds\,K_{t-s}(x-y)R_\mu(s,y)\Bigr\}
$$

を反復して解く。一般の $\alpha_0$ では線形部分の解は（演習 5）

$$
\tilde B_\mu(t,p)=\Bigl[\Bigl(\delta_{\mu\nu}-\frac{p_\mu p_\nu}{p^2}\Bigr)e^{-tp^2}
+\frac{p_\mu p_\nu}{p^2}e^{-\alpha_0tp^2}\Bigr]\tilde A_\nu(p)+O(A^2).
$$

**ファインマン則**としては、通常の Yang–Mills のファインマン則に加えて

- **熱核伝播関数**（フロー線）：$\theta(t-s)\,e^{-(t-s)p^2}$（矢印付きの二重線で描く）
- **フロー頂点**：$R_\mu$ から来る 3 点・4 点頂点（フロー時間で積分）

が加わる。Lüscher–Weisz [4] はこれを $(D+1)$ 次元の局所場の理論（Lagrange 乗数場 $L_\mu(t,x)$ を導入）として定式化した。

**例：フローしたゲージ場の 2 点関数（木レベル）**

Feynman ゲージ $\langle\tilde A^a_\mu(p)\tilde A^b_\nu(q)\rangle=g_0^2\delta^{ab}\delta_{\mu\nu}(2\pi)^D\delta(p+q)/p^2$ のとき

$$
\langle B^a_\mu(t,x)B^b_\nu(s,y)\rangle = g_0^2\delta^{ab}\int\!\frac{d^Dp}{(2\pi)^D}\,
\frac{e^{ip(x-y)}}{p^2}\,e^{-(t+s)p^2}\delta_{\mu\nu}+\cdots
$$

$t+s>0$ なら $x=y$ でも有限。**同一点の積（合成演算子）が正則化なしで定義できる** ことが本質的に重要である（演習 2）。

---

## 3. 繰り込み性：フローした場は有限である

**定理（Lüscher–Weisz [4]）**：
$t>0$ におけるフローしたゲージ場 $B_\mu(t,x)$ の任意の（ゲージ不変な）相関関数は、
裸の結合定数 $g_0$ を通常どおり繰り込めば（例えば $\overline{\rm MS}$ スキームで $g_0\to g$）、
**追加の繰り込みなしで有限** である。これは $x$ が一致する点（合成演算子）でも成り立つ。

証明のアイデア：

1. Lagrange 乗数場 $L_\mu$ を導入して、フロー方程式を $(D+1)$ 次元の局所作用
   $$
   S_{\rm fl}=-2\int_0^\infty dt\int d^Dx\,\operatorname{tr}\bigl\{L_\mu(\partial_tB_\mu-D_\nu G_{\nu\mu}-\alpha_0D_\mu\partial_\nu B_\nu)\bigr\}
   $$
   として扱う。
2. この拡張された理論は $D+1$ 次元の BRS 対称性をもつ。
3. 冪数え（power counting）の議論から、$t>0$ の「バルク」には局所的な counterterm が許されず、
   必要な counterterm は境界 $t=0$（すなわち元の $D$ 次元理論）のものだけである。

**帰結**：$E(t,x)$ や $q(t,x)$ のような **フローした合成演算子は繰り込まれた有限量** であり、
格子間隔 $a\to0$ の連続極限が（$\sqrt{8t}$ を物理単位で固定すれば）存在する。
ただし、クォーク場のフローでは場の繰り込み $Z_\chi$ が1つ必要になる（§9）。

---

## 4. エネルギー密度と基準スケール $t_0$, $w_0$

### 4.1 エネルギー密度の摂動展開

$$
E(t,x) = -\frac12\operatorname{tr}\bigl\{G_{\mu\nu}(t,x)G_{\mu\nu}(t,x)\bigr\}=\frac14 G^a_{\mu\nu}G^a_{\mu\nu}
$$

と定義する。木レベル（演習 6）と1ループ（Lüscher [2]）の結果は

$$
\boxed{\;
\langle E(t)\rangle=\frac{3(N^2-1)}{128\pi^2t^2}\,g^2(q)\,\bigl\{1+c_1 g^2(q)+O(g^4)\bigr\},\qquad q=\frac{1}{\sqrt{8t}}
\;}
$$

$$
c_1=\frac{1}{16\pi^2}\Bigl\{N\Bigl(\frac{11}{3}\gamma_E+\frac{52}{9}-3\ln3\Bigr)
-N_f\Bigl(\frac23\gamma_E+\frac49-\frac43\ln2\Bigr)\Bigr\}
$$

（$g$ は $\overline{\rm MS}$ 結合定数、$\gamma_E$ は Euler 定数）。$SU(3)$ で $\alpha=g^2/4\pi$ を用いると

$$
t^2\langle E(t)\rangle=\frac{3}{4\pi}\,\alpha(q)\,\bigl\{1+k_1\alpha(q)+O(\alpha^2)\bigr\},\qquad
k_1=1.0978+0.0075\,N_f .
$$

2ループ・3ループの係数は Harlander–Neumann [21] で計算されている。
$t^2\langle E\rangle$ は無次元で、短距離（小さい $t$）では $\alpha$ に比例して小さく、$t$ とともに単調増加する。

### 4.2 基準スケール $t_0$

$t^2\langle E\rangle$ は繰り込まれた有限量で、格子上でも統計精度よく測れる。そこで Lüscher [2] は

$$
\boxed{\;t^2\langle E(t)\rangle\big|_{t=t_0}=0.3\;}
$$

で基準スケール $t_0$ を定義した。値 0.3 は、$\sqrt{8t_0}$ が格子間隔より十分大きく、かつ有限体積効果が小さい
（ハドロンスケール程度）ように選ばれている。

### 4.3 基準スケール $w_0$

BMW コラボレーション [8] は、有限格子間隔の影響を受けにくい量として

$$
\boxed{\;t\frac{d}{dt}\bigl\{t^2\langle E(t)\rangle\bigr\}\Big|_{t=w_0^2}=0.3\;}
$$

で $w_0$ を定義した。$t^2\langle E\rangle$ そのものは小さい $t$ の領域（格子アーティファクトが大きい）からの寄与を
累積的に含むが、その対数微分はより局所的な $t$ の情報だけを用いる。
物理単位では（BMW [8] の $N_f=2+1$ の値）

$$
\sqrt{t_0}=0.1465(21)(13)\ {\rm fm},\qquad w_0=0.1755(18)(04)\ {\rm fm}.
$$

**スケール設定の手順**
1. 物理量（例: $f_\pi$, $M_\Omega$）で $\sqrt{t_0}$ や $w_0$ を一度 fm 単位で決める。
2. 以後、各アンサンブルで $t_0/a^2$（または $w_0/a$）を測れば、格子間隔 $a$ が安価かつ高精度で決まる。

---

## 5. 格子上のフロー

### 5.1 Wilson フロー

格子上ではリンク変数 $U(x,\mu)\in SU(N)$ に対し、フローしたリンク $V_t(x,\mu)$ を

$$
\dot V_t(x,\mu)=-g_0^2\,\bigl\{\partial_{x,\mu}S_{\rm W}(V_t)\bigr\}\,V_t(x,\mu),\qquad V_0(x,\mu)=U(x,\mu)
$$

で定義する [2]。ここで $S_{\rm W}$ は Wilson のプラケット作用、$\partial_{x,\mu}$ はリンク $V(x,\mu)$ に関する
Lie 代数微分。これを **Wilson フロー** と呼ぶ。右辺はステープル和 $\Omega$ を用いて

$$
g_0^2\,\partial_{x,\mu}S_{\rm W}(V)=\mathcal P_{\mathfrak{su}(N)}\bigl\{V(x,\mu)\,\Omega^\dagger(x,\mu)\bigr\}
$$

（反エルミート・トレースレス部分への射影）と書ける。

- **数値積分**：$SU(N)$ 多様体上の常微分方程式なので、群構造を保つ積分法が必要。
  Lüscher [2] の付録にある **3次 Runge–Kutta（Lie 群版, RK3）** が標準的に使われる。
  典型的なステップ幅は $\epsilon=0.01$–$0.02$（格子単位）。
- **作用の選択**：フローに使う作用（Wilson, Symanzik/tree-level improved など）と、測定に使う $E$ の離散化
  （プラケット型・クローバー型）は独立に選べる。その差は $O(a^2)$ の格子アーティファクトとして現れる。
- **Zeuthen フロー**：Ramos–Sint [17] はフロー方程式自体を改良し、
  $O(a^2)$ のフロー由来のアーティファクトを除去した。

### 5.2 計算コスト

フローは決定論的な微分方程式の積分なので、Monte Carlo 更新に比べて安価
（各ステップで作用の微分を数回計算するだけ）。測定コストとしてほぼ無視できる程度であり、
これが $t_0$ や $w_0$ が「標準的な基準スケール」となった理由の1つである。

---

## 6. グラディエントフロー結合定数とステップスケーリング

§4.1 の展開を逆に使えば、**非摂動的に定義された繰り込まれた結合定数** が得られる：

$$
g^2_{\rm GF}(\mu)=\frac{128\pi^2}{3(N^2-1)}\,\frac{t^2\langle E(t)\rangle}{\mathcal N}\Big|_{\mu=1/\sqrt{8t}} .
$$

$\mathcal N$ は有限体積・境界条件による補正因子（無限体積では $\mathcal N=1$）。

**有限体積スキーム**：体積 $L^4$ の箱で $\sqrt{8t}=cL$（$c$ は 0.2–0.5 程度の定数）と固定すると、
$g_{\rm GF}^2$ は箱のサイズ $L$ だけの関数になり、$\mu=1/(cL)$ のランニング結合定数を与える。

- Fodor ら [9]：周期境界条件での GF 結合定数
- Fritzsch–Ramos [10]：Schrödinger 汎関数境界条件での GF 結合定数

**ステップスケーリング**：$L\to 2L$ で結合定数がどう変わるか（step scaling function $\sigma(u)=g^2(2L)|_{g^2(L)=u}$）
を格子上で連続極限をとって求め、それを繰り返して低エネルギーから高エネルギーまで非摂動的につなぐ。
ALPHA コラボレーション [18] は GF 結合定数（低エネルギー側）と SF 結合定数（高エネルギー側）を組み合わせて、
3フレーバーQCDの $\Lambda$ パラメータ、したがって $\alpha_s(M_Z)$ を高精度で決定した。

GF 結合定数は統計誤差が小さい（$E$ は体積平均された局所量なので）ことが大きな利点である。
また、多フレーバー理論の（近）共形性の研究でも広く使われる。

---

## 7. トポロジカルチャージ

### 7.1 連続理論

$$
Q=\int d^4x\,q(x),\qquad
q(x)=-\frac{1}{32\pi^2}\epsilon_{\mu\nu\rho\sigma}\operatorname{tr}\bigl\{F_{\mu\nu}F_{\rho\sigma}\bigr\}
=\frac{1}{64\pi^2}\epsilon_{\mu\nu\rho\sigma}F^a_{\mu\nu}F^a_{\rho\sigma}
$$

は滑らかな場に対して整数値をとり、$S_{\rm YM}\ge 8\pi^2|Q|/g_0^2$ を満たす（等号は（反）自己双対解＝インスタントン、演習 9）。

### 7.2 格子上の問題とフローによる解決

格子上で $q(x)$ を素朴に離散化すると、紫外の揺らぎのため $Q$ は整数にならず、
さらに $q(x)$ には乗法的繰り込みと、より低次元の演算子との加法的混合が生じる。
また、トポロジカル感受率 $\chi_t=\langle Q^2\rangle/V$ は接触項による発散を含みうる。

フローを適用すると：

- フローした $q(t,x)$ は §3 により **繰り込まれた有限量**。$\chi_t(t)=\langle Q(t)^2\rangle/V$ は
  $t>0$ で定義された有限量で、連続極限で $t$ に依存しない（$Q$ は連続理論ではフロー不変）。
- 数値的にも、$\sqrt{8t}\sim0.3$ fm 程度のフローで $Q(t)$ の分布がほぼ整数値に鋭くピークをもつ。
- Lüscher [2] は、格子間隔 $a\to0$ でトポロジカルセクターがどのように分離していくか（「小さな」インスタントンが
  格子アーティファクトとして消えていく様子）をフローを使って議論した。

**冷却（cooling）との関係**：古くから使われる冷却法（作用を局所的に最小化）や各種スメアリング（APE, stout）と
フローは数値的にはほぼ同等の結果を与え、対応関係 $t\leftrightarrow n_{\rm cool}$ が知られている [19,20]。
しかしフローは **繰り込み性が証明されている** 点で理論的に優れている。

### 7.3 物理への応用

- **Witten–Veneziano 公式**：大 $N$ で純ゲージ理論の $\chi_t$ が $\eta'$ 質量を与える：
  $$
  \chi_t^{\rm YM}\simeq\frac{f_\pi^2}{2N_f}\bigl(m_{\eta}^2+m_{\eta'}^2-2m_K^2\bigr)\quad(f_\pi\simeq92\ {\rm MeV}).
  $$
  これは $\chi_t^{1/4}\approx180$ MeV 程度を予言し、フローを用いた格子計算と整合する（演習 10）。
- **有限温度の $\chi_t(T)$**：アクシオン暗黒物質の質量・残存量の評価に必須。
- **$\theta$ 真空・$\theta$ 依存性**、$Q$ の分布の非ガウス性の研究。
- **トポロジーの凍結（topology freezing）**：細かい格子ではモンテカルロが $Q$ セクター間を移れなくなる。
  フローは凍結の診断にも使われる。

---

## 8. 小フロー時間展開とエネルギー運動量テンソル

### 8.1 小フロー時間展開

フローした局所演算子 $\tilde O(t,x)$ は、$t\to0$ で通常の（$t=0$ の）繰り込まれた局所演算子で展開できる：

$$
\tilde O(t,x)=\sum_i c_i(t)\,O_i^R(x)+O(t)\qquad(t\to0).
$$

これは演算子積展開（OPE）と同様の構造で、係数 $c_i(t)$ は短距離（$\mu\sim1/\sqrt{8t}$）の物理なので
**漸近自由性により摂動論で計算できる**。これを逆に解けば、

$$
O^R(x)=\lim_{t\to0}\sum_i \bigl(c^{-1}(t)\bigr)\tilde O_i(t,x)
$$

として、**任意の正則化（格子を含む）で $O^R$ を構成できる**。
格子の対称性の破れ（並進・カイラル）に起因する演算子混合の問題を、普遍的な形で回避できるのがポイント。

### 8.2 Suzuki のエネルギー運動量テンソル公式

格子正則化は並進対称性を破るため、$T_{\mu\nu}$ の構成（とその繰り込み）は長年の難問だった。
Suzuki [6] は小フロー時間展開を使って次の公式を導いた（純 Yang–Mills, 改訂版の係数）：

$$
\boxed{\;
T^R_{\mu\nu}(x)=\lim_{t\to0}\Bigl\{\frac{1}{\alpha_U(t)}U_{\mu\nu}(t,x)
+\frac{\delta_{\mu\nu}}{4\alpha_E(t)}\bigl[E(t,x)-\langle E(t,x)\rangle_0\bigr]\Bigr\}
\;}
$$

$$
U_{\mu\nu}(t,x)=G^a_{\mu\rho}G^a_{\nu\rho}-\frac14\delta_{\mu\nu}G^a_{\rho\sigma}G^a_{\rho\sigma},\qquad
E(t,x)=\frac14G^a_{\mu\nu}G^a_{\mu\nu},
$$

$$
\alpha_U(t)=\bar g^2\bigl\{1+2b_0\bar s_1\bar g^2+O(\bar g^4)\bigr\},\qquad
\alpha_E(t)=\frac{1}{2b_0}\bigl\{1+2b_0\bar s_2\bar g^2+O(\bar g^4)\bigr\}.
$$

ここで $\bar g=\bar g(1/\sqrt{8t})$ は $\overline{\rm MS}$ ランニング結合定数、$b_0=\frac{1}{(4\pi)^2}\frac{11}{3}N$、
$\langle\cdot\rangle_0$ は真空期待値。$SU(3)$ では
$\bar s_1=\frac{7}{22}+\frac12\gamma_E-\ln2\simeq-0.0864$, $\bar s_2=\frac{21}{44}-\frac{b_1}{2b_0^2}=\frac{27}{484}\simeq0.0558$。
（ここでのゲージ場は $G$ に $g$ を含む規格化。$U_{\mu\nu}$ はトレースレス、$E$ がトレース部分を担う。）

2ループの係数は Harlander–Kluth–Lange [22] で計算された。フェルミオンを含む場合は Makino–Suzuki [7]。

### 8.3 応用：熱力学

Euclid の $T_{\mu\nu}$ を用いると、エネルギー密度 $\varepsilon$ と圧力 $p$ は

$$
\varepsilon=-\langle T_{00}\rangle_T,\qquad p=\langle T_{11}\rangle_T\quad(\text{真空期待値を差し引いたもの})
$$

なので

$$
\varepsilon-3p=-\langle T_{\mu\mu}\rangle_T,\qquad
\varepsilon+p=Ts=\langle T_{11}-T_{00}\rangle_T.
$$

- **トレースアノマリー** $\varepsilon-3p$ は $E$ の項（$\alpha_E$）から、
- **エントロピー密度** $s$ は $U_{\mu\nu}$ の項（$\alpha_U$）から

それぞれ **1回の温度で直接** 求まる。従来の積分法（$T$ について積分する方法）と異なり、
基準温度での値や $\beta$ 関数を必要としない。

- FlowQCD [11]：SU(3) 純ゲージ理論の状態方程式を初めてこの方法で計算し、積分法と整合。
- Kitazawa ら [16]：より詳細な連続極限・$t\to0$ 外挿。
- Shirogane ら [27]：一次相転移点での潜熱と圧力差。
- WHOT-QCD（Taniguchi ら）[13]：$N_f=2+1$ QCD への適用。

**実際の解析手順**（double extrapolation）：
1. 各 $a$ と $t$ で $\langle T_{\mu\nu}\rangle$ を測る。
2. 固定した物理的 $t$（$\sqrt{8t}\,T$ 固定）で $a\to0$ の連続極限をとる。
3. 連続極限の値を $t\to0$ に外挿する（$O(t)$ 項の除去）。

$t$ が大きすぎると平滑化半径が $1/T$ を超えてしまう（$\sqrt{8t}\lesssim 1/(2T)$ 程度が目安）。
また $t$ が小さすぎると $O(a^2/t)$ の格子アーティファクトが大きくなる。この「窓」を確保することが実際上の鍵である。

**その他の $T_{\mu\nu}$ の応用**：粘性係数（$T_{12}$ の相関関数）、比熱、ハドロン内部の圧力・応力分布、
静的クォーク間の応力テンソル分布（フラックスチューブの構造）など。

---

## 9. クォーク場のフローとQCDへの拡張

Lüscher [5] はクォーク場のフローを

$$
\partial_t\chi=\Delta\chi-\alpha_0\,\partial_\nu B_\nu\,\chi,\qquad
\partial_t\bar\chi=\bar\chi\overleftarrow\Delta+\alpha_0\,\bar\chi\,\partial_\nu B_\nu,\qquad
\chi|_{t=0}=\psi,\ \bar\chi|_{t=0}=\bar\psi
$$

で定義した（$\Delta=D_\mu D_\mu$, $D_\mu=\partial_\mu+B_\mu$）。性質：

- ゲージ場の場合と異なり、**場の繰り込み** $\chi_R=Z_\chi^{1/2}\chi$ が必要（$Z_\chi$ は $t$ に依存しない）。
  これを除けばフローした場の相関関数は有限 [5]。
- 実用上は、$\langle\bar\chi\overleftrightarrow{D\!\!\!/}\chi\rangle$ などで規格化した「リング変数」$\mathring\chi$ を使うと
  $Z_\chi$ が相殺する（Makino–Suzuki [7]）。
- **カイラル対称性**：フロー方程式はカイラル変換と可換。そのため、フローした場から作ったカイラル凝縮
  $\langle\bar\chi\chi\rangle$ は（$\chi$ の規格化を除き）乗法的にしか繰り込まれず、
  格子上でカイラル対称性を破る作用（Wilson フェルミオン）を使っても、カイラル対称性に関する量を構成できる [5,13]。

**主な応用**

- QCD のエネルギー運動量テンソル（Makino–Suzuki [7]）、$N_f=2+1$ QCD 熱力学（WHOT-QCD [13]）。
- **軸性ベクトルカレント** の普遍的公式（Endo–Hieda–Miura–Suzuki [15]）：格子上で保存カレントがなくとも正しく規格化されたカレントが得られる。
- **カイラル凝縮・カイラル感受率** の有限温度での計算 [13]。
- **CP 非保存演算子**（クォーク電気双極子モーメント、Weinberg 演算子など）の繰り込み：
  中性子 EDM の計算で、フローを用いて混合を回避する研究が盛ん。
- **重いクォーク・$B$ 中間子混合の行列要素**、**PDF（パートン分布関数）** の格子計算への応用。

---

## 10. 繰り込み群としてのフロー・その他の話題

### 10.1 フローと繰り込み群

フローは半径 $\sqrt{8t}$ の「粗視化」なので、Wilson 流の繰り込み群（ブロックスピン変換）との類似が自然に期待される。

- Carosso–Hasenfratz–Neil [14]：フローを連続的な実空間繰り込み群変換とみなし、
  フローした演算子の比から異常次元（例: 質量異常次元 $\gamma_m$）を決定する方法を提案。
  多フレーバー（近）共形理論に適用。
- Abe–Fukuma [26]：フローと繰り込み群の関係を（スカラー場理論で）定式化。

### 10.2 自明化写像（trivializing map）

Lüscher [3] は、ゲージ場の配位を作用 0 の（自明な）測度に写す写像 $\mathcal F_t$ を、
「フロー（ただし作用は $S$ ではなく適当に構成した $\tilde S_t$）」として構成しうることを示し、
HMC アルゴリズムの改良（臨界減速の緩和）への応用を議論した。
この考え方は近年の機械学習（normalizing flow）による格子場の生成法の源流の1つでもある。

### 10.3 摂動計算の進展

- 3ループの $\langle E\rangle$（Harlander–Neumann [21]）
- 高次計算の手法（Artz ら [23]）
- 2ループの EMT 係数（Harlander–Kluth–Lange [22]）

これらは $t_0$ からの $\alpha_s$ 決定や EMT の $t\to0$ 外挿の精度向上に不可欠。

### 10.4 レビュー

- Lüscher, *Future applications of the Yang–Mills gradient flow in lattice QCD* [12]
- Ramos, *The Yang–Mills gradient flow and renormalization* [25]

---

## 11. まとめ

| 性質 | 内容 | 主要文献 |
|---|---|---|
| 定義 | 作用の最急降下: $\partial_tB_\mu=D_\nu G_{\nu\mu}$ | [1,2] |
| 平滑化 | 半径 $\sqrt{8t}$ の熱核による紫外抑制 | [2] |
| 繰り込み性 | フローしたゲージ場の相関関数は追加の繰り込みなしで有限 | [4,5] |
| スケール設定 | $t_0$, $w_0$：安価・高精度 | [2,8] |
| 結合定数 | GF スキームの結合定数、ステップスケーリング、$\alpha_s$ | [9,10,18] |
| トポロジー | $Q$, $\chi_t$ の繰り込まれた定義 | [2,19,20] |
| 小フロー時間展開 | 正則化非依存な繰り込まれた演算子の構成 | [6,7,15] |
| EMT・熱力学 | $\varepsilon$, $p$, $s$ を1温度で直接計算 | [6,11,13,16,27] |
| 繰り込み群 | 連続的な実空間 RG としての解釈 | [14,26] |

**本質**：フロー時間 $t$ は新しい「紫外カットオフ」の役割を果たすが、それは **繰り込み可能性を壊さない**
（$t>0$ では物理量が有限・正則化非依存）。格子QCDの多くの技術的問題を、
「格子 → フローした場（正則化非依存）→ 小フロー時間展開（摂動論）→ 繰り込まれた量」
という普遍的な経路に置き換えることができる。

---

## 12. 参考文献（arXiv）

1. R. Narayanan, H. Neuberger, *Infinite N phase transitions in continuum Wilson loop operators*, [hep-th/0601210](https://arxiv.org/abs/hep-th/0601210)
2. M. Lüscher, *Properties and uses of the Wilson flow in lattice QCD*, [arXiv:1006.4518](https://arxiv.org/abs/1006.4518)
3. M. Lüscher, *Trivializing maps, the Wilson flow and the HMC algorithm*, [arXiv:0907.5491](https://arxiv.org/abs/0907.5491)
4. M. Lüscher, P. Weisz, *Perturbative analysis of the gradient flow in non-abelian gauge theories*, [arXiv:1101.0963](https://arxiv.org/abs/1101.0963)
5. M. Lüscher, *Chiral symmetry and the Yang–Mills gradient flow*, [arXiv:1302.5246](https://arxiv.org/abs/1302.5246)
6. H. Suzuki, *Energy-momentum tensor from the Yang–Mills gradient flow*, [arXiv:1304.0533](https://arxiv.org/abs/1304.0533)
7. H. Makino, H. Suzuki, *Lattice energy-momentum tensor from the Yang–Mills gradient flow — inclusion of fermion fields*, [arXiv:1403.4772](https://arxiv.org/abs/1403.4772)
8. S. Borsanyi et al. (BMW), *High-precision scale setting in lattice QCD*, [arXiv:1203.4469](https://arxiv.org/abs/1203.4469)
9. Z. Fodor, K. Holland, J. Kuti, D. Nógrádi, C. H. Wong, *The Yang–Mills gradient flow in finite volume*, [arXiv:1208.1051](https://arxiv.org/abs/1208.1051)
10. P. Fritzsch, A. Ramos, *The gradient flow coupling in the Schrödinger functional*, [arXiv:1301.4388](https://arxiv.org/abs/1301.4388)
11. M. Asakawa, T. Hatsuda, E. Itou, M. Kitazawa, H. Suzuki (FlowQCD), *Thermodynamics of SU(3) gauge theory from gradient flow on the lattice*, [arXiv:1312.7492](https://arxiv.org/abs/1312.7492)
12. M. Lüscher, *Future applications of the Yang–Mills gradient flow in lattice QCD*, [arXiv:1308.5598](https://arxiv.org/abs/1308.5598)
13. Y. Taniguchi et al. (WHOT-QCD), *Exploring $N_f=2+1$ QCD thermodynamics from the gradient flow*, [arXiv:1609.01417](https://arxiv.org/abs/1609.01417)
14. A. Carosso, A. Hasenfratz, E. T. Neil, *Nonperturbative renormalization of operators in near-conformal systems using gradient flows*, [arXiv:1806.01385](https://arxiv.org/abs/1806.01385)
15. T. Endo, K. Hieda, D. Miura, H. Suzuki, *Universal formula for the flavor non-singlet axial-vector current from the gradient flow*, [arXiv:1502.01809](https://arxiv.org/abs/1502.01809)
16. M. Kitazawa, T. Iritani, M. Asakawa, T. Hatsuda, H. Suzuki, *Equation of state for SU(3) gauge theory via the energy-momentum tensor under gradient flow*, [arXiv:1610.07810](https://arxiv.org/abs/1610.07810)
17. A. Ramos, S. Sint, *Symanzik improvement of the gradient flow in lattice gauge theories*, [arXiv:1508.05552](https://arxiv.org/abs/1508.05552)
18. M. Bruno et al. (ALPHA), *QCD coupling from a nonperturbative determination of the three-flavor Λ parameter*, [arXiv:1706.03821](https://arxiv.org/abs/1706.03821)
19. C. Bonati, M. D'Elia, *Comparison of the gradient flow with cooling in SU(3) pure gauge theory*, [arXiv:1401.2441](https://arxiv.org/abs/1401.2441)
20. C. Alexandrou, A. Athenodorou, K. Jansen, *Topological charge using cooling and the gradient flow*, [arXiv:1509.04259](https://arxiv.org/abs/1509.04259)
21. R. V. Harlander, T. Neumann, *The perturbative QCD gradient flow to three loops*, [arXiv:1606.03756](https://arxiv.org/abs/1606.03756)
22. R. V. Harlander, Y. Kluth, F. Lange, *The two-loop energy-momentum tensor within the gradient-flow formalism*, [arXiv:1808.09837](https://arxiv.org/abs/1808.09837)
23. J. Artz, R. V. Harlander, F. Lange, T. Neumann, M. Prausa, *Results and techniques for higher order calculations within the gradient-flow formalism*, [arXiv:1905.00882](https://arxiv.org/abs/1905.00882)
24. H. Makino, H. Suzuki, *Lattice energy-momentum tensor from the Yang–Mills gradient flow — a simpler prescription*, [arXiv:1404.2758](https://arxiv.org/abs/1404.2758)
25. A. Ramos, *The Yang–Mills gradient flow and renormalization*, [arXiv:1506.00118](https://arxiv.org/abs/1506.00118)
26. Y. Abe, M. Fukuma, *Gradient flow and the renormalization group*, [arXiv:1805.12094](https://arxiv.org/abs/1805.12094)
27. M. Shirogane et al., *Latent heat and pressure gap at the first-order deconfining phase transition of SU(3) Yang–Mills theory using the small flow-time expansion method*, [arXiv:2011.10292](https://arxiv.org/abs/2011.10292)

> **注意**: 式の規格化（ゲージ場に $g$ を含めるか、反エルミート/エルミート生成子など）は論文ごとに異なる。
> 数値係数を用いる際は、必ず原論文（特に改訂版・erratum）で規格化を確認すること。
