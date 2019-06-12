
function MugRenderer(width,photonsPerPixel) {
  this.decayFactor = 0.25;
  this.photonsPerPixel = photonsPerPixel;
  this.maxBounces = 5;
  this.image = [];
  this.width = width;
  this.i = 0;
  this.j = 0;
  this.maxVal = 0.01;
  this._lowResMode = true;
  this.randomNumbers = [];
  this.randNumIndex = 0;
  this.Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 
  this.Rmatinv = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0];

  for( var i = 0; i < 1000000; i++) {
    this.randomNumbers.push( Math.random() );
  }
   
  // If id > 0 it's a scattering surface, if id <= 0 it's light source.
  //  Light sources must be spheres.
  this.shapes = [
    // light sources
    new Sphere(0.0,1.5*75.0,1.5*60.0,30.0,1,0),
    new Sphere(0.0,-1.5*75.0,1.5*60.0,30.0,1,-1),
    new Sphere(1.5*75.0,0.0,1.5*60.0,30.0,1,-2),
    new Sphere(-1.5*75.0,0.0,1.5*60.0,30.0,1,-3),
    new Sphere(0.0,0.0,1.5*200.0,100.0,1,-4),

    // mug body
    new Cone(3.75,0,-4.0,4.0,1,1),
    new Cone(3.25,0,-3.5,4.0,-1,2),

    // mug caps
    new Annulus(0.0,3.75,-4.0,-1,3),
    new Annulus(0.0,3.25,-3.5,1,4),
    new Annulus(3.25,3.75,4.0,1,5),

    // handle spheres
    new Sphere(4.75,0.0,3.0,1.0,1,6),
    new Sphere(4.75,0.0,-3.0,1.0,1,6),
    new Sphere(6.625,0.0,2.4,1.0,1,6),
    new Sphere(6.625,0.0,-2.4,1.0,1,6),
    new Sphere(7.985,0.0,0.975,1.0,1,6),
    new Sphere(7.985,0.0,-0.975,1.0,1,6)
  ];

  this.sources = this.shapes.filter( function(shape)  {return shape.id <= 0} );


  this.sourcesxc = this.sources.map( function(shape) { return shape.xc });
  this.sourcesyc = this.sources.map( function(shape) { return shape.yc });
  this.sourceszc = this.sources.map( function(shape) { return shape.zc })

  for(var i=0; i < width*width; i++) {
    this.image.push(0.0);
  }
}

MugRenderer.prototype.nextRand = function() {
  this.randNumIndex++;
  if(this.randNumIndex === this.randomNumbers.length) {
    this.randNumIndex = 0;
  }
  return this.randomNumbers[this.randNumIndex];
}


MugRenderer.prototype.getLowResMode = function() {
  return this._lowResMode;
}

MugRenderer.prototype.setHighResMode = function() {
  if(this._lowResMode) {
    var newImage = [];
    for(var i = 0; i < 2*this.width; i++) {
      for(var j = 0; j < 2*this.width; j++) {
        newImage.push(
          this.image[ this.width*Math.floor(i/2) + Math.floor(j/2) ]
        );
      }
    }
    this.image = newImage;
    this.width = 2*this.width;
    this._lowResMode = false;
  }
}

MugRenderer.prototype.reset = function() {
  this.i = 0;
  this.j = 0;
  this.image = [];
  this.maxVal = 0.01;
  if(!this._lowResMode) {
    this._lowResMode = true;
    this.width = this.width / 2;
  }
  for(var i=0; i < this.width*this.width; i++) {
    this.image.push(0.0);
  }
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

  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
  this.rotateSource();
};

MugRenderer.prototype.rotateY = function(theta) {
  var Mat = [Math.cos(theta),0.0,-Math.sin(theta),
            0.0,1.0,0.0,
            Math.sin(theta),0.0,Math.cos(theta)];
  var Matinv = [Math.cos(-theta),0.0,-Math.sin(-theta),
              0.0,1.0,0.0,
              Math.sin(-theta),0.0,Math.cos(-theta)];
 
  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
  this.rotateSource();
};

