import json, math, os, sys, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
# the source photo is kept locally and not committed; pass another path as the first argument if needed
SUBJECT_SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, '..', 'tools', 'img-6.jpg')
OUT_JS = os.path.join(HERE, 'face-points.js')
SCRATCH = tempfile.gettempdir()

SUBJECT_POLY = [
    (0.335,0.070),(0.445,0.050),(0.565,0.068),(0.605,0.130),
    (0.590,0.220),(0.605,0.300),(0.640,0.345),(0.720,0.385),
    (0.790,0.440),(0.820,0.520),(0.800,0.600),
    (0.550,0.630),(0.380,0.600),(0.336,0.552),
    (0.330,0.470),(0.334,0.435),(0.470,0.432),(0.430,0.402),
    (0.400,0.394),(0.372,0.358),(0.352,0.312),(0.340,0.268),
    (0.333,0.222),(0.330,0.172),(0.333,0.126),
]

rng = np.random.default_rng(7)
pts = []

img6 = Image.open(SUBJECT_SRC).convert('RGB')
WK = 900
H6 = round(img6.size[1]*WK/img6.size[0])
small = img6.resize((WK,H6), Image.LANCZOS)
L = np.asarray(small.convert('L'), dtype=np.float32)/255.0
blur = np.asarray(small.convert('L').filter(ImageFilter.GaussianBlur(1.5)), dtype=np.float32)/255.0
gy, gx = np.gradient(blur)
edge = np.sqrt(gx*gx+gy*gy)
edge = np.clip(edge/(np.percentile(edge,99)+1e-6), 0, 1)
mi = Image.new('L',(WK,H6),0)
ImageDraw.Draw(mi).polygon([(x*WK,y*H6) for x,y in SUBJECT_POLY], fill=255)
mask = np.asarray(mi.filter(ImageFilter.GaussianBlur(2)), dtype=np.float32)/255.0
yy, xx = np.mgrid[0:H6, 0:WK]
xf, yf = xx/WK, yy/H6
fgauss = np.exp(-(((xf-0.455)**2)/(2*0.105**2)+((yf-0.262)**2)/(2*0.135**2)))
bfade = np.clip(1.0-(yf-0.44)*2.2, 0.12, 1.0)
w = mask*(0.06+1.10*(L**2.0)+1.30*edge)*(0.25+2.0*fgauss)*bfade
p = (w/w.sum()).ravel()
NS = 165000
idx = rng.choice(len(p), size=NS, replace=True, p=p)
ys, xs = np.unravel_index(idx, w.shape)
xs = xs+rng.random(NS); ys = ys+rng.random(NS)
lum = L[np.clip(ys.astype(int),0,H6-1), np.clip(xs.astype(int),0,WK-1)]
cx, cy = 0.455*WK, 0.262*H6
sc = 2.0/(ys.max()-ys.min())
for i in range(NS):
    X = (xs[i]-cx)*sc; Y = -(ys[i]-cy)*sc
    Z = (lum[i]-.5)*.30 + rng.normal(0,.05)
    pts.append((X, Y, float(lum[i]), Z))
print('subject pts', NS)

def bil(A,B,C,D,s,t):
    tx = A[0]+(B[0]-A[0])*s; ty = A[1]+(B[1]-A[1])*s
    bx = D[0]+(C[0]-D[0])*s; by = D[1]+(C[1]-D[1])*s
    return (tx+(bx-tx)*t, ty+(by-ty)*t)

LC = (-1.15,-0.95)
ANG = -0.105
CA, SA = math.cos(ANG), math.sin(ANG)
def emit_l(x, y, z, lo):
    rx = x*CA - y*SA; ry = x*SA + y*CA
    pts.append((rx+LC[0], ry+LC[1], min(.68,lo), z+rng.normal(0,.02)))

SCR = [(-0.52,0.62),(0.50,0.74),(0.55,0.02),(-0.55,-0.06)]
BAS = [(-0.55,-0.10),(0.55,-0.02),(0.68,-0.42),(-0.68,-0.50)]
def scr_z(t): return 0.30+t*0.12
def bas_z(t): return 0.42+t*0.10

rows = [(0.10+k*0.078, 0.25+rng.random()*0.55, 0.06+(0.06 if rng.random()<.3 else 0)) for k in range(10)]
for _ in range(5000):
    rt, rl, ri = rows[int(rng.integers(0,10))]
    s = ri + rng.random()*rl
    t = rt + rng.normal(0,.010)
    x,y = bil(*SCR, s, t)
    emit_l(x,y,scr_z(t), .60+rng.random()*.08)
