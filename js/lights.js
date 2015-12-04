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

  hook = function(selector) {
    elem = document.querySelector(selector);

    var i = 0;
    while (i < len) {
      lights.push({ freq: randomInt(i + 1, i * 64), flag: false });
      i += 1;
    }

    tick();
  },

  iterate = function(c) {
    for (var i = 0; i < len; i += 1) {
      var l = lights[i];
      c.call(null, l);
    }
  },

  update = function(light) {
    light.on = gen % light.freq < ghosting;
  },

  tick = function() {
    gen += 1;
    iterate(update);
    write();
    window.requestAnimationFrame(tick);
  },

  led = function(flag) {
    return flag ? '&#9608;' : ' ';
  },

  write = function() {
    var scrn = [];

    iterate(function(light) {
      scrn.push(led(light.on));
    });

    elem.innerHTML = scrn.join(' ');
  };

  hook('lights');
})();
