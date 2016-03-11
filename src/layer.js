var Layer = function(id, level, context) {
  this.id      = id;
  this.context = context;
  this.level   = level;
  this.drawQueue = [];
}

Layer.prototype.append = function(fn) {
  this.drawQueue.push(fn);
  return this;
}

Layer.prototype.draw = function() {
  this.drawQueue.forEach(function(fn) {
    fn();
  });
}