for _ in range(9000):
    s, t = rng.random(), rng.random()
    x,y = bil(*SCR, s, t)
    emit_l(x,y,scr_z(t), .30+rng.random()*.10)
for _ in range(2500):
    e = rng.random()
    if e<.25: s,t = rng.random(), rng.random()*.035
    elif e<.5: s,t = rng.random(), 1-rng.random()*.035
    elif e<.75: s,t = rng.random()*.035, rng.random()
    else: s,t = 1-rng.random()*.035, rng.random()
    x,y = bil(*SCR, s, t)
    emit_l(x,y,scr_z(t), .55+rng.random()*.06)
for _ in range(800):
    s = rng.random(); t = rng.random()*.02
    x,y = bil(*SCR, s, t)
    emit_l(x,y,scr_z(t), .58+rng.random()*.06)
for _ in range(6000):
    s, t = rng.random(), rng.random()
    x,y = bil(*BAS, s, t)
    emit_l(x,y,bas_z(t), .20+rng.random()*.06)
for _ in range(4000):
    ki, kj = int(rng.integers(0,12)), int(rng.integers(0,4))
    s = 0.08+ki*0.073 + rng.normal(0,.014)
    t = 0.14+kj*0.19 + rng.normal(0,.030)
    x,y = bil(*BAS, min(max(s,0),1), min(max(t,0),1))
    emit_l(x,y,bas_z(t), .42+rng.random()*.06)
for _ in range(1500):
    s = rng.random()
    x,y = bil(*SCR, s, 1-rng.random()*.02)
    emit_l(x,y,scr_z(1), .52+rng.random()*.05)
for _ in range(1200):
    e = rng.random()
    if e<.5: s,t = .35+rng.random()*.30, (.55 if rng.random()<.5 else .90)+rng.normal(0,.008)
    else: s,t = (.35 if rng.random()<.5 else .65)+rng.normal(0,.008), .55+rng.random()*.35
    x,y = bil(*BAS, min(max(s,0),1), min(max(t,0),1))
    emit_l(x,y,bas_z(t), .38+rng.random()*.04)
print('laptop pts 30000')

NB = 55000
P0 = np.array([-0.6, 0.35])
th = 0.42
DIR = np.array([math.cos(th), math.sin(th)])
NRM = np.array([-math.sin(th), math.cos(th)])
for _ in range(NB):
    r = rng.random()
    if r < .58:
        s = rng.uniform(-3.8, 3.2)
        n = rng.normal(0, .38)
        if rng.random() < .25: n *= 2.2
        pos = P0 + DIR*s + NRM*n
        rift = 0.45+0.55*abs(math.sin(s*1.8+0.7))
        lo = 0.10 + 0.38*math.exp(-(n/0.30)**2)*(0.6+0.4*rng.random())*rift + rng.random()*0.04
    elif r < .74:
        s = rng.normal(-1.0, .55)
        n = rng.normal(0, .22)
        pos = P0 + DIR*s + NRM*n
        lo = 0.15 + 0.28*rng.random()
    elif r < .96:
        pos = np.array([rng.uniform(-3.45,2.25), rng.uniform(-1.62,1.62)])
        lo = 0.07 + 0.10*rng.random()
    else:
        pos = np.array([rng.uniform(-3.45,2.25), rng.uniform(-1.62,1.62)])
        lo = 0.45 + 0.18*rng.random()
    X = float(np.clip(pos[0], -3.45, 2.25))
    Y = float(np.clip(pos[1], -1.62, 1.62))
    Z = float(np.clip(-1.8+rng.normal(0,.30), -2.5, -1.15))
    pts.append((X, Y, min(.62,lo), Z))
print('milkyway pts', NB, 'total', len(pts))

rng.shuffle(pts)
flat = []
for X,Y,lo,Z in pts:
    flat += [round(float(X),3), round(float(Y),3), round(float(lo),2), round(float(Z),2)]
with open(OUT_JS,'w') as f:
    f.write('const FACE_PTS='+json.dumps(flat, separators=(',',':'))+';\n')
print('wrote', OUT_JS, len(flat)//4, 'points')

PW, PH = 900, 560
prev = Image.new('RGB',(PW,PH),(4,6,12))
dp = ImageDraw.Draw(prev)
S = PH/3.6
for X,Y,lo,Z in pts[::4]:
    px = PW/2 + (X+0.55)*S; py = PH/2.3 - Y*S
    if px<0 or px>=PW or py<0 or py>=PH: continue
    lb = 0.18+0.82*(lo**1.1)
    c = (int(50+205*lb), int(145+110*lb), int(135+120*lb))
    dp.point([px,py], fill=c)
prev.save(SCRATCH+'/preview.png')
print('previews saved')
