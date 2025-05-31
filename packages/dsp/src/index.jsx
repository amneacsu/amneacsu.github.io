import React from 'react';
import { createRoot } from 'react-dom/client';

import { 
  axleGrinder,
  beeMoved,
  manicMiner,
  modem,
  surround,
} from 'data';

import ElementSource from './source/ElementSource.js';
import AudioSink from './sink/AudioSink.js';
import BarVisualizerSink from './sink/BarVisualizerSink.js';
import WaveVisualizerSink from './sink/WaveVisualizerSink.js';
import LapseVisualizerSink from './sink/LapseVisualizerSink.js';
import SpectrogramVisualizerSink from './sink/SpectrogramVisualizerSink.js';
import SpectrumVisualizerSink from './sink/SpectrumVisualizerSink.js';
import './style.css';

const root = createRoot(document.getElementById('root'));

const fileOptions = [
  {
    value: 'beeMoved',
    label: 'Blue Monday FM - Bee Moved (flac, 96000 Hz, stereo)',
    file: beeMoved,
  },
  {
    value: 'surround',
    label: 'Fraunhofer BLITS test pattern (aac, 44100 Hz, 5.1, 319 kb/s)',
    file: surround,
  },
  {
    value: 'axleGrinder',
    label: 'Pendulum - Axle Grinder (spectrogram drawing, aac, 44100 Hz, stereo, 125 kb/s)',
    file: axleGrinder,
  },
  {
    value: 'modem',
    label: 'Dial-up modem (mp3, 48000 Hz, stereo, 84 kb/s)',
    file: modem,
  },
  {
    value: 'manicMiner',
    label: 'Manic_Miner.wav (ZX spectrum tape, pcm_u8, 44100 Hz, 1 channels, 352 kb/s',
    file: manicMiner,
  },
];

const fileIdToOption = (id) => {
  return fileOptions.find((o) => o.value === id);
};

const App = () => {
  const [audioContextState, setAudioContextState] = React.useState('none');
  const [selectedFileId, setSelectedFileId] = React.useState(fileOptions.at(0)?.value);
  const audioContextRef = React.useRef();
  const audioSourceRef = React.useRef();

  const currentFile = fileIdToOption(selectedFileId);

  const handleInitContext = React.useCallback(() => {
    if (audioContextRef.current) console.warn('There is already an AudioContext set.');
    if (audioSourceRef.current) console.warn('There is already an AudioSource set.');
    const audioContext = new window.AudioContext();

    const audioSource = new ElementSource(audioContext, currentFile.file);

    const audioSink = new AudioSink(audioContext);

    const vsink1 = new BarVisualizerSink(audioContext);
    const vsink2 = new WaveVisualizerSink(audioContext);
    const vsink3 = new LapseVisualizerSink(audioContext);
    const vsink4 = new SpectrogramVisualizerSink(audioContext);
    const vsink5 = new SpectrumVisualizerSink(audioContext);

    audioSource.node.connect(vsink1);
    audioSource.node.connect(vsink2);
    audioSource.node.connect(vsink3);
    audioSource.node.connect(vsink4);
    audioSource.node.connect(vsink5);
    audioSource.node.connect(audioSink);

    setAudioContextState(audioContext.state);
    audioContextRef.current = audioContext;
    audioSourceRef.current = audioSource;
  }, [currentFile]);

  const handleChangeSelectedFile = React.useCallback((event) => {
    setSelectedFileId(event.target.value);
    if (audioSourceRef.current) {
      audioSourceRef.current.loadFile(fileIdToOption(event.target.value)?.file);
    }
  }, [audioSourceRef]);

  return (
    <div>
      <>
        <fieldset>
          <legend>Audio file</legend>

          <select
            onChange={handleChangeSelectedFile}
            value={selectedFileId}
          >
            {fileOptions.map((fileOption) => {
              return (
                <option key={fileOption.value} value={fileOption.value}>{fileOption.label}</option>
              );
            })}
          </select>
        </fieldset>
      </>

      <pre>
        Audio context state: {audioContextState}<br />
        Selected file: {currentFile?.label ?? 'none'}
      </pre>

      {audioContextState !== 'running' && (
        <button 
          disabled={audioContextState === 'running'}
          type="button" 
          onClick={handleInitContext}
        >
          Init audio context
        </button>
      )}
    </div>
  );
};

root.render(<App />);
