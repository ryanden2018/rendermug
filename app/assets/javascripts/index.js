

window.onload = function() {

  var useGPU = GPU.isGPUSupported;

  ///////////////////////////////////////////////
  // GPU code                                  //
  ///////////////////////////////////////////////

if(useGPU) {

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var imgdata = context.createImageData(width,height);
  var img = [];
  var maxVal = 0.001;
  for(var i = 0; i < width*width; i++) {
    img.push(0.0);
  }
  
  document.body.style.background = "black";
  var gpu = new GPU();
  var Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 

  // stage 0: add all the shapes
  gpu.addFunction(handleSphere1);
  gpu.addFunction(handleSphere2);
  gpu.addFunction(handleSphere3);
  gpu.addFunction(handleSphere4);
  gpu.addFunction(handleSphere5);
  gpu.addFunction(handleSphere17);
  gpu.addFunction(handleSphere6);
  gpu.addFunction(handleSphere7);
  gpu.addFunction(handleSphere8);
  gpu.addFunction(handleSphere9);
  gpu.addFunction(handleSphere10);
  gpu.addFunction(handleSphere11);
  gpu.addFunction(handleCone12);
  gpu.addFunction(handleCone13);
  gpu.addFunction(handleAnnulus14);
  gpu.addFunction(handleAnnulus15);
  gpu.addFunction(handleAnnulus16);
  
  gpu.addFunction(sphereNormal1);
  gpu.addFunction(sphereNormal2);
  gpu.addFunction(sphereNormal3);
  gpu.addFunction(sphereNormal4);
  gpu.addFunction(sphereNormal5);
  gpu.addFunction(sphereNormal17);
  gpu.addFunction(sphereNormal6);
  gpu.addFunction(sphereNormal7);
  gpu.addFunction(sphereNormal8);
  gpu.addFunction(sphereNormal9);
  gpu.addFunction(sphereNormal10);
  gpu.addFunction(sphereNormal11);
  gpu.addFunction(coneNormal12);
  gpu.addFunction(coneNormal13);
  gpu.addFunction(annulusNormal14);
  gpu.addFunction(annulusNormal15);
  gpu.addFunction(annulusNormal16);

  // stage 1: initialization
  var createPos = gpu.createKernel(initPos,{
    output: [width, width],
    pipeline: true,
    immutable: true
  });
  var createVel = gpu.createKernel(initVel,{
    output: [width, width],
    pipeline: true,
    immutable: true
  });
  
  // stage 2: stepping through bounces
  var stepPos = gpu.createKernel(nextPos,{
    output: [width, width],
    pipeline: true,
    immutable: true
  });
  var stepNormal = gpu.createKernel(nextNormal,{
    output: [width, width],
    pipeline: true,
    immutable: true
  });
  var stepVel = gpu.createKernel(nextVel,{
    output: [width, width],
    pipeline: true,
    immutable: true
  });

  // stage 3: record intensity
  var getIntensity = gpu.createKernel(computeIntensity,{
    output: [width, width],
    pipeline: false,
    immutable: true
  });



  var rotateX = function(theta) {
    var Mat = [1.0,0.0,0.0,
              0.0,Math.cos(theta),Math.sin(theta),
              0.0,-Math.sin(theta),Math.cos(theta)];

    Rmat = matmul(Mat,Rmat);
  };

  var rotateY = function(theta) {
    var Mat = [Math.cos(theta),0.0,-Math.sin(theta),
              0.0,1.0,0.0,
              Math.sin(theta),0.0,Math.cos(theta)];

    Rmat = matmul(Mat,Rmat);
  };

  var rotateZ = function(theta) {
    var Mat = [Math.cos(theta),Math.sin(theta),0.0,
              -Math.sin(theta),Math.cos(theta),0.0,
              0.0,0.0,1.0];

    Rmat = matmul(Mat,Rmat);
  };




  function reset() {
    for(var i = 0; i < width*width; i++) {
      img[i] = 0.0;
    }
    maxVal = 0.001;
  }


  function throwNextPhotons(numPhotons) {
    for(var l = 0; l < numPhotons; l++) {
      var pos = createPos(Rmat,width);
      var vel = createVel(Rmat,width);
      for(var i = 0; i < 5; i++) {
        pos = stepPos(pos,vel);
        var normals = stepNormal(pos,vel);
        vel = stepVel(pos,vel,normals);
      }
      var intensityMap = getIntensity(pos,vel);
      for(var i = 1; i < width; i++) {
        for(var j = 1; j < width; j++) {
          img[j*width+i] += intensityMap[i][j];
          maxVal = Math.max(maxVal,img[j*width+i]);
        }
      }
    }
  }

  function redraw() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min(1.5*img[i*width+j]*255/maxVal,255);
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
    context.putImageData(imgdata,0,0);
  }

  document.body.addEventListener("keyup", 
    function(e) {
      var theta = Math.PI/32;
      switch(e.key) {
        case 'h':
        case 'H':
          rotateX(theta);
          reset();
          break;
        case 'l':
        case 'L':
          rotateX(-theta);
          reset();
          break;
        case 'j':
        case 'J':
          rotateY(theta);
          reset();
          break;
        case 'k':
        case 'K':
          rotateY(-theta);
          reset();
          break;
        case 'n':
        case 'N':
          rotateZ(theta);
          reset();
          break;
        case 'm':
        case 'M':
          rotateZ(-theta);
          reset();
          break;
      }
    }
  );

  rotateX(-8*Math.PI/32);
  rotateY(4*Math.PI/32);
  rotateZ(-12*Math.PI/32);
  rotateY(-3*Math.PI/32);
  rotateZ(-2*Math.PI/32);
  reset();

  function main(tf) {
    window.requestAnimationFrame(main);

    throwNextPhotons(1);
    redraw();
  }

  main(0);
}

  ///////////////////////////////////////////////
  // CPU code                                  //
  ///////////////////////////////////////////////

