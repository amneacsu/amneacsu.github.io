(function() {
  var
  elem,
  len = 32, // There are 32 lights! ~ Cpt. JLP
  lights = [],
  gen = 0,
  ghosting = 32,

  randomInt = function(min, max) {
    return min + Math.floor(Math.random() * max);
  },

  light = function(l, i) {
    return { freq: randomInt(i + 1, i * 64) };
  },

  hook = function(selector) {
    elem = document.querySelector(selector);
    lights = Array(len).fill(null).map(light);
    tick();
  },

  update = function(light) {
    light.on = gen % light.freq < ghosting;
  },

  tick = function() {
    gen += 1;
    lights.map(update);
    write();
    window.requestAnimationFrame(tick);
  },

  led = function(flag) {
    return flag ? '&#9608;' : ' ';
  },

  write = function() {
    var scrn = [];

    lights.map(function(light) {
      scrn.push(led(light.on));
    });

    elem.innerHTML = scrn.join(' ');
  };

  hook('lights');
})();
