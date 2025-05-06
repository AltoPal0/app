import type { RankingEntry, MatchEntry } from '../types';

const API_KEY = 'AIzaSyAmMbrDB_sMbKvgQzYRlhfqYzTbhQ1ZMxM';
const SPREADSHEET_ID = '1Ghxf5Adi2np5vN7mimAHIDWBWRpiWV8r28_1v9Kj0YE';

function buildRange(group: string, type: 'rankings' | 'matches'): string {
  if (type === 'rankings') return `${group}!G3:J7`;
  if (type === 'matches') return `${group}!A1:G20`;  // A:E teams and scores, F = court
  return '';
}

async function fetchSheetData(range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.values || [];
}

export async function fetchRankings(group: string): Promise<RankingEntry[]> {
  const range = buildRange(`GR${group}`, 'rankings');
  const values = await fetchSheetData(range);

  return values.map(row => ({
    team: row[0] || '',
    gamesPlayed: Number(row[1] || 0),
    wins: Number(row[2] || 0),
    diff: Number(row[3] || 0)
  }));
}

export async function fetchMatches(group: string): Promise<MatchEntry[]> {
  const range = buildRange(`GR${group}`, 'matches');
  const values = await fetchSheetData(range);

  return values
   // .filter(row => row[0] && row[4]) // Only include rows where both teams exist
    .map(row => ({
      leftTeam: row[1] || '',
      leftScore: row[2] || '',
      rightTeam: row[5] || '',
      rightScore: row[4] || '',
      startTime: row[0] || '',
      court: row[6] || ''
    }));
}