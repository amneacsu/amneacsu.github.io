import * as React from 'react';

import Visualizer from './sink/Visualizer.ts';
import { useAudioContext } from './AudioContextProvider.tsx';

export const VisualSink = ({
  onLoad,
  processor,
}: {
  onLoad: (p: Visualizer) => void;
  processor: { new (audioCtx: AudioContext, canvasElement: HTMLCanvasElement): Visualizer; };
}) => {
  const { audioContext } = useAudioContext();
  const processRef = React.useRef<Visualizer>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!audioContext) return;
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('no canvas');
      return;
    }
    const pr = new processor(audioContext, canvas); 
    processRef.current = pr;
    onLoad(pr);
  }, [audioContext, onLoad, processor]);

  return (
    <canvas 
      ref={canvasRef}
      width={640} 
      height={160} 
    />
  );
};
