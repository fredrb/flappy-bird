
var Scene = function(canvasID) {
  this.canvas = document.getElementById(canvasID);
  this.context = canvas.getContext("2d");

  this.layers = [];
}

Scene.prototype.background = function(src, options) {
  this.addLayer('background', 0);
  if (options.horizontalScroll) {
    options.layer = 'background';
    this._setAnimatedBackground(src, options);
  } else {
    this._setBackground(src);
  }
}

Scene.prototype._setAnimatedBackground = function(src, options) {
  this._addImageAnimation(src, options.layer,
    Defaults.Animation.background_horizontal_parallax(this.context, src, options.speed));
}

Scene.prototype._setBackground = function(src) {
  this._addImage(src, 'background', 0, 0);
}

Scene.prototype.addImage = function(src, options) {
  if (options.animation) {
    this._addImageAnimation(src, options.layer, options.animation);
  } else {
    this._addImage(src, options.layer, options.x, options.y);
  }
}

Scene.prototype._addImageAnimation = function(src, layer, animation) {
  _.find(this.layers, function(l) { return l.id == layer })
    .appendAnimation(animation)
    .draw();
}

Scene.prototype._addImage = function(src, layer, x, y) {
  _.find(this.layers, function(l) { return l.id == layer })
  .append(function() {
    Draw.image(x, y, src, this.context);
  }.bind(this))
  .draw();
};

Scene.prototype.addLayer = function(id, level) {
  this.layers.push(new Layer(id, level, this.context));
};

Scene.prototype.initialize = function(options) {
  setInterval(this._loop_.bind(this), options.refreshRate || 15);
};

Scene.prototype._loop_ = function() {
  var layerStack = _.sortBy(this.layers, function(l) { return l.level; });
  _.each(layerStack, function(layer) {
    layer.draw();
  }.bind(this));
};
