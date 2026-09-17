"use client";

import SkyGradient from "./SkyGradient";
import StarField from "./StarField";
import SunMoon from "./SunMoon";
import CloudLayer from "./CloudLayer";

export default function ProceduralSky() {
  return (
    <>
      <SkyGradient />
      <StarField />
      <SunMoon />
      <CloudLayer />
    </>
  );
}
