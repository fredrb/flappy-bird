var Layer = function(id, level, context) {
  this.id      = id;
  this.context = context;
  this.level   = level;
  this.drawQueue = [];
  this.animationQueue = [];
}

Layer.prototype.append = function(fn) {
  this.drawQueue.push(fn);
  return this;
}

Layer.prototype.appendAnimation = function(animation) {
  this.animationQueue.push(animation);
  return this;
}

Layer.prototype.draw = function() {
  this.drawQueue.forEach(function(fn) {
    fn();
  });

  this.animationQueue.forEach(function(anim) {
    anim.run();
  });
}
