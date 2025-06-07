import styled, { keyframes } from 'styled-components';
import { Section } from '../../elements/Section.ts';

const glow = keyframes`
  0%, 100% {
    opacity: .9;
  }
  50% {
    opacity: 1;
  }
`;

export const Hero = styled(Section)`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 40px;
  line-height: 1.23456;
  font-family: monospace;

  canvas {
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: .4;
  }

  .lights, .warn {
    max-width: 960px;
  }

  .lights {
    margin: 20px auto;
    font-size: 32px;
    color: #32bbff;
    white-space: pre-wrap;
  }

  .warn {
    --col: 255, 49, 255;
    margin: 0 auto;
    font-size: 32px;
    animation: ${glow} 16ms ease-in-out infinite;

    color: rgb(var(--col));
    text-shadow: rgba(var(--col), .33) 0 0 16px;
  }
`;
