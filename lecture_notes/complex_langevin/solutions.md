# 演習問題の解答

問題文は [`exercises.md`](exercises.md)。数値は `code/cl_toy_models.py` を乱数種 12345 で実行したもの。

---

## 第0講

**0.1** 行列式は相似変換で不変なので $\det M(\mu)=\det(\gamma_5M(\mu)\gamma_5)=\det M(-\mu^*)^\dagger=[\det M(-\mu^*)]^*$。両辺の複素共役をとれば $[\det M(\mu)]^*=\det M(-\mu^*)$。
* $\mu=i\nu$（$\nu$ 実）なら $-\mu^*=-(-i\nu)=i\nu=\mu$ なので $[\det M]^*=\det M$、すなわち実数。
* 実の $\mu\ne0$ では $-\mu^*=-\mu\ne\mu$ なので、$\det M(\mu)$ と $\det M(-\mu)$ が一般に異なり、$\det M(\mu)$ は複素数になる（$\mu\to-\mu$ は粒子と反粒子の入れ替え）。

**0.2**
(a) $e^{i\varphi}$ の各成分の分散は $O(1)$ なので、平均の推定誤差は $\sim1/\sqrt N$。相対誤差は $e^{V\Delta f/T}/\sqrt N$。
(b) $e^{V\Delta f/T}/\sqrt N=0.1\Rightarrow N=100\,e^{2V\Delta f/T}$。

| $V\Delta f/T$ | 必要な $N$ |
|---|---|
| 5 | $\approx 2\times10^{6}$ |
| 10 | $\approx 5\times10^{10}$ |
| 20 | $\approx 2\times10^{19}$ |

体積を 2 倍にすると指数が 2 倍になる。これが「指数関数的に難しい」の意味である。
(c) CL は複素重みを確率として使わない（打ち消し合う符号を平均しない）ため。1 ステップのコストは $\mu$ をパラメータとして含む同じドリフト計算で、$\mu=0$ とほぼ同じ。

---

## 第1講

**1.1** $P=\psi e^{-S/2}$ とすると
$(\partial_x+S')P=(\psi'+\tfrac12S'\psi)e^{-S/2}=(Q\psi)e^{-S/2}$。
さらに $\partial_x[(Q\psi)e^{-S/2}]=[(Q\psi)'-\tfrac12S'(Q\psi)]e^{-S/2}=-(Q^\dagger Q\psi)\,e^{-S/2}$、ただし $Q^\dagger=-\partial_x+\tfrac12S'$。左辺 $\partial_\theta P=(\partial_\theta\psi)e^{-S/2}$ と比べて $\partial_\theta\psi=-Q^\dagger Q\psi$。
展開すると
$$Q^\dagger Q\psi=-\psi''-\tfrac12S''\psi-\tfrac12S'\psi'+\tfrac12S'\psi'+\tfrac14S'^2\psi=\Bigl(-\partial_x^2+\tfrac14S'^2-\tfrac12S''\Bigr)\psi .$$
$\langle\psi,Q^\dagger Q\psi\rangle=\|Q\psi\|^2\ge0$ より固有値は非負。固有値 0 ⇔ $Q\psi=0$ ⇔ $\psi'=-\tfrac12S'\psi$ ⇔ $\psi\propto e^{-S/2}$。よって $P\to\psi_0e^{-S/2}\propto e^{-S}$。
（この証明は $S$ が実で $Q^\dagger$ が上の形になることを使っている。$S$ が複素だと $H_{FP}$ はエルミートでなく、スペクトルの議論が成り立たない。）

**1.2** $x(\theta)=x_0e^{-m\theta}+\int_0^\theta e^{-m(\theta-s)}\eta(s)\,ds$。よって
$\langle x(\theta)\rangle=x_0e^{-m\theta}$、
$\mathrm{Var}=2\int_0^\theta e^{-2m(\theta-s)}ds=\dfrac{1-e^{-2m\theta}}{m}\to\dfrac1m$。
厳密値 $\int x^2e^{-mx^2/2}/\int e^{-mx^2/2}=1/m$ に一致。平均の緩和時間は $1/m$（分散は $1/2m$）。

