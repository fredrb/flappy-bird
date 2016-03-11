function loadImage(context, src, pos) {
  var imageObj = new Image();

  imageObj.onload = function() {
    context.drawImage(imageObj, pos.x, pos.y);
  };
  imageObj.src = src;
}

window.onload = function() {

  var context = document.getElementById("canvas").getContext("2d");
  context.globalCompositeOperation = "source-over";

  var bg = loadImage(context, 'assets/background.png', {x: 0, y: 0});
  var sprice = loadImage(context, 'assets/flappy01.png', {x: 10, y: 200});

}
