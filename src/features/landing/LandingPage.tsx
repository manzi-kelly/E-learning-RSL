import Hero from "./Hero/Hero";
import Platform from "./Platform/Platform";
import LearningPathways from "./LearningPathways/LearningPathways";
import LearningJourney from "./LearningJourney/LearningJourney";
import Accessibility from "./Accessibility/Accessibility";
import FinalCTA from "./FinalCTA/FinalCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Platform />
      <LearningPathways />
      <LearningJourney />
      <Accessibility />
      <FinalCTA />
    </>
  );
}
