#!/usr/bin/env python3
"""2次元 U(1) 格子ゲージ理論の Wilson フロー（演習 13 の解答例）.

リンク変数 U_mu(x) = exp(i theta_mu(x)) を Metropolis 法で生成し,
Wilson フローを適用してトポロジカルチャージがどのように整数に近づくかを調べる.

  作用      S = beta * sum_x [1 - cos theta_p(x)]
  プラケット theta_p(x) = theta_1(x) + theta_2(x+1) - theta_1(x+2) - theta_2(x)
  フロー    d theta_mu(x)/dt = -(1/beta) dS/d theta_mu(x)   (g_0^2 = 1/beta)
  トポロジー Q_geo = (1/2pi) sum_x arg(exp(i theta_p))       (常に整数)
            Q_sin = (1/2pi) sum_x sin theta_p              (場の理論的定義)

使い方:  python3 wilson_flow_u1_2d.py [--L 16] [--beta 2.0] [--nconf 20]
"""
import argparse

import numpy as np


def plaquette(theta):
    """theta[mu, x1, x2] からプラケット角 theta_p(x) を返す."""
    t1, t2 = theta
    return t1 + np.roll(t2, -1, axis=0) - np.roll(t1, -1, axis=1) - t2


def force(theta):
    """-(1/beta) dS/d theta_mu(x) を返す（フロー方程式の右辺）."""
    s = np.sin(plaquette(theta))
    f1 = -(s - np.roll(s, 1, axis=1))  # theta_1(x) は p(x) に +, p(x-2) に - で入る
    f2 = -(np.roll(s, 1, axis=0) - s)  # theta_2(x) は p(x-1) に +, p(x) に - で入る
    return np.stack([f1, f2])


def flow_step(theta, eps):
    """4次 Runge-Kutta の 1 ステップ（U(1) は可換なので角度で普通に積分してよい）."""
    k1 = force(theta)
    k2 = force(theta + 0.5 * eps * k1)
    k3 = force(theta + 0.5 * eps * k2)
    k4 = force(theta + eps * k3)
    return theta + eps / 6.0 * (k1 + 2 * k2 + 2 * k3 + k4)


def observables(theta):
    p = plaquette(theta)
    q_geo = np.sum(np.angle(np.exp(1j * p))) / (2 * np.pi)
    q_sin = np.sum(np.sin(p)) / (2 * np.pi)
    energy = np.mean(1.0 - np.cos(p))  # 格子単位の作用密度 ~ (a^2/2) F_12^2
    return q_geo, q_sin, energy


def metropolis_sweep(theta, beta, rng, delta=1.0):
    """チェッカーボードではなく単純な逐次更新（教育用なので速度は二の次）."""
    _, L, _ = theta.shape
    for mu in range(2):
        for x in range(L):
            for y in range(L):
                old = theta[mu, x, y]
                new = old + rng.uniform(-delta, delta)
                # このリンクを含む 2 枚のプラケットだけで作用差を計算
                if mu == 0:
                    plaqs = [(x, y, +1), (x, (y - 1) % L, -1)]
                else:
                    plaqs = [((x - 1) % L, y, +1), (x, y, -1)]
                ds = 0.0
                for (px, py, sign) in plaqs:
                    tp = (theta[0, px, py] + theta[1, (px + 1) % L, py]
                          - theta[0, px, (py + 1) % L] - theta[1, px, py])
                    tp_new = tp + sign * (new - old)
                    ds += beta * (np.cos(tp) - np.cos(tp_new))
                if ds < 0 or rng.random() < np.exp(-ds):
                    theta[mu, x, y] = new
    return theta


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--L", type=int, default=16)
    ap.add_argument("--beta", type=float, default=2.0)
    ap.add_argument("--nconf", type=int, default=20)
    ap.add_argument("--ntherm", type=int, default=200)
    ap.add_argument("--nskip", type=int, default=20)
    ap.add_argument("--eps", type=float, default=0.02)
    ap.add_argument("--tmax", type=float, default=4.0)
    ap.add_argument("--seed", type=int, default=1)
    args = ap.parse_args()

    rng = np.random.default_rng(args.seed)
    theta = rng.uniform(-np.pi, np.pi, size=(2, args.L, args.L))
    for _ in range(args.ntherm):
        metropolis_sweep(theta, args.beta, rng)

    t_report = [0.0, 0.5, 1.0, 2.0, args.tmax]
    nsteps = int(round(args.tmax / args.eps))
    print(f"# L={args.L} beta={args.beta}  (平滑化半径 sqrt(4t) in 2D)")
    print("# conf  " + "  ".join(f"Q_sin(t={t:g})" for t in t_report) + "  Q_geo(t=0)")
    dist = []
    for c in range(args.nconf):
        for _ in range(args.nskip):
            metropolis_sweep(theta, args.beta, rng)
        phi = theta.copy()
        q0_geo, q, _ = observables(phi)
        row = [q]
        for n in range(1, nsteps + 1):
            phi = flow_step(phi, args.eps)
            t = n * args.eps
            if any(abs(t - tr) < 1e-9 for tr in t_report[1:]):
                row.append(observables(phi)[1])
        dist.append(row)
        print(f"{c:5d}  " + "  ".join(f"{v:12.4f}" for v in row) + f"  {q0_geo:10.1f}")

    dist = np.array(dist)
    print("\n# 整数からのずれ  <|Q_sin - round(Q_sin)|>  (フローで 0 に近づく)")
    for j, t in enumerate(t_report):
        dev = np.mean(np.abs(dist[:, j] - np.round(dist[:, j])))
        print(f"t = {t:4.1f}:  {dev:.4f}")
    print(f"# chi_t * V = <Q^2> (t={args.tmax:g}) = {np.mean(np.round(dist[:, -1])**2):.3f}")


if __name__ == "__main__":
    main()
