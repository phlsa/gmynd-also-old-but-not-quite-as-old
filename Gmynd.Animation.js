(function() {

  var G = window.Gmynd;

  G.Animation = {
    
    frameActions: [],
    frameCount: 0,
    frameRate: 60,
    frameControl: {
      now: null,
      then: Date.now(),
      delta: null,
      interval: 1000/60
    },

    // Object for storing ainimation actions
    new: function() {
      return {
        
      }
    },

    eventLoop: function() {
      G.Animation.frameControl.now = Date.now();
      G.Animation.frameControl.delta = G.Animation.frameControl.now - G.Animation.frameControl.then;

      if (G.Animation.frameControl.delta > G.Animation.frameControl.interval) {
        G.Animation.frameCount += 1;
        G.Animation.frameActions.forEach(function(item, index) {
          item.action(G.Animation.frameCount, item.duration, item.startTime);
        });
        G.Animation.frameControl.interval = 1000/G.Animation.frameRate;
      }

      // repeat the event loop
      G.Animation.frameControl.then = G.Animation.frameControl.now - (G.Animation.frameControl.delta%G.Animation.frameControl.interval);
      window.requestAnimationFrame(G.Animation.eventLoop);
    },

    behavior: function(callback) {
      var b = {
        action: callback
      }
      G.Animation.frameActions.push(b);
      return b;
    }
  }

  // Run the main loop
  window.requestAnimationFrame(G.Animation.eventLoop);

})();