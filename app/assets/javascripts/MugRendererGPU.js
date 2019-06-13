

var makeImageCallback = function(randArray,randArrayLength,spheres,numSpheres,cones,numCones,annuli,numAnnuli,Rmat) {
  var numPhotons = 10;
  var randArrayIdx = (this.thread.y*this.thread.x*1000)%randArrayLength;
  var maxBounces = 5; 
  var width = 600;
  var val = 0.0;
  var decayFactor = 0.25;

  for(var l = 0; l < numPhotons; l++) {
    
    // initial coordinates
    var x = 0.0;
    var y = 0.0;
    var z = 24.0;

    var xb = Rmat[0]*x + Rmat[1]*y + Rmat[2]*z;
    var yb = Rmat[3]*x + Rmat[4]*y + Rmat[5]*z;
    var zb = Rmat[6]*x + Rmat[7]*y + Rmat[8]*z;

    x = xb;
    y = yb;
    z = zb;

    var vx = 1.6*(.25-(.5*this.thread.y)/width);
    var vy = 1.6*(-0.25+(.5*this.thread.x)/width);
    var vz = -1.0;


    var vxb = Rmat[0]*vx + Rmat[1]*vy + Rmat[2]*vz;
    var vyb = Rmat[3]*vx + Rmat[4]*vy + Rmat[5]*vz;
    var vzb = Rmat[6]*vx + Rmat[7]*vy + Rmat[8]*vz;

    vx = vxb;
    vy = vyb;
    vz = vzb;

    // iterate over bounces for this photon
    for( var numBounces = 0; numBounces < maxBounces; numBounces++) {
      var nextX = 0;
      var nextY = 0;
      var nextZ = 0;
      var nextNX = 0;
      var nextNY = 0;
      var nextNZ = 0;
      var nextID = 0;
      var minDist = -1;

      // handle spheres

      for( var i = 0; i < numSpheres; i++) {
        var a = vx*vx + vy*vy + vz*vz;
        var b = 2*((x-spheres[i][0])*vx+(y-spheres[i][1])*vy+(z-spheres[i][2])*vz);
        var c = Math.pow(x-spheres[i][0],2)+Math.pow(y-spheres[i][1],2)+Math.pow(z-spheres[i][2],2)-Math.pow(spheres[i][3],2);
        if(b*b < 4*a*c) { continue; }
        if(Math.abs(a) <= 0.0001) { continue; }
            
        var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
        var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
       
        var t = -1;
        if( (t1<0) && (t2<0) ) { continue; }
      
        if( (t1<0) && (t2>0) ) { t = t2; }
      
        if( (t1>0) && (t2<0) ) { t = t1; }
      
        if( (t1>0) && (t2>0) ) { t = Math.min(t1,t2); }
      
        if( t === -1 ) { continue; }
      
        var xp = x+vx*t;
        var yp = y+vy*t;
        var zp = z+vz*t;
      
        if( (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01) ) {
          continue;
        }
      
        var nx = spheres[i][4]*(xp-spheres[i][0]);
        var ny = spheres[i][4]*(yp-spheres[i][1]);
        var nz = spheres[i][4]*(zp-spheres[i][2]);
        var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
        nx /= nabs;
        ny /= nabs;
        nz /= nabs;
      
        if(vx*nx+vy*ny+vz*nz > 0.0) { continue; }

        if( (minDist === -1) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t<minDist) ) {
          minDist = Math.sqrt(vx*vx+vy*vy+vz*vz)*t;
          nextX = xp;
          nextY = yp;
          nextZ = zp;
          nextNX = nx;
          nextNY = ny;
          nextNZ = nz;
          nextID = spheres[i][5];
        }
      }


      // handle cones
      for(var i = 0; i < numCones; i++) {
        var a = vx*vx+vy*vy-cones[i][1]*cones[i][1]*vz*vz;
        var b = 2*vx*x + 2*vy*y - 2*(cones[i][0]+cones[i][1]*z)*cones[i][1]*vz;
        var c = x*x + y*y - Math.pow(cones[i][0]+cones[i][1]*z,2);
        if(b*b < 4*a*c) { continue; }
        if(Math.abs(a) <= 0.0001) { continue; }
      
        var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
        var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
      
        var t = -1;
        if( (t1<0) && (t2<0) ) { continue; }
      
        if( (t1<0) && (t2>0) ) { t = t2; }
      
        if( (t1>0) && (t2<0) ) { t = t1; }
      
        if( (t1>0) && (t2>0) ) {
          var tmin = Math.min(t1,t2);
          var tmax = Math.max(t1,t2);
          if((z + vz*tmin < cones[i][2]) || (z+vz*tmin > cones[i][3])) {
            t=tmax;
          } else {
            t=tmin;
          }
        }

        if( t === -1 ) { continue; }
      
        if( Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01 ) {
          continue;
        }
      
        var xp = x+vx*t;
        var yp = y+vy*t;
        var zp = z+vz*t;
      
        if( zp < cones[i][2] ) { continue; }
        if( zp > cones[i][3] ) { continue; }
      
        var nx = cones[i][4]*x / Math.sqrt(x*x+y*y);
        var ny = cones[i][4]*y / Math.sqrt(x*x+y*y);
        var nz = -1 * cones[i][4]*cones[i][1];
        var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
        nx /= nabs;
        ny /= nabs;
        nz /= nabs;
      
      
        if(vx*nx+vy*ny+vz*nz > 0.0) { continue; }
      
        if( (minDist === -1) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t<minDist) ) {
          minDist = Math.sqrt(vx*vx+vy*vy+vz*vz)*t;
          nextX = xp;
          nextY = yp;
          nextZ = zp;
          nextNX = nx;
          nextNY = ny;
          nextNZ = nz;
          nextID = cones[i][5];
        }
      }



      // handle annuli

      for(var i = 0; i < numAnnuli; i++) {

        if( vz === 0.0 ) {
          continue;
        }
      
        var t = (annuli[i][2]-z)/vz;
      
        if((t<0) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01)) {
          continue;
        }
      
        var xp = x + vx*t;
        var yp = y + vy*t;
        var zp = z + vz*t;
      
        var nx = 0.0;
        var ny = 0.0;
        var nz = annuli[i][3];
      
        if( Math.sqrt( xp*xp + yp*yp ) > annuli[i][1] ) {
          continue;
        }
      
        if( Math.sqrt( xp*xp + yp*yp ) < annuli[i][0] ) {
          continue;
        }
      
      
        if(vx*nx+vy*ny+vz*nz > 0.0) { continue; }
        if( (minDist === -1) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t<minDist) ) {
          minDist = Math.sqrt(vx*vx+vy*vy+vz*vz)*t;
          nextX = xp;
          nextY = yp;
          nextZ = zp;
          nextNX = nx;
          nextNY = ny;
          nextNZ = nz;
          nextID = annuli[i][4];
        }
      }



      // check if an object was encountered
      if(minDist === -1) { break; }

      x=nextX;
      y=nextY;
      z=nextZ;

      var vxr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
      var vyr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
      var vzr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
      var c = 0;
      while((c<20) && (vxr*nextNX+vyr*nextNY+vzr*nextNZ < 0.0) ) {
        vxr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
        vyr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
        vzr = 2*(randArray[(randArrayIdx++)%randArrayLength]-0.5);
        c++;
      }
      if(c === 20) { break; }
    
    
      var dotprod = vx*nextNX + vy*nextNY + vz*nextNZ;
      var ux = vx - 2*nextNX*dotprod;
      var uy = vy - 2*nextNY*dotprod;
      var uz = vz - 2*nextNZ*dotprod;
    
      var lambda = Math.pow( randArray[(randArrayIdx++)%randArrayLength], 2);
    
      vx = lambda*ux+(1.0-lambda)*vxr;
      vy = lambda*uy+(1.0-lambda)*vyr;
      vz = lambda*uz+(1.0-lambda)*vzr;


      if(nextID <= 0) { // hits light source
        if(numBounces > 0) {
          val += Math.pow(decayFactor,numBounces);
        }
        break;
      }
    }

  }

  return val / numPhotons;
};
