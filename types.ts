
export interface RoundStats {
  teamId: string;
  timeRemaining: number;
  promptsUsed: number;
  score: number;
}

export enum GameState {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED',
}