MugRenderer.prototype.rotateZ = function(theta) {
  var Mat = [Math.cos(theta),Math.sin(theta),0.0,
             -Math.sin(theta),Math.cos(theta),0.0,
             0.0,0.0,1.0];
  var Matinv = [Math.cos(-theta),Math.sin(-theta),0.0,
              -Math.sin(-theta),Math.cos(-theta),0.0,
              0.0,0.0,1.0];

  this.Rmat = this.matmul(Mat,this.Rmat);
  this.Rmatinv = this.matmul(this.Rmatinv,Matinv);
  this.rotateSource();
};

MugRenderer.prototype.rotateSource = function() {
  for(var i = 0; i < this.sources.length; i++) {
    this.sources[i].xc = this.Rmat[0]*this.sourcesxc[i] + this.Rmat[1]*this.sourcesyc[i] + this.Rmat[2]*this.sourceszc[i];
    this.sources[i].yc = this.Rmat[3]*this.sourcesxc[i] + this.Rmat[4]*this.sourcesyc[i] + this.Rmat[5]*this.sourceszc[i];
    this.sources[i].zc = this.Rmat[6]*this.sourcesxc[i] + this.Rmat[7]*this.sourcesyc[i] + this.Rmat[8]*this.sourceszc[i];
  }
}


// return the next collision point
// the form is [x,y,z,vx,vy,vz,id] if found
// velocities are post-collisional (including mixed diffusive reflection)
MugRenderer.prototype.nextPoint = function(x0,y0,z0,vx,vy,vz) {
  var points = this.shapes.map(
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


  var x = closestPoint[0];
  var y = closestPoint[1];
  var z = closestPoint[2];

  var vxr = 2*(this.nextRand()-0.5);
  var vyr = 2*(this.nextRand()-0.5);
  var vzr = 2*(this.nextRand()-0.5);
  var c = 0;
  while((c<20) && (vxr*closestPoint[3]+vyr*closestPoint[4]+vzr*closestPoint[5] < 0.0) ) {
    vxr = 2*(this.nextRand()-0.5);
    vyr = 2*(this.nextRand()-0.5);
    vzr = 2*(this.nextRand()-0.5);
    c++;
  }
  if(c === 20) { return null; }


  var dotprod = vx*closestPoint[3] + vy*closestPoint[4] + vz*closestPoint[5];
  var u = [vx - 2*closestPoint[3]*dotprod, vy - 2*closestPoint[4]*dotprod, vz - 2*closestPoint[5]*dotprod];

  var v;

  var lambda = Math.pow( this.nextRand(), 2);
  v = [lambda*u[0]+(1.0-lambda)*vxr,lambda*u[1]+(1.0-lambda)*vyr,lambda*u[2]+(1.0-lambda)*vzr];

  return [x,y,z,v[0],v[1],v[2],closestPoint[6]];
}

MugRenderer.prototype.renderNextPixels = function() {
  for(var l = 0; l < this.width*this.width/(this._lowResMode ? 6 : 24); l++) {
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

      var vx = 1.6*(.25-(.5*this.i)/this.width);
      var vy = 1.6*(-0.25+(.5*this.j)/this.width);
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

        x=nextPoint[0];
        y=nextPoint[1];
        z=nextPoint[2];
        vx=nextPoint[3];
        vy=nextPoint[4];
        vz=nextPoint[5];

        if(nextPoint[6] <= 0) { // hits light source
          if(numBounces !== 0) {
            this.image[this.width*this.i+this.j] += Math.pow(this.decayFactor,numBounces);
            this.maxVal = Math.max( this.maxVal, this.image[this.width*this.i+this.j] );
          }
          break;
        }
      }
    }
  }
};

