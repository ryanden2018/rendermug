function computeImage(Rmat,width,numPhotons,maxBounces,mouseIsDown) {
  var val = 0.0;
  var Xvec0 = [Rmat[0]*0.0 + Rmat[1]*0.0 + Rmat[2]*24.0,
  Rmat[3]*0.0 + Rmat[4]*0.0 + Rmat[5]*24.0,
  Rmat[6]*0.0 + Rmat[7]*0.0 + Rmat[8]*24.0,
  0];
  var Vvec0 = [Rmat[0]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[1]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[2]*(-1.0),
  Rmat[3]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[4]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[5]*(-1.0),
  Rmat[6]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[7]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[8]*(-1.0),
  0];
  
  for(var q = 0; q < numPhotons; q++) {
  
  var Xvec = [Xvec0[0],Xvec0[1],Xvec0[2],Xvec0[3]];
  var Vvec = [Vvec0[0],Vvec0[1],Vvec0[2],Vvec0[3]];


  for(var l = 0; l < maxBounces; l++) {
      var x = Xvec[0];
      var y = Xvec[1];
      var z = Xvec[2];
      var id = Xvec[3];
      var vx = Vvec[0];
      var vy = Vvec[1];
      var vz = Vvec[2];
      var nx = 0;
      var ny = 0;
      var nz = 0;

      if( ((id>0)&&(id<6)) || (id===17) ) {
        break;
      } else {

        var nextid = 0;
        var t = -1;

        var res = handleSphere1(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 1;
        } 

        res = handleSphere2(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 2;
        } 

        res = handleSphere3(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 3;
        } 

        res = handleSphere4(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 4;
        } 

        res = handleSphere5(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 5;
        } 

        res = handleSphere17(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 17;
        } 

        res = handleSphere6(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 6;
        } 

        res = handleSphere7(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 7;
        } 

        res = handleSphere8(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 8;
        } 

        res = handleSphere9(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 9;
        } 

        res = handleSphere10(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 10;
        } 

        res = handleSphere11(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 11;
        } 

        res = handleCone12(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 12;
        } 

        res = handleCone13(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 13;
        } 
        
        res = handleAnnulus14(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 14;
        } 

        res = handleAnnulus15(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 15;
        } 

        res = handleAnnulus16(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 16;
        }

        res = handleParaboloid18(x,y,z,vx,vy,vz);
        if( ((t<-0.99)&&(res[3]>-0.99)) || ((res[3]>-0.99)&&(res[3]<t)) ) {
          t = res[3];
          nx = res[0];
          ny = res[1];
          nz = res[2];
          nextid = 18;
        }

        if(mouseIsDown && (nextid>5) && (nextid!==17) ) {
          return nextid/20;
        }

        if(mouseIsDown) { return 0; }
        
        if(t < -0.99) { 
          break; 
        }

        Xvec = [x+vx*t,y+vy*t,z+vz*t,nextid];
      }

    
      id = Xvec[3];
      var numBounces = Vvec[3];
    
      if(id === 0) {
        // do nothing
      } else if(( (id>0)&&(id<6)) || (id === 17) ) {
        // do nothing
      } else {
        var rand1 = Math.random()
        var rand2 = Math.random()
        rand1 = 2*Math.PI*(rand1 - Math.floor(rand1));
        rand2 = 2*((rand2 - Math.floor(rand2))-0.5); 
        var proj = Math.sqrt(1.0-rand2*rand2);
        var vxr = Math.cos(rand1)*proj;
        var vyr = Math.sin(rand1)*proj;
        var vzr = rand2;
        var dotprodr = vxr*nx+vyr*ny+vzr*nz;
        if(dotprodr < 0.0) {
          vxr = vxr - 2*nx*dotprodr;
          vyr = vyr - 2*ny*dotprodr;
          vzr = vzr - 2*nz*dotprodr; 
        }
        
        Vvec = [vxr,vyr,vzr,numBounces+1];
      }
    }

    var id = Xvec[3];
    var numBounces = Vvec[3];
    if(numBounces > 0) {
      if( ((id>0)&&(id<6)) || (id===17)) {
        var change = 1;
        for( var b = 0; b < maxBounces; b++) {
          if(b < numBounces) {
            change *= 0.75;
          }
        }
        val +=  change;
      }
    }
  }
  return val;  
}



