# グラディエントフロー入門 ― 演習問題と解答例

講義ノート [`lecture_notes.md`](lecture_notes.md) に対応する演習問題です。記法はノートと同じ
（反エルミート生成子 $\operatorname{tr}(T^aT^b)=-\frac12\delta^{ab}$、$S_{\rm YM}=\frac{1}{4g_0^2}\int F^aF^a$、Euclid 4次元）。
文献番号 [n] はノート末尾の参考文献を指します。

難易度：★ 基礎 / ★★ 標準 / ★★★ 発展 / 💻 数値演習

---

## 問題

### 演習 1 ★ 熱核と平滑化半径
$D$ 次元の熱核 $K_t(x)=(4\pi t)^{-D/2}e^{-x^2/4t}$ について次を示せ。

1. $\partial_tK_t=\partial^2K_t$ かつ $\int d^Dx\,K_t(x)=1$、$\lim_{t\to0}K_t(x)=\delta^D(x)$。
2. フーリエ変換が $\tilde K_t(p)=e^{-tp^2}$ であり、半群性 $K_t*K_s=K_{t+s}$ が成り立つ。
3. $\langle x^2\rangle\equiv\int d^Dx\,x^2K_t(x)=2Dt$。したがって $D=4$ で平滑化半径は $\sqrt{8t}$ である。

### 演習 2 ★ フローした自由スカラー場の紫外有限性
質量 $m$ の自由スカラー場 $\langle\tilde\phi(p)\tilde\phi(q)\rangle=(2\pi)^D\delta(p+q)/(p^2+m^2)$ を熱方程式でフローする。

1. $\langle\phi(t,x)\phi(s,y)\rangle$ を運動量積分で表せ。
2. $D=4$, $m=0$ のとき $\langle\phi(t,x)^2\rangle=\dfrac{1}{32\pi^2t}$ を示せ。
3. $t\to0$ で何が起こるか。$t$ が紫外カットオフとして働くことを説明せよ。

### 演習 3 ★★ ゲージ共変性と $\alpha_0$ 項
1. $\alpha_0=0$ のフロー方程式 $\partial_tB_\mu=D_\nu G_{\nu\mu}$ は、$t$ に依存しないゲージ変換
   $B_\mu\to\Lambda B_\mu\Lambda^{-1}+\Lambda\partial_\mu\Lambda^{-1}$ の下で共変であることを示せ。
2. $B_\mu$ が $\alpha_0=0$ の解のとき、$\partial_t\Lambda=-\alpha_0(\partial_\nu B^\Lambda_\nu)\Lambda$
   （$B^\Lambda$ は $\Lambda$ で変換した場）を満たす $t$ 依存ゲージ変換で得られる $B^\Lambda_\mu$ が、
   $\alpha_0$ 項付きのフロー方程式を満たすことを示せ（符号は規約に依存するので、整合する規約を自分で定めてよい）。
3. したがってゲージ不変量の期待値は $\alpha_0$ に依存しないことを結論せよ。

### 演習 4 ★ 作用の単調減少
$\alpha_0=0$ のとき $\dfrac{d}{dt}S_{\rm YM}[B_t]\le0$ を示せ。等号が成り立つのはどのような場合か。
さらに、$\alpha_0\neq0$ でも同じ結論が成り立つ理由を述べよ。

### 演習 5 ★★ 線形化したフロー方程式
1. フロー方程式を $B$ の1次まで展開すると
   $\partial_tB_\mu=\partial^2B_\mu+(\alpha_0-1)\partial_\mu\partial_\nu B_\nu$ となることを示せ。
2. その解が
   $$\tilde B_\mu(t,p)=\Bigl[P^T_{\mu\nu}(p)\,e^{-tp^2}+P^L_{\mu\nu}(p)\,e^{-\alpha_0tp^2}\Bigr]\tilde A_\nu(p),\quad
   P^T=\delta_{\mu\nu}-\frac{p_\mu p_\nu}{p^2},\ P^L=\frac{p_\mu p_\nu}{p^2}$$
   であることを示せ。
