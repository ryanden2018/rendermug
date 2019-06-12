window.onload = function() {
  
  document.body.style.background = "black";

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
};
