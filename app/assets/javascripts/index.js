
window.onload = function() {

  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width,300);

  var q = 2;

  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min(Math.sqrt(Math.log10(q))*rmHR.image[rmHR.idx(i,j)]*255/rmHR.maxVal,255);
       
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
          rmHR.rotateX(theta);
          break;
        case 'l':
        case 'L':
          rmHR.reset();
          rmHR.rotateX(-theta);
          break;
        case 'j':
        case 'J':
          rmHR.reset();
          rmHR.rotateY(theta);
          break
        case 'k':
        case 'K':
          rmHR.reset();
          rmHR.rotateY(-theta);
          break;
        case 'n':
        case 'N':
          rmHR.reset();
          rmHR.rotateZ(theta);
          break;
        case 'm':
        case 'M':
          rmHR.reset();
          rmHR.rotateZ(-theta);
          break;
      }
    }
  );

  function main(tf) {
    window.requestAnimationFrame(main);
      
    for(var m=0; m<6000; m++) {
      rmHR.renderNextPixel();
      q++;
    }
    
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
