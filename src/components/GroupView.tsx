import RankingsTable from './RankingsTable';
import MatchesTable from './MatchesTable';
import type { RankingEntry, MatchEntry } from '../types';

interface Props {
  rankings: RankingEntry[];
  matches: MatchEntry[];
  selectedTeam: string | null;
  lastTeam: string | null;
  toggleFilter?: () => void;
}

export default function GroupView({ rankings, matches, selectedTeam, lastTeam }: Props) {
  return (
    <div className="space-y-4">

      {/* Rankings Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
        <RankingsTable data={rankings} selectedTeam={selectedTeam} />
      </div>

      {/* {toggleFilter && (
        <div className="flex justify-end">
          <button
            onClick={toggleFilter}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm m-2"
          >
            {selectedTeam ? 'Show all' : 'Show only me'}
          </button>
        </div>
      )} */}


      {/* Matches Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow overflow-hidden">
      <MatchesTable
        data={matches}
        selectedTeam={selectedTeam}
        highlightTeam={lastTeam}
      />
      </div>

    </div>
  );
}