export const lightsFunc = (elem: Element) => {
  var
    len = 24, // There are 32 lights! ~ Cpt. JLP
    lights: { on?: boolean; freq: number }[] = [],
    gen = 0,
    ghosting = 32,

    randomInt = function(min: number, max: number) {
      return min + Math.floor(Math.random() * max);
    },

    light = function(l: number, i: number) {
      return { freq: randomInt(i + 1, i * 64) };
    },

    update = function(l: { on?: boolean; freq: number }) {
      l.on = gen % l.freq < ghosting;
    },

    tick = function() {
      gen += 1;
      lights.map(update);
      write();
      window.requestAnimationFrame(tick);
    },

    led = function(flag: boolean) {
      return flag ? '&#9608;' : ' ';
    },

    write = function() {
      const scrn: string[] = [];

      lights.map(function(l) {
        scrn.push(led(l.on ?? false));
      });

      if (elem) {
        elem.innerHTML = scrn.join(' ');
      }
    };

  lights = Array(len).fill(null).map(light);
  tick();
};
