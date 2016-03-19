var Draw = {

  image : function(x, y, src, context) {
    var imageObj = new Image();
    imageObj.src = src;

    imageObj.onload = function() {
      context.drawImage(imageObj, x, y);
    };

  }

}

var Animation = function(options, action) {
  this.options = options;
  this.action = action;
}

Animation.prototype.run = function() {
  this.action(this.options);
}

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

var Defaults = {
  Animation : {

    background_horizontal_parallax : function(context, src, speed) {
      return new Animation({x: 0, y: 0, speed: speed, context: context}, function(options) {
        if (options.x < -(options.context.canvas.clientWidth)) {
          options.x = 0;
        } else {
          options.x = (options.x - options.speed);
        }

        Draw.image(options.x, options.y, src, options.context);
        Draw.image((options.context.canvas.clientWidth + options.x), options.y, src, options.context);
      });
    },

    move_left : function(context, src, opt) {
      return new Animation({x : opt.x, y :  opt.y, speed : opt.speed}, function(options) {
        if (!(opt.x > context.canvas.clientWidth)) {
          options.x += options.speed;
          Draw.image(options.x, options.y, src, context);
        }
      });
    }

  }
}


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

var scene = new Scene('canvas');

scene.background('assets/background.png', {
  horizontalScroll : true,
  speed : 1
});

scene.addLayer('hero', 1);

// scene.addImage('assets/flappy01.png', {
//   'layer': 'hero',
//   'animation' : Defaults.Animation.move_left(scene.context, 'assets/flappy01.png', {
//     'x' : 10,
//     'y' : 200,
//     'speed' : 0.5
//   })
// })

scene.addImage('assets/flappy01.png', {
  'layer' : 'hero',
  'x' : 10,
  'y' : 200
});

scene.initialize({
  refreshRate : 10
});
