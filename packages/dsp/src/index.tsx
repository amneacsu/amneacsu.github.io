import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { 
  axleGrinder,
  beeMoved,
  easyStreet,
  manicMiner,
  modem,
  surround,
} from 'data';

import AudioSink from './sink/AudioSink.ts';
import BarVisualizerSink from './sink/BarVisualizerSink.ts';
import WaveVisualizerSink from './sink/WaveVisualizerSink.ts';
import LapseVisualizerSink from './sink/LapseVisualizerSink.ts';
import SpectrogramVisualizerSink from './sink/SpectrogramVisualizerSink.ts';
import SpectrumVisualizerSink from './sink/SpectrumVisualizerSink.ts';
import { AudioContextProvider, useAudioContext } from './AudioContextProvider.tsx';
import { VisualSink } from './VisualSink.tsx';
import './style.css';

const root = createRoot(document.getElementById('root')!);

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

const fileIdToOption = (id: string | undefined) => {
  return fileOptions.find((o) => o.value === id);
};

const App = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [selectedFileId, setSelectedFileId] = React.useState(fileOptions.at(0)?.value);
  const [audioSourceNode, setAudioSourceNode] = React.useState<MediaElementAudioSourceNode>();

  const { audioContext, state } = useAudioContext();

  const currentFile = fileIdToOption(selectedFileId);

  const handlePlay = React.useCallback(() => {
    audioContext.resume();
  }, [audioContext]);

  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;
    const n = audioContext.createMediaElementSource(audioElement);
    const audioSink = new AudioSink(audioContext);
    n.connect(audioSink.in);
    setAudioSourceNode(n);
  }, [audioContext]);

  const handleChangeSelectedFile = React.useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
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
          src={currentFile?.file}
          onPlay={handlePlay}
        />

        <pre>
          Audio context state: {state}<br />
          Selected file: {currentFile?.label ?? 'none'}
        </pre>
      </nav>

      <VisualSink
        processor={BarVisualizerSink}
        onLoad={(vsink) => {
          audioSourceNode?.connect(vsink.analyser);
        }}
      />
      <VisualSink
        processor={WaveVisualizerSink}
        onLoad={(vsink) => {
          audioSourceNode?.connect(vsink.analyser);
        }}
      />
      <VisualSink
        processor={LapseVisualizerSink}
        onLoad={(vsink) => {
          audioSourceNode?.connect(vsink.analyser);
        }}
      />
      <VisualSink
        processor={SpectrogramVisualizerSink}
        onLoad={(vsink) => {
          audioSourceNode?.connect(vsink.analyser);
        }}
      />
      <VisualSink
        processor={SpectrumVisualizerSink}
        onLoad={(vsink) => {
          audioSourceNode?.connect(vsink.analyser);
        }}
      />
    </div>
  );
};

root.render(
  <AudioContextProvider>
    <App />
  </AudioContextProvider>,
);
