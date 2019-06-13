var gpu = new GPU();

var width0 = 600;

var makeImage = gpu.createKernel( function() {
  var numPhotons = 100;
  var maxBounces = 5; 
  var width = 600;
  var val = 0;
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
      var nextPt;
      var minDist;

      // handle spheres
      var spheres = [
        [0.0,1.5*75.0,1.5*60.0,30.0,1,0], // [xc,yc,yz,r,lambda,id]
        [0.0,-1.5*75.0,1.5*60.0,30.0,1,-1],
        [1.5*75.0,0.0,1.5*60.0,30.0,1,-2],
        [-1.5*75.0,0.0,1.5*60.0,30.0,1,-3],
        [0.0,0.0,1.5*200.0,100.0,1,-4]
      ];

      for( var i = 0; i < spheres.length; i++) {
        var a = vx*vx + vy*vy + vz*vz;
        var b = 2*((x0-spheres[i][0])*vx+(y0-spheres[i][1])*vy+(z0-spheres[i][2])*vz);
        var c = Math.pow(x0-spheres[i][0],2)+Math.pow(y0-spheres[i][1],2)+Math.pow(z0-spheres[i][2],2)-Math.pow(spheres[i][3],2);
        if(b*b < 4*a*c) { continue; }
        if(Math.abs(a) <= 0.0001) { continue; }
      
        var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
        var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
       
        var t;
        if( (t1<0) && (t2<0) ) { continue; }
      
        if( (t1<0) && (t2>0) ) { t = t2; }
      
        if( (t1>0) && (t2<0) ) { t = t1; }
      
        if( (t1>0) && (t2>0) ) { t = Math.min(t1,t2); }
      
        if( !t ) { continue; }
      
        var x = x0+vx*t;
        var y = y0+vy*t;
        var z = z0+vz*t;
      
        if( (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01) ) {
          continue;
        }
      
        var nx = spheres[i][4]*(x-spheres[i][0]);
        var ny = spheres[i][4]*(y-spheres[i][1]);
        var nz = spheres[i][4]*(z-spheres[i][2]);
        var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
        nx /= nabs;
        ny /= nabs;
        nz /= nabs;
      
        if(vx*nx+vy*ny+vz*nz > 0.0) { continue; }

        if( (!nextPt) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t<minDist) ) {
          nextPt = [x,y,z,nx,ny,nz,spheres[i][5]];
          minDist = Math.sqrt(vx*vx+vy*vy+vz*vz)*t;
        }
      }


      // check if an object was encountered
      if(!nextPt) { break; }

      x=nextPt[0];
      y=nextPt[1];
      z=nextPt[2];

      var vxr = 2*(Math.random()-0.5);
      var vyr = 2*(Math.random()-0.5);
      var vzr = 2*(Math.random()-0.5);
      var c = 0;
      while((c<20) && (vxr*nextPt[3]+vyr*nextPt[4]+vzr*nextPt[5] < 0.0) ) {
        vxr = 2*(Math.random()-0.5);
        vyr = 2*(Math.random()-0.5);
        vzr = 2*(Math.random()-0.5);
        c++;
      }
      if(c === 20) { break; }
    
    
      var dotprod = vx*nextPt[3] + vy*nextPt[4] + vz*nextPt[5];
      var u = [vx - 2*nextPt[3]*dotprod, vy - 2*nextPt[4]*dotprod, vz - 2*nextPt[5]*dotprod];
    
      var v;
    
      var lambda = Math.pow( Math.random(), 2);
      v = [lambda*u[0]+(1.0-lambda)*vxr,lambda*u[1]+(1.0-lambda)*vyr,lambda*u[2]+(1.0-lambda)*vzr];
    
      vx = v[0];
      vy = v[1];
      vz = v[2];



      if(nextPt[6] <= 0) { // hits light source
        if(numBounces !== 0) {
          val += Math.pow(decayFactor,numBounces);
        }
        break;
      }
    }

  }

  return val / numPhotons;
}).setOutput([width0,width0]);

