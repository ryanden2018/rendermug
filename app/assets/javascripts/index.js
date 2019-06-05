
window.onload = function() {

  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rm = new MugRenderer(width/3,100);
  var rmHR = new MugRenderer(width,100);


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val;
        if(rmHR.image[rmHR.idx(i,j)] > -0.5) {
          val = Math.min(rmHR.image[rmHR.idx(i,j)]*255,255);
        } else {
          val = Math.max(0.0,Math.min(Math.floor(rm.image[rm.idx(Math.floor(i/3),Math.floor(j/3))]*255),255));
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
      var theta = Math.PI/8;
      switch(e.key) {
        case 'h':
        case 'H':
          rmHR.reset();
          rm.reset();
          rm.rotateX(theta);
          rmHR.rotateX(theta);
          break;
        case 'l':
        case 'L':
          rmHR.reset();
          rm.reset();
          rm.rotateX(-theta);
          rmHR.rotateX(-theta);
          break;
        case 'j':
        case 'J':
          rmHR.reset();
          rm.reset();
          rm.rotateY(theta);
          rmHR.rotateY(theta);
          break
        case 'k':
        case 'K':
          rmHR.reset();
          rm.reset();
          rm.rotateY(-theta);
          rmHR.rotateY(-theta);
          break;
        case 'n':
        case 'N':
          rmHR.reset();
          rm.reset();
          rm.rotateZ(theta);
          rmHR.rotateZ(theta);
          break;
        case 'm':
        case 'M':
          rmHR.reset();
          rm.reset();
          rm.rotateZ(-theta);
          rmHR.rotateZ(-theta);
          break;
      }
    }
  );

  function main(tf) {
    window.requestAnimationFrame(main);
    for(var l = 0; l < 100; l++) {
      if(rm.i < width/3) {
        rm.renderNextPixel();
      } else {
        for(var m=0; m<3; m++) {
          rmHR.renderNextPixel();
        }
      }
    }
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