**1.3** $v_{n+1}=(1-\epsilon m)^2v_n+2\epsilon$ の固定点は
$$v_\infty=\frac{2\epsilon}{1-(1-\epsilon m)^2}=\frac{1}{m\,(1-\epsilon m/2)}=\frac1m\Bigl(1+\frac{\epsilon m}{2}+O(\epsilon^2)\Bigr).$$
$\epsilon m>2$ では $|1-\epsilon m|>1$ となり、反復が発散する（数値的不安定性）。CL では $|S''|$ が大きい領域に入ると同じことが起き、これが適応ステップ幅 [AJSS09] の動機となる。

---

## 第2講

**2.1**
(a) $-S'(z)=-\sigma z=-(a+ib)(x+iy)=-(ax-by)-i(bx+ay)$ より
$$\dot x=-(ax-by)+\eta,\qquad \dot y=-(bx+ay),\qquad A=\begin{pmatrix}a&-b\\ b&a\end{pmatrix}.$$
(b) $AC+CA^T=B=\mathrm{diag}(2,0)$ の各成分：
* (1,1): $2(aC_{xx}-bC_{xy})=2$
* (2,2): $2(bC_{xy}+aC_{yy})=0$
* (1,2): $2aC_{xy}+b(C_{xx}-C_{yy})=0$

(2,2) から $C_{yy}=-bC_{xy}/a$、(1,1) から $C_{xx}=(1+bC_{xy})/a$。これを (1,2) に入れて $C_{xy}\,2(a^2+b^2)/a=-b/a$、よって
$$\langle xy\rangle=-\frac{b}{2|\sigma|^2},\quad \langle y^2\rangle=\frac{b^2}{2a|\sigma|^2},\quad \langle x^2\rangle=\frac{2a^2+b^2}{2a|\sigma|^2}.$$
(c) $\langle z^2\rangle=\langle x^2\rangle-\langle y^2\rangle+2i\langle xy\rangle=\dfrac{a}{|\sigma|^2}-\dfrac{ib}{|\sigma|^2}=\dfrac{\bar\sigma}{|\sigma|^2}=\dfrac1\sigma$。
数値（表 4.1）でも $\sigma=1+i$ で $\langle y^2\rangle_{\rm CL}=0.251$（解析値 0.25）、$\sigma=1+3i$ で 0.455（解析値 0.45）。
(d) $-A$ の固有値は $-a\pm ib$。$a<0$ では実部が正で、軌道は指数関数的に発散し定常分布が存在しない。このときもとの積分 $\int e^{-\sigma x^2/2}dx$ も発散しているので、CL が答えを出せないのは整合的である。

**2.2** $B=\mathrm{diag}(2N_R,2N_I)$ として同様に解くと
(1,1): $aC_{xx}-bC_{xy}=N_R$、(2,2): $bC_{xy}+aC_{yy}=N_I$、(1,2) は同じ。
$C_{xx}=(N_R+bC_{xy})/a$, $C_{yy}=(N_I-bC_{xy})/a$ を (1,2) に代入すると $C_{xy}\cdot2|\sigma|^2/a=-b(N_R-N_I)/a=-b/a$。よって $C_{xy}$ は $N_I$ によらず、
$$C_{xx}-C_{yy}=\frac{N_R-N_I+2bC_{xy}}{a}=\frac{a}{|\sigma|^2},\qquad \langle z^2\rangle=\frac1\sigma .$$
一方 $\langle y^2\rangle=\dfrac{1}{a}\Bigl(N_I+\dfrac{b^2}{2|\sigma|^2}\Bigr)$ は $N_I$ とともに増える。虚方向に広がるほど $P$ の裾が重くなり、境界項の問題や統計揺らぎ（$|e^{iz}|=e^{-y}$ などの観測量の分散）が悪化するので、$N_I=0$ が好まれる [ASS09]。

**2.3** 実行例：

