
window.onload = function() {

  document.body.style.background = "black";

  var canvas = document.querySelector("#rm");
  var context = canvas.getContext("2d");
  var width = canvas.width;
  var height = canvas.height;
  var rm = new MugRenderer(width,5);
  rm.render();


  var imgdata = context.createImageData(width,height);


  function buildImg() {
    for(var i=0; i<width; i++) {
      for(var j=0; j<width; j++) {
        var idx0 = (i*width+j)*4;
        var val = Math.min(Math.floor(rm.image[rm.idx(i,j)]*255),255);
        imgdata.data[idx0] = Math.floor(val);
        imgdata.data[idx0+1] = Math.floor(val);
        imgdata.data[idx0+2] = Math.floor(val);
        imgdata.data[idx0+3] = 255;
      }
    }
  }

  function main(tf) {
    window.requestAnimationFrame(main);
    buildImg();
    context.putImageData(imgdata,0,0);
  }

  main(0);
};