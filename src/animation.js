var Animation = function(options, action) {
  this.options = options;
  this.action = action;
}

Animation.prototype.run = function() {
  this.action(this.options);
}
