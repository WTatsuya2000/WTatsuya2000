"""複素ランジュバン法のトイモデル数値実験 (numpy のみで動作).

  python3 cl_toy_models.py            # 3つのモデルをすべて実行
  python3 cl_toy_models.py gauss      # 複素ガウス模型のみ
  python3 cl_toy_models.py quartic    # 複素質量をもつ φ^4 ゼロ次元模型
  python3 cl_toy_models.py u1         # 有限密度 U(1) one-link 模型 (行列式の零点)

離散化は Euler-Maruyama, ノイズは実数のみ (N_I = 0).
多数の独立なウォーカーをベクトル化して同時に走らせる.
"""
import sys

import numpy as np

RNG = np.random.default_rng(12345)


def run_cl(drift, z0, eps, n_therm, n_meas, observables, k_max=None, sample_every=10):
    """複素ランジュバン方程式 dz = K(z) dt + sqrt(2) dW を解く.

    k_max が与えられた場合はドリフトの大きさに応じて刻みを縮める適応ステップを使う
    (Aarts, James, Seiler, Stamatescu, arXiv:0912.0617 の処方).
    戻り値: (観測量の平均, 標準誤差) の辞書, および |K| と Im z の標本.
    """
    z = np.array(z0, dtype=complex)
    sums = {k: [] for k in observables}
    kabs, ys = [], []
    for step in range(n_therm + n_meas):
        K = drift(z)
        if k_max is None:
            e = eps
        else:
            e = eps * np.minimum(1.0, k_max / np.maximum(np.abs(K), 1e-300))
        z = z + e * K + np.sqrt(2.0 * e) * RNG.standard_normal(z.shape)
        if step >= n_therm and step % sample_every == 0:
            for name, f in observables.items():
                sums[name].append(f(z).mean())
            kabs.append(np.abs(drift(z)))
            ys.append(z.imag.copy())
    out = {}
    for name, vals in sums.items():
        v = np.array(vals)
        # 粗いビニングで自己相関の影響を抑えた誤差
        nb = 20
        blocks = v[: len(v) // nb * nb].reshape(nb, -1).mean(axis=1)
        out[name] = (v.mean(), blocks.std(ddof=1) / np.sqrt(nb))
    return out, np.concatenate(kabs), np.concatenate(ys)


def exact_average(weight, obs, a, b, n=200001):
    """実軸上の (複素) 重み rho(x) による <O> を台形則で計算."""
    x = np.linspace(a, b, n)
    w = weight(x)
    return np.trapezoid(w * obs(x), x) / np.trapezoid(w, x)


def tail_report(kabs, label="|K|"):
    """ドリフトの大きさの分布の裾を表示 (Nagata-Nishimura-Shimasaki の判定条件の確認用)."""
    qs = [0.5, 0.9, 0.99, 0.999, 0.9999]
    vals = np.quantile(kabs, qs)
    print(f"    {label} の分位点: " + ", ".join(f"{q:g}:{v:.3g}" for q, v in zip(qs, vals)))
    edges = np.logspace(-1, 4, 11)
    hist, _ = np.histogram(kabs, bins=edges)
    p = hist / len(kabs)
    print("    P(|K| in bin):")
    for lo, hi, pv in zip(edges[:-1], edges[1:], p):
        print(f"      [{lo:9.3g},{hi:9.3g})  {pv:.3e}")


def model_gauss():
    print("=== 複素ガウス模型 S = sigma z^2 / 2 ===")
    for sigma in [1.0 + 1.0j, 1.0 + 3.0j]:
        res, kabs, ys = run_cl(
            drift=lambda z: -sigma * z,
            z0=np.zeros(2000),
            eps=1e-3, n_therm=5000, n_meas=50000,
            observables={"z^2": lambda z: z**2, "z^4": lambda z: z**4},
        )
        print(f"  sigma = {sigma}")
        print(f"    CL   <z^2> = {res['z^2'][0]:.4f} +- {res['z^2'][1]:.4f}   exact 1/sigma     = {1/sigma:.4f}")
        print(f"    CL   <z^4> = {res['z^4'][0]:.4f} +- {res['z^4'][1]:.4f}   exact 3/sigma^2   = {3/sigma**2:.4f}")
        a, b = sigma.real, sigma.imag
        print(f"    <y^2>_CL = {np.mean(ys**2):.4f}   解析値 b^2/(2a|sigma|^2) = {b*b/(2*a*abs(sigma)**2):.4f}")


def model_quartic():
    print("=== ゼロ次元 phi^4 模型 S = sigma z^2/2 + lam z^4/4 ===")
    lam = 1.0
    for sigma in [1.0 + 1.0j, -1.0 + 4.0j]:
        res, kabs, ys = run_cl(
            drift=lambda z: -(sigma * z + lam * z**3),
            z0=np.zeros(2000),
            eps=1e-4, n_therm=20000, n_meas=200000, k_max=50.0, sample_every=50,
            observables={"z^2": lambda z: z**2, "z^4": lambda z: z**4},
        )
        w = lambda x: np.exp(-(sigma * x**2 / 2 + lam * x**4 / 4))
        ex2 = exact_average(w, lambda x: x**2, -8, 8)
        ex4 = exact_average(w, lambda x: x**4, -8, 8)
        print(f"  sigma = {sigma}, lambda = {lam}")
        print(f"    CL <z^2> = {res['z^2'][0]:.4f} +- {res['z^2'][1]:.4f}   exact = {ex2:.4f}")
        print(f"    CL <z^4> = {res['z^4'][0]:.4f} +- {res['z^4'][1]:.4f}   exact = {ex4:.4f}")
        print(f"    max|Im z| = {np.max(np.abs(ys)):.3f}")
        tail_report(kabs)


def model_u1():
    print("=== U(1) one-link 模型 rho(x) = e^{beta cos x} [1 + kappa cos(x - i mu)] ===")
    print("    (Aarts-Stamatescu arXiv:0807.1597 / Aarts-Seiler-Sexty-Stamatescu arXiv:1701.02322 型の模型)")
    mu = 1.0
    for beta, kappa in [(1.0, 0.25), (0.3, 2.0)]:
        def drift(z, beta=beta, kappa=kappa):
            d = 1.0 + kappa * np.cos(z - 1j * mu)
            return -beta * np.sin(z) - kappa * np.sin(z - 1j * mu) / d
        res, kabs, ys = run_cl(
            drift=drift,
            z0=np.zeros(2000),
            eps=1e-4, n_therm=20000, n_meas=200000, k_max=50.0, sample_every=50,
            observables={"e^{iz}": lambda z: np.exp(1j * z), "e^{-iz}": lambda z: np.exp(-1j * z)},
        )
        w = lambda x: np.exp(beta * np.cos(x)) * (1 + kappa * np.cos(x - 1j * mu))
        ep = exact_average(w, lambda x: np.exp(1j * x), -np.pi, np.pi)
        em = exact_average(w, lambda x: np.exp(-1j * x), -np.pi, np.pi)
        # 行列式 1 + kappa cos(z - i mu) の零点: cos(z - i mu) = -1/kappa
        w0 = np.arccos(complex(-1.0 / kappa))
        print(f"  beta = {beta}, kappa = {kappa}, mu = {mu}")
        print(f"    行列式の零点: z = ±w + i mu (mod 2pi), w = arccos(-1/kappa) = {w0.real:.3f}{w0.imag:+.3f}i")
        print(f"    CL <e^{{ix}}>  = {res['e^{iz}'][0]:.4f} +- {res['e^{iz}'][1]:.4f}   exact = {ep:.4f}")
        print(f"    CL <e^{{-ix}}> = {res['e^{-iz}'][0]:.4f} +- {res['e^{-iz}'][1]:.4f}   exact = {em:.4f}")
        tail_report(kabs)


if __name__ == "__main__":
    which = sys.argv[1:] or ["gauss", "quartic", "u1"]
    table = {"gauss": model_gauss, "quartic": model_quartic, "u1": model_u1}
    for name in which:
        table[name]()
        print()
