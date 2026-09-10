export type EnvironmentId = "lake" | "forest" | "beach" | "night";
export type SessionMode = "landscape" | "breathing" | "bilateral" | "guided";
export type BilateralSpeed = "slow" | "medium" | "fast";
export type View = "home" | "setup" | "session" | "score" | "result";

export interface SessionConfig {
  environment: EnvironmentId;
  mode: SessionMode;
  duration: number;
  initialScore: number;
  finalScore: number;
  bilateralSpeed: BilateralSpeed;
  stimulusSize: number;
  stimulusOpacity: number;
  audioEnabled: boolean;
  bilateralAudio: boolean;
  ambientVolume: number;
}
