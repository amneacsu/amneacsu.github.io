export default class ElementSource {
  constructor(context, src) {
    const element = document.createElement('audio');

    element.crossOrigin = 'anonymous';
    element.controls = true;
    element.src = src;
    element.volume = .1;
    element.play();

    document.body.appendChild(element);
    this.node = context.createMediaElementSource(element);
    this.element = element;
  }

  loadFile(url) {
    this.element.src = url;
    this.element.play();
    // console.log('load', url);
  }
}
