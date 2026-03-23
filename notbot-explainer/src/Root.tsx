import React from "react";
import { Composition } from "remotion";
import { NotBotExplainer } from "./NotBotExplainer";
import {
  FPS,
  WIDTH,
  HEIGHT,
  SCENE_DURATIONS,
  TRANSITION_DURATION,
} from "./constants";

// Total duration = sum of scenes - (number of transitions * transition duration)
const NUM_TRANSITIONS = 5;
const TOTAL_DURATION =
  Object.values(SCENE_DURATIONS).reduce((sum, d) => sum + d, 0) -
  NUM_TRANSITIONS * TRANSITION_DURATION;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NotBotExplainer"
        component={NotBotExplainer}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          useVoiceover: false,
        }}
      />
      <Composition
        id="NotBotExplainerWithVoiceover"
        component={NotBotExplainer}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{
          useVoiceover: true,
        }}
      />
    </>
  );
};
