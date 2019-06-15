// x^2 + y^2 = (r0+k*z)^2,  z0 < z < z1
// lambda should be +1 or -1
function Cone(r0,k,z0,z1,lambda,id) {
  this.r0 = r0;
  this.k = k;
  this.z0 = z0;
  this.z1 = z1;
  this.lambda = lambda;
  this.id = id;
}


// intersection of path (x0+vx*t,y0+vy*t,z0+vz*t) (t>0) with surface
// note: returns null if no intersection found
// format: [x,y,z,nx,ny,nz,id]
// (x,y,z) is the point, (nx,ny,nz) the normal, id is this.id
Cone.prototype.intersectionPoint = function(x0,y0,z0,vx,vy,vz) {
  var a = vx*vx+vy*vy-this.k*this.k*vz*vz;
  var b = 2*vx*x0 + 2*vy*y0 - 2*(this.r0+this.k*z0)*this.k*vz;
  var c = x0*x0 + y0*y0 - Math.pow(this.r0+this.k*z0,2);
  if(b*b < 4*a*c) { return null; }
  if(Math.abs(a) <= 0.00000000001) { return null; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
 
  var t;
  if( (t1<0) && (t2<0) ) { return null; }

  if( (t1<0) && (t2>0) ) { t = t2; }

  if( (t1>0) && (t2<0) ) { t = t1; }

  if( (t1>0) && (t2>0) ) {
    var tmin = Math.min(t1,t2);
    var tmax = Math.max(t1,t2);
    if((z0 + vz*tmin < this.z0) || (z0+vz*tmin > this.z1)) {
      t=tmax;
    } else {
      t=tmin;
    }
  }

  if( !t ) { return null; }

  if( Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01 ) {
    return null;
  }

  var x = x0+vx*t;
  var y = y0+vy*t;
  var z = z0+vz*t;

  if( z < this.z0 ) { return null; }
  if( z > this.z1 ) { return null; }

  var nx = this.lambda*x / Math.sqrt(x*x+y*y);
  var ny = this.lambda*y / Math.sqrt(x*x+y*y);
  var nz = -1 * this.lambda*this.k;
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;


  if(vx*nx+vy*ny+vz*nz > 0.0) { return null; }

  return [x,y,z,nx,ny,nz,this.id];
}
