
function MugRenderer(width,numPhotons) {
  this.decayFactor = 0.5;
  this.maxBounces = 5;
  this.image = []
  this.width = width;
  this.numPhotons = numPhotons;
  this.i = 0;
  this.j = 0;
  this.Rmat = [1.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,1.0];

  for(var i=0; i < width*width; i++) {
    this.image.push(0.0);
  }
}

MugRenderer.prototype.idx = function(i,j) {
  return (this.width*i+j);
};

MugRenderer.prototype.matmul = function(Mat,Rmat) {
  var newMat = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];

  newMat[0] = Mat[0]*Rmat[0] + Mat[1]*Rmat[3] + Mat[2]*Rmat[6];
  newMat[1] = Mat[0]*Rmat[1] + Mat[1]*Rmat[4] + Mat[2]*Rmat[7];
  newMat[2] = Mat[0]*Rmat[2] + Mat[1]*Rmat[5] + Mat[2]*Rmat[8];

  newMat[3] = Mat[3]*Rmat[0] + Mat[4]*Rmat[3] + Mat[5]*Rmat[6];
  newMat[4] = Mat[3]*Rmat[1] + Mat[4]*Rmat[4] + Mat[5]*Rmat[7];
  newMat[5] = Mat[3]*Rmat[2] + Mat[4]*Rmat[5] + Mat[5]*Rmat[8];

  newMat[6] = Mat[6]*Rmat[0] + Mat[7]*Rmat[3] + Mat[8]*Rmat[6];
  newMat[7] = Mat[6]*Rmat[1] + Mat[7]*Rmat[4] + Mat[8]*Rmat[7];
  newMat[8] = Mat[6]*Rmat[2] + Mat[7]*Rmat[5] + Mat[8]*Rmat[8];

  return newMat;
}

MugRenderer.prototype.rotateX = function(theta) {
  var Mat = [1.0,0.0,0.0,
             0.0,Math.cos(theta),Math.sin(theta),
             0.0,-Math.sin(theta),Math.cos(theta)];
  this.Rmat = this.matmul(Mat,this.Rmat);
};

MugRenderer.prototype.inMug = function(x,y,z) {

  var xp = this.Rmat[0]*x + this.Rmat[1]*y + this.Rmat[2]*z;
  var yp = this.Rmat[3]*x + this.Rmat[4]*y + this.Rmat[5]*z;
  var zp = this.Rmat[6]*x + this.Rmat[7]*y + this.Rmat[8]*z;

  if( (zp>-4.0)&&(zp<4.0) &&
      (Math.sqrt(Math.pow(xp-3.0,2)+Math.pow(yp,2))>2.5) &&
      (Math.sqrt(Math.pow(xp-3.0,2)+Math.pow(yp,2))<3.0) ) {
    return true;
  }
  if( (zp>-4.0)&&(zp<-3.5) &&
      (Math.sqrt(Math.pow(xp-3.0,2)+Math.pow(yp,2))<3.0) ) {
    return true;
  }
  return false;
};

MugRenderer.prototype.renderNextPixel = function() {
  this.image[this.idx(this.i,this.j)] = 0.0;

  for(var k = 0; k < this.numPhotons; k++) {
    var x = 12.0;
    var y = 0.0;
    var z = 6.0;
    var vx = -1.0;
    var vy = -0.5+(1.0*this.j)/this.width;
    var vz = -(1.0*this.i)/this.width;
    var numBounces = 0;
    var dt = 0.05;

    while((numBounces < this.maxBounces) &&
        (Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2)) < 20))  {

      x += vx*dt;
      y += vy*dt;
      z += vz*dt;

      if( (Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2))>19.0) &&
            ( vz > 0 ) &&
            ( Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2)) < 0.3 ) ) {
        this.image[this.idx(this.i,this.j)] += Math.pow(this.decayFactor,numBounces);
        break;
      
      }

      if(this.inMug(x,y,z)) {
        numBounces += 1;
        var m = 0;
        while(true) {
          m++;
          vx = Math.random();
          vy = Math.random();
          vz = Math.random();
          if( !this.inMug(x+3*vx*dt,y+3*vy*dt,z+3*vz*dt) ) {
            break;
          }
          if(m === 20) {
            numBounces = this.maxBounces;
            break;
          }
        }
      }
    }
  }

  this.j++;
  if(this.j === this.width) {
    this.i++;
    this.j = 0;
  }
  if(this.i === this.width) {
    this.i = 0;
  }
};
