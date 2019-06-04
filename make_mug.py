#!/usr/bin/env python3
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import matplotlib.pyplot as plt

points = []

# handle
for u in np.linspace(0,2*np.pi,30):
  for v in np.linspace(np.pi/2, 3*np.pi/2, 30):
    points.append([(2+np.cos(u))*np.cos(v),
                   np.sin(u),
                   (2+np.cos(u))*np.sin(v)])



# lower base
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(0,3,8):
    points.append( [3+v*np.cos(u), v*np.sin(u), -4] )

# upper base
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(0,2.5,8):
    points.append( [3+v*np.cos(u), v*np.sin(u), -3.5] )


# outer side
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(-4,4,40):
    points.append( [3+3*np.cos(u), 3*np.sin(u), v] )


# inner side
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(-3.5,4,40):
    points.append( [3+2.5*np.cos(u), 2.5*np.sin(u), v] )

# top
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(2.5,3,5):
    points.append( [3+v*np.cos(u), v*np.sin(u), 4] )



# smoothing
new_points = []



fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

for pt in points:
  ax.scatter(pt[0],pt[1],pt[2])


ax.set_xlim3d(-5,5)
ax.set_ylim3d(-5,5)
ax.set_zlim3d(-5,5)

plt.show()

