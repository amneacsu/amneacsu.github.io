const drawContext = (width, height) => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  context.lineWidth = 1;
  context.strokeStyle = '#3D3B1A';
  context.fillStyle = '#3D3B1A';
  context.font = '10px monospace';
  context.textAlign = 'right';

  return context;
}

export default class Visualizer {
  constructor(context, params = {}) {
    const {
      width = 640,
      height = 160,
      fftSize = 2048,
      label = '',
    } = params;

    this.width = width;
    this.height = height;
    this.fftSize = fftSize;
    this.label = label;

    this.drawContext = drawContext(width, height);
    this.analyser = context.createAnalyser();
    this.analyser.fftSize = fftSize;
    this.analyser.smoothingTimeConstant = 0;

    this.tick();

    return this.analyser;
  }

  offset(x, y) {
    const imageData = this.drawContext.getImageData(x * -1, y, this.width + x, this.height - y);
    this.drawContext.putImageData(imageData, 0, 0);
  }

  clear() {
    this.drawContext.clearRect(0, 0, this.width, this.height);
    this.drawContext.fillText(this.label, this.width - 4, 11);
  }

  tick() {
    const keep = this.process(
      this.analyser,
      this.drawContext,
      this.width,
      this.height,
    );

    if (keep) {
      window.requestAnimationFrame(() => {
        this.tick();
      });
    }
  }
}
