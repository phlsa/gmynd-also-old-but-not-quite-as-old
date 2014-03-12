window.Gmynd = (function() {
  var G = {

    // Turn any node into a gmynd element
    wrap: function(query) {
      var elems = document.querySelectorAll(query);
      if (elems.length > 1) {
        return G.wrapCollection(elems);
      } else {
        return G.wrapSingle(elems[0]);
      }
    },

    // Wrap a single node and turn it into a gmynd element
    wrapSingle: function(nativeElement) {
      var elem = {
        get style() { return nativeElement.style },
        get addEventListener() { return nativeElement.addEventListener },
        get removeEventListener() { return nativeElement.removeEventListener },
        get width()   { return parseInt(nativeElement.style.width.split('px')[0]) },
        set width(w)  { nativeElement.style.width = w+'px' },
        get height()  { return parseInt(nativeElement.style.height.split('px')[0]) },
        set height(h) { nativeElement.style.height = h+'px' },

        // coordinates to bypass transforms
        transformCoordinates: {
          x: 0,
          y: 0,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          scaleX: 1,
          scaleY: 1
        },
        // calculate transform based on transformCoordinates
        recalculateTransform: function() {
          var t = this.transformCoordinates;
          nativeElement.style.transform = "translate("+t.x+"px, "+t.y+"px) "+
                                          "rotateX("+t.rotationX+"deg )" +
                                          "rotateY("+t.rotationY+"deg) " +
                                          "rotateZ("+t.rotationZ+"deg) " +
                                          "scale("+t.scaleX+", "+t.scaleY+")";
        },

        // magic properties
        set x(_x)        { this.transformCoordinates.x = _x; this.recalculateTransform() },
        get x()          { return this.transformCoordinates.x },
        set y(_y)        { this.transformCoordinates.y = _y; this.recalculateTransform() },
        get y()          { return this.transformCoordinates.y },
        set rotationX(r) { this.transformCoordinates.rotationX = r; this.recalculateTransform() },
        get rotationX()  { return this.transformCoordinates.rotationX },
        set rotationY(r) { this.transformCoordinates.rotationY = r; this.recalculateTransform() },
        get rotationY()  { return this.transformCoordinates.rotationY },
        set rotationZ(r) { this.transformCoordinates.rotationZ = r; this.recalculateTransform() },
        get rotationZ()  { return this.transformCoordinates.rotationZ },
        set scaleX(s)    { this.transformCoordinates.scaleX = s; this.recalculateTransform() },
        get scaleX()     { return this.transformCoordinates.scaleX },
        set scaleY(s)    { this.transformCoordinates.scaleY = s; this.recalculateTransform() },
        get scaleY()     { return this.transformCoordinates.scaleY },
        set rotation(r)  { this.rotationZ = r },
        get rotation()   { return this.rotationZ },
        set scale(s)     { this.scaleX = this.scaleY = s },
        get scale()      { return this.scaleX }
      }
      return elem;
    },

    // Wrap a series of elements
    wrapCollection: function(nativeElements) {
      return nativeElements.map(function(item, index) {
        return wrapSingle(item);
      });
    },


    // Shapes
    Shape: {

      rectangle: function(x, y, width, height, options) {
        var r = document.createElement('div');
        r.classList.add('g-basic');
        r.style.width = width + 'px';
        r.style.height = height + 'px';
        document.body.appendChild(r);
        r = G.wrapSingle(r);
        r.x = x;
        r.y = y;
        return r;
      }

    },

    // Collections
    Collection: function(n, fn) {
      var coll = [];
      for (var i=0; i<n; i++) {
        coll[i] = fn(i);
      }
      return coll;
    },

    // Initialization
    initialize: function() {
      // Center the perspective origin whenever the window is resized
      document.body.style.perspectiveOrigin = window.innerWidth/2 + "px " + window.innerHeight/2 + "px";
      window.addEventListener('resize', function() {
        document.body.style.perspectiveOrigin = window.innerWidth/2 + "px " + window.innerHeight/2 + "px";
      });
    }

  }

  // TODO: Better listener for calling initialize
  window.setTimeout(G.initialize, 1000);

  return G;
})()
