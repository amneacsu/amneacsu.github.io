import React from 'react';
import { createRoot } from 'react-dom/client';

import { 
  axleGrinder,
  beeMoved,
  easyStreet,
  manicMiner,
  modem,
  surround,
} from 'data';

import AudioSink from './sink/AudioSink.js';
import BarVisualizerSink from './sink/BarVisualizerSink.js';
import WaveVisualizerSink from './sink/WaveVisualizerSink.js';
import LapseVisualizerSink from './sink/LapseVisualizerSink.js';
import SpectrogramVisualizerSink from './sink/SpectrogramVisualizerSink.js';
import SpectrumVisualizerSink from './sink/SpectrumVisualizerSink.js';
import { VisualSink } from './VisualSink.jsx';
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
    label: 'Pendulum - Axle Grinder (spectrogram drawing @3:52, aac, 44100 Hz, stereo, 125 kb/s)',
    file: axleGrinder,
  },
  {
    value: 'modem',
    label: 'Dial-up modem (mp3, 48000 Hz, stereo, 84 kb/s)',
    file: modem,
  },
  {
    value: 'manicMiner',
    label: 'Manic_Miner.wav (ZX spectrum tape, pcm_u8, 44100 Hz, 1 channels, 352 kb/s)',
    file: manicMiner,
  },
  {
    value: 'easyStreet',
    label: 'easy-street.opus (opus, 48000Hz, stereo)',
    file: easyStreet,
  },
];

const fileIdToOption = (id) => {
  return fileOptions.find((o) => o.value === id);
};

const App = () => {
  const audioRef = React.useRef();
  const [audioContextState, setAudioContextState] = React.useState('none');
  const [selectedFileId, setSelectedFileId] = React.useState(fileOptions.at(0)?.value);
  const audioContextRef = React.useRef();
  const audioSourceNodeRef = React.useRef();

  const currentFile = fileIdToOption(selectedFileId);

  const handleInitContext = React.useCallback(() => {
    if (audioContextRef.current) {
      return;
    }
    const audioContext = new window.AudioContext();
    const audioSourceNode = audioContext.createMediaElementSource(audioRef.current);
    const audioSink = new AudioSink(audioContext);
    audioSourceNode.connect(audioSink);

    setAudioContextState(audioContext.state);
    audioContextRef.current = audioContext;
    audioSourceNodeRef.current = audioSourceNode;
  }, [currentFile]);

  const handleChangeSelectedFile = React.useCallback((event) => {
    setSelectedFileId(event.target.value);
    if (audioRef.current) {
      audioRef.current.src = fileIdToOption(event.target.value)?.file;
    }
  }, [audioRef]);

  return (
    <div>
      <nav>
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

        <audio
          ref={audioRef}
          controls
          src={currentFile.file}
          onPlay={handleInitContext}
        />

        <pre>
          Audio context state: {audioContextState}<br />
          Selected file: {currentFile?.label ?? 'none'}
        </pre>
      </nav>
      
      {audioContextState === 'running' && (
        <>
          <VisualSink
            audioContext={audioContextRef.current}
            processor={BarVisualizerSink}
            onLoad={(vsink) => {
              audioSourceNodeRef.current.connect(vsink);
            }}
          />
          <VisualSink
            audioContext={audioContextRef.current}
            processor={WaveVisualizerSink}
            onLoad={(vsink) => {
              audioSourceNodeRef.current.connect(vsink);
            }}
          />
          <VisualSink
            audioContext={audioContextRef.current}
            processor={LapseVisualizerSink}
            onLoad={(vsink) => {
              audioSourceNodeRef.current.connect(vsink);
            }}
          />
          <VisualSink
            audioContext={audioContextRef.current}
            processor={SpectrogramVisualizerSink}
            onLoad={(vsink) => {
              audioSourceNodeRef.current.connect(vsink);
            }}
          />
          <VisualSink
            audioContext={audioContextRef.current}
            processor={SpectrumVisualizerSink}
            onLoad={(vsink) => {
              audioSourceNodeRef.current.connect(vsink);
            }}
          />
        </>
      )}
    </div>
  );
};

root.render(<App />);
