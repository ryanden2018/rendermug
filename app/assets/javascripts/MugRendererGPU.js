function computeImage(Rmat,width,numPhotons,maxBounces,refl) {
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
    /////////////////////////////////////////
    var x = Xvec[0];
    var y = Xvec[1];
    var z = Xvec[2];
    var id = Xvec[3];
    var vx = Vvec[0];
    var vy = Vvec[1];
    var vz = Vvec[2];

    if( ((id>0)&&(id<6)) || (id===17) ) {
      break;
    } else {

      var nextx = x;
      var nexty = y;
      var nextz = z;
      var nextid = 0;
      var minDist = -1;

      var res1 = handleSphere1(x,y,z,vx,vy,vz);
      var thisDist1 = Math.sqrt(
        Math.pow(x-res1[0],2)+
        Math.pow(y-res1[1],2)+
        Math.pow(z-res1[2],2)
      );
      if( ((minDist===-1)&&(res1[3]!==0)) || ((res1[3] !== 0)&&(thisDist1<minDist)) ) {
        nextx = res1[0];
        nexty = res1[1];
        nextz = res1[2];
        nextid = res1[3];
        minDist = thisDist1;
      }

      var res2 = handleSphere2(x,y,z,vx,vy,vz);
      var thisDist2 = Math.sqrt(
        Math.pow(x-res2[0],2)+
        Math.pow(y-res2[1],2)+
        Math.pow(z-res2[2],2)
      );
      if( ((minDist===-1)&&(res2[3]!==0)) || ((res2[3] !== 0)&&(thisDist2<minDist)) ) {
        nextx = res2[0];
        nexty = res2[1];
        nextz = res2[2];
        nextid = res2[3];
        minDist = thisDist2;
      }


      var res3 = handleSphere3(x,y,z,vx,vy,vz);
      var thisDist3 = Math.sqrt(
        Math.pow(x-res3[0],2)+
        Math.pow(y-res3[1],2)+
        Math.pow(z-res3[2],2)
      );
      if( ((minDist===-1)&&(res3[3]!==0)) || ((res3[3] !== 0)&&(thisDist3<minDist)) ) {
        nextx = res3[0];
        nexty = res3[1];
        nextz = res3[2];
        nextid = res3[3];
        minDist = thisDist3;
      }


      var res4 = handleSphere4(x,y,z,vx,vy,vz);
      var thisDist4 = Math.sqrt(
        Math.pow(x-res4[0],2)+
        Math.pow(y-res4[1],2)+
        Math.pow(z-res4[2],2)
      );
      if( ((minDist===-1)&&(res4[3]!==0)) || ((res4[3] !== 0)&&(thisDist4<minDist)) ) {
        nextx = res4[0];
        nexty = res4[1];
        nextz = res4[2];
        nextid = res4[3];
        minDist = thisDist4;
      }


      var res5 = handleSphere5(x,y,z,vx,vy,vz);
      var thisDist5 = Math.sqrt(
        Math.pow(x-res5[0],2)+
        Math.pow(y-res5[1],2)+
        Math.pow(z-res5[2],2)
      );
      if( ((minDist===-1)&&(res5[3]!==0)) || ((res5[3] !== 0)&&(thisDist5<minDist)) ) {
        nextx = res5[0];
        nexty = res5[1];
        nextz = res5[2];
        nextid = res5[3];
        minDist = thisDist5;
      }

      var res17 = handleSphere17(x,y,z,vx,vy,vz);
      var thisDist17 = Math.sqrt(
        Math.pow(x-res17[0],2)+
        Math.pow(y-res17[1],2)+
        Math.pow(z-res17[2],2)
      );
      if( ((minDist===-1)&&(res17[3]!==0)) || ((res17[3] !== 0)&&(thisDist17<minDist)) ) {
        nextx = res17[0];
        nexty = res17[1];
        nextz = res17[2];
        nextid = res17[3];
        minDist = thisDist17;
      }


      var res6 = handleSphere6(x,y,z,vx,vy,vz);
      var thisDist6 = Math.sqrt(
        Math.pow(x-res6[0],2)+
        Math.pow(y-res6[1],2)+
        Math.pow(z-res6[2],2)
      );
      if( ((minDist===-1)&&(res6[3]!==0)) || ((res6[3] !== 0)&&(thisDist6<minDist)) ) {
        nextx = res6[0];
        nexty = res6[1];
        nextz = res6[2];
        nextid = res6[3];
        minDist = thisDist6;
      }


      var res7 = handleSphere7(x,y,z,vx,vy,vz);
      var thisDist7 = Math.sqrt(
        Math.pow(x-res7[0],2)+
        Math.pow(y-res7[1],2)+
        Math.pow(z-res7[2],2)
      );
      if( ((minDist===-1)&&(res7[3]!==0)) || ((res7[3] !== 0)&&(thisDist7<minDist)) ) {
        nextx = res7[0];
        nexty = res7[1];
        nextz = res7[2];
        nextid = res7[3];
        minDist = thisDist7;
      }


      var res8 = handleSphere8(x,y,z,vx,vy,vz);
      var thisDist8 = Math.sqrt(
        Math.pow(x-res8[0],2)+
        Math.pow(y-res8[1],2)+
        Math.pow(z-res8[2],2)
      );
      if( ((minDist===-1)&&(res8[3]!==0)) || ((res8[3] !== 0)&&(thisDist8<minDist)) ) {
        nextx = res8[0];
        nexty = res8[1];
        nextz = res8[2];
        nextid = res8[3];
        minDist = thisDist8;
      }


      var res9 = handleSphere9(x,y,z,vx,vy,vz);
      var thisDist9 = Math.sqrt(
        Math.pow(x-res9[0],2)+
        Math.pow(y-res9[1],2)+
        Math.pow(z-res9[2],2)
      );
      if( ((minDist===-1)&&(res9[3]!==0)) || ((res9[3] !== 0)&&(thisDist9<minDist)) ) {
        nextx = res9[0];
        nexty = res9[1];
        nextz = res9[2];
        nextid = res9[3];
        minDist = thisDist9;
      }


      var res10 = handleSphere10(x,y,z,vx,vy,vz);
      var thisDist10 = Math.sqrt(
        Math.pow(x-res10[0],2)+
        Math.pow(y-res10[1],2)+
        Math.pow(z-res10[2],2)
      );
      if( ((minDist===-1)&&(res10[3]!==0)) || ((res10[3] !== 0)&&(thisDist10<minDist)) ) {
        nextx = res10[0];
        nexty = res10[1];
        nextz = res10[2];
        nextid = res10[3];
        minDist = thisDist10;
      }


      var res11 = handleSphere11(x,y,z,vx,vy,vz);
      var thisDist11 = Math.sqrt(
        Math.pow(x-res11[0],2)+
        Math.pow(y-res11[1],2)+
        Math.pow(z-res11[2],2)
      );
      if( ((minDist===-1)&&(res11[3]!==0)) || ((res11[3] !== 0)&&(thisDist11<minDist)) ) {
        nextx = res11[0];
        nexty = res11[1];
        nextz = res11[2];
        nextid = res11[3];
        minDist = thisDist11;
      }

      var res12 = handleCone12(x,y,z,vx,vy,vz);
      var thisDist12 = Math.sqrt(
        Math.pow(x-res12[0],2)+
        Math.pow(y-res12[1],2)+
        Math.pow(z-res12[2],2)
      );
      if( ((minDist===-1)&&(res12[3]!==0)) || ((res12[3] !== 0)&&(thisDist12<minDist)) ) {
        nextx = res12[0];
        nexty = res12[1];
        nextz = res12[2];
        nextid = res12[3];
        minDist = thisDist12;
      }
      
      var res13 = handleCone13(x,y,z,vx,vy,vz);
      var thisDist13 = Math.sqrt(
        Math.pow(x-res13[0],2)+
        Math.pow(y-res13[1],2)+
        Math.pow(z-res13[2],2)
      );
      if( ((minDist===-1)&&(res13[3]!==0)) || ((res13[3] !== 0)&&(thisDist13<minDist)) ) {
        nextx = res13[0];
        nexty = res13[1];
        nextz = res13[2];
        nextid = res13[3];
        minDist = thisDist13;
      }

      var res14 = handleAnnulus14(x,y,z,vx,vy,vz);
      var thisDist14 = Math.sqrt(
        Math.pow(x-res14[0],2)+
        Math.pow(y-res14[1],2)+
        Math.pow(z-res14[2],2)
      );
      if( ((minDist===-1)&&(res14[3]!==0)) || ((res14[3] !== 0)&&(thisDist14<minDist)) ) {
        nextx = res14[0];
        nexty = res14[1];
        nextz = res14[2];
        nextid = res14[3];
        minDist = thisDist14;
      }

      var res15 = handleAnnulus15(x,y,z,vx,vy,vz);
      var thisDist15 = Math.sqrt(
        Math.pow(x-res15[0],2)+
        Math.pow(y-res15[1],2)+
        Math.pow(z-res15[2],2)
      );
      if( ((minDist===-1)&&(res15[3]!==0)) || ((res15[3] !== 0)&&(thisDist15<minDist)) ) {
        nextx = res15[0];
        nexty = res15[1];
        nextz = res15[2];
        nextid = res15[3];
        minDist = thisDist15;
      }

      var res16 = handleAnnulus16(x,y,z,vx,vy,vz);
      var thisDist16 = Math.sqrt(
        Math.pow(x-res16[0],2)+
        Math.pow(y-res16[1],2)+
        Math.pow(z-res16[2],2)
      );
      if( ((minDist===-1)&&(res16[3]!==0)) || ((res16[3] !== 0)&&(thisDist16<minDist)) ) {
        nextx = res16[0];
        nexty = res16[1];
        nextz = res16[2];
        nextid = res16[3];
        minDist = thisDist16;
      }

      var res18 = handleParaboloid18(x,y,z,vx,vy,vz);
      var thisDist18 = Math.sqrt(
        Math.pow(x-res18[0],2)+
        Math.pow(y-res18[1],2)+
        Math.pow(z-res18[2],2)
      );
      if( ((minDist===-1)&&(res18[3]!==0)) || ((res18[3] !== 0)&&(thisDist18<minDist)) ) {
        nextx = res18[0];
        nexty = res18[1];
        nextz = res18[2];
        nextid = res18[3];
        minDist = thisDist18;
      }

      if(minDist === -1) { break; }

      Xvec = [nextx,nexty,nextz,nextid];
    }
    //////////////////////////////////////////////

    x = Xvec[0];
    y = Xvec[1];
    z = Xvec[2];
    id = Xvec[3];
    var Nvec = [0,0,0];
  
    if(id===1) {
      Nvec = sphereNormal1(x,y,z);
    }
    if(id===2) {
      Nvec = sphereNormal2(x,y,z);
    }
    if(id===3) {
      Nvec = sphereNormal3(x,y,z);
    }
    if(id===4) {
      Nvec =sphereNormal4(x,y,z);
    }
    if(id===5) {
      Nvec = sphereNormal5(x,y,z);
    }
    if(id===17) {
      Nvec = sphereNormal17(x,y,z);
    }
    if(id===6) {
      Nvec = sphereNormal6(x,y,z);
    }
    if(id===7) {
      Nvec =sphereNormal7(x,y,z);
    }
    if(id===8) {
      Nvec = sphereNormal8(x,y,z);
    }
    if(id===9) {
      Nvec = sphereNormal9(x,y,z);
    }
    if(id===10) {
      Nvec = sphereNormal10(x,y,z);
    }
    if(id===11) {
      Nvec = sphereNormal11(x,y,z);
    }
    if(id===12) {
      Nvec = coneNormal12(x,y,z);
    }
    if(id===13) {
      Nvec = coneNormal13(x,y,z);
    }
    if(id===14) {
      Nvec = annulusNormal14(x,y,z);
    }
    if(id===15) {
      Nvec = annulusNormal15(x,y,z);
    }
    if(id===16) {
      Nvec = annulusNormal16(x,y,z);
    }
    if(id===18) {
      Nvec = paraboloidNormal18(x,y,z);
    }
    ///////////////////////////////////////////////

    id = Xvec[3];
    vx = Vvec[0];
    vy = Vvec[1];
    vz = Vvec[2];
    var numBounces = Vvec[3];
    var nx = Nvec[0];
    var ny = Nvec[1];
    var nz = Nvec[2];
  
    if(id === 0) {
      // do nothing
    } else if( ((id>0)&&(id<6)) || (id===17) ) {
      // do nothing
    } else {
      var rand = Math.random();
      var rand1 = 0.1*(Math.floor(rand*10)%10) + 0.01*(Math.floor(rand*1000)%10) + 0.001*(Math.floor(rand*100000)%10) + 0.0001*(Math.floor(rand*10000000)%10) + 0.00001*(Math.floor(rand*1000000000)%10) + 0.000001*(Math.floor(rand*100000000000)%10) + 0.0000001*(Math.floor(rand*10000000000000)%10) + 0.00000001*(Math.floor(rand*1000000000000000)%10);
      var rand2 = 0.1*(Math.floor(rand*100)%10) + 0.01*(Math.floor(rand*10000)%10) + 0.001*(Math.floor(rand*1000000)%10) + 0.0001*(Math.floor(rand*100000000)%10) + 0.00001*(Math.floor(rand*10000000000)%10) + 0.000001*(Math.floor(rand*1000000000000)%10) + 0.0000001*(Math.floor(rand*100000000000000)%10) + 0.00000001*(Math.floor(rand*10000000000000000)%10);
      rand1 = 2*Math.PI*(rand1 - Math.floor(rand1));
      rand2 = 2*((rand2 - Math.floor(rand2))-0.5); 
      var vxr = Math.cos(rand1)*Math.sqrt(1.0-rand2*rand2);
      var vyr = Math.sin(rand1)*Math.sqrt(1.0-rand2*rand2);
      var vzr = rand2;
      var dotprodr = vxr*nx+vyr*ny+vzr*nz;
      if(dotprodr < 0.0) {
        vxr = vxr - 2*nx*dotprodr;
        vyr = vyr - 2*ny*dotprodr;
        vzr = vzr - 2*nz*dotprodr; 
      }
      var dotprod = vx*nx + vy*ny + vz*nz;
      var u0 = vx - 2*nx*dotprod
      var u1 = vy - 2*ny*dotprod
      var u2 = vz - 2*nz*dotprod
      Vvec = [refl*u0+(1.0-refl)*vxr, refl*u1+(1.0-refl)*vyr, refl*u2+(1.0-refl)*vzr,numBounces+1];
    }

  }

  var id = Xvec[3];
  var numBounces = Vvec[3];
  if(numBounces > 0) {
    if( ((id>0)&&(id<6)) || (id==17)) {
      val += Math.pow(0.25,numBounces);
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
  var c = Math.pow(x-${xc},2)+Math.pow(y-${yc},2)+Math.pow(z-${zc},2)-Math.pow(${r},2);
  
  if(b*b < 4*a*c) { return [x,y,z,0]; }
  if(Math.abs(a) <= 0.00000000001) { return [x,y,z,0]; }
      
  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);
  
  var t = -1;
  if( (t1<0) && (t2<0) ) { return [x,y,z,0]; }

  if( (t1<0) && (t2>0) ) { t = t2; }

  if( (t1>0) && (t2<0) ) { t = t1; }

  if( (t1>0) && (t2>0) ) { t = Math.min(t1,t2); }

  if( t === -1 ) { return [x,y,z,0]; }

  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  if( (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01) ) {
    return [x,y,z,0];
  }

  var nx = ${lambda}*(xp-${xc});
  var ny = ${lambda}*(yp-${yc});
  var nz = ${lambda}*(zp-${zc});
  var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;

  if(vx*nx+vy*ny+vz*nz > 0.0) { return [x,y,z,0]; }

  return [xp,yp,zp,${id}];
}