3. 線形近似の場の強さ $\tilde G_{\mu\nu}$ が $\alpha_0$ に依存しないことを確かめよ。

### 演習 6 ★★ $\langle E\rangle$ の木レベル計算
$E=\frac14G^a_{\mu\nu}G^a_{\mu\nu}$ の期待値を $g_0^2$ の最低次で計算し、
$$\langle E(t)\rangle=\frac{3(N^2-1)g_0^2}{128\pi^2t^2}+O(g_0^4)$$
を示せ。ゲージ固定パラメータ $\xi$ の一般共変ゲージ
$\langle\tilde A^a_\mu\tilde A^b_\nu\rangle=g_0^2\delta^{ab}\bigl[P^T_{\mu\nu}+\xi P^L_{\mu\nu}\bigr]/p^2$
を使っても結果が変わらないことも確かめよ。また、$D$ 次元での結果を書け。

### 演習 7 ★ $t_0$ における結合定数とスケール
$SU(3)$ で $t^2\langle E\rangle=\frac{3}{4\pi}\alpha(1+k_1\alpha)$, $k_1=1.0978+0.0075N_f$ とする。

1. $N_f=0$ と $N_f=3$ で $k_1$ の値を $c_1$ の式から再現せよ。
2. 1ループの式を信じて $t=t_0$（$t^2\langle E\rangle=0.3$）での $\alpha$ を $N_f=0$ で求めよ。結果から何がわかるか。
3. $\sqrt{t_0}=0.1465$ fm のとき、対応するエネルギースケール $\mu=1/\sqrt{8t_0}$ を GeV 単位で求めよ
   （$\hbar c=0.1973$ GeV fm）。

### 演習 8 ★★ $t_0$ と $w_0$
$F(t)\equiv t^2\langle E(t)\rangle$ とする。

1. 1ループのランニング $\alpha(\mu)=\dfrac{1}{4\pi b_0\ln(\mu^2/\Lambda^2)}$, $\mu=1/\sqrt{8t}$ と木レベルの
   $F=\frac{3}{4\pi}\alpha$ を用いて、$t\,dF/dt$ を $\alpha$ で表せ。
2. 格子上で $F_{\rm lat}(t)=F(t)\bigl[1+c\,a^2/t+O(a^4)\bigr]$ と書けるとき、$F$ と $t\,dF/dt$ の
   格子アーティファクトの大きさを比較せよ。$w_0$ が「より局所的な」スケールである意味を議論せよ。

### 演習 9 ★★ トポロジカルチャージ
1. $\epsilon_{\mu\nu\rho\sigma}\operatorname{tr}(F_{\mu\nu}F_{\rho\sigma})=\partial_\mu K_\mu$ と書けることを示し、
   Chern–Simons カレント $K_\mu$ を求めよ。
2. 双対場 $\tilde F_{\mu\nu}=\frac12\epsilon_{\mu\nu\rho\sigma}F_{\rho\sigma}$ を用いて
   $S_{\rm YM}\ge\dfrac{8\pi^2}{g_0^2}|Q|$ を示せ。等号条件を述べよ。
3. フローは作用を減少させる。インスタントン（半径 $\rho$）が格子上でフローによってどうなりうるか、
   $\rho\sim a$ の場合と $\rho\gg a$ の場合に分けて定性的に議論せよ。

