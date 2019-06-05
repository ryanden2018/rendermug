
function MugRenderer(width,numPhotons) {
  this.decayFactor = 0.5;
  this.maxBounces = 5;
  this.image = []
  this.width = width;
  this.numPhotons = numPhotons;
  this.i = 0;
  this.j = 0;

  for(var i=0; i < width*width; i++) {
    this.image.push(0.0);
  }
}

MugRenderer.prototype.idx = function(i,j) {
  return (this.width*i+j);
};


MugRenderer.prototype.inMug = function(x,y,z) {
  if( (z>-4.0)&&(z<4.0) &&
      (Math.sqrt(Math.pow(x-3.0,2)+Math.pow(y,2))>2.5) &&
      (Math.sqrt(Math.pow(x-3.0,2)+Math.pow(y,2))<3.0) ) {
    return true;
  }
  if( (z>-4.0)&&(z<-3.5) &&
      (Math.sqrt(Math.pow(x-3.0,2)+Math.pow(y,2))<3.0) ) {
    return true;
  }
  return false;
};

MugRenderer.prototype.renderNextPixel = function() {
  //console.log(`${this.i} ${this.j}`);
  this.image[this.idx(this.i,this.j)] = 0.0;

  for(var k = 0; k < this.numPhotons; k++) {
    var x = 8.0;
    var y = 0.0;
    var z = 12.0;
    var vx = -1.0;
    var vy = -0.5+(1.0*this.j)/this.width;
    var vz = -1.0-(2.0*this.i)/this.width;
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
