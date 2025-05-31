export default class LowPassFilter {
  constructor(context, cutoff) {
    const filter = context.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.value = cutoff;

    return filter;
  }
}
