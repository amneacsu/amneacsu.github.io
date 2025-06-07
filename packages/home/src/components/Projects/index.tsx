import * as React from 'react';
import * as S from './styles.ts';
import { Grid } from '../../elements/Grid.ts';

export const Projects = () => {
  return (
    <S.Projects>
      <Grid>
        <h2>Projects</h2>

        <br /><br />
        <a href="http://textfiles.com/underconstruction/" target="_blank">
          <img src="./images/under-construction.gif" />
        </a>

        <h3>audio visualizers</h3>
        <a href="./dsp"><img src="./images/dsp.png" /></a>
      </Grid>
    </S.Projects>
  );
};
