

var makeImageCallback = function(randArray,spheres,numSpheres) {
  var numPhotons = 1000;
  var randArrayIdx = 0;
  var maxBounces = 5; 
  var width = 600;
  var val = 0.0;
  var decayFactor = 0.25;

  for(var l = 0; l < numPhotons; l++) {
    
    // initial coordinates
    var x = 0.0;
    var y = 0.0;
    var z = 24.0;
    var vx = 1.6*(.25-(.5*this.thread.y)/width);
    var vy = 1.6*(-0.25+(.5*this.thread.x)/width);
    var vz = -1.0;


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


      // check if an object was encountered
      if(minDist === -1) { break; }

      x=nextX;
      y=nextY;
      z=nextZ;

      var vxr = 2*(randArray[randArrayIdx++]-0.5);
      var vyr = 2*(randArray[randArrayIdx++]-0.5);
      var vzr = 2*(randArray[randArrayIdx++]-0.5);
      var c = 0;
      while((c<20) && (vxr*nextNX+vyr*nextNY+vzr*nextNZ < 0.0) ) {
        vxr = 2*(randArray[randArrayIdx++]-0.5);
        vyr = 2*(randArray[randArrayIdx++]-0.5);
        vzr = 2*(randArray[randArrayIdx++]-0.5);
        c++;
      }
      if(c === 20) { break; }
    
    
      var dotprod = vx*nextNX + vy*nextNY + vz*nextNZ;
      var ux = vx - 2*nextNX*dotprod;
      var uy = vy - 2*nextNY*dotprod;
      var uz = vz - 2*nextNZ*dotprod;
    
      var lambda = Math.pow( randArray[randArrayIdx++], 2);
    
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
