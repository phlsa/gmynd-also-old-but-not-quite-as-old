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
        get width() { return parseInt(nativeElement.style.width.split('px')[0]) },
        set width(w) { nativeElement.style.width = w+'px' },
        get height() { return parseInt(nativeElement.style.height.split('px')[0]) },
        set height(h) { nativeElement.style.height = h+'px' }
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
        r.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        r.style.width = width + 'px';
        r.style.height = height + 'px';
        document.body.appendChild(r);
        r = G.wrapSingle(r);
        return r;
      }

    }


  }

  return G;
})()