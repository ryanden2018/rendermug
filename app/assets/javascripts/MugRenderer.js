
function MugRenderer(width,photonsPerPixel) {
  this.decayFactor = 0.5;
  this.photonsPerPixel = photonsPerPixel
  this.maxBounces = 5;
  this.image = []
  this.width = width;
  this.i = 0;
  this.j = 0;
  this.maxVal = 0.01;
  this.Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 
  this.Rmatinv = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0];
   
 this.weights = [];

  // if id > 0 it's a shape, if id <= 0 it's light source.
  // currently the code is only equipped to handle one light
  // source
  this.shapes = [
    new Sphere(0.0,0.0,75.0,25.0,1,0), // light source (id===0)
    new Cone(3.75,0.0625,-4.0,4.0,1,1),
    new Cone(3.5,0.0625,-3.5,4.0,-1,2),
    new Annulus(0.0,3.5,-4.0,-1,3),
    new Annulus(0.0,3.25,-3.5,1,4),
    new Annulus(3.75,4.0,4.0,1,5)
  ];

  this.source = this.shapes.find( function(shape)  {return shape.id <= 0} );

  for(var i=0; i < width*width; i++) {
    this.image.push(0.0);
  }

  for(var m = -8; m<9; m++) {
    for(var n = -8; n < 9; n++) {
      this.weights.push(Math.exp((-1)*(Math.pow(m,2)/64+Math.pow(n,2)/64)));
    }
  }
}

MugRenderer.prototype.reset = function() {
  this.i = 0;
  this.j = 0;
  this.image = [];
  this.maxVal = 0.01;
  for(var i=0; i < this.width*this.width; i++) {
    this.image.push(0.0);
  }
};

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
  var Matinv = [1.0,0.0,0.0,
              0.0,Math.cos(-theta),Math.sin(-theta),
              0.0,-Math.sin(-theta),Math.cos(-theta)];

  this.rotateSource(Mat);

  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
};

MugRenderer.prototype.rotateY = function(theta) {
  var Mat = [Math.cos(theta),0.0,-Math.sin(theta),
            0.0,1.0,0.0,
            Math.sin(theta),0.0,Math.cos(theta)];
  var Matinv = [Math.cos(-theta),0.0,-Math.sin(-theta),
              0.0,1.0,0.0,
              Math.sin(-theta),0.0,Math.cos(-theta)];
 
  this.rotateSource(Mat);

  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
};

MugRenderer.prototype.rotateZ = function(theta) {
  var Mat = [Math.cos(theta),Math.sin(theta),0.0,
             -Math.sin(theta),Math.cos(theta),0.0,
             0.0,0.0,1.0];
  var Matinv = [Math.cos(-theta),Math.sin(-theta),0.0,
              -Math.sin(-theta),Math.cos(-theta),0.0,
              0.0,0.0,1.0];
  this.rotateSource(Mat);

  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
};

MugRenderer.prototype.rotateSource = function(Mat) {
  var xcp = Mat[0]*this.source.xc + Mat[1]*this.source.yc + Mat[2]*this.source.zc;
  var ycp = Mat[3]*this.source.xc + Mat[4]*this.source.yc + Mat[5]*this.source.zc;
  var zcp = Mat[6]*this.source.xc + Mat[7]*this.source.yc + Mat[8]*this.source.zc;
  this.source.xc = xcp;
  this.source.yc = ycp;
  this.source.zc = zcp;
}


// return the next collision point
// the form is [x,y,z,nx,ny,nz,id]
// (x,y,z) the point of collision,
// (nx,ny,nz) the corresponding normal, id the shape id
// if none, return null
MugRenderer.prototype.nextPoint = function(x0,y0,z0,vx,vy,vz) {
  points = this.shapes.map(
    function(shape) { return shape.intersectionPoint(x0,y0,z0,vx,vy,vz) }
  ).filter(
    function(item)  { return (!!item) }
  );

  if(points.length === 0) {
    return null;
  }

  var minDist;
  var closestPoint;
  for(var i = 0; i < points.length; i++) {
    var thisDist = Math.sqrt( 
      Math.pow( points[i][0]-x0,2 )
      + Math.pow( points[i][1]-y0,2 )
      + Math.pow( points[i][2]-z0,2 ) );
    if( (!closestPoint) || (thisDist < minDist) ) {
      closestPoint = points[i];
      minDist = thisDist;
    }
  }

  return closestPoint;
}

MugRenderer.prototype.renderNextPixels = function() {
  for(var l = 0; l < 5000; l++) {
    this.j++;
    if(this.j === this.width) {
      this.j = 0;
      this.i++;
    }
    if(this.i === this.width) {
      this.i = 0;
    }

    

    for(var zed=0; zed<this.photonsPerPixel; zed++) {

      var x = 0.0;
      var y = 0.0;
      var z = 24.0;


      var xp = this.Rmat[0]*x + this.Rmat[1]*y + this.Rmat[2]*z;
      var yp = this.Rmat[3]*x + this.Rmat[4]*y + this.Rmat[5]*z;
      var zp = this.Rmat[6]*x + this.Rmat[7]*y + this.Rmat[8]*z;

      x = xp;
      y = yp;
      z = zp;

      var vx = (0.5-(1.0*this.i)/this.width);
      var vy =(-0.5+(1.0*this.j)/this.width);
      var vz = -1.0;


      var vxp = this.Rmat[0]*vx + this.Rmat[1]*vy + this.Rmat[2]*vz;
      var vyp = this.Rmat[3]*vx + this.Rmat[4]*vy + this.Rmat[5]*vz;
      var vzp = this.Rmat[6]*vx + this.Rmat[7]*vy + this.Rmat[8]*vz;

      vx = vxp;
      vy = vyp;
      vz = vzp;

      for( var numBounces = 0; numBounces < this.maxBounces; numBounces++) {

        var nextPoint = this.nextPoint(x,y,z,vx,vy,vz);
        if(!nextPoint) { break; }

        if(nextPoint[6] <= 0) { // hits light source
          this.image[this.width*this.i+this.j] += Math.pow(this.decayFactor,numBounces);
          this.maxVal = Math.max( this.maxVal, this.image[this.width*this.i+this.j] );
          break;
        }

        x = nextPoint[0];
        y = nextPoint[1];
        z = nextPoint[2];

        vx = Math.random();
        vy = Math.random();
        vz = Math.random();
        var c = 0;
        while((c<20) && (vx*nextPoint[3]+vy*nextPoint[4]+vz*nextPoint[5] < -0.01*Math.sqrt(vx*vx+vy*vy+vz*vz)) ) {
          vx = Math.random();
          vy = Math.random();
          vz = Math.random();
          c++;
        }
        if(c === 20) { break; }


        var dotprod = vx*nextPoint[3] + vy*nextPoint[4] + vz*nextPoint[5];
        var u = [vx - 2*nextPoint[3]*dotprod, vy - 2*nextPoint[4]*dotprod, vz - 2*nextPoint[5]*dotprod];

        var rand = Math.random();

        var v = [rand*u[0] + (1.0-rand)*vx, rand*u[1] + (1.0-rand)*vy, rand*u[2] + (1.0-rand)*vz];
        vx = v[0];
        vy = v[1];
        vz = v[2];
      }
    }
  }
};
