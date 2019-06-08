
window.onload = function() {
  
  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rmHR = new MugRenderer(width,false,10);
  
  var q = 2;


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val;
        //if(rmHR2.image[rmHR2.idx(i,j)] < -0.5) {
          val = Math.min(Math.sqrt(Math.log10(q))*rmHR.image[width*i+j]*255/rmHR.maxVal,255);
        //} else {
          //if(filter) {
          //  val = Math.min(Math.sqrt(Math.log10(q))*rmHR2.pxVal(i,j)*255/rmHR2.maxPxVal,255);
         // } else {
           // val = Math.min(Math.sqrt(Math.log10(q))*rmHR2.image[width*i+j]*255/rmHR2.maxVal,255);
         // }
       // }
       
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
          // rmHR2.reset();
          rmHR.rotateX(theta);
          // rmHR2.reset();
          // rmHR2.rotateX(theta);
          q=0;
          break;
        case 'l':
        case 'L':
          rmHR.reset();
          // rmHR2.reset();
          rmHR.rotateX(-theta);
          // rmHR2.reset();
          // rmHR2.rotateX(-theta);
          q=0;
          break;
        case 'j':
        case 'J':
          rmHR.reset();
          // rmHR2.reset();
          rmHR.rotateY(theta);
          // rmHR2.reset();
          // rmHR2.rotateY(theta);
          q=0;
          break
        case 'k':
        case 'K':
          rmHR.reset();
          // rmHR2.reset();
          rmHR.rotateY(-theta);
          // rmHR2.reset();
          // rmHR2.rotateY(-theta);
          q=0;
          break;
        case 'n':
        case 'N':
          rmHR.reset();
          // rmHR2.reset();
          rmHR.rotateZ(theta);
          // rmHR2.reset();
          // rmHR2.rotateZ(theta);
          q=0;
          break;
        case 'm':
        case 'M':
          rmHR.reset();
          // rmHR2.reset();
          rmHR.rotateZ(-theta);
          // rmHR2.reset();
          // rmHR2.rotateZ(-theta);
          q=0;
          break;
      }
    }
  );

  function main(tf) {
    window.requestAnimationFrame(main);

    // if(q < 600000) {
    //   rmHR.renderNextPixels();
    // }


    rmHR.renderNextPixels();
    // if( rmHR2.i < width) {
    //   rmHR2.renderNextPixels();
    // }

    q+=600;
    
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};
