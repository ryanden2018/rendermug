#!/usr/bin/env python3
from mpl_toolkits.mplot3d import Axes3D
import numpy as np
import matplotlib.pyplot as plt
import json

points = []
normals = []

# handle
for u in np.linspace(0,2*np.pi,30):
  for v in np.linspace(np.pi/2, 3*np.pi/2, 30):
    points.append([(2+np.cos(u))*np.cos(v),
                   np.sin(u),
                   (2+np.cos(u))*np.sin(v)])
    drdu = [-np.sin(u)*np.cos(v), np.cos(u), -np.sin(u)*np.sin(v)]
    drdv = [-np.sin(v)*(2.0+np.cos(u)), 0.0, np.cos(v)*(2.0+np.cos(u))]
    perp = [ (-1)*(drdu[1]*drdv[2]-drdu[2]*drdv[1]),
             drdu[0]*drdv[2]-drdu[2]*drdv[0],
             (-1)*(drdu[0]*drdv[1]-drdu[1]*drdv[0]) ]
    norm = np.sqrt( perp[0]**2 + perp[1]**2 + perp[2]**2 )
    normals.append( [-perp[0]/norm, -perp[1]/norm, -perp[2]/norm] )


# lower base
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(0,3,8):
    points.append( [3.0+v*np.cos(u), v*np.sin(u), -4.0] )
    normals.append( [0.0, 0.0, -1.0] )

# upper base
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(0,2.5,8):
    points.append( [3.0+v*np.cos(u), v*np.sin(u), -3.5] )
    normals.append( [0.0, 0.0, 1.0] )


# outer side
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(-4,4,40):
    points.append( [3.0+3.0*np.cos(u), 3.0*np.sin(u), v] )
    normals.append( [np.cos(u), np.sin(u), 0.0] )


# inner side
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(-3.5,4,40):
    points.append( [3+2.5*np.cos(u), 2.5*np.sin(u), v] )
    normals.append( [-np.cos(u), -np.sin(u), 0.0] )

# top
for u in np.linspace(0,2*np.pi,40):
  for v in np.linspace(2.5,3,5):
    points.append( [3+v*np.cos(u), v*np.sin(u), 4] )
    normals.append( [0.0, 0.0, 1.0] )



# smoothing
new_points = []

for pt in points:
  newpt = [0.0,0.0,0.0]
  total_weight = 0.0
  for pt1 in points:
    dist = np.sqrt( (pt1[0]-pt[0])**2 + (pt1[1]-pt[1])**2 + (pt1[2]-pt[2])**2 )
    weight = np.exp((-1)*(dist/0.5)**2)
    total_weight += weight
    newpt[0] += weight * pt1[0]
    newpt[1] += weight * pt1[1]
    newpt[2] += weight * pt1[2]
  newpt[0] /= total_weight
  newpt[1] /= total_weight
  newpt[2] /= total_weight
  new_points.append(newpt)
points = new_points


# update normals for smoothing



# plot point cloud
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')

for pt in points:
  ax.scatter(pt[0],pt[1],pt[2])

for i in range(0,len(normals)):
  ax.quiver([points[i][0]],[points[i][1]], [points[i][2]],
      [normals[i][0]], [normals[i][1]], [normals[i][2]])

ax.set_xlim3d(-5,5)
ax.set_ylim3d(-5,5)
ax.set_zlim3d(-5,5)

plt.show()


# save (json)
with open('points.json','w') as f:
  json.dump(points,f)

with open('normals.json','w') as f:
  json.dump(normals,f)