// generate spheres


var genSphereFun = (xc,yc,zc,r,lambda,id) =>
`function handleSphere${id}(x,y,z,vx,vy,vz) {
  var a = vx*vx + vy*vy + vz*vz;
  var b = 2*((x-${xc})*vx+(y-${yc})*vy+(z-${zc})*vz);
  var c = (x-${xc})*(x-${xc})+(y-${yc})*(y-${yc})+(z-${zc})*(z-${zc})-${r}*${r};
  
  if(b*b < 4*a*c) { return [0,0,0,-1]; }
  if(Math.abs(a) <= 0.00000000001) { return [0,0,0,-1]; }
      
  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
  
  var t = -1;
  if( (t1<0.01) && (t2<0.01) ) { return [0,0,0,-1]; }

  if( (t1<0.01) && (t2>0.01) ) { t = t2; }

  if( (t1>0.01) && (t2<0.01) ) { t = t1; }

  if( (t1>0.01) && (t2>0.01) ) { t = Math.min(t1,t2); }

  if( t === -1 ) { return [0,0,0,-1]; }

  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  var nx = ${lambda}*(xp-${xc});
  var ny = ${lambda}*(yp-${yc});
  var nz = ${lambda}*(zp-${zc});
  var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;

  if(vx*nx+vy*ny+vz*nz > 0.0) { return [0,0,0,-1]; }

  return [nx,ny,nz,t];
}`;

eval(genSphereFun("0.0","1.5*75.0","60.0","30.0","1","1"));        //source
eval(genSphereFun("0.0","(-1.5*75.0)","60.0","(1*30.0)","1","2"));     //source
eval(genSphereFun("1*75.0","0.0","60.0","(1*30.0)","1","3"));        //source
eval(genSphereFun("(-1*75.0)","0.0","60.0","(1*30.0)","1","4"));     //source
eval(genSphereFun("0.0","0.0","30.0","(1*10.0)","1","5"));     //source
eval(genSphereFun("0.0","0.0","(-1*30.0)","(1*10.0)","1","17")); //source
eval(genSphereFun("4.75","0.0","3.0","(1*1.0)","1","6"));
eval(genSphereFun("4.75","0.0","(-1*3.0)","(1*1.0)","1","7"));
eval(genSphereFun("6.625","0.0","2.4","(1*1.0)","1","8"));
eval(genSphereFun("6.625","0.0","(-1*2.4)","(1*1.0)","1","9"));
eval(genSphereFun("7.985","0.0","0.975","(1*1.0)","1","10"));
eval(genSphereFun("7.985","0.0","(-1*0.975)","(1*1.0)","1","11"));


// generate cones

var genConeFun = (r0,k,z0,z1,lambda,id) =>
`function handleCone${id}(x,y,z,vx,vy,vz) {
  var a = vx*vx+vy*vy-${k}*${k}*vz*vz;
  var b = 2*vx*x + 2*vy*y - 2*(${r0}+${k}*z)*${k}*vz;
  var c = x*x + y*y - (${r0}+${k}*z)*(${r0}+${k}*z);
  if(b*b < 4*a*c) { return [0,0,0,-1]; }
  if(Math.abs(a) <= 0.0000000000001) { return [0,0,0,-1]; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);

  var t = -1;
  if( (t1<0.01) && (t2<0.01) ) { return [0,0,0,-1]; }

  if( (t1<0.01) && (t2>0.01) ) { t = t2; }

  if( (t1>0.01) && (t2<0.01) ) { t = t1; }

  if( (t1>0.01) && (t2>0.01) ) {
    var tmin = Math.min(t1,t2);
    var tmax = Math.max(t1,t2);
    if((z + vz*tmin < ${z0}) || (z+vz*tmin > ${z1})) {
      t=tmax;
    } else {
      t=tmin;
    }
  }

  if( t === -1 ) { return [0,0,0,-1]; }

  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  if( zp < ${z0} ) { return [0,0,0,-1]; }
  if( zp > ${z1} ) { return [0,0,0,-1]; }

  var nx = ${lambda}*xp / Math.sqrt(xp*xp+yp*yp);
  var ny = ${lambda}*yp / Math.sqrt(xp*xp+yp*yp);
  var nz = -1 * ${lambda}*${k};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;


  if(vx*nx+vy*ny+vz*nz > 0.0) { return [0,0,0,-1]; }

  return [nx,ny,nz,t];
}`;

