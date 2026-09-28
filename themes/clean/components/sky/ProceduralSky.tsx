"use client";

import dynamic from "next/dynamic";
import { useSky } from "../../SkyProvider";
import SkyGradient from "./SkyGradient";
import StarField from "./StarField";
import SunMoon from "./SunMoon";
import CloudLayer from "./CloudLayer";

const MonsoonCloudLayer = dynamic(() => import("./MonsoonCloudLayer"), {
  ssr: false,
});
const RainEffect = dynamic(() => import("./RainEffect"), {
  ssr: false,
});

export default function ProceduralSky() {
  const { season } = useSky();
  const isMonsoon = season === "monsoon";

  return (
    <>
      <SkyGradient />
      <StarField />
      <SunMoon />
      {isMonsoon ? (
        <>
          <RainEffect />
          <MonsoonCloudLayer />
        </>
      ) : (
        <CloudLayer />
      )}
    </>
  );
}
