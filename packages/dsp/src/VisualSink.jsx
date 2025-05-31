import React from 'react';

export const VisualSink = ({
  audioContext,
  onLoad,
  processor,
}) => {
  const processRef = React.useRef();
  const canvasRef = React.useRef();

  React.useEffect(() => {
    if (!audioContext) return;
    const canvas = canvasRef.current;
    processRef.current = new processor(audioContext, canvas); 
    onLoad(processRef.current);
  }, [audioContext]);

  return (
    <canvas 
      ref={canvasRef}
      width={640} 
      height={160} 
    />
  );
};
