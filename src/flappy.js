var scene = new Scene('canvas');

scene.background('assets/background.png', {
  horizontalScroll : true,
  speed : 2
});

scene.addLayer('hero', 1);
scene.addImage('assets/flappy01.png', {
  'layer' : 'hero',
  'x' : 10,
  'y' : 200
});

scene.initialize({
  refreshRate : 15
});
