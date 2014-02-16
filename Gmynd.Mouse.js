(function() {
  var G = window.Gmynd;
  G.Mouse = {
    position: {
      x: 0,
      y: 0
    }
  }

  // Update the mouse position whenever the mouse is being moved
  document.addEventListener('mousemove', function(e) {
    G.Mouse.position.x = e.clientX;
    G.Mouse.position.y = e.cleintY;
  });
})();