function sphereNormal${id}(x,y,z) {
  var nx = ${lambda}*(x-${xc});
  var ny = ${lambda}*(y-${yc});
  var nz = ${lambda}*(z-${zc});
  var nabs = Math.sqrt( nx*nx + ny*ny + nz*nz );
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;
  return [nx,ny,nz];
}`;

eval(genSphereFun("0.0","1.5*75.0","60.0","30.0","1","1"));        //source
eval(genSphereFun("0.0","(-1.5*75.0)","60.0","30.0","1","2"));     //source
eval(genSphereFun("1.5*75.0","0.0","60.0","30.0","1","3"));        //source
eval(genSphereFun("(-1.5*75.0)","0.0","60.0","30.0","1","4"));     //source
eval(genSphereFun("0.0","0.0","200.0","100.0","1","5"));     //source
eval(genSphereFun("0.0","0.0","(-1*200.0)","100.0","1","17")); //source
eval(genSphereFun("4.75","0.0","3.0","1.0","1","6"));
eval(genSphereFun("4.75","0.0","(-1*3.0)","1.0","1","7"));
eval(genSphereFun("6.625","0.0","2.4","1.0","1","8"));
eval(genSphereFun("6.625","0.0","(-1*2.4)","1.0","1","9"));
eval(genSphereFun("7.985","0.0","0.975","1.0","1","10"));
eval(genSphereFun("7.985","0.0","(-1*0.975)","1.0","1","11"));


// generate cones

var genConeFun = (r0,k,z0,z1,lambda,id) =>
`function handleCone${id}(x,y,z,vx,vy,vz) {
  var a = vx*vx+vy*vy-${k}*${k}*vz*vz;
  var b = 2*vx*x + 2*vy*y - 2*(${r0}+${k}*z)*${k}*vz;
  var c = x*x + y*y - Math.pow(${r0}+${k}*z,2);
  if(b*b < 4*a*c) { return [x,y,z,0]; }
  if(Math.abs(a) <= 0.0000000000001) { return [x,y,z,0]; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);

  var t = -1;
  if( (t1<0) && (t2<0) ) { return [x,y,z,0]; }

  if( (t1<0) && (t2>0) ) { t = t2; }

  if( (t1>0) && (t2<0) ) { t = t1; }

  if( (t1>0) && (t2>0) ) {
    var tmin = Math.min(t1,t2);
    var tmax = Math.max(t1,t2);
    if((z + vz*tmin < ${z0}) || (z+vz*tmin > ${z1})) {
      t=tmax;
    } else {
      t=tmin;
    }
  }

  if( t === -1 ) { return [x,y,z,0]; }


  if( Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01 ) {
    return [x,y,z,0];
  }

  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  if( zp < ${z0} ) { return [x,y,z,0]; }
  if( zp > ${z1} ) { return [x,y,z,0]; }

  var nx = ${lambda}*xp / Math.sqrt(xp*xp+yp*yp);
  var ny = ${lambda}*yp / Math.sqrt(xp*xp+yp*yp);
  var nz = -1 * ${lambda}*${k};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;


  if(vx*nx+vy*ny+vz*nz > 0.0) { return [x,y,z,0]; }

  return [xp,yp,zp,${id}];
}

