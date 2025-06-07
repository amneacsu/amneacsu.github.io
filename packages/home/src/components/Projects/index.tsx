import * as React from 'react';

export const Projects = () => {
  return (
    <section className="projects">
      <div className="grid">
        <h2>Projects</h2>

        <br /><br />
        <a href="http://textfiles.com/underconstruction/" target="_blank">
          <img src="./images/under-construction.gif" />
        </a>

        <h3>audio visualizers</h3>
        <a href="./dsp"><img src="./images/dsp.png" /></a>
      </div>
    </section>
  );
};
