window.onload = function() {
  
  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width,30);
  var rotated = false;

  var q = 2;


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val;
        if(!rotated) {
          val = Math.min(Math.sqrt(Math.log10(q))*rmHR.image[width*i+j]*255/rmHR.maxVal,255);
          twoBounceVal = Math.min(Math.sqrt(Math.log10(q))*rmHR.twoBounceChannel[width*i+j]*255/rmHR.twoBounceMaxVal,255)
          imgdata.data[idx0] = Math.floor(twoBounceVal);
          imgdata.data[idx0+1] = Math.floor(val);
          imgdata.data[idx0+2] = Math.floor(val);
          imgdata.data[idx0+3] = 255;
        } else {
          val = Math.min(Math.sqrt(Math.log10(q))*(rmHR.image[width*i+j]/rmHR.maxVal + rmHR.twoBounceChannel[width*i+j]/rmHR.twoBounceMaxVal)*255,255);
          imgdata.data[idx0] = Math.floor(val);
          imgdata.data[idx0+1] = Math.floor(val);
          imgdata.data[idx0+2] = Math.floor(val);
          imgdata.data[idx0+3] = 255;
        }
      }
    }
  }


  document.body.addEventListener("keyup", 
    function(e) {
      var theta = Math.PI/8;
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
          break;
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

      if( (Math.abs(rmHR.sources[0].xc) < 0.1) &&
           (Math.abs(rmHR.sources[0].yc-75.0)<0.1) &&
          (Math.abs(rmHR.sources[0].zc-60.0)<0.1) )
      {
        rotated = false;
      } else {
        rotated = true;
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
