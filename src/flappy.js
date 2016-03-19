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