### 演習 10 ★ Witten–Veneziano 公式
$f_\pi=92.4$ MeV, $m_\eta=547.9$ MeV, $m_{\eta'}=957.8$ MeV, $m_K=495.7$ MeV, $N_f=3$ として
$\chi_t^{\rm YM}=\frac{f_\pi^2}{2N_f}(m_\eta^2+m_{\eta'}^2-2m_K^2)$ を計算し、$\chi_t^{1/4}$ を MeV 単位で求めよ。

### 演習 11 ★★ Suzuki の EMT 公式の構造
1. $U_{\mu\nu}$ がトレースレスであることを確かめ、Suzuki の公式から
   $T^R_{\mu\mu}=\lim_{t\to0}\frac{1}{\alpha_E(t)}[E(t,x)-\langle E\rangle_0]$ を導け。
2. $SU(3)$ で $b_1=\frac{1}{(4\pi)^4}\bigl(\frac{34}{3}N^2\bigr)$ として
   $\bar s_2=\frac{21}{44}-\frac{b_1}{2b_0^2}=\frac{27}{484}$ を確かめよ。また $\bar s_1=\frac{7}{22}+\frac{\gamma_E}{2}-\ln2$ を数値で求めよ。
3. $\alpha_U$ は $O(g^2)$ から、$\alpha_E$ は $O(g^0)$ から始まる。この違いの物理的理由を、
   トレースアノマリー $T_{\mu\mu}\propto\beta(g)F^aF^a$ と関連づけて説明せよ。

### 演習 12 ★ 熱力学と Stefan–Boltzmann 極限
1. $\varepsilon=-\langle T_{00}\rangle$, $p=\langle T_{11}\rangle$（Euclid, 等方性 $\langle T_{11}\rangle=\langle T_{22}\rangle=\langle T_{33}\rangle$）から
   $\varepsilon-3p=-\langle T_{\mu\mu}\rangle$, $\varepsilon+p=\langle T_{11}-T_{00}\rangle$ を示せ。
2. 熱力学関係式 $s=\partial p/\partial T$, $\varepsilon=Ts-p$ から $\varepsilon+p=Ts$ を確かめよ。
3. 自由な $SU(3)$ グルーオン気体の $p/T^4$, $\varepsilon/T^4$, $s/T^3$ を求めよ（偏極自由度に注意）。
4. 有限温度で EMT を測るとき、なぜ $\sqrt{8t}\lesssim1/(2T)$ 程度に制限されるのか。$N_t$（時間方向格子点数）との関係で説明せよ。

### 演習 13 💻 2次元 U(1) の Wilson フローとトポロジー
2次元 U(1) 格子ゲージ理論（作用 $S=\beta\sum_x(1-\cos\theta_p(x))$）について：

1. リンク角 $\theta_\mu(x)$ に対する Wilson フロー方程式 $\dot\theta_\mu(x)=-\beta^{-1}\partial S/\partial\theta_\mu(x)$ を具体的に書け。
2. Metropolis 法で配位を生成し、フローを適用して
   $Q_{\sin}=\frac{1}{2\pi}\sum_x\sin\theta_p(x)$ の値がフロー時間とともに整数に近づくことを確かめよ。
3. 幾何学的定義 $Q_{\rm geo}=\frac{1}{2\pi}\sum_x\arg e^{i\theta_p(x)}$ と比較し、
   $t=0$ での $Q_{\rm geo}$ とフロー後の $Q$ が異なる配位があればその理由を考えよ。
4. （発展）$\beta$ を大きくして $\chi_t a^2=\langle Q^2\rangle/V$ を測り、連続極限の値 $\chi_t a^2\to1/(4\pi^2\beta)$ と比べよ。

### 演習 14 ★★★ 小フロー時間展開の1次計算（発展）
自由スカラー場の合成演算子 $\phi(t,x)^2$ を考える（$D=4$, 質量 $m$）。

1. $\langle\phi(t,x)^2\rangle$ を $t\to0$ で展開し、
   $\langle\phi(t,x)^2\rangle=\frac{1}{32\pi^2t}+\frac{m^2}{16\pi^2}\bigl[\ln(2m^2t)+\gamma_E\bigr]+O(t)$ を示せ
   （ヒント：$\int_0^\infty du\,e^{-u}\ln u=-\gamma_E$、指数積分の展開）。
2. 次元正則化 $\overline{\rm MS}$ の $\langle[\phi^2]_R(\mu)\rangle=\frac{m^2}{16\pi^2}\bigl[\ln(m^2/\mu^2)-1\bigr]$ を用いて、
   $\phi(t,x)^2=c_1(t)\,\mathbb 1+c_2(t)[\phi^2]_R(\mu)+O(t)$ の係数 $c_1,c_2$ を（この次数で）決定せよ。
3. この結果が、ノート §8.1 の「フローした演算子は繰り込まれた演算子と恒等演算子の線形結合で書ける」という主張の
   最も簡単な例になっていることを説明せよ。

---

## 解答例

### 解答 1
1. $\partial_tK_t=\bigl(-\frac{D}{2t}+\frac{x^2}{4t^2}\bigr)K_t$。一方 $\partial_\mu K_t=-\frac{x_\mu}{2t}K_t$,
   $\partial^2K_t=\bigl(-\frac{D}{2t}+\frac{x^2}{4t^2}\bigr)K_t$。よって一致。規格化はガウス積分
   $\int d^Dx\,e^{-x^2/4t}=(4\pi t)^{D/2}$ から。$t\to0$ で幅 $\to0$、積分は 1 のままなので $\delta$ 関数に収束。
2. ガウス関数のフーリエ変換で $\tilde K_t(p)=e^{-tp^2}$。畳み込みはフーリエ空間で積になり
   $e^{-tp^2}e^{-sp^2}=e^{-(t+s)p^2}$。
3. 各成分は分散 $2t$ の正規分布なので $\langle x_\mu^2\rangle=2t$、和をとって $2Dt$。$D=4$ で $\sqrt{\langle x^2\rangle}=\sqrt{8t}$。

### 解答 2
1. $\phi(t,x)=\int_pe^{ipx}e^{-tp^2}\tilde\phi(p)$ より
   $\langle\phi(t,x)\phi(s,y)\rangle=\int\frac{d^Dp}{(2\pi)^D}\frac{e^{ip(x-y)}e^{-(t+s)p^2}}{p^2+m^2}$。
2. $x=y$, $s=t$, $m=0$, $D=4$：$d^4p=2\pi^2p^3dp$ より
   $$\frac{2\pi^2}{(2\pi)^4}\int_0^\infty dp\,p\,e^{-2tp^2}=\frac{1}{8\pi^2}\cdot\frac{1}{4t}=\frac{1}{32\pi^2t}.$$
3. $t\to0$ で $1/t$ で発散する。これは通常の $\langle\phi(x)^2\rangle$ の2次発散 $\Lambda^2$ に対応し、
   $1/t\leftrightarrow\Lambda^2$（正確には $1/(8t)\sim\mu^2$）の対応がある。$t>0$ では指数因子 $e^{-2tp^2}$ が
   高運動量を切るので有限。

### 解答 3
1. $B^\Lambda_\mu=\Lambda B_\mu\Lambda^{-1}+\Lambda\partial_\mu\Lambda^{-1}$ のとき $G^\Lambda_{\mu\nu}=\Lambda G_{\mu\nu}\Lambda^{-1}$,
   $D^\Lambda_\nu(\Lambda X\Lambda^{-1})=\Lambda(D_\nu X)\Lambda^{-1}$。よって
   右辺は $\Lambda(D_\nu G_{\nu\mu})\Lambda^{-1}$。左辺は $\Lambda$ が $t$ に依存しないので
   $\partial_tB^\Lambda_\mu=\Lambda(\partial_tB_\mu)\Lambda^{-1}$。両辺が一致。
2. $\omega\equiv\dot\Lambda\Lambda^{-1}$ とおくと
   $\partial_t(\Lambda B_\mu\Lambda^{-1})=\Lambda(\partial_tB_\mu)\Lambda^{-1}+[\omega,\Lambda B_\mu\Lambda^{-1}]$,
   $\partial_t(\Lambda\partial_\mu\Lambda^{-1})=[\omega,\Lambda\partial_\mu\Lambda^{-1}]-\partial_\mu\omega$。足し合わせて
   $$\partial_tB^\Lambda_\mu=\Lambda(\partial_tB_\mu)\Lambda^{-1}-D^\Lambda_\mu\omega .$$
   第1項は (1) と同様に $D^\Lambda_\nu G^\Lambda_{\nu\mu}$ に等しい。$\omega=-\alpha_0\partial_\nu B^\Lambda_\nu$ と選べば
   $\partial_tB^\Lambda_\mu=D^\Lambda_\nu G^\Lambda_{\nu\mu}+\alpha_0D^\Lambda_\mu\partial_\nu B^\Lambda_\nu$。
3. $\alpha_0\ne0$ の解は $\alpha_0=0$ の解の（$t$ 依存）ゲージ変換なので、ゲージ不変な汎関数の値は同じ。期待値も $\alpha_0$ に依存しない。

### 解答 4
$\frac{d}{dt}S=\int d^Dx\,\frac{\delta S}{\delta B^a_\mu}\partial_tB^a_\mu$。$\alpha_0=0$ では
$\partial_tB^a_\mu=-g_0^2\delta S/\delta B^a_\mu$ なので $\frac{dS}{dt}=-g_0^2\int(\delta S/\delta B^a_\mu)^2\le0$。
等号は $D_\nu G_{\nu\mu}=0$、つまり $B_t$ が古典的運動方程式の解（停留点）のとき。
$\alpha_0\neq0$ では解がゲージ変換で結ばれ（演習 3）、$S$ はゲージ不変なので $S[B_t]$ は同じ関数になり、やはり単調減少。

### 解答 5
1. $D_\nu G_{\nu\mu}=\partial_\nu(\partial_\nu B_\mu-\partial_\mu B_\nu)+O(B^2)$, $D_\mu\partial_\nu B_\nu=\partial_\mu\partial_\nu B_\nu+O(B^2)$。
2. フーリエ空間で $\partial_t\tilde B_\mu=-[p^2\delta_{\mu\nu}+(\alpha_0-1)p_\mu p_\nu]\tilde B_\nu=-p^2[P^T+\alpha_0P^L]_{\mu\nu}\tilde B_\nu$。
   $P^{T,L}$ は直交射影子なので指数関数は各射影子ごとに $e^{-tp^2}$, $e^{-\alpha_0tp^2}$ となる。
3. $\tilde G_{\mu\nu}=i(p_\mu\tilde B_\nu-p_\nu\tilde B_\mu)$ で、$P^L$ 部分は $p_\nu$ に比例するので反対称化で消える。
   よって $\tilde G_{\mu\nu}=i(p_\mu P^T_{\nu\rho}-p_\nu P^T_{\mu\rho})e^{-tp^2}\tilde A_\rho$ は $\alpha_0$ に依らない。

### 解答 6
最低次では $G^a_{\mu\nu}=\partial_\mu B^a_\nu-\partial_\nu B^a_\mu$, $\tilde B=e^{-tp^2}P^T\tilde A+\cdots$（$P^L$ は消える）。
$$\langle G^a_{\mu\nu}G^a_{\mu\nu}\rangle=\int_p e^{-2tp^2}\,(N^2-1)\,g_0^2\,\frac{2(p^2\delta_{\nu\rho}-p_\nu p_\rho)P^T_{\nu\rho}}{p^2}
=2(D-1)(N^2-1)g_0^2\int_pe^{-2tp^2}.$$
$\xi P^L$ 部分は $p^2\delta_{\nu\rho}-p_\nu p_\rho$ に縮約すると 0 なので $\xi$ に依らない。
$\int\frac{d^Dp}{(2\pi)^D}e^{-2tp^2}=(8\pi t)^{-D/2}$ より
$$\langle E\rangle=\frac{(D-1)(N^2-1)g_0^2}{2(8\pi t)^{D/2}}\ \xrightarrow{D=4}\ \frac{3(N^2-1)g_0^2}{2\cdot64\pi^2t^2}=\frac{3(N^2-1)g_0^2}{128\pi^2t^2}.$$

### 解答 7
1. $k_1=4\pi c_1$。$N=3$：$\frac{11}{3}\gamma_E+\frac{52}{9}-3\ln3=2.1165+5.7778-3.2958=4.5985$、$\times3=13.795$、
   $/16\pi^2\times4\pi=13.795/(4\pi)=1.0978$。フレーバー部分：$\frac23\gamma_E+\frac49-\frac43\ln2=0.3848+0.4444-0.9242=-0.0950$、
   $-N_f\times(-0.0950)/(4\pi)=+0.0076N_f$。よって $N_f=0$: $1.0978$, $N_f=3$: $\approx1.120$。
2. $0.3=\frac{3}{4\pi}\alpha(1+1.0978\alpha)\Rightarrow1.0978\alpha^2+\alpha-1.2566=0\Rightarrow\alpha\simeq0.71$。
   1ループ補正 $k_1\alpha\approx0.78$ が 1 と同程度なので摂動論は信頼できない。$t_0$ は **非摂動的に** 定義された
   ハドロンスケールであり、だからこそ格子で決める意味がある。
3. $\sqrt{8t_0}=2.828\times0.1465=0.414$ fm、$\mu=0.1973/0.414\simeq0.48$ GeV。

### 解答 8
1. $\mu^2=1/(8t)$ より $t\frac{d}{dt}=-\mu^2\frac{d}{d\mu^2}$。$\mu^2\frac{d\alpha}{d\mu^2}=-4\pi b_0\alpha^2$ なので
   $t\frac{dF}{dt}=\frac{3}{4\pi}\cdot4\pi b_0\alpha^2=3b_0\alpha^2$（木レベル+1ループランニング）。
   このように $tdF/dt$ は $F$ と異なる関数だが、どちらも $t$ の単調関数なので基準値で $t$ を定義できる。
2. $t\frac{d}{dt}F_{\rm lat}=tF'\,(1+ca^2/t)-cF\,a^2/t=tF'\Bigl[1+\frac{ca^2}{t}\Bigl(1-\frac{F}{tF'}\Bigr)\Bigr]$。
   相対的な格子アーティファクトは $F$ では $ca^2/t$、$tF'$ では $ca^2/t\,(1-F/tF')$ となり、
   $F$ と $tF'$ の比に応じて部分的に打ち消し合う（この単純なモデルでは $F/tF'=1/(4\pi b_0\alpha)$）。
   より本質的には、$F(t)$ は熱核で平滑化していても短距離（$a^2/t$ の大きい領域）の寄与を含むのに対し、
   その対数微分は $t$ の近傍での変化だけで決まる「より局所的な」量である。
   実際、BMW [8] は $w_0$ の方が $t_0$ より $a^2$ 依存性が小さいことを数値的に示した。
### 解答 9
1. $\epsilon_{\mu\nu\rho\sigma}\operatorname{tr}(F_{\mu\nu}F_{\rho\sigma})=4\epsilon_{\mu\nu\rho\sigma}\partial_\mu\operatorname{tr}\bigl(A_\nu\partial_\rho A_\sigma+\frac23A_\nu A_\rho A_\sigma\bigr)$。
   すなわち $K_\mu=4\epsilon_{\mu\nu\rho\sigma}\operatorname{tr}(A_\nu\partial_\rho A_\sigma+\frac23A_\nu A_\rho A_\sigma)$。
   （$\operatorname{tr}(A\wedge A\wedge A\wedge A)=0$ を巡回性と $\epsilon$ の反対称性から使う。）
2. $0\le\int(F^a_{\mu\nu}\mp\tilde F^a_{\mu\nu})^2=2\int F^aF^a\mp2\int F^a\tilde F^a$。
   $\int F^a\tilde F^a=\frac12\int\epsilon F^aF^a=32\pi^2Q$ より $\frac14\int F^aF^a\ge8\pi^2|Q|$、つまり
   $S_{\rm YM}\ge8\pi^2|Q|/g_0^2$。等号は $F=\pm\tilde F$（(反)自己双対）。
3. 連続理論ではインスタントンの作用 $8\pi^2/g_0^2$ はスケール不変で、フローは $Q$ を保つ。格子上では
   作用が $\rho/a$ に依存し（Wilson 作用では $\rho$ が小さいほど作用が下がる）、フローで $\rho$ が縮み、
   $\rho\sim a$ になると格子の「穴」をすり抜けて消える（$Q$ が変わる）。$\rho\gg a$ のインスタントンは
   $\sqrt{8t}\ll\rho$ の範囲ではほぼ安定。$a\to0$ でこのような事象は抑制され、トポロジカルセクターが分離する [2]。

### 解答 10
$m_\eta^2+m_{\eta'}^2-2m_K^2=0.3002+0.9174-0.4914=0.7262$ GeV$^2$。
$f_\pi^2/6=0.008538/6=1.423\times10^{-3}$ GeV$^2$。積は $1.033\times10^{-3}$ GeV$^4$、$\chi_t^{1/4}\simeq0.179$ GeV $\approx180$ MeV。
格子の SU(3) 純ゲージ理論の値（$\chi_t^{1/4}\approx190$ MeV 程度）と同程度であり、大 $N$ 展開がよく機能していることを示す。

### 解答 11
1. $U_{\mu\mu}=G^a_{\mu\rho}G^a_{\mu\rho}-\frac{4}{4}G^aG^a=0$。よって $T^R_{\mu\mu}=\lim\frac{4}{4\alpha_E}(E-\langle E\rangle_0)$。
2. $b_0=\frac{11}{(4\pi)^2}$, $b_1=\frac{102}{(4\pi)^4}$（$N=3$, $N_f=0$）。$\frac{b_1}{2b_0^2}=\frac{102}{2\cdot121}=\frac{51}{121}$。
   $\frac{21}{44}-\frac{51}{121}=\frac{231-204}{484}=\frac{27}{484}\simeq0.0558$。
   $\bar s_1=0.31818+0.28861-0.69315\simeq-0.0864$。
3. $U_{\mu\nu}$（トレースレス部分）は古典的にも存在する：古典 EMT は $\frac{1}{g^2}\times$（$F$ の2次形式）なので、
   $G$ に $g$ を含む規格化では係数は $1/g^2$、すなわち $\alpha_U\sim g^2$。一方トレース部分は古典的には 0（共形不変性）で、
   量子的なトレースアノマリー $T_{\mu\mu}=-\frac{\beta(g)}{2g^3}F^aF^a$（$F$ は $g$ を含む規格化、$\beta=-b_0g^3+\cdots$）
   すなわち $T_{\mu\mu}\simeq\frac{b_0}{2}F^aF^a=2b_0E$ によってのみ生じる。そのため $1/\alpha_E\propto b_0$ となり、$\alpha_E=O(g^0)$ から始まる。

### 解答 12
1. $\langle T_{\mu\mu}\rangle=\langle T_{00}\rangle+3\langle T_{11}\rangle=-\varepsilon+3p$。また $\langle T_{11}-T_{00}\rangle=p+\varepsilon$。
2. $\varepsilon=Ts-p$ そのもの（自由エネルギー密度 $f=-p$, $s=-\partial f/\partial T$）。
3. 自由度 $2\times(N^2-1)=16$。$p=16\cdot\frac{\pi^2}{90}T^4$：$p/T^4=\frac{8\pi^2}{45}\simeq1.755$、
   $\varepsilon=3p$：$\varepsilon/T^4\simeq5.26$、$s/T^3=4p/T^4\simeq7.02$。
4. 時間方向の長さは $1/T=N_ta$。平滑化半径 $\sqrt{8t}$ が $1/(2T)$ を超えると、周期境界の両側の場が混ざり、
   小フロー時間展開（$T$ に依らない係数 $c_i(t)$）の前提が崩れる。よって $\sqrt{8t}\lesssim N_ta/2$。
   一方 $t\gg a^2$ も必要なので、$N_t$ が小さい（高温・粗い格子）ほど窓が狭くなる [13]。

### 解答 13
1. 0 方向を $\hat1$, 1 方向を $\hat2$ として $\theta_p(x)=\theta_1(x)+\theta_2(x+\hat1)-\theta_1(x+\hat2)-\theta_2(x)$。
   $$\dot\theta_1(x)=-\bigl[\sin\theta_p(x)-\sin\theta_p(x-\hat2)\bigr],\qquad
   \dot\theta_2(x)=-\bigl[\sin\theta_p(x-\hat1)-\sin\theta_p(x)\bigr].$$
   U(1) は可換で群多様体が平坦（角度の空間）なので、通常の Runge–Kutta で積分してよい。
2. 解答例コード [`code/wilson_flow_u1_2d.py`](code/wilson_flow_u1_2d.py)。$L=16$, $\beta=2$, 12配位の実行例：

   ```
   # 整数からのずれ  <|Q_sin - round(Q_sin)|>  (フローで 0 に近づく)
   t =  0.0:  0.3162
   t =  0.5:  0.2303
   t =  1.0:  0.0879
   t =  2.0:  0.0117
   t =  4.0:  0.0059
   ```
   フロー時間 $t\gtrsim2$（平滑化半径 $\sqrt{4t}\approx3a$, 2次元なので $\sqrt{2Dt}=\sqrt{4t}$）で $Q_{\sin}$ はほぼ整数になる。
3. 実行例の一部の配位で $Q_{\rm geo}(t=0)$ とフロー後の $Q$ が 1 だけ異なる。これは $\theta_p\approx\pm\pi$ 付近の
   格子サイズの「転位（dislocation）」で、作用が小さく、フローで消える（または生じる）紫外の構造である。
   $\beta\to\infty$（連続極限）でこのような配位は $e^{-2\beta}$ のように抑制され、両者は一致する。
4. $\beta=1/(e^2a^2)$ で連続極限の $\chi_t=e^2/(4\pi^2)$、すなわち $\chi_ta^2\to1/(4\pi^2\beta)$。
   $\beta$ を大きくすると Metropolis での $Q$ の自己相関時間が急増する（トポロジーの凍結の 2 次元版）ことにも注意。

### 解答 14
1. $\langle\phi(t,x)^2\rangle=\frac{1}{8\pi^2}\int_0^\infty dp\,\frac{p^3e^{-2tp^2}}{p^2+m^2}$。$u=p^2$ として
   $=\frac{1}{16\pi^2}\int_0^\infty du\,\frac{u\,e^{-2tu}}{u+m^2}=\frac{1}{16\pi^2}\Bigl[\frac{1}{2t}-m^2e^{2tm^2}E_1(2tm^2)\Bigr]$。
   $E_1(z)=-\gamma_E-\ln z+O(z)$ より
   $=\frac{1}{32\pi^2t}+\frac{m^2}{16\pi^2}\bigl[\ln(2m^2t)+\gamma_E\bigr]+O(t)$。
2. $\langle\phi(t)^2\rangle=c_1(t)+c_2(t)\frac{m^2}{16\pi^2}[\ln(m^2/\mu^2)-1]$。$m^2\ln m^2$ の係数比較で $c_2=1+O(\lambda)$（自由場では厳密に 1）。
   残りを比較して
   $$c_1(t)=\frac{1}{32\pi^2t}+\frac{m^2}{16\pi^2}\bigl[\ln(2\mu^2t)+\gamma_E+1\bigr].$$
   （$m^2$ を含む $c_1$ の項は、厳密には $m^2\mathbb 1$ という次元2の演算子との混合と読む。）
3. フローした $\phi^2$（有限・正則化非依存）が、恒等演算子（$1/t$ の発散的係数を持つ）と繰り込まれた $[\phi^2]_R$ の
   線形結合で書け、係数は短距離の量（$\ln(\mu^2t)$）にのみ依存する。相互作用がある場合、係数は $\mu\sim1/\sqrt{8t}$ での
   摂動論で計算でき、これがゲージ理論の EMT 公式（§8.2）と同じ論理構造である。
