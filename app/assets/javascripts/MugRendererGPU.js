/////////////////////////////////////////////
// initPos, initVel                        //
/////////////////////////////////////////////
// initialize position and velocity        //
// vectors at the given pixel coords       //
/////////////////////////////////////////////


function initPos(Rmat,width) {
  return [Rmat[0]*0.0 + Rmat[1]*0.0 + Rmat[2]*24.0,
          Rmat[3]*0.0 + Rmat[4]*0.0 + Rmat[5]*24.0,
          Rmat[6]*0.0 + Rmat[7]*0.0 + Rmat[8]*24.0,
          0]; // fourth position = id
}

function initVel(Rmat,width) {
  return [Rmat[0]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[1]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[2]*(-1.0),
          Rmat[3]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[4]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[5]*(-1.0),
          Rmat[6]*1.6*(.25-(.5*this.thread.x)/width) + Rmat[7]*1.6*(-.25+(.5*this.thread.y)/width) + Rmat[8]*(-1.0),
          0];
}



/////////////////////////////////////////////
// nextPos                                 //
/////////////////////////////////////////////
// find the next position according to     // 
// closest bounce                          //
/////////////////////////////////////////////

function nextPos(Xarr,Varr) {
  var Xvec =  Xarr[this.thread.y][this.thread.x];
  var Vvec =  Varr[this.thread.y][this.thread.x];
  var x = Xvec[0];
  var y = Xvec[1];
  var z = Xvec[2];
  var id = Xvec[3];
  var vx = Vvec[0];
  var vy = Vvec[1];
  var vz = Vvec[2];

  if( ((id>0)&&(id<6)) || (id===17) ) {
    return [x,y,z,id]
  }

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

  return [nextx,nexty,nextz,nextid];
}



/////////////////////////////////////////////
// nextNormal                              //
/////////////////////////////////////////////
// find the next normal vector             //
/////////////////////////////////////////////

function nextNormal(Xarr,Varr) {
  var Xvec =  Xarr[this.thread.y][this.thread.x];
  var x = Xvec[0];
  var y = Xvec[1];
  var z = Xvec[2];
  var id = Xvec[3];

  if(id===1) {
    return sphereNormal1(x,y,z);
  }
  if(id===2) {
    return sphereNormal2(x,y,z);
  }
  if(id===3) {
    return sphereNormal3(x,y,z);
  }
  if(id===4) {
    return sphereNormal4(x,y,z);
  }
  if(id===5) {
    return sphereNormal5(x,y,z);
  }
  if(id===17) {
    return sphereNormal17(x,y,z);
  }
  if(id===6) {
    return sphereNormal6(x,y,z);
  }
  if(id===7) {
    return sphereNormal7(x,y,z);
  }
  if(id===8) {
    return sphereNormal8(x,y,z);
  }
  if(id===9) {
    return sphereNormal9(x,y,z);
  }
  if(id===10) {
    return sphereNormal10(x,y,z);
  }
  if(id===11) {
    return sphereNormal11(x,y,z);
  }
  if(id===12) {
    return coneNormal12(x,y,z);
  }
  if(id===13) {
    return coneNormal13(x,y,z);
  }
  if(id===14) {
    return annulusNormal14(x,y,z);
  }
  if(id===15) {
    return annulusNormal15(x,y,z);
  }
  if(id===16) {
    return annulusNormal16(x,y,z);
  }
  return [0,0,0];
}


/////////////////////////////////////////////
// nextVel                                 //
/////////////////////////////////////////////
// find the next velocity                  //
/////////////////////////////////////////////

