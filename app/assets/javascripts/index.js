window.onload = function() {
  
  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width,1);

  var m = 0;


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min((rmHR.image[(width)*Math.floor(i)+Math.floor(j)]/rmHR.maxVal)*255,255);
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
          break;
        case 'l':
        case 'L':
          rmHR.rotateX(-theta);
          rmHR.reset();
          break;
        case 'j':
        case 'J':
          rmHR.rotateY(theta);
          rmHR.reset();
          break;
        case 'k':
        case 'K':
          rmHR.rotateY(-theta);
          rmHR.reset();
          break;
        // case 'n':
        // case 'N':
        //   rmHR.rotateZ(theta);
        //   rmHR.reset();
        //   break;
        // case 'm':
        // case 'M':
        //   rmHR.rotateZ(-theta);
        //   rmHR.reset();
        //   break;
      }
    }
  );

  function main(tf) {
    m++;
    
    window.requestAnimationFrame(main);


    rmHR.renderNextPixels();
    
    if(m%6===0) {
      buildImg();
    }
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