```
sigma = (1+1j)   CL <z^4> = -0.0017-1.5138j +- 0.0200   exact 3/sigma^2 = -1.5000j
sigma = (1+3j)   CL <z^4> = -0.2460-0.1823j +- 0.0045   exact 3/sigma^2 = -0.2400-0.1800j
```

おおむね誤差内で一致。$\sigma=1+3i$ の小さなずれ（1σ 強）は、Euler 離散化の $O(\epsilon)$ 誤差（演習 1.3 と同種）と、有限個のビンによる誤差評価の粗さが考えられる。$\epsilon$ を変えて $\epsilon\to0$ 外挿すれば確認できる。

---

## 第3講

**3.1** $f$ が正則なら $\partial_xf=f'$, $\partial_yf=if'$, $\partial_x^2f=f''$, $\partial_y^2f=-f''$。よって $N_R\partial_x^2f+N_I\partial_y^2f=(N_R-N_I)f''=f''$。ドリフト項も $K_x\partial_xf+K_y\partial_yf=(K_x+iK_y)f'=-S'(z)f'$。したがって $Lf=f''-S'f'=(\partial_z-S')\partial_zf=\tilde Lf$。

**3.2** $\int dx\,\partial_x(O'e^{-S})=\int dx\,(O''-S'O')e^{-S}=0$（境界で $O'e^{-S}\to0$ のとき）。これは $\langle\tilde LO\rangle_{\rm exact}=0$ に他ならない。CL の定常状態で $\langle\tilde LO\rangle_P=0$ が成り立つことは、正しい期待値が満たす無限個の Schwinger–Dyson 方程式を CL の期待値も満たすことを意味する。
(a) $O=z^n$：$n(n-1)\langle z^{n-2}\rangle-\sigma\langle z^n\rangle=0$ より $\langle z^n\rangle=\frac{n-1}{\sigma}\langle z^{n-2}\rangle$。$\langle z^0\rangle=1$ から $\langle z^2\rangle=1/\sigma$, $\langle z^4\rangle=3/\sigma^2$。
(b) $O=z^2$：$O''=2$, $O'=2z$ より $2-2\langle z(\sigma z+\lambda z^3)\rangle=0$、すなわち $\sigma\langle z^2\rangle+\lambda\langle z^4\rangle=1$。

**3.3**
(a) $\sigma=1+i$：$(1+i)(0.4298-0.1486i)+(0.4264-0.2825i)=1.005-0.001i\approx1$ ✓。
$\sigma=-1+4i$：$\langle z^4\rangle_{\rm CL}\sim10^5$ 程度の値となり、恒等式は全く満たされない ✗。
(b) $|K|$ の分布：

| | 99% 分位点 | 99.9% 分位点 | 99.99% 分位点 |
|---|---|---|---|
| $\sigma=1+i$ | 5.4 | 8.2 | 10.8 |
| $\sigma=-1+4i$ | $1.2\times10^4$ | $7.9\times10^5$ | $7.6\times10^6$ |

前者は裾が急に切れている（指数関数的以上の減衰）。後者は $|K|$ の桁が分位点ごとに 1〜2 桁ずつ伸びる冪的な裾で、[NNS16] の条件を満たさない。判定条件が「正しい／誤り」をきちんと区別している。

**3.4** $L^TP=\partial_x J_x+\partial_yJ_y$、$J_x=N_R\partial_xP-K_xP$、$J_y=N_I\partial_yP-K_yP$ と書く。$y\in[-Y,Y]$ で部分積分すると
$$-\int(L^TP)\,O=\int P\,(LO)-\int dx\Bigl[J_yO-N_IP\,\partial_yO\Bigr]_{y=-Y}^{y=Y}$$
（$x$ が周期的またはそこでの減衰が十分なら $x$ 方向の表面項は消える）。したがって
$$\partial_\tau F=-\int dx\Bigl[\bigl(N_I\partial_yP-K_yP\bigr)O-N_IP\,\partial_yO\Bigr]_{-Y}^{Y}\;\xrightarrow{N_I=0}\;\int dx\,\Bigl[K_y\,P\,O(x+iy;\tau)\Bigr]_{y=-Y}^{y=Y}.$$
$Y\to\infty$ でこれが 0 になる必要がある。$O(z;\tau)\sim e^{c|y|}$ で、$K_y$ が多項式的に増えるなら、$P(x,y)$ は $e^{-c|y|}\times(\text{多項式})^{-1}$ より速く減衰しなければならない。実際には $\tau$ とともに $O(z;\tau)$ の増大度も変わり得るため、すべての $\tau$ で一様に必要で、冪的減衰では不十分である [ASS09, SSSS18]。ドリフトの極がある場合は、極を囲む小円上でも同様の表面項が現れる。

---

## 第4講

**4.1** $S'(z)=\sigma z+\lambda z^3=0$ より $z=0$ と $z=\pm\sqrt{-\sigma/\lambda}$。
固定点 $z^*$ の近傍で $\delta\dot z=-S''(z^*)\delta z$、$S''(z)=\sigma+3\lambda z^2$。
* $z^*=0$：$S''=\sigma$、$\mathrm{Re}\,\sigma>0$ なので**安定**（引き込む）。
* $z^{*2}=-\sigma/\lambda$：$S''=\sigma-3\sigma=-2\sigma$、$\mathrm{Re}(-S'')=2\mathrm{Re}\,\sigma>0$ で**不安定**（反発）。

$\sigma=1+i$, $\lambda=1$：$-1-i=\sqrt2e^{-3\pi i/4}$ より $z^*=\pm2^{1/4}e^{-3\pi i/8}=\pm(0.455-1.099i)$。
数値では分布は $|y|<0.3$ に収まっており、不安定固定点（$|y|\approx1.1$）まで届かない。引き込み固定点のまわりの帯に分布が閉じ込められていることが成功と結びついている。

**4.2** $\cos(x-i\mu)=\cos x\cosh\mu+i\sin x\sinh\mu$。$e^{\beta\cos x}$ は偶関数なので $\int e^{\beta\cos x}\sin x=0$、$\frac1{2\pi}\int e^{\beta\cos x}\cos x=I_1$。よって $Z/2\pi=I_0+\kappa\cosh\mu\,I_1$。
分子は
$$\frac1{2\pi}\int e^{\beta\cos x}e^{ix}\bigl[1+\kappa(\cos x\cosh\mu+i\sin x\sinh\mu)\bigr]dx .$$
$\frac1{2\pi}\int e^{\beta\cos x}\cos x\,e^{ix}=\frac1{2\pi}\int e^{\beta\cos x}\cos^2x=\frac{I_0+I_2}{2}$、
$\frac1{2\pi}\int e^{\beta\cos x}\sin x\,e^{ix}=\frac{i}{2\pi}\int e^{\beta\cos x}\sin^2x=i\frac{I_0-I_2}{2}$。
したがって分子 $=I_1+\kappa\Bigl[\cosh\mu\frac{I_0+I_2}{2}-\sinh\mu\frac{I_0-I_2}{2}\Bigr]=I_1+\frac\kappa2\bigl(e^{-\mu}I_0+e^{\mu}I_2\bigr)$。
$x\to-x$ で $\rho$ は $\mu\to-\mu$ となるので
$$\langle e^{-ix}\rangle=\frac{I_1+\frac\kappa2(e^{\mu}I_0+e^{-\mu}I_2)}{I_0+\kappa\cosh\mu\,I_1}.$$
$\beta=0$（$I_0=1$, $I_1=I_2=0$）：$\langle e^{ix}\rangle=\frac\kappa2e^{-\mu}$, $\langle e^{-ix}\rangle=\frac\kappa2e^{\mu}$。$\mu\ne0$ では $\langle e^{ix}\rangle\ne\langle e^{-ix}\rangle^*$ となり、確率分布では不可能な関係（"粒子と反粒子の非対称"）が現れる。
数値確認：$(\beta,\kappa,\mu)=(1,0.25,1)$ で $I_0=1.2661, I_1=0.5652, I_2=0.1357$ を入れると $0.4511$, $0.6749$。

**4.3**
(a) $\cos(z-i\mu)=-1/\kappa$ より $z=\pm w+i\mu+2\pi n$、$w=\arccos(-1/\kappa)$。
* $\kappa>1$：$w\in(\pi/2,\pi)$ は実数。零点は $\mathrm{Im}\,z=\mu$ の直線上（$\kappa=2$ なら $z=\pm2.094+i$）。
* $\kappa<1$：$-1/\kappa<-1$ なので $w=\pi\mp i\,\mathrm{arccosh}(1/\kappa)$。零点は $\mathrm{Re}\,z=\pi$、$\mathrm{Im}\,z=\mu\pm\mathrm{arccosh}(1/\kappa)$（$\kappa=0.25$ なら $\mathrm{Im}\,z\approx 3.06, -1.06$）。

(b) $\mu=0$ なら $1+\kappa\cos x\ge1-\kappa>0$、$e^{\beta\cos x}>0$ なので重みは正。
(c) $\kappa<1$ では零点が実軸から $\mathrm{arccosh}(1/\kappa)$ 程度離れ、$\kappa$ が小さいほど遠い。$\kappa>1$ では零点が $\mathrm{Im}\,z=\mu$ 上に乗り、CL の分布（実部は $[-\pi,\pi]$ 全体に広がり、虚部は $0\sim\mu$ 程度に分布する）に入り込みやすい。したがって $\kappa>1$ で失敗しやすいと予想される（そもそも $\kappa>1$ では $\mu=0$ でも重みが負になる領域があり、「本物の」符号問題をもつ）。

**4.4** 実行例：

```
beta = 1.0, kappa = 0.25:  CL <e^{ix}> = 0.4556 +- 0.0031 (exact 0.4511),  <e^{-ix}> = 0.6776 +- 0.0046 (exact 0.6749)
beta = 0.3, kappa = 2.0 :  CL <e^{ix}> = 0.2551 +- 0.0013 (exact 0.3748),  <e^{-ix}> = 1.1539 +- 0.0098 (exact 1.9692)
```

$\kappa=2$ では誤差 0.001 で 0.255 という「精密に間違った」値が出る。$|K|$ の分布は $\kappa=0.25$ では $|K|>100$ が全くないのに対し、$\kappa=2$ では $[10^3,10^4)$ にも $10^{-6}$ 程度の確率が残る冪的な裾をもつ。極 $1/(z-z_0)$ の近くで $|K|\sim1/r$、極近傍の分布が $P\sim r^{\gamma}$ なら $p(|K|)\sim|K|^{-(3+\gamma)}$ と冪になるのが理由である（$r$ は極からの距離、2 次元の面積要素 $r\,dr$ を使う）。
$\kappa$ を変える課題は各自で。目安として、零点が分布の主要部分に近づく $\kappa\approx1$ 付近から整合性条件・ドリフト分布の両方に異常が現れ始める。

---

## 第5講

**5.1** $H=UU^\dagger$ は正定値エルミートで、固有値 $h_i>0$、$\prod h_i=\det H=|\det U|^2=1$。相加相乗平均より $\frac1N\sum h_i\ge(\prod h_i)^{1/N}=1$。等号は全ての $h_i=1$、すなわち $H=\mathbb 1$（エルミート行列は対角化可能）⇔ $U$ がユニタリ。$\det U=1$ と合わせて $U\in\mathrm{SU}(N)$。

**5.2**
(a) $\Omega^\dagger=e^{\alpha\lambda_a^\dagger}=e^{\alpha\lambda_a}=\Omega\ne\Omega^{-1}$（$\alpha\ne0$）なのでユニタリでない。$\det\Omega=e^{\alpha\,\mathrm{tr}\lambda_a}=1$。
(b) 出ていくリンク：$\mathrm{tr}(\Omega UU^\dagger\Omega^\dagger)=\mathrm{tr}(\Omega^2UU^\dagger)$、$\frac{d}{d\alpha}\big|_0=2\,\mathrm{tr}(\lambda_aUU^\dagger)$。
入ってくるリンク：$\mathrm{tr}(U\Omega^{-1}\Omega^{-1\dagger}U^\dagger)=\mathrm{tr}(\Omega^{-2}U^\dagger U)$、$\frac{d}{d\alpha}\big|_0=-2\,\mathrm{tr}(\lambda_aU^\dagger U)$。
合わせて与式。最急降下は $\alpha_a\propto-G_a$、すなわち $\Omega=\exp(-\epsilon\,\alpha_{gc}G_a\lambda_a)$。
(c) $\Omega\in\mathrm{SU}(N)$ なら $\mathrm{tr}(\Omega UU^\dagger\Omega^\dagger)=\mathrm{tr}(UU^\dagger)$、$\mathrm{tr}(U\Omega^{-1}\Omega U^\dagger)=\mathrm{tr}(UU^\dagger)$ で不変。ユニタリティ・ノルムを変えるには、複素化されたゲージ群の「非コンパクト方向」（エルミート生成子の方向）の変換が必要。それでも作用やゲージ不変な観測量（$U^{-1}$ を用いて書いた Wilson ループのトレースなど）は SL($N$,$\mathbb C$) ゲージ変換で不変なので、物理は変わらない。

**5.3** CL の正当化は作用（ドリフト）と観測量が複素化変数の**正則関数**であることに依存する。$U^\dagger$ の成分は $U$ の成分の複素共役で反正則、一方 $U^{-1}$ の成分は $U$ の成分の多項式（余因子行列、$\det U=1$）で正則。SU($N$) 上で $U^\dagger=U^{-1}$ なので、もとの理論を変えずに正則な延長を作るには $U^{-1}$ を使う：$S_g=\beta\sum_P[1-\frac1{2N}\mathrm{tr}(U_P+U_P^{-1})]$。同様に Dirac 演算子の後ろ向きホッピング項も $U^{-1}_{x-\hat\nu,\nu}$ で書く。

**5.4** $\det e^X=e^{\mathrm{tr}X}$ と $\mathrm{tr}(i\lambda_aK_a)=iK_a\,\mathrm{tr}\lambda_a=0$ より $\det=1$。$\det(VU)=\det V\det U=1$ なので更新後も SL($N$,$\mathbb C$)。

---

## 第6講

**6.1** $\langle\chi^\dagger A\chi\rangle=\sum_{ij}A_{ij}\langle\chi_i^*\chi_j\rangle=\sum_iA_{ii}=\mathrm{tr}A$。
$\xi$ を $M^\dagger\xi=\chi$ の解とすると $\chi^\dagger M^{-1}=\xi^\dagger$。よって $K^{(f)}_{a,x\nu}\approx N_f\,\xi^\dagger(D_{a,x\nu}M)\chi$。$D_{a,x\nu}M$ はリンク $(x,\nu)$ を含むホッピング項だけに非零成分をもつ局所的な行列なので、$\xi$ と $\chi$ が分かれば全リンク・全 $a$ のドリフトを $O(\text{体積})$ の手間で計算できる。必要な線形方程式の求解は 1 回（$M^\dagger M$ に対する CG など）。ノイズ推定の分散は追加のノイズベクトルで減らせるが、ランジュバン時間で平均されるため 1 本で十分なことが多い。

**6.2** $\mathcal P$ の固有値を $p_1,p_2,p_3$（$p_1p_2p_3=1$）とすると
$$\det(1+c\mathcal P)=\prod_i(1+cp_i)=1+c\sum_ip_i+c^2\sum_{i<j}p_ip_j+c^3p_1p_2p_3,$$
$\sum_{i<j}p_ip_j=p_1p_2p_3\sum_k p_k^{-1}=\mathrm{tr}\,\mathcal P^{-1}$。
$\mathcal P\in\mathrm{SU}(3)$ なら $\mathrm{tr}\,\mathcal P^{-1}=\mathrm{tr}\,\mathcal P^\dagger=(\mathrm{tr}\,\mathcal P)^*$。$D(c)\equiv\det(1+c\mathcal P)=1+ct+c^2t^*+c^3$（$t=\mathrm{tr}\,\mathcal P$）とおくと、実数 $c'$ に対して $\det(1+c'\mathcal P^{-1})=1+c't^*+c'^2t+c'^3=D(c')^*$。
* $\mu=0$：$c=c'=h$ で積は $|D(h)|^2\ge0$。
* $\mu\ne0$：積は $D(he^{\mu/T})\,D(he^{-\mu/T})^*$。$h$ の 1 次までで $1+he^{\mu/T}t+he^{-\mu/T}t^*$、虚部は $2h\sinh(\mu/T)\,\mathrm{Im}\,t\ne0$。よって一般に複素数。

