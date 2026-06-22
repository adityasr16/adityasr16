import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { ImportanceScene } from "./scenes/ImportanceScene";
import { CTAScene } from "./scenes/CTAScene";
import { SCENE_DURATIONS, TRANSITION_DURATION } from "./constants";

type NotBotProps = {
  useVoiceover: boolean;
};

export const NotBotExplainer: React.FC<NotBotProps> = ({ useVoiceover }) => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1: Intro */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.intro}>
          <IntroScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-intro.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Problem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
          <ProblemScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-problem.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Solution */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.solution}>
          <SolutionScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-solution.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: How It Works */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.howItWorks}>
          <HowItWorksScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-howitworks.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Importance */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.importance}>
          <ImportanceScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-importance.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTAScene />
          {useVoiceover && (
            <Audio src={staticFile("voiceover-cta.mp3")} volume={0.9} />
          )}
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
