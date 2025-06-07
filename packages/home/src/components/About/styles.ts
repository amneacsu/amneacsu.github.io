import styled from 'styled-components';
import { Section } from '../../elements/Section.ts';

export const About = styled(Section)`
  background-color: var(--dark0-soft);
  box-shadow: 0 0 60px 20px #000000aa;
  text-align: center;
  text-shadow: 2px 2px 6px #000;

  h2 {
    display: flex;
    justify-content: center;
    font-weight: normal;
    margin-block-start: 0;
  }
`;
