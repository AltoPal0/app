export interface RankingEntry {
  team: string;
  gamesPlayed: number;
  wins: number;
  diff: number;
}

export interface MatchEntry {
  leftTeam: string;
  leftScore: number | string;
  rightTeam: string;
  rightScore: number | string;
  startTime: string;
  court: string;
}