**6.3** $c=he^{\mu/T}\to\infty$ では $D(c)\simeq c^3$、また $c'=he^{-\mu/T}\to0$ なので $D(c')\to1$。よって $\det M\simeq\prod_{\vec x}c^{6}=h^{6N_s^3}e^{6N_s^3\mu/T}$ となり、$\ln Z\simeq 6N_s^3\mu/T+\text{const}$、$n\to6=2N_c$（2 はスピン、3 はカラー）。
格子上の各点にフェルミオンを 2×3 個しか置けない（パウリ原理）ことによる**格子の人工物**で、連続理論にはない。物理的な高密度の情報を得るには、飽和より十分手前（$\mu a\ll1$）で考える必要がある。

**6.4**（講読課題のため要点のみ。詳細は原論文で確認すること）
(a) ゲージ冷却なしでは配位が SU(3) から離れてユニタリティ・ノルムが増大し続け、Polyakov ループなどの観測量が正しい値から外れる／不安定になる。
(b) 冷却は格子が十分細かい（$\beta$ が大きい）ときに有効で、粗い格子では冷却しても配位を SU(3) 近傍に保てないことが報告されている。具体的な閾値は作用・フェルミオンの種類によるので原論文の図を確認すること。
(c) [SSS13]：小さな $\mu$ での再重み付けの結果と誤差の範囲で一致することを確認。[Sex13]：大きなクォーク質量で HDQCD（空間ホッピングを落とした近似）の CL 結果と一致することを確認。いずれも「既知の結果が得られる領域」での一致を確かめてから、未知の領域（高密度）に進むという戦略をとっている。

