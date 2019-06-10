window.onload = function() {
  
  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width,10);
  rmHR.rotateX(-3*Math.PI/64);
  rmHR.rotateX(-Math.PI/8);
  rmHR.reset();
  
  var q = 2;


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val;
        val = Math.min(Math.sqrt(Math.log10(q))*rmHR.image[width*i+j]*255/rmHR.maxVal,255);
       
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
  }

  canvas.addEventListener("mouseup",
    function(e) { rmHR.renderPixel(e.y-243,e.x-347); }
  );



  document.body.addEventListener("keyup", 
    function(e) {
      var theta = Math.PI/64;
      switch(e.key) {
        case 'h':
        case 'H':
          rmHR.rotateX(theta);
          rmHR.reset();
          q=0;
          break;
        case 'l':
        case 'L':
          rmHR.rotateX(-theta);
          rmHR.reset();
          q=0;
          break;
        case 'j':
        case 'J':
          rmHR.rotateY(theta);
          rmHR.reset();
          q=0;
          break
        case 'k':
        case 'K':
          rmHR.rotateY(-theta);
          rmHR.reset();
          q=0;
          break;
        case 'n':
        case 'N':
          rmHR.rotateZ(theta);
          rmHR.reset();
          q=0;
          break;
        case 'm':
        case 'M':
          rmHR.rotateZ(-theta);
          rmHR.reset();
          q=0;
          break;
      }
    }
  );

  function main(tf) {
    window.requestAnimationFrame(main);


    rmHR.renderNextPixels();

    q+=600;
    
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
