import type { Metadata } from "next";
import { LightJourney } from "@/components/LightJourney";

// THROWAWAY experience prototype — firefly birth + guided scroll journey.
// The light powers the hero, then guides you down to the next station.
export const metadata: Metadata = {
  title: "Alive",
  robots: { index: false, follow: false },
};

export default function Alive() {
  return <LightJourney />;
}
