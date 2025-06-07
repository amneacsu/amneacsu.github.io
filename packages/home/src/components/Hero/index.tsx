import * as React from 'react';
import { heroAnim } from './hero.ts';
import { lightsFunc } from "./lights.ts";
import * as S from './styles.ts';

export const Hero = () => {
  const lightsRef = React.useRef<HTMLDivElement>(null);
  const dixieFlatline = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (dixieFlatline.current) {
      heroAnim(dixieFlatline.current);
    }
    if (lightsRef.current) {
      lightsFunc(lightsRef.current);
    }
  }, []);

  return (
    <S.Hero>
      <div className="warn">
        ACHTUNG!
        <br /><br />
        ALLES TURISTEN UND NONTEKNISCHEN LOOKENPEEPERS! DAS KOMPUTERMASCHINE IST NICHT
        FÜR DER GEFINGERPOKEN UND MITTENGRABEN! ODERWISE IST EASY TO SCHNAPPEN DER
        SPRINGENWERK, BLOWENFUSEN UND POPPENCORKEN MIT SPITZENSPARKEN. IST NICHT FÜR
        GEWERKEN BEI DUMMKOPFEN. DER RUBBERNECKEN SIGHTSEEREN KEEPEN DAS COTTONPICKEN
        HÄNDER IN DAS POCKETS MUSS.
        <br /><br />
        ZO RELAXEN UND WATSCHEN DER BLINKENLICHTEN.
      </div>
      <div ref={lightsRef} className="lights"></div>
      <div ref={dixieFlatline}></div>
    </S.Hero>
  );
};
