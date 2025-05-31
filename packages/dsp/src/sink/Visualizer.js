export default class Visualizer {
  constructor(audioContext, canvas) {
    this.width = 640;
    this.height = 160;
    this.fftSize = 2048;
    this.label = '';

    const canvasContext = canvas.getContext('2d');
    canvasContext.lineWidth = 1;
    canvasContext.strokeStyle = '#3D3B1A';
    canvasContext.fillStyle = '#3D3B1A';
    canvasContext.font = '10px monospace';
    canvasContext.textAlign = 'right';
    this.drawContext = canvasContext;
    
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = this.fftSize;
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
