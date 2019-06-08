// r0**2 < x**2+y**2 < r1**2,  z=z0
// lambda should be +1 or -1
function Annulus(r0,r1,z0,lambda,id) {
  this.r0 = r0;
  this.r1 = r1;
  this.z0 = z0;
  this.lambda = lambda;
  this.id = id;
}

// intersection of path (x0+vx*t,y0+vy*t,z0+vz*t) (t>0) with surface
// note: returns null if no unique intersection found
// format: [x,y,z,nx,ny,nz,id]
// (x,y,z) is the point, (nx,ny,nz) the normal, id is this.id
Annulus.prototype.intersectionPoint = function(x0,y0,z0,vx,vy,vz) {
  if( vz === 0.0 ) {
    return null;
  }

  var t = (this.z0-z0)/vz;

  if((t<0) || (Math.abs(vx*vx+vy*vy+vz*vz)*t < 0.001)) {
    return null;
  }

  var x = x0 + vx*t;
  var y = y0 + vy*t;
  var z = z0 + vz*t;

  var nx = 0.0;
  var ny = 0.0;
  var nz = this.lambda;

  if( Math.sqrt( x*x + y*y ) > this.r1 ) {
    return null;
  }

  if( Math.sqrt( x*x + y*y ) < this.r0 ) {
    return null;
  }

  return [x,y,z,nx,ny,nz,this.id];
}
