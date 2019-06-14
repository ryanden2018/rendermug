

window.onload = function() {

  ///////////////////////////////////////////////
  // GPU code                                  //
  ///////////////////////////////////////////////


  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var imgdata = context.createImageData(width,height);
  var numDraws = 0;
  
  document.body.style.background = "black";
  var gpu = new GPU();
  var Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 

  // stage 0: add all the shapes
  gpu.addFunction(handleSphere1);
  gpu.addFunction(handleSphere2);
  gpu.addFunction(handleSphere3);
  gpu.addFunction(handleSphere4);
  gpu.addFunction(handleSphere5);
  gpu.addFunction(handleSphere6);
  gpu.addFunction(handleSphere7);
  gpu.addFunction(handleSphere8);
  gpu.addFunction(handleSphere9);
  gpu.addFunction(handleSphere10);
  gpu.addFunction(handleSphere11);
  
  gpu.addFunction(sphereNormal1);
  gpu.addFunction(sphereNormal2);
  gpu.addFunction(sphereNormal3);
  gpu.addFunction(sphereNormal4);
  gpu.addFunction(sphereNormal5);
  gpu.addFunction(sphereNormal6);
  gpu.addFunction(sphereNormal7);
  gpu.addFunction(sphereNormal8);
  gpu.addFunction(sphereNormal9);
  gpu.addFunction(sphereNormal10);
  gpu.addFunction(sphereNormal11);

  // stage 1: initialization
  var createPos = gpu.createKernel(initPos).setOutput([width,width]);
  var createVel = gpu.createKernel(initVel).setOutput([width,width]);

  // stage 2: stepping through bounces
  var stepPos = gpu.createKernel(nextPos).setOutput([width,width]);
  var stepNormal = gpu.createKernel(nextNormal).setOutput([width,width]);
  var stepVel = gpu.createKernel(nextVel).setOutput([width,width]);

  // stage 3: record intensity
  var getIntensity = gpu.createKernel(computeIntensity).setOutput([width,width]);

  // test it out

  var pos = createPos(Rmat,width);
  var vel = createVel(Rmat,width);
  
  // var pos1 = stepPos(pos,vel);
  // var normals1 = stepNormal(pos1,vel);
  // var vel1 = stepVel(pos1,vel,normals1);

  for(var i = 0; i < 10; i++) {
    pos = stepPos(pos,vel);
    var normals = stepNormal(pos,vel);
    vel = stepVel(pos,vel,normals);
  }

  var intensityMap = getIntensity(pos,vel);


  // var test1 = gpu.createKernel(
  //   function(t) { var mm = t[this.thread.x][this.thread.y]; return mm[0]; } ).setPipeline(true).setOutput([width,width]);
  
  // var test2 = gpu.createKernel(
  //   function(s) { return 20*s[this.thread.x][this.thread.y]; }).setOutput([width,width]);
  // console.log( test2( test1( createVel(Rmat,width) ) ) );

  for(var i=0; i<width; i++) {
    for(var j=0; j<width; j++) {
      var idx0 = (i*width+j)*4;
      var val = Math.min(intensityMap[i][j]*255,255);
      imgdata.data[idx0] = Math.floor(val);
      imgdata.data[idx0+1] = Math.floor(val);
      imgdata.data[idx0+2] = Math.floor(val);
      imgdata.data[idx0+3] = 255;
    }
  }

  context.putImageData(imgdata,0,0);

  return;
  var dontRedraw = false;
  
  var spheres = [
    [0.0,1.5*75.0,1.5*60.0,30.0,1,0], // [xc,yc,zc,r,lambda,id]
    [0.0,-1.5*75.0,1.5*60.0,30.0,1,-1],
    [1.5*75.0,0.0,1.5*60.0,30.0,1,-2],
    [-1.5*75.0,0.0,1.5*60.0,30.0,1,-3],
    [0.0,0.0,1.5*200.0,100.0,1,-4],
    [4.75,0.0,3.0,1.0,1,6],
    [4.75,0.0,-3.0,1.0,1,7],
    [6.625,0.0,2.4,1.0,1,8],
    [6.625,0.0,-2.4,1.0,1,9],
    [7.985,0.0,0.975,1.0,1,10],
    [7.985,0.0,-0.975,1.0,1,11]
  ];
  var cones = [
    [3.75,0,-4.0,4.0,1,1], // [r0,k,z0,z1,lambda,id]
    [3.25,0,-3.5,4.0,-1,2]
  ];
  var annuli = [
    [0.0,3.75,-4.0,-1,3], // [r0,r1,z0,lambda,id]
    [0.0,3.25,-3.5,1,4],
    [3.25,3.75,4.0,1,5],
  ];
  var makeImage = gpu.createKernel(makeImageCallback).setOutput([600,600]);
  
  var img = makeImage(10,5,0.25,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat,width);


  

  var imgdata = context.createImageData(width,height);

  var redraw = function() {
    if(dontRedraw === false) {
      var newImg = makeImage(10,5,0.25,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat,width);

      for(var i=0; i<width; i++) {
        for(var j=0; j<width; j++) {
          var idx0 = (i*width+j)*4;
          img[i][j] = (numDraws*img[i][j]+newImg[i][j])/(numDraws+1);
          var val = Math.min(1.5*7.5*img[i][j]*255,255);
          imgdata.data[idx0] = Math.floor(val);
          imgdata.data[idx0+1] = Math.floor(val);
          imgdata.data[idx0+2] = Math.floor(val);
          imgdata.data[idx0+3] = 255;
        }
      }
    }

    numDraws++;

    context.putImageData(imgdata,0,0);
  }

  var reset = function() {
    dontRedraw = true;
    img = makeImage(10,5,0.25,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat,width);
    numDraws = 0;
    dontRedraw = false;
  }


  redraw();


  var rotateX = function(theta) {
    var Mat = [1.0,0.0,0.0,
              0.0,Math.cos(theta),Math.sin(theta),
              0.0,-Math.sin(theta),Math.cos(theta)];

    Rmat = matmul(Mat,Rmat);
    return Mat;
  };

  var rotateY = function(theta) {
    var Mat = [Math.cos(theta),0.0,-Math.sin(theta),
              0.0,1.0,0.0,
              Math.sin(theta),0.0,Math.cos(theta)];

    Rmat = matmul(Mat,Rmat);
    return Mat;
  };

  var rotateZ = function(theta) {
    var Mat = [Math.cos(theta),Math.sin(theta),0.0,
              -Math.sin(theta),Math.cos(theta),0.0,
              0.0,0.0,1.0];

    Rmat = matmul(Mat,Rmat);
    return Mat;
  };

  var rotateSources = function(Mat) {
    for( var i = 0; i < spheres.length; i++) {
      if(spheres[i][5] <= 0) {
        var xp = Mat[0]*spheres[i][0] + Mat[1]*spheres[i][1] + Mat[2]*spheres[i][2];
        var yp = Mat[3]*spheres[i][0] + Mat[4]*spheres[i][1] + Mat[5]*spheres[i][2];
        var zp = Mat[6]*spheres[i][0] + Mat[7]*spheres[i][1] + Mat[8]*spheres[i][2];
        spheres[i][0] = xp;
        spheres[i][1] = yp;
        spheres[i][2] = zp;
      }
    }
  }

  document.body.addEventListener("keyup", 
    function(e) {
      var theta = Math.PI/32;
      switch(e.key) {
        case 'h':
        case 'H':
          rotateSources(rotateX(theta));
          reset();
          break;
        case 'l':
        case 'L':
          rotateSources(rotateX(-theta));
          reset();
          break;
        case 'j':
        case 'J':
          rotateSources(rotateY(theta));
          reset();
          break;
        case 'k':
        case 'K':
          rotateSources(rotateY(-theta));
          reset();
          break;
        case 'n':
        case 'N':
          rotateSources(rotateZ(theta));
          reset();
          break;
        case 'm':
        case 'M':
          rotateSources(rotateZ(-theta));
          reset();
          break;
      }
    }
  );
  
  var m = 0;
  function main(tf) {
    window.requestAnimationFrame(main);
    if((m++)%20===0) {
      redraw();
    }
  }

  main(0);


  ///////////////////////////////////////////////
  // CPU code                                  //
  ///////////////////////////////////////////////
  // var canvas = document.querySelector("#rm");
  // var context = canvas.getContext("2d");
  // var width = canvas.width;
  // var height = canvas.height;
  // var rmHR = new MugRenderer(width/2,1);
  // rmHR.rotateX(-5*Math.PI/32);
  // rmHR.rotateZ(-5*Math.PI/32);
  // rmHR.reset();

  // var m = 0;


  // var imgdata = context.createImageData(width,height);


  // function buildImg() {
  //   for(var i=0; i<width; i++) {
  //     for(var j=0; j<width; j++) {
  //       var idx0 = (i*width+j)*4;
  //       var val;
  //       if(rmHR.getLowResMode()) {
  //         val = Math.min((rmHR.image[(width/2)*Math.floor(i/2)+Math.floor(j/2)]/rmHR.maxVal)*255,255);
  //       } else {
  //         val = Math.min((rmHR.image[width*i+j]/rmHR.maxVal)*255,255);
  //       }
  //       imgdata.data[idx0] = Math.floor(val);
  //       imgdata.data[idx0+1] = Math.floor(val);
  //       imgdata.data[idx0+2] = Math.floor(val);
  //       imgdata.data[idx0+3] = 255;
  //     }
  //   }
  // }


  // document.body.addEventListener("keyup", 
  //   function(e) {
  //     var theta = Math.PI/32;
  //     switch(e.key) {
  //       case 'h':
  //       case 'H':
  //         rmHR.rotateX(theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //       case 'l':
  //       case 'L':
  //         rmHR.rotateX(-theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //       case 'j':
  //       case 'J':
  //         rmHR.rotateY(theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //       case 'k':
  //       case 'K':
  //         rmHR.rotateY(-theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //       case 'n':
  //       case 'N':
  //         rmHR.rotateZ(theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //       case 'm':
  //       case 'M':
  //         rmHR.rotateZ(-theta);
  //         rmHR.reset();
  //         m=0;
  //         break;
  //     }
  //   }
  // );

  // function main(tf) {
  //   m++;

  //   window.requestAnimationFrame(main);
  //   rmHR.renderNextPixels();
  //   if(m % 6 === 0) {
  //     buildImg();
  //   }
  //   context.putImageData(imgdata,0,0);

  //   if(m === 300) { // set high res after five seconds
  //     rmHR.setHighResMode();
  //   }
  // }

  // main(0);
};
