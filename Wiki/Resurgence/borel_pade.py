import mpmath as mp
mp.mp.dps = 40
N = 30
# Z(g) = sum c_n g^n,  c_n = (-1/4)^n (4n-1)!!/n!
c = [(mp.mpf(-1)/4)**n * mp.fac2(4*n-1) / mp.factorial(n) for n in range(N)]
# Borel transform B(t) = sum c_n t^n / n!  ->  Z = int_0^inf dt e^{-t} B(g t)
b = [c[n] / mp.factorial(n) for n in range(N)]
p, q = mp.pade(b, N//2, N//2 - 1)
B = lambda t: mp.polyval(p[::-1], t) / mp.polyval(q[::-1], t)
def exact(g):
    z = 1/(8*g)
    return mp.e**z * mp.besselk(mp.mpf(1)/4, z) / mp.sqrt(4*mp.pi*g)
for g in [mp.mpf('0.1'), mp.mpf(1), mp.mpf(5)]:
    bp = mp.quad(lambda t: mp.e**(-t) * B(g*t), [0, mp.inf])
    trunc = sum(c[n]*g**n for n in range(6))
    print(f"g={float(g):4}: Borel-Pade={mp.nstr(bp,12)}  exact={mp.nstr(exact(g),12)}  6-term={mp.nstr(trunc,6)}")
