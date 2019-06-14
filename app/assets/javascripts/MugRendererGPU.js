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
  return [Rmat[0]*1.6*(.25-(.5*this.thread.y)/width) + Rmat[1]*1.6*(-.25+(.5*this.thread.x)/width) + Rmat[2]*(-1.0),
          Rmat[3]*1.6*(.25-(.5*this.thread.y)/width) + Rmat[4]*1.6*(-.25+(.5*this.thread.x)/width) + Rmat[5]*(-1.0),
          Rmat[6]*1.6*(.25-(.5*this.thread.y)/width) + Rmat[7]*1.6*(-.25+(.5*this.thread.x)/width) + Rmat[8]*(-1.0)];
}



/////////////////////////////////////////////
// nextPos                                 //
/////////////////////////////////////////////
// find the next position according to     // 
// closest bounce                          //
/////////////////////////////////////////////

function nextPos(Xarr,Varr) {
  var Xvec = Xarr[this.thread.x][this.thread.y];
  var Vvec = Varr[this.thread.x][this.thread.y];

  if((Xvec[3]>0)&&(Xvec[3]<6)) {
    return Xvec;
  }

  var nextx = Xvec[0];
  var nexty = Xvec[1];
  var nextz = Xvec[2];
  var nextid = 0;
  var minDist = -1;



  var res = handleSphere1(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  var thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere2(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere3(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere4(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere5(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere6(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere7(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere8(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere9(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere10(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  res = handleSphere11(Xvec[0],Xvec[1],Xvec[2],Vvec[0],Vvec[1],Vvec[2]);
  thisDist = Math.sqrt(
    Math.pow(Xvec[0]-res[0],2),
    Math.pow(Xvec[1]-res[1],2),
    Math.pow(Xvec[2]-res[2],2)
  );
  if( (minDist===-1) || ((res[3] !== 0)&&(thisDist<minDist)) ) {
    nextx = res[0];
    nexty = res[1];
    nextz = res[2];
    nextid = res[3];
    minDist = thisDist;
  }

  return [nextx,nexty,nextz,nextid];
}



/////////////////////////////////////////////
// nextNormal                              //
/////////////////////////////////////////////
// find the next normal vector             //
/////////////////////////////////////////////

function nextNormal(Xarr,Varr) {
  Xvec = Xarr[this.thread.x][this.thread.y];
  switch(Xvec[3]){
    case 1:
      sphereNormal1(Xvec[0],Xvec[1],Xvec[2])
      break; 
    case 2:
      sphereNormal2(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 3:
      sphereNormal3(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 4:
      sphereNormal4(Xvec[0],Xvec[1],Xvec[2])
      break; 
    case 5:
      sphereNormal5(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 6:
      sphereNormal6(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 7:
      sphereNormal7(Xvec[0],Xvec[1],Xvec[2])
      break; 
    case 8:
      sphereNormal8(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 9:
      sphereNormal9(Xvec[0],Xvec[1],Xvec[2])
      break;
    case 10:
      sphereNormal10(Xvec[0],Xvec[1],Xvec[2])
      break; 
    case 11:
      sphereNormal11(Xvec[0],Xvec[1],Xvec[2])
      break;
  }
  eval(`var normal = sphereNormal${Xvec[3]}(Xvec[0],Xvec[1],Xvec[2])`);
  return normal;
}


/////////////////////////////////////////////
// nextVel                                 //
/////////////////////////////////////////////
// find the next velocity                  //
/////////////////////////////////////////////

function nextVel(Xarr,Varr,Narr) {
  Xvec = Xarr[this.thread.x][this.thread.y];
  Vvec = Varr[this.thread.x][this.thread.y];
  Nvec = Narr[this.thread.x][this.thread.y];

  if((Xvec[3]>0)&&(Xvec[3]<6)) {
    return Vvec;
  }

  var vxr = 2*(Math.random()-0.5);
  var vyr = 2*(Math.random()-0.5);
  var vzr = 2*(Math.random()-0.5);
  var c = 0;
  while((c<20) && (vxr*Nvec[0]+vyr*Nvec[1]+vzr*Nvec[2] < 0.0) ) {
    vxr = 2*(Math.random()-0.5);
    vyr = 2*(Math.random()-0.5);
    vzr = 2*(Math.random()-0.5);
    c++;
  }
  if(c === 20) { return null; }


  var dotprod = vx*Nvec[0] + vy*Nvec[1] + vz*Nvec[2];
  var u = [vx - 2*Nvec[0]*dotprod, vy - 2*Nvec[1]*dotprod, vz - 2*Nvec[2]*dotprod];

  var v;

  var lambda = Math.pow( Math.random(), 2);
  v = [lambda*u[0]+(1.0-lambda)*vxr,lambda*u[1]+(1.0-lambda)*vyr,lambda*u[2]+(1.0-lambda)*vzr];

  return [v[0],v[1],v[2]];
}



/////////////////////////////////////////////
// computeIntensity                        //
/////////////////////////////////////////////
// compute the intensity after all bounces //
/////////////////////////////////////////////

function computeIntensity(Xvec,Vvec) {
  if((Xvec[3]>0)&&(Xvec[3]<6)) {
    return 1.0;
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
  if(Math.abs(a) <= 0.0001) { return [x,y,z,0]; }
      
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

eval(genStrFun("0.0","1.5*75.0","1.5*60.0","30.0","1","1"));//source
eval(genStrFun("0.0","(-1.5*75.0)","1.5*60.0","30.0","1","2"));//source
eval(genStrFun("1.5*75.0","0.0","1.5*60.0","30.0","1","3"));//source
eval(genStrFun("(-1.5*75.0)","0.0","1.5*60.0","30.0","1","4"));//source
eval(genStrFun("0.0","0.0","1.5*200.0","100.0","1","5")); //source
eval(genStrFun("4.75","0.0","3.0","1.0","1","6"));
eval(genStrFun("4.75","0.0","(-1*3.0)","1.0","1","7"));
eval(genStrFun("6.625","0.0","2.4","1.0","1","8"));
eval(genStrFun("6.625","0.0","(-1*2.4)","1.0","1","9"));
eval(genStrFun("7.985","0.0","0.975","1.0","1","10"));
eval(genStrFun("7.985","0.0","(-1*0.975)","1.0","1","11"));




/*

// gpu.addFunction(function mySuperFunction(a, b) {
//   return a - b;
// });
// function anotherFunction(value) {
//   return value + 1;
// }
// gpu.addFunction(anotherFunction);
// const kernel = gpu.createKernel(function(a, b) {
//   return anotherFunction(mySuperFunction(a[this.thread.x], b[this.thread.x]));
// }).setOutput([20]);



function getX(Rmat,x,y,z) {
  return Rmat[0]*x + Rmat[1]*y + Rmat[2]*z;
}

function getY(Rmat,x,y,z) {
  return Rmat[3]*x + Rmat[4]*y + Rmat[5]*z;
}

function getZ(Rmat,x,y,z) {
  return Rmat[6]*x + Rmat[7]*y + Rmat[8]*z;
}

function getVX(Rmat,vx,vy,vz) {
  return Rmat[0]*vx + Rmat[1]*vy + Rmat[2]*vz;
}

function getVY(Rmat,vx,vy,vz) {
  return Rmat[3]*vx + Rmat[4]*vy + Rmat[5]*vz;
}

function getVZ(Rmat,vx,vy,vz) {
  return Rmat[6]*vx + Rmat[7]*vy + Rmat[8]*vz;
}

function handleSpheres(x,y,z,vx,vy,vz,spheres,numSpheres) {
  var nextX = 0;
  var nextY = 0;
  var nextZ = 0;
  var nextNX = 0;
  var nextNY = 0;
  var nextNZ = 0;
  var nextID = 0;
  var minDist = -1;

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

  return [nextX,nextY,nextZ,nextNX,nextNY,nextNZ,nextID,minDist];
}

function handleCones(x,y,z,vx,vy,vz,cones,numCones) {
  var nextX = 0;
  var nextY = 0;
  var nextZ = 0;
  var nextNX = 0;
  var nextNY = 0;
  var nextNZ = 0;
  var nextID = 0;
  var minDist = -1;
  for(var j = 0; j < numCones; j++) {
    var a = vx*vx+vy*vy-cones[j][1]*cones[j][1]*vz*vz;
    var b = 2*vx*x + 2*vy*y - 2*(cones[j][0]+cones[j][1]*z)*cones[j][1]*vz;
    var c = x*x + y*y - Math.pow(cones[j][0]+cones[j][1]*z,2);
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
      if((z + vz*tmin < cones[j][2]) || (z+vz*tmin > cones[j][3])) {
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
  
    if( zp < cones[j][2] ) { continue; }
    if( zp > cones[j][3] ) { continue; }
  
    var nx = cones[j][4]*x / Math.sqrt(x*x+y*y);
    var ny = cones[j][4]*y / Math.sqrt(x*x+y*y);
    var nz = -1 * cones[j][4]*cones[j][1];
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
      nextID = cones[j][5];
    }
  }

  return [nextX,nextY,nextZ,nextNX,nextNY,nextNZ,nextID,minDist];
}

function handleAnnuli(x,y,z,vx,vy,vz,annuli,numAnnuli) {
  var nextX = 0;
  var nextY = 0;
  var nextZ = 0;
  var nextNX = 0;
  var nextNY = 0;
  var nextNZ = 0;
  var nextID = 0;
  var minDist = -1;

  for(var k = 0; k < numAnnuli; k++) {

    if( vz === 0.0 ) {
      continue;
    }
  
    var t = (annuli[k][2]-z)/vz;
  
    if((t<0) || (Math.sqrt(vx*vx+vy*vy+vz*vz)*t < 0.01)) {
      continue;
    }
  
    var xp = x + vx*t;
    var yp = y + vy*t;
    var zp = z + vz*t;
  
    var nx = 0.0;
    var ny = 0.0;
    var nz = annuli[k][3];
  
    if( Math.sqrt( xp*xp + yp*yp ) > annuli[k][1] ) {
      continue;
    }
  
    if( Math.sqrt( xp*xp + yp*yp ) < annuli[k][0] ) {
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
      nextID = annuli[k][4];
    }
  }
  return [nextX,nextY,nextZ,nextNX,nextNY,nextNZ,nextID,minDist];
}

function getNextVal(x,y,z,vx,vy,vz,maxBounces,decayFactor,spheres,numSpheres,cones,numCones,annuli,numAnnuli) {
  var nextX = x;
  var nextY = y;
  var nextZ = z;
  var nextVX = vx;
  var nextVY = vy;
  var nextVZ = vz;
  var nextNX = 0.0;
  var nextNY = 0.0;
  var nextNZ = 0.0;
  var nextID = 0;
  var minDist = -1;
  for( var numBounces = 0; numBounces < maxBounces; numBounces++) {


    var resSpheres = handleSpheres(nextX,nextY,nextZ,nextVX,nextVY,nextVZ,spheres,numSpheres);
    var resAnnuli = handleAnnuli(nextX,nextY,nextZ,nextVX,nextVY,nextVZ,annuli,numAnnuli);
    var resCones = handleCones(nextX,nextY,nextZ,nextVX,nextVY,nextVZ,cones,numCones);

    if( (minDist === -1) || ((resSpheres[7]!==-1)&&(resSpheres[7]<minDist)) ){
      nextX = resSpheres[0];
      nextY = resSpheres[1];
      nextZ = resSpheres[2];
      nextNX = resSpheres[3];
      nextNY = resSpheres[4];
      nextNZ = resSpheres[5];
      nextID = resSpheres[6];
      minDist = resSpheres[7];
    }

    if( (minDist === -1) || ((resAnnuli[7]!==-1)&&(resAnnuli[7]<minDist)) ){
      nextX = resAnnuli[0];
      nextY = resAnnuli[1];
      nextZ = resAnnuli[2];
      nextNX = resAnnuli[3];
      nextNY = resAnnuli[4];
      nextNZ = resAnnuli[5];
      nextID = resAnnuli[6];
      minDist = resAnnuli[7];
    }

    if( (minDist === -1) || ((resCones[7]!==-1)&&(resCones[7]<minDist)) ){
      nextX = resCones[0];
      nextY = resCones[1];
      nextZ = resCones[2];
      nextNX = resCones[3];
      nextNY = resCones[4];
      nextNZ = resCones[5];
      nextID = resCones[6];
      minDist = resCones[7];
    }

    // check if an object was encountered
    if(minDist === -1) { break; }

    var vxr = 2*(Math.random()-0.5);
    var vyr = 2*(Math.random()-0.5);
    var vzr = 2*(Math.random()-0.5);
    var c = 0;
    while((c<20) && (vxr*nextNX+vyr*nextNY+vzr*nextNZ < 0.0) ) {
      vxr = 2*(Math.random()-0.5);
      vyr = 2*(Math.random()-0.5);
      vzr = 2*(Math.random()-0.5);
      c++;
    }
    if(c === 20) { break; }
  
  
    var dotprod = nextVX*nextNX + nextVY*nextNY + nextVZ*nextNZ;
    var ux = nextVX - 2*nextNX*dotprod;
    var uy = nextVY - 2*nextNY*dotprod;
    var uz = nextVZ - 2*nextNZ*dotprod;
  
    var lambda = Math.pow( Math.random(), 2);
  
    nextVX = lambda*ux+(1.0-lambda)*vxr;
    nextVY = lambda*uy+(1.0-lambda)*vyr;
    nextVZ = lambda*uz+(1.0-lambda)*vzr;


    if(nextID <= 0) { // hits light source
      if(numBounces > 0) {
        return Math.pow(decayFactor,numBounces);
      }
      break;
    }
  }
  return 0.0;
}

var makeImageCallback = function(numPhotons,maxBounces,decayFactor,spheres,numSpheres,cones,numCones,annuli,numAnnuli,Rmat,width) { 
  var val = 0.0;

  for(var l = 0; l < numPhotons; l++) {
    // initial coordinates
    var x = getX(Rmat,0.0,0.0,24.0);
    var y = getY(Rmat,0.0,0.0,24.0);
    var z = getZ(Rmat,0.0,0.0,24.0);
    var vx = getVX(Rmat,1.6*(.25-(.5*this.thread.y)/width),1.6*(-0.25+(.5*this.thread.x)/width),-1.0);
    var vy = getVY(Rmat,1.6*(.25-(.5*this.thread.y)/width),1.6*(-0.25+(.5*this.thread.x)/width),-1.0);
    var vz = getVZ(Rmat,1.6*(.25-(.5*this.thread.y)/width),1.6*(-0.25+(.5*this.thread.x)/width),-1.0);
    val += getNextVal(x,y,z,vx,vy,vz,maxBounces,decayFactor,spheres,numSpheres,cones,numCones,annuli,numAnnuli);
  }

  return val / numPhotons;
};
*/