---

## 発展課題のヒント

**P.1** $U$ の更新は $U\to\exp[i\lambda_a(\epsilon K_a+\sqrt\epsilon\eta_a)]U$。$K_a=-D_aS$ は、$D_a\mathrm{tr}U=i\,\mathrm{tr}(\lambda_aU)$、$D_a\mathrm{tr}U^{-1}=-i\,\mathrm{tr}(U^{-1}\lambda_a)$、$D_a\ln\det(1+cU)=i\,\mathrm{tr}[(1+cU)^{-1}c\lambda_aU]$ などから計算できる。厳密値は Weyl の積分公式（SU(3) の類関数の Haar 測度 $\propto\prod_{i<j}|e^{i\theta_i}-e^{i\theta_j}|^2$、$\theta_3=-\theta_1-\theta_2$）による 2 重積分で求まる。[AS08] の図と比較せよ。

**P.2** $N_\tau$ 本のリンク $U_1,\dots,U_{N_\tau}$ に対し作用が $\mathcal P=U_1\cdots U_{N_\tau}$ のみに依存する模型では、ゲージ変換 $U_k\to\Omega_kU_k\Omega_{k+1}^{-1}$（周期境界）が $\mathcal P$ を共役変換するだけになる。冷却は各 $k$ で演習 5.2 の勾配を使えばよい。冷却なしでは $\sum_k\mathrm{tr}(U_kU_k^\dagger)/N-1$ がランジュバン時間とともに増大し、冷却ありでは $\mathcal P$ 自体の非ユニタリ性（ゲージ不変量で除去不可能な部分）程度に抑えられることが観察できるはずである。