eval(genConeFun("3.75","0","(-4.0)","4.0","1","12"));
eval(genConeFun("3.25","0","(-3.5)","4.0","(-1)","13"));


// generate annuli

var genAnnulusFun = (r0,r1,z0,lambda,id) =>
`function handleAnnulus${id}(x,y,z,vx,vy,vz) {
  if( vz === 0.0 ) {
    return [0,0,0,-1];
  }

  var t = (${z0}-z)/vz;

  if(t<0.01) {
    return [0,0,0,-1];
  }

  var xp = x + vx*t;
  var yp = y + vy*t;
  var zp = z + vz*t;

  var nx = 0.0;
  var ny = 0.0;
  var nz = ${lambda};

  if( xp*xp + yp*yp > ${r1}*${r1} ) {
    return [0,0,0,-1];
  }

  if( xp*xp + yp*yp < ${r0}*${r0} ) {
    return [0,0,0,-1];
  }


  if(vx*nx+vy*ny+vz*nz > 0.0) { return [0,0,0,-1]; }

  return [nx,ny,nz,t];
}`;


eval(genAnnulusFun("3.15","3.75","(-4.0)","(-1)","14"));
eval(genAnnulusFun("0.0","3.25","(-3.5)","1","15"));
eval(genAnnulusFun("3.25","3.75","4.0","1","16"));



// generate paraboloids

var genParaboloidFun = (zb,k,z0,z1,lambda,id) =>
`function handleParaboloid${id}(x,y,z,vx,vy,vz) {
  var a = ${k}*(vx*vx+vy*vy);
  var b = ${k}*(2*x*vx+2*y*vy)-vz;
  var c = ${zb}+${k}*(x*x+y*y)-z;
  if(b*b < 4*a*c) { return [0,0,0,-1]; }
  if(Math.abs(a) <= 0.0000000000001) { return [0,0,0,-1]; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);

  var t = -1;
  if( (t1<0.01) && (t2<0.01) ) { return [0,0,0,-1]; }

  if( (t1<0.01) && (t2>0.01) ) { t = t2; }

  if( (t1>0.01) && (t2<0.01) ) { t = t1; }

  if( (t1>0.01) && (t2>0.01) ) {
    var tmin = Math.min(t1,t2);
    var tmax = Math.max(t1,t2);
    if((z + vz*tmin < ${z0}) || (z+vz*tmin > ${z1})) {
      t=tmax;
    } else {
      t=tmin;
    }
  }

  if( t === -1 ) { return [0,0,0,-1]; }


  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  if( zp < ${z0} ) { return [0,0,0,-1]; }
  if( zp > ${z1} ) { return [0,0,0,-1]; }

  var nx = ${lambda} * (-2)*${k}*xp;
  var ny = ${lambda} * (-2)*${k}*yp;
  var nz = ${lambda};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;

  if(vx*nx+vy*ny+vz*nz > 0.0) { return [0,0,0,-1]; }

  return [nx,ny,nz,t];
}`;

eval(genParaboloidFun("(-3.8)","(-0.02)","(-4.0)","(-3.8)","(-1.0)","18"));