function coneNormal${id}(x,y,z) {
  var nx = ${lambda}*x / Math.sqrt(x*x+y*y);
  var ny = ${lambda}*y / Math.sqrt(x*x+y*y);
  var nz = -1 * ${lambda}*${k};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;
  return [nx,ny,nz];
}`;

eval(genConeFun("3.75","0","(-4.0)","4.0","1","12"));
eval(genConeFun("3.25","0","(-3.5)","4.0","(-1)","13"));


// generate annuli

var genAnnulusFun = (r0,r1,z0,lambda,id) =>
`function handleAnnulus${id}(x,y,z,vx,vy,vz) {
  if( vz === 0.0 ) {
    return [x,y,z,0];
  }

  var t = (${z0}-z)/vz;

  if((t<0) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01)) {
    return [x,y,z,0];
  }

  var xp = x + vx*t;
  var yp = y + vy*t;
  var zp = z + vz*t;

  var nx = 0.0;
  var ny = 0.0;
  var nz = ${lambda};

  if( Math.sqrt( xp*xp + yp*yp ) > ${r1} ) {
    return [x,y,z,0];
  }

  if( Math.sqrt( xp*xp + yp*yp ) < ${r0} ) {
    return [x,y,z,0];
  }


  if(vx*nx+vy*ny+vz*nz > 0.0) { return [x,y,z,0]; }

  return [xp,yp,zp,${id}];
}

