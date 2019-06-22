

window.onload = function() {

  var useGPUJS = true; 

  ///////////////////////////////////////////////
  // GPU code                                  //
  ///////////////////////////////////////////////

if(useGPUJS) {


  var cpuMode = !( GPU.isGPUSupported && (GPU.isWebGLSupported||GPU.isWebGL2Supported) );

  if(cpuMode) {
    document.querySelector("#cpuHeader").innerHTML = "<em>GPU+WebGL support not detected; falling back to CPU mode: performance will suffer.</em>";
  }

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var imgdata = context.createImageData(width,height);
  var img = [];
  var maxVal = 0.00001;
  var mouseIsDown = false;
  var causticMode = false;
  for(var i = 0; i < width*width; i++) {
    img.push(0.0);
  }
  
  document.body.style.background = "black";
  var gpu = new GPU();
  var Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 
  var oldRmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0];

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
  gpu.addFunction(handleParaboloid18);
  gpu.addFunction(handleSphere19);
  gpu.addFunction(handleSphere20);

  var imageComputer = gpu.createKernel(computeImage).setOutput([width,width]);

  var rotateX = function(theta) {
    var Mat = [1.0,0.0,0.0,
              0.0,Math.cos(theta),Math.sin(theta),
              0.0,-Math.sin(theta),Math.cos(theta)];

    Rmat = matmul(Rmat,Mat);
  };

  var rotateY = function(theta) {
    var Mat = [Math.cos(theta),0.0,-Math.sin(theta),
              0.0,1.0,0.0,
              Math.sin(theta),0.0,Math.cos(theta)];

    Rmat = matmul(Rmat,Mat);
  };

  var rotateZ = function(theta) {
    var Mat = [Math.cos(theta),Math.sin(theta),0.0,
              -Math.sin(theta),Math.cos(theta),0.0,
              0.0,0.0,1.0];

    Rmat = matmul(Rmat,Mat);
  };




  function reset() {
    for(var i = 0; i < width*width; i++) {
      img[i] = 0.0;
    }
    maxVal = 0.001;
  }


  function throwNextPhotons() {
    var numPhotons =  2;
    if(causticMode) {
      numPhotons = 18;
    }
    if(cpuMode) {
      numPhotons = 1;
    }
    var intensityMap = imageComputer(Rmat,width,numPhotons,5,mouseIsDown,causticMode);
    for(var i = 1; i < width; i++) {
      for(var j = 1; j < width; j++) {
        img[j*width+i] += intensityMap[i][j];
        maxVal = Math.max(maxVal,img[j*width+i]);
      }
    }
  }

  function redraw() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min((img[i*width+j]/maxVal)*255,255);
        if(causticMode) {
          val = Math.min((Math.pow(img[i*width+j]/maxVal,0.65))*255,255);
        }
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
    context.putImageData(imgdata,0,0);
  }

  document.body.querySelector("#causticForm").addEventListener("submit",
    e => {
      e.preventDefault();
      reset();
      if(causticMode) {
        Rmat = oldRmat; 
      } else {
        oldRmat = Rmat;
        Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 
      }
      causticMode = !causticMode;
  } );
  
  document.body.addEventListener("mousedown",
    (e) => {
      if((e.target.tagName !== "BUTTON") && (e.target.tagName !== "A") && (e.target.tagName !== "IMG")) { 
        mouseIsDown = true;
        reset();
      }
    });
  
  document.body.addEventListener("mouseup",
    (e) => {
      if((e.target.tagName !== "BUTTON") && (e.target.tagName !== "A") && (e.target.tagName !== "IMG")) { 
        mouseIsDown = false;
        reset(); 
      }
    }
  );
  
  document.body.addEventListener("mouseleave",
    () => {
      if(mouseIsDown) { reset(); } 
      mouseIsDown = false; 
    } );

  document.body.addEventListener("mousemove",
  e => {
    if(mouseIsDown === true) {
      var a = Math.abs(e.movementX);
      var b = Math.abs(e.movementY);
      var c = Math.abs(e.movementX-e.movementY);
      if(c > 1.3*Math.max(a,b)) {
        rotateZ((e.movementX-e.movementY)*Math.PI/250);
      } else if(a > b) {
        rotateX(-e.movementX*Math.PI/250);
      } else {
        rotateY(-e.movementY*Math.PI/250);
      }
      reset();
    }
  });
  


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
        default:
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
    throwNextPhotons();
    redraw();
  }

  main(0);
}

  ///////////////////////////////////////////////
  // CPU code (SLOW, don't use)                //
  ///////////////////////////////////////////////

if(!useGPUJS) {
  document.querySelector("#instrHeader").innerHTML = "<em>Use hjklnm to rotate mug.</em>";
  document.querySelector("#cpuHeader").innerHTML = "<em>GPU+WebGL2 support not detected; falling back to CPU mode: performance will suffer.</em>";
  document.body.style.background = "black";
  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width/2,1,0.3);
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
          val = Math.min((1.5*rmHR.image[(width/2)*Math.floor(i/2)+Math.floor(j/2)]/rmHR.maxVal)*255,255);
        } else {
          val = Math.min((1.5*rmHR.image[width*i+j]/rmHR.maxVal)*255,255);
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
