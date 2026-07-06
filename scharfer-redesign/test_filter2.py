import numpy as np

# W3C hue-rotate matrix for 180deg
mat = np.array([
    [-0.574, 1.430, 0.144],
    [0.426, 0.430, 0.144],
    [0.426, 1.430, -0.856]
])

# Target is [230, 0, 0]
y = np.array([230, 0, 0])

try:
    mat_inv = np.linalg.inv(mat)
    one_minus_x = mat_inv.dot(y)
    x = 255 - one_minus_x
    print("Exact color needed:", x)
except Exception as e:
    print("Error:", e)
