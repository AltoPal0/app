import type { RankingEntry } from '../types';

interface Props {
  data: RankingEntry[];
}

export default function RankingsTable({ data }: Props) {
  return (
    <div className="w-full mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Rankings</h2>
      <table className="table-auto w-full border border-gray-300 rounded shadow-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">Games</th>
            <th className="px-3 py-2">Wins</th>
            <th className="px-3 py-2">Diff</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, idx) => (
            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-3 py-2">{entry.team}</td>
              <td className="px-3 py-2">{entry.gamesPlayed}</td>
              <td className="px-3 py-2">{entry.wins}</td>
              <td className="px-3 py-2">{entry.diff}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}