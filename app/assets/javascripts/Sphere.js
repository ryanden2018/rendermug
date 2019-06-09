function Sphere(xc,yc,zc,r,lambda,id) {
  this.xc = xc;
  this.yc = yc;
  this.zc = zc;
  this.r = r;
  this.id = id;
  this.lambda = lambda;
}

Sphere.prototype.intersectionPoint = function(x0,y0,z0,vx,vy,vz) {
  var a = vx*vx + vy*vy + vz*vz;
  var b = 2*((x0-this.xc)*vx+(y0-this.yc)*vy+(z0-this.zc)*vz);
  var c = Math.pow(x0-this.xc,2)+Math.pow(y0-this.yc,2)+Math.pow(z0-this.zc,2)-this.r*this.r;
  if(b*b < 4*a*c) { return null; }
  if(Math.abs(a) <= 0.0001) { return null; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
 
  var t;
  if( (t1<0) && (t2<0) ) { return null; }

  if( (t1<0) && (t2>0) ) { t = t2; }

  if( (t1>0) && (t2<0) ) { t = t1; }

  if( (t1>0) && (t2>0) ) { t = Math.min(t1,t2); }

  if( !t ) { return null; }

  var x = x0+vx*t;
  var y = y0+vy*t;
  var z = z0+vz*t;

  if( (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01) ) {
    return null;
  }

  var nx = this.lambda*(x-this.xc);
  var ny = this.lambda*(y-this.yc);
  var nz = this.lambda*(z-this.zc);
  var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;

  if(vx*nx+vy*ny+vz*nz > 0.0) { return null; }
 
  return [x,y,z,nx,ny,nz,this.id];
}