if(!useGPU) {
  document.body.style.background = "black";
  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width/2,1);
  rmHR.rotateX(-8*Math.PI/32);
  rmHR.rotateY(4*Math.PI/32);
  rmHR.rotateZ(-12*Math.PI/32);
  rmHR.rotateY(-3*Math.PI/32);
  rmHR.rotateZ(-2*Math.PI/32);
  rmHR.reset();


  var m = 0;


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val;
        if(rmHR.getLowResMode()) {
          val = Math.min((rmHR.image[(width/2)*Math.floor(i/2)+Math.floor(j/2)]/rmHR.maxVal)*255,255);
        } else {
          val = Math.min((rmHR.image[width*i+j]/rmHR.maxVal)*255,255);
        }
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
  }


  document.body.addEventListener("keyup", 
    function(e) {
      var theta = Math.PI/32;
      switch(e.key) {
        case 'h':
        case 'H':
          rmHR.rotateX(theta);
          rmHR.reset();
          m=0;
          break;
        case 'l':
        case 'L':
          rmHR.rotateX(-theta);
          rmHR.reset();
          m=0;
          break;
        case 'j':
        case 'J':
          rmHR.rotateY(theta);
          rmHR.reset();
          m=0;
          break;
        case 'k':
        case 'K':
          rmHR.rotateY(-theta);
          rmHR.reset();
          m=0;
          break;
        case 'n':
        case 'N':
          rmHR.rotateZ(theta);
          rmHR.reset();
          m=0;
          break;
        case 'm':
        case 'M':
          rmHR.rotateZ(-theta);
          rmHR.reset();
          m=0;
          break;
      }
    }
  );

  function main(tf) {
    m++;

    window.requestAnimationFrame(main);
    rmHR.renderNextPixels();
    if(m % 6 === 0) {
      buildImg();
    }
    context.putImageData(imgdata,0,0);

    if(m === 300) { // set high res after five seconds
      rmHR.setHighResMode();
    }
  }

  main(0);
}
};
