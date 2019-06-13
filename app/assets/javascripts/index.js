window.onload = function() {

  document.body.style.background = "black";
  var gpu = new GPU();
  var Rmat = [1.0,0.0,0.0, 0.0,1.0,0.0, 0.0,0.0,1.0]; 
  var spheres = [
    [0.0,1.5*75.0,1.5*60.0,30.0,1,0], // [xc,yc,zc,r,lambda,id]
    [0.0,-1.5*75.0,1.5*60.0,30.0,1,-1],
    [1.5*75.0,0.0,1.5*60.0,30.0,1,-2],
    [-1.5*75.0,0.0,1.5*60.0,30.0,1,-3],
    [0.0,0.0,1.5*200.0,100.0,1,-4],
    [4.75,0.0,3.0,1.0,1,6],
    [4.75,0.0,-3.0,1.0,1,6],
    [6.625,0.0,2.4,1.0,1,6],
    [6.625,0.0,-2.4,1.0,1,6],
    [7.985,0.0,0.975,1.0,1,6],
    [7.985,0.0,-0.975,1.0,1,6]
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
  var randArray = [];
  for( var i = 0; i < 1299827; i++) { randArray.push(Math.random()); }
  var seed = 1;
  var img = makeImage(seed++,randArray,randArray.length,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat);

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var numDraws = 0;
  

  var imgdata = context.createImageData(width,height);

  var redraw = function() {
    var newImg = makeImage(seed++,randArray,randArray.length,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat);

    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        img[i][j] = (numDraws*img[i][j]+newImg[i][j])/(numDraws+1);
        var val = Math.min(7.5*img[i][j]*255,255);
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }

    numDraws++;

    context.putImageData(imgdata,0,0);
  }

  var reset = function() {
    img = makeImage(seed++,randArray,randArray.length,spheres,spheres.length,cones,cones.length,annuli,annuli.length,Rmat);
    numDraws = 0;
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
          redraw();
          break;
        case 'l':
        case 'L':
          rotateSources(rotateX(-theta));
          reset();
          redraw();
          break;
        case 'j':
        case 'J':
          rotateSources(rotateY(theta));
          reset();
          redraw();
          break;
        case 'k':
        case 'K':
          rotateSources(rotateY(-theta));
          reset();
          redraw();
          break;
        case 'n':
        case 'N':
          rotateSources(rotateZ(theta));
          reset();
          redraw();
          break;
        case 'm':
        case 'M':
          rotateSources(rotateZ(-theta));
          reset();
          redraw();
          break;
      }
    }
  );
  
  var m = 0;
  function main(tf) {
    window.requestAnimationFrame(main);
    if((m++)%60===0) {
      redraw();
    }
  }

  main(0);


/****************
   var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width/2,1);
  rmHR.rotateX(-5*Math.PI/32);
  rmHR.rotateZ(-5*Math.PI/32);
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
  **************/
};
