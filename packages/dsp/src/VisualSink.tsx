import * as React from 'react';

import Visualizer from './sink/Visualizer';

export const VisualSink = ({
  audioContext,
  onLoad,
  processor,
}: {
  audioContext: AudioContext | null;
  onLoad: (p: Visualizer) => void;
  processor: { new (audioCtx: AudioContext, canvasElement: HTMLCanvasElement): Visualizer; };
}) => {
  const processRef = React.useRef<Visualizer>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!audioContext) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
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
