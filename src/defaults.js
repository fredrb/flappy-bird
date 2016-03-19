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
