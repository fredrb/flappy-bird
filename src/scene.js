// Load Scene from canvas ID
var Scene = function(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.context = canvas.getContext("2d");

  this.layers = [];
};

Scene.prototype.setBackground = function(src, animation) {
  this.bgX = 0;
  this.bgY = 0;

  this.addLayer('background', 0);
  Draw.image(this.bgX, this.bgY, src, this.context);

  if (animation) {
    this.addAnimatedObject(src, 'background', function() {
      if (this.bgX < -(this.context.canvas.clientWidth)) {
        this.bgX = 0;
      } else {
        this.bgX = (this.bgX - animation.speed);
      }

      Draw.image(this.bgX, this.bgY, src, this.context);
      Draw.image((this.context.canvas.clientWidth + this.bgX), this.bgY, src, this.context);
    }.bind(this));
  }

  // if (animation) {
  //   setInterval(function() {
  //
  //   }.bind(this) , 15);
  // }
};

Scene.prototype.addAnimatedObject = function(src, layer, animation) {
  _.find(this.layers, function(l) { return l.id == layer })
    .append(animation)
    .draw();
};

Scene.prototype.initialize = function(options) {
  setInterval(this._loop_.bind(this), options.refreshRate || 15);
};

Scene.prototype.addObject = function(src, layer, x, y) {
  _.find(this.layers, function(l) { return l.id == layer })
  .append(function() {
    Draw.image(x, y, src, this.context);
  }.bind(this))
  .draw();
};

Scene.prototype.addLayer = function(id, level) {
  this.layers.push(new Layer(id, level, this.context));
};

Scene.prototype._loop_ = function() {
  var layerStack = _.sortBy(this.layers, function(l) { return l.level; });
  _.each(layerStack, function(layer) {
    layer.draw();
  }.bind(this));
};


// Scene.prototype._loop_ = function() {
//   var layerStack = _.min(this.layers, function(l) { return l.level; });
//   _.each(layerStack, function(layer) {
//     layer.draw();
//   }.bind(this));
// };
