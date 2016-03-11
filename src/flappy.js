var scene = new Scene('canvas');

scene.setBackground('assets/background.png', {
  horizontalScroll : true,
  speed : 2
});

scene.addLayer('hero', 1);
scene.addObject('assets/flappy01.png', 'hero', 20, 200);

scene.initialize({
  refreshRate : 15
});
