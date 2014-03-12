(function() {
  var G = window.Gmynd;
  G.Mouse = {
    position: {
      x: 0,
      y: 0
    },
    leftButtonDown: false,
    rightButtonDown: false,
    middleButtonDown: false
  }

  // Update the mouse position whenever the mouse is being moved
  document.addEventListener('mousemove', function(e) {
    G.Mouse.position.x = e.clientX;
    G.Mouse.position.y = e.clientY;
  });
  // Global click handlers
  document.addEventListener('mousedown', function(e) {
    G.Mouse.leftButtonDown = true;
  });
  document.addEventListener('mouseup', function(e) {
    G.Mouse.leftButtonDown = false;
  })
})();