function nextVel(Xarr,Varr,Narr) {
  var Xvec =  Xarr[this.thread.y][this.thread.x];
  var Vvec =  Varr[this.thread.y][this.thread.x];
  var Nvec = Narr[this.thread.y][this.thread.x];
  var id = Xvec[3];
  var vx = Vvec[0];
  var vy = Vvec[1];
  var vz = Vvec[2];
  var numBounces = Vvec[3];
  var nx = Nvec[0];
  var ny = Nvec[1];
  var nz = Nvec[2];

  if(id === 0) {
    return [vx,vy,vz,numBounces];
  }

  if( ((id>0)&&(id<6)) || (id===17) ) {
    return [vx,vy,vz,numBounces];
  }

  var vxr = 2*(Math.random()-0.5);
  var vyr = 2*(Math.random()-0.5);
  var vzr = 2*(Math.random()-0.5);
  var c = 0;
  while((c<20) && (vxr*nx+vyr*ny+vzr*nz < 0.0) ) {
    vxr = 2*(Math.random()-0.5);
    vyr = 2*(Math.random()-0.5);
    vzr = 2*(Math.random()-0.5);
    c++;
  }
  if(c === 20) { return [vx,vy,vz,numBounces]; }


  var dotprod = vx*nx + vy*ny + vz*nz;

  var u0 = vx - 2*nx*dotprod
  var u1 = vy - 2*ny*dotprod
  var u2 = vz - 2*nz*dotprod
  var lambda = Math.pow( Math.random(), 2);
  return [lambda*u0+(1.0-lambda)*vxr, lambda*u1+(1.0-lambda)*vyr, lambda*u2+(1.0-lambda)*vzr,numBounces+1];

}



/////////////////////////////////////////////
// computeIntensity                        //
/////////////////////////////////////////////
// compute the intensity after all bounces //
/////////////////////////////////////////////

function computeIntensity(Xarr,Varr) {
  var Xvec = Xarr[this.thread.y][this.thread.x];
  var Vvec = Varr[this.thread.y][this.thread.x];
  var id = Xvec[3];
  var numBounces = Vvec[3];
  if(numBounces > 0) {
    if( ((id>0)&&(id<6)) || (id==17)) {
      return Math.pow(0.25,numBounces);
    }
  }
  return 0.0;
}


// generate spheres


var genStrFun = (xc,yc,zc,r,lambda,id) =>
`function handleSphere${id}(x,y,z,vx,vy,vz) {
  var a = vx*vx + vy*vy + vz*vz;
  var b = 2*((x-${xc})*vx+(y-${yc})*vy+(z-${zc})*vz);
  var c = Math.pow(x-${xc},2)+Math.pow(y-${yc},2)+Math.pow(z-${zc},2)-Math.pow(${r},2);
  
  if(b*b < 4*a*c) { return [x,y,z,0]; }
  if(Math.abs(a) <= 0.000001) { return [x,y,z,0]; }
      
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

eval(genStrFun("0.0","1.5*75.0","60.0","30.0","1","1"));        //source
eval(genStrFun("0.0","(-1.5*75.0)","60.0","30.0","1","2"));     //source
eval(genStrFun("1.5*75.0","0.0","60.0","30.0","1","3"));        //source
eval(genStrFun("(-1.5*75.0)","0.0","60.0","30.0","1","4"));     //source
eval(genStrFun("0.0","0.0","2*1.5*200.0","100.0","1","5"));     //source
eval(genStrFun("0.0","0.0","(-2*1.5*200.0)","100.0","1","17")); //source
eval(genStrFun("4.75","0.0","3.0","1.0","1","6"));
eval(genStrFun("4.75","0.0","(-1*3.0)","1.0","1","7"));
eval(genStrFun("6.625","0.0","2.4","1.0","1","8"));
eval(genStrFun("6.625","0.0","(-1*2.4)","1.0","1","9"));
eval(genStrFun("7.985","0.0","0.975","1.0","1","10"));
eval(genStrFun("7.985","0.0","(-1*0.975)","1.0","1","11"));


// generate cones

var genConeFun = (r0,k,z0,z1,lambda,id) =>
`function handleCone${id}(x,y,z,vx,vy,vz) {
  var a = vx*vx+vy*vy-${k}*${k}*vz*vz;
  var b = 2*vx*x + 2*vy*y - 2*(${r0}+${k}*z)*${k}*vz;
  var c = x*x + y*y - Math.pow(${r0}+${k}*z,2);
  if(b*b < 4*a*c) { return [x,y,z,0]; }
  if(Math.abs(a) <= 0.000001) { return [x,y,z,0]; }

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


eval(genAnnulusFun("0.0","3.75","(-4.0)","(-1)","14"));
eval(genAnnulusFun("0.0","3.25","(-3.5)","1","15"));
eval(genAnnulusFun("3.25","3.75","4.0","1","16"));
