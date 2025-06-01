export default class AudioSink {
  context: AudioContext;

  constructor(context: AudioContext) {
    this.context = context;
  }

  get in() {
    return this.context.destination;
  }
}
