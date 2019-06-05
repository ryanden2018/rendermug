
window.onload = function() {

  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rm = new MugRenderer(width/3,25);


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min(Math.floor(rm.image[rm.idx(Math.floor(i/3),Math.floor(j/3))]*255),255);
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
          rm.rotateX(theta);
          break;
        case 'k':
        case 'K':
          rm.rotateX(-theta);
          break;
      }
    }
  );

  function main(tf) {
    window.requestAnimationFrame(main);
    for(var l = 0; l < 100; l++) {
      rm.renderNextPixel();
    }
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};