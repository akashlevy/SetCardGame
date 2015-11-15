define (function() {
  "use strict";

  var Stopwatch = function(elem, options) {

    var timer       = elem,
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // initialize
    reset();

    function start() {
      if (!interval) {
        offset   = Date.now();
        interval = setInterval(update, options.delay);
      }
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    }

    function reset() {
      clock = 0;
      render(0);
    }

    function update() {
      clock += delta();
      render();
    }

    function render() {
      timer.html("Time: " + (clock/1000).toFixed(3) + " seconds");
    }

    function delta() {
      var now = Date.now(),
          d   = now - offset;

      offset = now;
      return d;
    }

    // public API
    this.start  = start;
    this.stop   = stop;
    this.reset  = reset;
  };

  return Stopwatch;
});
