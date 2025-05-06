import RankingsTable from './RankingsTable';
import MatchesTable from './MatchesTable';
import type { RankingEntry, MatchEntry } from '../types';

interface Props {
  rankings: RankingEntry[];
  matches: MatchEntry[];
}

export default function GroupView({ rankings, matches }: Props) {
  return (
    <div className="p-6">
      <RankingsTable data={rankings} />
      <div className="my-8"></div>
      <MatchesTable data={matches} />
    </div>
  );
}