import numpy as np

def clamp(v):
    return max(0, min(255, v))

def apply_css_filter(r, g, b):
    # Invert
    r, g, b = 255 - r, 255 - g, 255 - b
    
    # Hue rotate 180deg (approximate CSS matrix)
    # W3C filter matrix for hue-rotate(180deg):
    # 0.213 - 0.213 = 0, 0.715 - 0.715 = 0, 0.072 + 0.928 = 1  ... wait
    # Actually, the W3C matrix for hue-rotate uses:
    # R' = 0.213 + 0.787*cos - 0.213*sin
    # G' = 0.715 - 0.715*cos - 0.715*sin
    # B' = 0.072 - 0.072*cos + 0.928*sin
    # For 180deg, cos = -1, sin = 0
    # R_row = [0.213 - 0.787, 0.715 - (-0.715), 0.072 - (-0.072)] = [-0.574, 1.43, 0.144]
    mat = np.array([
        [0.213 - 0.787, 0.715 + 0.715, 0.072 + 0.072],
        [0.213 + 0.213, 0.715 - 0.285, 0.072 + 0.072],
        [0.213 + 0.213, 0.715 + 0.715, 0.072 - 0.928]
    ])
    mat = np.array([
        [-0.574, 1.430, 0.144],
        [0.426, 0.430, 0.144],
        [0.426, 1.430, -0.856]
    ])
    
    res = mat.dot(np.array([r, g, b]))
    return [clamp(x) for x in res]

# We want the output to be 230, 0, 0 (Scharfer Red).
# So we run the inverse.
def inverse_css_filter(r, g, b):
    # Inverse of hue-rotate 180 is hue-rotate -180 (same matrix basically)
    mat_inv = np.array([
        [-0.574, 1.430, 0.144],
        [0.426, 0.430, 0.144],
        [0.426, 1.430, -0.856]
    ])
    res = mat_inv.dot(np.array([r, g, b]))
    res = [clamp(x) for x in res]
    # Inverse of invert
    return [255 - x for x in res]

print("Target red (230,0,0) needs CSS color:", inverse_css_filter(230, 0, 0))