function annulusNormal${id}(x,y,z) {
  return [0,0,${lambda}];
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
  if(b*b < 4*a*c) { return [x,y,z,0]; }
  if(Math.abs(a) <= 0.0000000000001) { return [x,y,z,0]; }

  var t1 = (-b + Math.sqrt(b*b-4*a*c)) / (2*a);
  var t2 = (-b - Math.sqrt(b*b-4*a*c)) / (2*a);

  var t = -1;
  if( (t1<0) && (t2<0) ) { return [x,y,z,0]; }

  if( (t1<0) && (t2>0) ) { t = t2; }

  if( (t1>0) && (t2<0) ) { t = t1; }

  if( (t1>0) && (t2>0) ) {
    var tmin = Math.min(t1,t2);
    var tmax = Math.max(t1,t2);
    if((z + vz*tmin < ${z0}) || (z+vz*tmin > ${z1})) {
      t=tmax;
    } else {
      t=tmin;
    }
  }

  if( t === -1 ) { return [x,y,z,0]; }


  if( Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01 ) {
    return [x,y,z,0];
  }

  var xp = x+vx*t;
  var yp = y+vy*t;
  var zp = z+vz*t;

  if( zp < ${z0} ) { return [x,y,z,0]; }
  if( zp > ${z1} ) { return [x,y,z,0]; }

  var nx = ${lambda} * (-2)*${k}*xp;
  var ny = ${lambda} * (-2)*${k}*yp;
  var nz = ${lambda};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;

  if(vx*nx+vy*ny+vz*nz > 0.0) { return [x,y,z,0]; }

  return [xp,yp,zp,${id}];
}

function paraboloidNormal${id}(x,y,z) {
  var nx = ${lambda} * (-2)*${k}*x;
  var ny = ${lambda} * (-2)*${k}*y;
  var nz = ${lambda};
  var nabs = Math.sqrt(nx*nx+ny*ny+nz*nz);
  nx /= nabs;
  ny /= nabs;
  nz /= nabs;
  return [nx,ny,nz];
}`;

eval(genParaboloidFun("(-3.8)","(-0.02)","(-4.0)","(-3.8)","(-1.0)","18"));

