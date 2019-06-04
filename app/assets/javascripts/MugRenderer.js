
function MugRenderer(width,numPhotons) {
  this.decayFactor = 0.5;
  this.maxBounces = 3;
  this.image = []
  this.width = width;
  this.numPhotons = numPhotons;

  for(var i=0; i < width*width; i++) {
    this.image.push(0.0);
  }
}

MugRenderer.prototype.idx = function(i,j) {
  return (this.width*i+j);
};

MugRenderer.prototype.distWithIndex = function(x,y,z,vx,vy,vz) {
  candidates = [];
  for(var i=0; i<points.length; i++) {
    var t = (-1)*(vx*(x-points[i][0])+vy*(y-points[i][1])+vz*(z-points[i][2]))/(Math.pow(vx,2)+Math.pow(vy,2)+Math.pow(vz,2));
    var xp = x+vx*t;
    var yp = y+vy*t;
    var zp = z+vz*t;
    var dist = Math.sqrt( Math.pow(xp-points[i][0],2)+Math.pow(yp-points[i][1],2)+Math.pow(zp-points[i][2],2) );
    if(dist < 0.1) {
      candidates.push([dist,i]);
    }
  }

  console.log(candidates)

  var minDist = null;
  var ptIdx = null;
  for(var i=0; i<candidates.length; i++) {
    if((minDist === null) || (
      this.dist([x,y,z],points[candidates[i][1]]) 
      <
       this.dist([x,y,z],points[ptIdx])
    )) {
      minDist = candidates[i][0];
      ptIdx = candidates[i][1];
    }
  }

  return [minDist,ptIdx];
};

MugRenderer.prototype.dist = function(pos1,pos2) {
  return Math.sqrt( Math.pow(pos1[0]-pos2[0],2) + Math.pow(pos1[1]-pos2[1],2) + Math.pow(pos1[2]-pos2[2],2) );
};

MugRenderer.prototype.getNewVelocity = function(normal) {
  return [Math.random(),Math.random(),Math.random()];
};

MugRenderer.prototype.render = function() {
  for(var i = 0; i < this.image.length; i++) {
    this.image[i] = 0.0;
  }

  for(var i=0; i<this.width; i++) {
    for(var j = 0; j < this.width; j++) {
      for(var k = 0; k < this.numPhotons; k++) {
        var x = -5;
        var y = 0.001*i;
        var z = 0.001*j;
        var vx = 1.0;
        var vy = 0.001*i;
        var vz = 0.001*j;
        var numBounces = 0;

        while((numBounces < this.maxBounces) &&
            (Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2)) < 10))  {
          var res = this.distWithIndex(x,y,z,vx,vy,vz);
          if(res[0] === null) {
            break;
          }
          if(res[0] < 0.1) {
            var v = this.getNewVelocity( normals[res[1]] );
            vx = v[0];
            vy = v[1];
            vz = v[2];
            x = points[res[1]][0];
            y = points[res[1]][1];
            z = points[res[1]][2];
            numBounces++;
          }

          if (Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2)) > 9) {
            if( Math.sqrt( Math.pow(vx,2)+Math.pow(vy,2)) < 0.2) {
              this.image[this.idx(i,j)] += Math.pow(this.decayFactor, numBounces);
              break;
            }
          }
        }
      }
    }
  }
};
