var Draw = {

  image : function(x, y, src, context) {
    var imageObj = new Image();
    imageObj.src = src;

    imageObj.onload = function() {
      context.drawImage(imageObj, x, y);
    };

  }

}
